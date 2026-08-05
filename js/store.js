/* ============================================================================
   store.js: all persistent state (localStorage). No backend, no cookies.
   ----------------------------------------------------------------------------
   Tracks:
     • reviewed. Set of topicIds the student has marked "reviewed"
     • flagged: Set of topicIds flagged as "needs more work"
     • streak, consecutive-day study streak {count, lastActive}
     • theme, 'light' | 'dark'
     • quizBest, best score per topic { topicId: {score, total} }

   Anything that changes state emits a 'change' event so the UI can refresh
   (sidebar progress, badges, etc.).
   ========================================================================== */

import { isTheme, themeById } from './themes.js';
import { profile as seedProfile } from '../data/profile.js';
import { results as shippedRecord } from '../data/results.js';

const NS = 'ncea.';

/* Answered items needed before a day counts toward the study streak. */
const STREAK_TARGET = 10;

/* Automatic review / flag thresholds (see store.autoTriage). */
const AUTO_REVIEW_ITEMS = 6;    // answered items on a topic …
const AUTO_REVIEW_PCT   = 80;   // … at this average → counts as reviewed
const AUTO_FLAG_ATTEMPTS = 2;   // separate attempts …
const AUTO_FLAG_PCT      = 50;  // … averaging below this → auto-flagged

/* ---- read cache -----------------------------------------------------------
   Every read() used to hit localStorage and JSON.parse the value again. That is
   fine once, but the render paths call it per ROW: withOverride() reads the
   whole credit record for each of ~35 standards, and the standards library
   asked "is this already present?" once per catalogue standard, 175 times, each
   answer re-parsing two keys. One paint of the Progress page was doing several
   hundred JSON.parse calls of the same handful of strings.

   The cache holds parsed values keyed by name. write() updates it in step, so
   it can never serve a stale value for anything this module wrote. Anything
   that bypasses write() (importAll, or a test clearing storage) must call
   invalidate(). */
const cache = new Map();
function invalidate() { cache.clear(); }

function read(key, fallback) {
  if (cache.has(key)) {
    const v = cache.get(key);
    return v === undefined ? fallback : v;
  }
  try {
    const raw = localStorage.getItem(NS + key);
    const v = raw == null ? undefined : JSON.parse(raw);
    cache.set(key, v);
    return v === undefined ? fallback : v;
  } catch (e) { return fallback; }
}
function write(key, val) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(val));
    cache.set(key, val);
    /* Stamped on every write so cloud sync can tell whether this browser or the
       account holds the newer copy. Written raw (not via write()) so it never
       recurses, and excluded from the sync payload so the two sides do not
       fight over whose timestamp is authoritative. */
    if (key !== 'lastwrite') {
      const t = String(Date.now());
      localStorage.setItem(NS + 'lastwrite', t);
      cache.set('lastwrite', Number(t));
    }
  } catch (e) {}
}

/* Local calendar date as YYYY-MM-DD (streaks should follow the student's day). */
function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daysBetween(a, b) {
  const ms = new Date(b + 'T00:00') - new Date(a + 'T00:00');
  return Math.round(ms / 86400000);
}

/* ---- tiny event bus ---- */
const listeners = new Set();
function emit() { listeners.forEach(fn => { try { fn(); } catch (e) {} }); }

/* ---- in-memory mirrors of the sets ---- */
let reviewed = new Set(read('reviewed', []));
let flagged  = new Set(read('flagged', []));

function persistSets() {
  write('reviewed', [...reviewed]);
  write('flagged', [...flagged]);
}

export const store = {
  on(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  /* ---- Reviewed ---- */
  isReviewed(id) { return reviewed.has(id); },
  toggleReviewed(id) {
    reviewed.has(id) ? reviewed.delete(id) : reviewed.add(id);
    persistSets(); emit();
    return reviewed.has(id);
  },
  reviewedIds() { return [...reviewed]; },
  reviewedCount() { return reviewed.size; },
  /** Reviewed count restricted to a given list of topicIds (keeps the sidebar
      numerator and denominator measuring the same thing. Study guides are
      markable but are not standards, which used to produce "27 / 26"). */
  reviewedCountIn(ids) { return ids.filter(id => reviewed.has(id)).length; },

  /* ---- Flagged ---- */
  isFlagged(id) { return flagged.has(id); },
  toggleFlagged(id) {
    flagged.has(id) ? flagged.delete(id) : flagged.add(id);
    persistSets(); emit();
    return flagged.has(id);
  },
  flaggedIds() { return [...flagged]; },
  flaggedCount() { return flagged.size; },

  /* ---- Theme ----
     Any id in js/themes.js is valid. An unknown id (an old save, or a theme
     that has since been removed) falls back to the OS preference rather than
     leaving the page with no palette at all. */
  theme() {
    const t = read('theme', null);
    if (isTheme(t)) return t;
    /* A retired theme (sepia / high contrast) or a corrupt value: fall back to
       the nearest surviving one rather than dumping the reader into whatever
       the OS prefers, which for a sepia user would be a bright white page. */
    const RETIRED = { sepia: 'sandstone', contrast: 'light' };
    if (t && RETIRED[t]) { write('theme', RETIRED[t]); return RETIRED[t]; }
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  setTheme(t) {
    if (!isTheme(t)) return this.theme();
    write('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    emit();
    return t;
  },
  /** Kept for the keyboard shortcut: flips between the light and dark you last
      used, rather than cycling through all five. */
  toggleTheme() {
    const cur = themeById(this.theme());
    return this.setTheme(cur.dark ? 'light' : 'dark');
  },

  /* ---- Quiz scores ----
     Keeps the best score AND a rolling history, so the dashboard can surface
     weak topics (see pages/home.js "Focus on this"). */
  quizBest(id) { return read('quiz.' + id, null); },
  saveQuiz(id, score, total) {
    const prev = this.quizBest(id);
    if (!prev || score > prev.score) write('quiz.' + id, { score, total });

    // rolling history: keep the last 10 attempts per topic
    const hist = read('quizhist.' + id, []);
    hist.push({ score, total, at: Date.now() });
    write('quizhist.' + id, hist.slice(-10));

    this.recordStudy(total);          // answered items count toward the streak
    this.autoTriage(id);              // may auto-review or auto-flag this topic
    emit();
  },

  /* ---- Automatic review / flag ------------------------------------------
     The tracking systems used to be blind to each other: you could answer 40
     questions and the "topics reviewed" counter stayed at 0, while a topic you
     were failing was never flagged. autoTriage closes that loop.

       ≥ AUTO_REVIEW_ITEMS answered at ≥ AUTO_REVIEW_PCT  → mark reviewed
       ≥ AUTO_FLAG_ATTEMPTS attempts averaging < AUTO_FLAG_PCT → flag

     Both are advisory: you can still unmark or unflag by hand, and a manual
     flag is never removed automatically. */
  autoTriage(id) {
    const hist = read('quizhist.' + id, []);
    if (!hist.length) return;
    const items = hist.reduce((n, a) => n + (a.total || 0), 0);
    const avg = this.quizAvgPct(id);

    if (!reviewed.has(id) && items >= AUTO_REVIEW_ITEMS && avg >= AUTO_REVIEW_PCT) {
      reviewed.add(id);
      write('autoreviewed', [...new Set([...read('autoreviewed', []), id])]);
      persistSets();
    }
    if (!flagged.has(id) && hist.length >= AUTO_FLAG_ATTEMPTS && avg < AUTO_FLAG_PCT) {
      flagged.add(id);
      write('autoflagged', [...new Set([...read('autoflagged', []), id])]);
      persistSets();
    }
  },
  /** Was this topic marked reviewed/flagged by the app rather than by hand? */
  isAutoReviewed(id) { return read('autoreviewed', []).includes(id); },
  isAutoFlagged(id) { return read('autoflagged', []).includes(id); },
  quizHistory(id) { return read('quizhist.' + id, []); },
  /** Most recent attempt's percentage, or null if never attempted. */
  quizLastPct(id) {
    const h = this.quizHistory(id);
    if (!h.length) return null;
    const last = h[h.length - 1];
    return last.total ? Math.round((last.score / last.total) * 100) : null;
  },
  /** Average percentage across all recorded attempts, or null. */
  quizAvgPct(id) {
    const h = this.quizHistory(id);
    if (!h.length) return null;
    const pct = h.map(a => (a.total ? a.score / a.total : 0));
    return Math.round((pct.reduce((a, b) => a + b, 0) / pct.length) * 100);
  },

  /* ---- Flashcards: Leitner boxes + session counter ---- */
  /** Bumps once per deck mount; drives "is this card due yet?". */
  fcSession(deckId) {
    const key = 'fcsession.' + deckId;
    const n = read(key, 0) + 1;
    write(key, n);
    return n;
  },
  /** Read the session counter WITHOUT advancing it (used to plan a queue). */
  fcPeekSession(deckId) { return read('fcsession.' + deckId, 0) + 1; },
  fcProgress(deckId) { return read('fcprog.' + deckId, {}); },
  fcGrade(deckId, cardIndex, box, session) {
    const p = this.fcProgress(deckId);
    p[cardIndex] = { box, lastSession: session, lastSeen: todayStr() };
    write('fcprog.' + deckId, p);
    this.recordStudy(1);          // a graded card is a retrieval, counts
    emit();
    return p;
  },
  /** Count of cards sitting in box 1 (i.e. still being learned). */
  fcWeakCount(deckId) {
    const p = this.fcProgress(deckId);
    return Object.values(p).filter(c => (c.box || 1) === 1).length;
  },

  /* ---- Credit tracker (Progress page) ----
     records: { [topicId]: { status, grade, credits } }
       status: 'notsat' | 'pending' | 'achieved' | 'notachieved'
       grade:  'A' | 'M' | 'E'  (only when achieved)
       credits: optional override of the standard's default credit value */
  /* ---- One-click personal record ----
     A new visitor gets the blank course structure from data/results.js. The
     owner of a copy loads their own results from data/my-record.js with the
     button on Progress. Everything it writes is an ORDINARY EDIT: the same
     shape the table itself writes, so it can be changed or reset afterwards
     exactly like anything the student typed. Nothing here is special-cased. */
  /** When this browser was last changed. Used by cloud sync to reconcile. */
  lastLocalWrite() { return Number(read('lastwrite', 0)) || 0; },

  hasPersonalRecord() { return read('personalrecord', false); },
  recordOfferDismissed() { return read('recordoffer.skip', false); },
  dismissRecordOffer() { write('recordoffer.skip', true); this.markUsed(); emit(); },

  /* ---- has this student ever used the Progress page? ----
     The first-run screen ("Which subjects are you taking?") must only ever show
     to somebody who has genuinely never used it. It used to be inferred from
     "no credits, no extras, nothing hidden", which is ALSO the exact state you
     are in one second after pressing Reset to blank — so a reset hid the whole
     credit table and offered a picker containing only the 24 catalogue
     subjects. The six taught subjects are not in that catalogue, so they looked
     deleted and could not be added back. This flag makes the two states
     distinguishable. */
  hasUsedProgress() { return read('progress.used', false); },
  markUsed() { if (!read('progress.used', false)) write('progress.used', true); },
  loadPersonalRecord({ record, qualification, internalStatus }) {
    const credits = this.creditRecords();
    Object.entries(record || {}).forEach(([k, v]) => {
      credits[k] = { status: v.status, grade: v.grade || '', resit: !!v.resit };
    });
    write('credits', credits);
    if (qualification) write('qualification', qualification);
    /* Planner statuses only. The DUE DATES stay generic (data/planner.js), so
       a student loading this record still gets their school's dates, not a
       second person's guesses about them. */
    if (internalStatus) {
      const all = this.internals().map(i =>
        internalStatus[i.recordKey] ? { ...i, status: internalStatus[i.recordKey] } : i);
      write('internals', all);
    }
    write('personalrecord', true);
    this.markUsed();
    emit();
  },
  clearPersonalRecord() {
    /* ⚠️ The planner MUST be cleared too. It used to survive a reset, which left
       the two halves of one record disagreeing: credits back to blank, but 11
       stale planner internals still sitting there. The Assessments page then
       showed items whose status matched nothing, and "load my outstanding
       internals" offered the same standards again, so re-adding looked like a
       duplicate. Resetting half a record is worse than not resetting at all. */
    write('credits', {});
    write('qualification', null);
    write('personalrecord', false);
    write('internals', []);
    write('seeddates.v1', false);      // let the shipped dates seed again
    this.markUsed();
    emit();
  },
  /* The headline NZQA panel: blank shipped values, overridden once loaded. */
  qualificationOverride() { return read('qualification', null); },

  creditRecords() { return read('credits', {}); },
  creditRecord(id) { return this.creditRecords()[id] || null; },
  setCreditRecord(id, rec) {
    this.markUsed();
    const all = this.creditRecords();
    if (rec === null) delete all[id]; else all[id] = rec;
    write('credits', all);
    emit();
  },

  /* ---- Internal deadline planner ----
     items: [{ id, subject, code, title, topicId, dateMode, date,
               startDate, endDate, term, week, status, grade, notes }] */
  internals() { return read('internals', []); },
  saveInternal(item) {
    const all = this.internals();
    /* Match on id first, then fall back to recordKey. Without the fallback, a
       standard planned from its topic page and then planned again from the
       planner arrives with a fresh uid and lands as a SECOND entry for the same
       standard: two countdowns, two rows, double credits. A blank recordKey is
       a free-text internal that isn't tied to a standard, so those are left
       alone and can legitimately repeat. */
    let i = all.findIndex(x => x.id === item.id);
    if (i < 0 && item.recordKey) i = all.findIndex(x => x.recordKey === item.recordKey);
    if (i >= 0) all[i] = { ...item, id: all[i].id }; else all.push(item);
    write('internals', all);
    emit();
    return all;
  },
  deleteInternal(id) {
    write('internals', this.internals().filter(x => x.id !== id));
    emit();
  },
  /* Seed the planner from the standards you still have to do (one click). */
  setInternals(list) { write('internals', list); emit(); },

  /* One-time: stamp the known course dates onto planner items that have none.
     Runs once ever (guarded by a flag), and never overwrites a date the student
     has already set. */
  applySeedDates(seed) {
    if (read('seeddates.v1', false)) return { applied: 0 };
    const all = this.internals();
    let applied = 0;
    const next = all.map(i => {
      const s = seed[i.recordKey];
      const hasDate = (i.dateMode === 'exact' && i.date)
                   || (i.dateMode === 'range' && i.startDate)
                   || (i.dateMode === 'rough' && i.term);
      if (!s || hasDate) return i;
      applied++;
      /* Clear every date field first so switching mode leaves no stale value
         behind, then apply the seed (which may carry a status as well). */
      return { ...i, date: '', startDate: '', endDate: '', term: null, week: null, ...s };
    });
    write('internals', next);
    write('seeddates.v1', true);
    if (applied) emit();
    return { applied };
  },

  /* ---- Subjects the student has removed ----
     A fresh copy starts with the six taught subjects present, because that is
     the sensible default. From then on ANY subject can be removed, including
     those six: nothing about them is special. Removing hides the subject from
     the sidebar, the dashboard, the credit tracker and every total, but does
     NOT delete the teaching content, so it can be added back at any time. */
  /* Hidden by STANDARD key ("13CHE:3.2"), not by subject. Removing is a
     per-standard action, so a student can drop the one paper they are not
     sitting without losing the rest of the subject. A subject disappears from
     the sidebar automatically once every one of its standards is hidden. */
  hiddenStandards() { return read('hiddenstds', []); },
  isStandardHidden(k) { return this.hiddenStandards().includes(k); },
  hideStandard(k) {
    this.markUsed();
    const all = new Set(this.hiddenStandards()); all.add(k);
    write('hiddenstds', [...all]); emit();
  },
  unhideStandard(k) {
    write('hiddenstds', this.hiddenStandards().filter(x => x !== k)); emit();
  },
  showAllStandards() { write('hiddenstds', []); emit(); },

  /* ---- Who this copy belongs to ----
     PHASE 1 of PROFILES-PLAN.md. data/profile.js is now only a SEED: whatever
     the student saves here wins. That means a visitor to the published site can
     make it theirs without editing a file, which is the whole point.

     Still to come (see the plan): the RECORD itself, data/results.js, moving
     behind the same pattern, and namespacing every key by profile id so more
     than one person can share a browser. */
  profile() {
    const saved = read('profile', null);
    return { ...seedProfile, ...(saved || {}) };
  },
  setProfile(patch) {
    const next = { ...this.profile(), ...patch };
    // Blank strings mean "use the seed", not "store an empty name".
    Object.keys(next).forEach(k => { if (next[k] === '') delete next[k]; });
    write('profile', next);
    emit();
    return next;
  },
  /** Has this person personalised the copy, or are they still seeing the seed? */
  hasOwnProfile() { return !!read('profile', null); },
  resetProfile() { write('profile', null); emit(); },

  /* ---- Is this standard already on the record? ---------------------------
     A standard can be reachable under two different keys. The catalogue lists
     the Maths standards under 13MAT while the shipped record files the same
     papers under 13MAC and 13MAS, so "Apply trigonometric methods" was
     addable a second time even though it was already there. Four standards
     collide that way (AS 91574, 91575, 91581, 91587).

     Identity therefore is not group:code alone. Two rows are the same standard
     if they share an AS number, or (for record rows with no AS number filled
     in) a normalised title. */
  _identity(row) {
    const ids = [`k:${row.group}:${row.code}`];
    if (row.as) ids.push(`as:${row.as}`);
    if (row.title) ids.push('t:' + String(row.title).toLowerCase().replace(/[^a-z0-9]+/g, ''));
    return ids;
  },
  /** Every standard currently on the record: shipped rows plus user additions,
      minus anything hidden. */
  _presentRows() {
    const hidden = new Set(this.hiddenStandards());
    return [...shippedRecord, ...this.extraStandards()]
      .filter(r => !hidden.has(`${r.group}:${r.code}`));
  },
  /** Drop every cached value. Only needed if something wrote to localStorage
      without going through the store (a restore, or a test clearing storage). */
  refresh() { invalidate(); emit(); },

  /** The identity set of everything currently on the record.
      Build it ONCE and hand it to isStandardPresent when testing many rows:
      the standards library asks 175 times per paint, and rebuilding a ~100
      entry Set for each of those was the single most expensive thing on the
      Progress page. */
  presentIdentitySet() {
    return new Set(this._presentRows().flatMap(r => this._identity(r)));
  },

  /** Would adding `row` duplicate something already present?
      Pass `known` (from presentIdentitySet) in a loop to avoid rebuilding it. */
  isStandardPresent(row, known = null) {
    const mine = known || this.presentIdentitySet();
    return this._identity(row).some(id => mine.has(id));
  },

  /* ---- Extra standards (subjects this site doesn't teach) ----
     data/results.js is the student's own transcribed record. Anything they add
     from the NZQA catalogue, Economics, Te Reo Māori, Accounting …, or type in
     by hand lands here instead, so the shipped file is never rewritten and a
     reset only clears what they added.

     Shape matches a results.js row so the Progress page can concatenate the two
     lists and treat every row identically:
       { group, subject, code, as, title, credits, status, grade, assess,
         topicId: null, custom: true, unverified?: true }                     */
  extraStandards() { return read('extras', []); },
  addExtraStandard(row) {
    const key = `${row.group}:${row.code}`;
    /* Re-adding something previously removed must UN-HIDE it, or the row gets
       written back to extras and then filtered straight out again, which looked
       like the Add button silently doing nothing. */
    const wasHidden = this.isStandardHidden(key);
    if (wasHidden) this.unhideStandard(key);
    if (this.isStandardPresent(row)) {
      if (wasHidden) return { ok: true, restored: true };   // un-hiding WAS the add
      return { ok: false, reason: 'duplicate' };
    }
    const all = this.extraStandards();
    if (!all.some(r => `${r.group}:${r.code}` === key)) all.push({ ...row, custom: true });
    write('extras', all);
    emit();
    return { ok: true, count: all.length };
  },
  /** Add several at once (a whole subject). Silently skips ones already there. */
  addExtraStandards(rows) {
    let added = 0, skipped = 0;
    rows.forEach(row => {
      const res = this.addExtraStandard(row);
      if (res.ok) added++; else skipped++;
    });
    return { added, skipped };
  },
  removeExtraStandard(group, code) {
    write('extras', this.extraStandards().filter(r => !(r.group === group && r.code === code)));
    emit();
  },
  /** Drop a whole subject's worth in one go. */
  removeExtraSubject(group) {
    write('extras', this.extraStandards().filter(r => r.group !== group));
    emit();
  },

  /* ---- Goal (Progress page) ---- */
  goal() { return read('goal', { type: 'l3cert', target: null }); },
  setGoal(g) { write('goal', g); emit(); },

  /* THE STARRED GOAL. Null until the student stars one, and that null matters:
     the Level 3 certificate is what Progress opens on when nothing is starred,
     but it is NOT itself starred by that fact. It can be starred like any other
     goal, and starring anything else replaces the star rather than adding one:
     there is only ever a single favourite. */
  /* ---- favourite theme ----
     Same idea as the starred goal: the site opens in this theme every time,
     rather than whatever you last happened to click. Null until starred, and
     the default (whatever the OS prefers) is shown because nothing is starred,
     not because it is. */
  /* The copy displaced by a sync conflict, kept so last-write-wins is recoverable. */
  stashConflict(v) { write('conflictcopy', v); },
  conflictCopy() { return read('conflictcopy', null); },
  clearConflictCopy() { write('conflictcopy', null); emit(); },

  favTheme() { return read('favtheme', null); },
  isFavTheme(id) { return this.favTheme() === id; },
  setFavTheme(id) { write('favtheme', id); write('theme', id); emit(); },
  clearFavTheme() { write('favtheme', null); emit(); },

  favGoal() { return read('favgoal', null); },
  isFavGoal(g) {
    const f = this.favGoal();
    return !!f && f.type === g.type && (f.target || null) === (g.target || null);
  },
  setFavGoal(g) {
    const v = { type: g.type, target: g.target || null };
    write('favgoal', v);
    write('goal', v);            // starring also shows it
    emit();
  },
  clearFavGoal() { write('favgoal', null); emit(); },

  /* ---- Revision session preferences ---- */
  reviseCfg() { return { scope: 'mixed', length: 20, mode: 'mixed', focus: 'all', ...read('revise', {}) }; },
  setReviseCfg(c) { write('revise', c); },

  /* ---- Calendar page filter ---- */
  /* View preferences are NOT progress data. They deliberately do NOT emit():
     the app-level subscriber re-renders the whole route on any store change,
     which threw the reader back to the top of the page every time they touched
     a filter chip. The page that owns the filter re-renders its own card. */
  calMonth() { return read('calmonth', null); },
  setCalMonth(k) { write('calmonth', k); },
  calFilter() { return read('calfilter', 'all'); },
  setCalFilter(f) { write('calfilter', f); },

  /* ---- "What's coming" filter on the dashboard ----
     'all' | 'internal' | 'derived' | 'external' */
  dueFilter() { return read('duefilter', 'all'); },
  setDueFilter(f) { write('duefilter', f); },

  /* ---- Study streak ----
     A day only counts once you have actually RETRIEVED something, answered
     STREAK_TARGET items across flashcards, quizzes and revision sessions.
     Merely opening the site used to tick the streak over, which made the
     number meaningless. recordStudy() is called from every graded item.

     `todayCount` resets each calendar day; `count` is the run of qualifying
     days. Streaks are checked lazily on read, so a broken streak shows as 0
     even if you never open the app on the day it lapses. */
  /* ---- Backup ------------------------------------------------------------
     Everything lives in localStorage, so clearing the browser, switching device
     or a bad update loses the lot. While the site is in beta that is a real
     risk, so a backup file is the safety net.

     exportAll() takes EVERY `ncea.` key without a whitelist, on purpose. A
     whitelist is a list that goes stale: add a feature, forget to add its key,
     and the backup silently stops covering it. Taking the whole namespace means
     the export is complete by construction, covering name and school, results
     and grades, subject and assessment configuration, planner dates, Leitner
     boxes, quiz history, streak, flags, theme and goal.

     The file is a plain local download that never leaves the device. It stays
     the user's own record to keep or delete. */
  exportAll() {
    const data = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k || !k.startsWith(NS)) continue;
        const short = k.slice(NS.length);
        /* `lastwrite` is bookkeeping for cloud sync: it records when THIS
           browser last changed. Carrying it in a backup or a cloud payload
           would let one device's clock overwrite another's idea of who is
           newer, which is exactly the comparison it exists to make. */
        if (short === 'lastwrite' || short === 'conflictcopy') continue;
        data[short] = localStorage.getItem(k);
      }
    } catch (e) {}
    return {
      app: 'ncea-study-hub', version: 2,
      exportedAt: new Date().toISOString(),
      /* Labelled so a folder of backups is tellable apart at a glance. */
      profile: { name: (this.profile().name || ''), school: (this.profile().school || '') },
      counts: { keys: Object.keys(data).length },
      data,
    };
  },
  /** @returns {{ok:boolean, keys?:number, error?:string}} */
  importAll(payload, { merge = false, silent = false } = {}) {
    if (!payload || payload.app !== 'ncea-study-hub' || !payload.data) {
      return { ok: false, error: 'That file is not a Study Hub backup.' };
    }
    try {
      if (!merge) {
        /* Replace, not merge: a half-restored state (new results over old
           subjects) is worse than either. Clear our namespace first. */
        const mine = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(NS)) mine.push(k);
        }
        mine.forEach(k => localStorage.removeItem(k));
      }
      Object.entries(payload.data).forEach(([k, v]) => localStorage.setItem(NS + k, v));
      invalidate();                     // written behind write()'s back
    } catch (e) { return { ok: false, error: String(e) }; }
    reviewed = new Set(read('reviewed', []));
    flagged  = new Set(read('flagged', []));
    /* `silent` is for a cloud pull: the data has already been reconciled and
       re-emitting would bounce it straight back up as a "local change". */
    if (!silent) emit();
    return { ok: true, keys: Object.keys(payload.data).length };
  },

  /* ---- beta backup nudge ---- */
  backupNudgeUntil() { return read('backupnudge.until', 0); },
  snoozeBackupNudge(days = 7) {
    write('backupnudge.until', Date.now() + days * 86400000);
    emit();
  },
  markBackedUp() { write('backupnudge.last', Date.now()); this.snoozeBackupNudge(14); },
  lastBackupAt() { return read('backupnudge.last', 0); },

  streak() {
    const s = read('streak', { count: 0, lastActive: null, todayCount: 0, todayDate: null });
    const today = todayStr();
    /* todayCount belongs to todayDate, NOT to lastActive. LastActive is only
       set once a day qualifies, so keying off it reported partial progress
       as zero. */
    const todayCount = s.todayDate === today ? (s.todayCount || 0) : 0;
    // A gap of more than one day since the last QUALIFYING day breaks the run.
    const lapsed = s.lastActive && s.lastActive !== today &&
                   daysBetween(s.lastActive, today) > 1;
    return { count: lapsed ? 0 : (s.count || 0), lastActive: s.lastActive, todayCount, lapsed: !!lapsed };
  },
  streakTarget() { return STREAK_TARGET; },
  /** Count one answered item toward today's study. Returns the streak state. */
  recordStudy(n = 1) {
    const raw = read('streak', { count: 0, lastActive: null, todayCount: 0, todayDate: null });
    const today = todayStr();
    let { count = 0, lastActive = null, todayCount = 0, todayDate = null } = raw;

    if (todayDate !== today) { todayCount = 0; todayDate = today; }   // new day
    const alreadyQualified = lastActive === today;
    todayCount += n;

    if (!alreadyQualified && todayCount >= STREAK_TARGET) {
      // today has just qualified. Extend the run, or start a new one
      if (lastActive && daysBetween(lastActive, today) === 1) count += 1;
      else count = 1;
      lastActive = today;
    }
    write('streak', { count, lastActive, todayCount, todayDate });
    emit();
    return this.streak();
  },
};

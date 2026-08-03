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

const NS = 'ncea.';

/* Answered items needed before a day counts toward the study streak. */
const STREAK_TARGET = 10;

/* Automatic review / flag thresholds (see store.autoTriage). */
const AUTO_REVIEW_ITEMS = 6;    // answered items on a topic …
const AUTO_REVIEW_PCT   = 80;   // … at this average → counts as reviewed
const AUTO_FLAG_ATTEMPTS = 2;   // separate attempts …
const AUTO_FLAG_PCT      = 50;  // … averaging below this → auto-flagged

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (e) { return fallback; }
}
function write(key, val) {
  try { localStorage.setItem(NS + key, JSON.stringify(val)); } catch (e) {}
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
  creditRecords() { return read('credits', {}); },
  creditRecord(id) { return this.creditRecords()[id] || null; },
  setCreditRecord(id, rec) {
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
    const i = all.findIndex(x => x.id === item.id);
    if (i >= 0) all[i] = item; else all.push(item);
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
    const all = this.extraStandards();
    const key = `${row.group}:${row.code}`;
    if (all.some(r => `${r.group}:${r.code}` === key)) return { ok: false, reason: 'duplicate' };
    all.push({ ...row, custom: true });
    write('extras', all);
    emit();
    return { ok: true, count: all.length };
  },
  /** Add several at once (a whole subject). Silently skips ones already there. */
  addExtraStandards(rows) {
    const all = this.extraStandards();
    const seen = new Set(all.map(r => `${r.group}:${r.code}`));
    let added = 0;
    rows.forEach(row => {
      const key = `${row.group}:${row.code}`;
      if (seen.has(key)) return;
      seen.add(key); all.push({ ...row, custom: true }); added++;
    });
    write('extras', all);
    emit();
    return { added, skipped: rows.length - added };
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
  goal() { return read('goal', { type: 'rank', target: null }); },
  setGoal(g) { write('goal', g); emit(); },

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
     Everything lives in localStorage, so clearing the browser or switching
     device loses the lot. exportAll()/importAll() make that recoverable. */
  exportAll() {
    const data = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(NS)) data[k.slice(NS.length)] = localStorage.getItem(k);
      }
    } catch (e) {}
    return { app: 'ncea-study-hub', version: 1, exportedAt: new Date().toISOString(), data };
  },
  /** @returns {{ok:boolean, keys?:number, error?:string}} */
  importAll(payload, { merge = false } = {}) {
    if (!payload || payload.app !== 'ncea-study-hub' || !payload.data) {
      return { ok: false, error: 'That file is not a Study Hub backup.' };
    }
    try {
      if (!merge) {
        const mine = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(NS)) mine.push(k);
        }
        mine.forEach(k => localStorage.removeItem(k));
      }
      Object.entries(payload.data).forEach(([k, v]) => localStorage.setItem(NS + k, v));
    } catch (e) { return { ok: false, error: String(e) }; }
    reviewed = new Set(read('reviewed', []));
    flagged  = new Set(read('flagged', []));
    emit();
    return { ok: true, keys: Object.keys(payload.data).length };
  },

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

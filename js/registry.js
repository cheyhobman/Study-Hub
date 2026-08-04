/* ============================================================================
   registry.js, bridges the structure (subjects.js) with the teaching content
   (data/content/<subject>.js), and builds the global search index.
   ----------------------------------------------------------------------------
   Content modules are loaded lazily (dynamic import) so the app boots fast and
   still works even if a subject's content file doesn't exist yet: the topic
   simply renders a "coming soon" placeholder.
   ========================================================================== */

import { subjects, allStandards, standardByTopicId, subjectById } from '../data/subjects.js';
import { exams, externalExams, derivedExams } from '../data/exams.js';
import { results } from '../data/results.js';
import { catalogue } from '../data/nzqa-catalogue.js';
import { stripHtml } from './ui.js';
import { store } from './store.js';

export { subjects, allStandards, standardByTopicId, subjectById, exams, externalExams, derivedExams };

/* ---- Which subjects is THIS student actually taking? -----------------------
   The teaching content ships for all six subjects, but a student handed this
   copy may only take three of them. Rather than making them delete content (or
   maintain a second list that drifts), enrolment is DERIVED from the one file
   they have to edit anyway: data/results.js. A subject with no rows on the
   record is not on their timetable, so it stays out of the sidebar, the
   dashboard tiles and the subject count.

   `subjects` (above) remains the COMPLETE list. SubjectById, search and direct
   topic links keep working for everything, so nothing 404s if a link is shared.
   Only the browsing surfaces narrow. If results.js is emptied entirely we fall
   back to showing all six rather than an empty sidebar. */
const onRecord = new Set(results.map(r => (r.subject || '').trim().toLowerCase()));
export const enrolledSubjects = (() => {
  const mine = subjects.filter(s => onRecord.has(s.name.toLowerCase()));
  return mine.length ? mine : subjects;
})();
/** The standards belonging to the enrolled subjects, so "12 / 13 reviewed"
    counts what this student is actually sitting, not all six subjects.
    Filtered from allStandards (not flatMapped from scratch) so each entry keeps
    its subjectId / subjectName tags. */
export const enrolledStandards = (() => {
  const ids = new Set(enrolledSubjects.map(s => s.id));
  return allStandards.filter(std => ids.has(std.subjectId));
})();

/* The timetables narrowed the same way. data/exams.js can keep listing every
   subject the school examines; a student only ever sees the sittings for
   subjects on their own record. Everything that counts deadlines (the nav
   badge, the dashboard strip, the calendar, the exam tables) reads these, so
   they can never disagree with each other. */
const enrolledIds = new Set(enrolledSubjects.map(s => s.id));

/* Exam sittings are derived in js/assessments.js, the single source of truth
   for every assessment view. Re-exported here so existing imports keep working
   and there is still only ONE implementation. */
export { myExternalExams, myDerivedExams } from './assessments.js';

/* topicId prefix -> subject id (lets us resolve content even for extra
   sub-pages that aren't tied to a formal standard). */
const PREFIX = {
  chem: 'chemistry', phys: 'physics',
  calc: 'calculus', stat: 'statistics', bio: 'biology', eng: 'english',
};

export function subjectIdForTopic(topicId) {
  if (standardByTopicId[topicId]) return standardByTopicId[topicId].subjectId;
  const p = topicId.split('-')[0];
  return PREFIX[p] || null;
}

/* ---- content module cache ---- */
const contentCache = {};

export async function getSubjectContent(subjectId) {
  if (subjectId in contentCache) return contentCache[subjectId];
  try {
    const mod = await import(`../data/content/${subjectId}.js`);
    contentCache[subjectId] = mod.default || null;
  } catch (e) {
    contentCache[subjectId] = null; // file not created yet: fine
  }
  return contentCache[subjectId];
}

/** Returns { std, subjectId, subject, topic } for a topic route. */
export async function getTopic(topicId) {
  const subjectId = subjectIdForTopic(topicId);
  const content = subjectId ? await getSubjectContent(subjectId) : null;
  const topic = content && content.topics ? content.topics[topicId] : null;
  return {
    std: standardByTopicId[topicId] || null,
    subjectId,
    subject: subjectId ? subjectById[subjectId] : null,
    topic,
  };
}

/* ---------------------------------------------------------------- SEARCH */
let searchIndex = null;

/** Build (once) a flat, searchable index across subjects, standards & topics. */
export async function buildSearchIndex() {
  if (searchIndex) return searchIndex;
  const idx = [];

  // Subjects
  subjects.forEach(s => {
    idx.push({
      kind: 'Subject', title: s.name, sub: s.level,
      url: `/subject/${s.id}`, subjectId: s.id,
      text: `${s.name} ${s.blurb} ${s.level}`.toLowerCase(),
    });
  });

  // Standards + their teaching content (load all content in parallel)
  await Promise.allSettled(subjects.map(s => getSubjectContent(s.id)));

  allStandards.forEach(std => {
    const content = contentCache[std.subjectId];
    const topic = content && content.topics ? content.topics[std.topicId] : null;

    // gather searchable text from the topic's blocks (be thorough. Pull text
    // from every field a block might carry so search covers all content)
    let body = '';
    if (topic) {
      body += ' ' + (topic.intro || '') + ' ' + (topic.tags || []).join(' ');
      (topic.sections || []).forEach(sec => {
        body += ' ' + (sec.title || '') + ' ' + stripHtml(sec.intro || '');
        (sec.blocks || []).forEach(bl => {
          body += ' ' + stripHtml([bl.html, bl.title, bl.caption, bl.note, bl.problem, bl.answer].filter(Boolean).join(' '));
          if (bl.steps) body += ' ' + bl.steps.map(stripHtml).join(' ');
          if (bl.items) body += ' ' + bl.items.map(i => stripHtml(
            typeof i === 'string' ? i : [i.name, i.eq, i.note, i.q, i.a].filter(Boolean).join(' ')
          )).join(' ');
          if (bl.rows) body += ' ' + bl.rows.flat().map(stripHtml).join(' ');
        });
      });
      (topic.quiz || []).forEach(q => { body += ' ' + stripHtml([q.q, q.answer, q.explanation].filter(Boolean).join(' ')); });
    }

    idx.push({
      kind: std.subjectName,
      title: std.title,
      sub: `${std.code} · ${std.credits ? std.credits + ' credits · ' : ''}${std.type}`,
      url: `/topic/${std.topicId}`,
      subjectId: std.subjectId,
      text: `${std.title} ${std.code} ${std.blurb} ${body}`.toLowerCase(),
    });
  });

  // Study guides (extra deep-dive pages that aren't formal standards)
  subjects.forEach(s => {
    (s.guides || []).forEach(g => {
      const content = contentCache[s.id];
      const topic = content && content.topics ? content.topics[g.topicId] : null;
      let body = '';
      if (topic) {
        body += ' ' + (topic.intro || '') + ' ' + (topic.tags || []).join(' ');
        (topic.sections || []).forEach(sec => {
          body += ' ' + (sec.title || '') + ' ' + stripHtml(sec.intro || '');
          (sec.blocks || []).forEach(bl => {
            body += ' ' + stripHtml([bl.html, bl.title, bl.caption, bl.problem, bl.answer].filter(Boolean).join(' '));
            if (bl.items) body += ' ' + bl.items.map(i => stripHtml(typeof i === 'string' ? i : [i.name, i.eq, i.q, i.a].filter(Boolean).join(' '))).join(' ');
            if (bl.rows) body += ' ' + bl.rows.flat().map(stripHtml).join(' ');
          });
        });
      }
      idx.push({
        kind: `${s.name} · Study guide`, title: g.title, sub: g.blurb || 'Deep-dive guide',
        url: `/topic/${g.topicId}`, subjectId: s.id,
        text: `${g.title} ${g.blurb || ''} ${body}`.toLowerCase(),
      });
    });
  });

  // Section headings within each topic, so a search can jump straight to
  // the right part of a long page.
  allStandards.forEach(std => {
    const content = contentCache[std.subjectId];
    const topic = content && content.topics ? content.topics[std.topicId] : null;
    (topic?.sections || []).forEach(sec => {
      if (!sec.title) return;
      const anchor = String(sec.id || sec.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      idx.push({
        kind: `${std.subjectName} · ${std.code}`, title: sec.title,
        sub: `Section of ${std.title}`, url: `/topic/${std.topicId}#${anchor}`,
        subjectId: std.subjectId, isSection: true,
        text: `${sec.title} ${stripHtml(sec.intro || '')} ${std.title}`.toLowerCase(),
      });
    });
  });

  // Reference sheets
  subjects.forEach(s => {
    idx.push({
      kind: 'Reference', title: `${s.name} formula & quick-reference sheet`,
      sub: 'Printable reference', url: `/reference/${s.id}`, subjectId: s.id,
      text: `${s.name} formula sheet quick reference printable equations`.toLowerCase(),
    });
    idx.push({
      kind: 'Flashcards', title: `Print ${s.name} flashcards`,
      sub: 'Double-sided printable cards', url: `/printcards/${s.id}`, subjectId: s.id,
      text: `print ${s.name} flashcards double sided cards revision`.toLowerCase(),
    });
  });

  // Static / utility pages: previously missing entirely from search
  [
    { title: 'Progress & credits', url: '/progress', kind: 'Tracker',
      sub: 'Credits, grades, rank score & ATAR',
      text: 'progress credits rank score atar goal endorsement excellence merit university entrance ue record of learning tracker' },
    { title: 'Exams timetable', url: '/exams', kind: 'Timetable',
      sub: 'External exams & derived-grade trials',
      text: 'exams timetable exam dates external derived grade trials november september countdown' },
    { title: 'NZQA command words', url: '/command-words', kind: 'Study skills',
      sub: 'Describe vs explain vs evaluate',
      text: 'command words describe explain discuss evaluate justify analyse compare assess identify state elaborate' },
    { title: 'Flagged for review', url: '/flagged', kind: 'Dashboard',
      sub: 'Everything you marked as needing work',
      text: 'flagged review weak topics needs work' },
  ].forEach(p => idx.push({ ...p, subjectId: null, text: p.text.toLowerCase() }));

  searchIndex = idx;
  return idx;
}

/** Simple token-AND search over the index. Returns up to `limit` hits. */
export async function search(query, limit = 12) {
  const idx = await buildSearchIndex();
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const scored = [];
  for (const item of idx) {
    const title = item.title.toLowerCase();
    let score = 0, ok = true;

    for (const tk of tokens) {
      // Three tiers, strongest first:
      //   exact. The token IS a whole word      ("pH" in "pH of salt solutions")
      //   prefix: the token starts a word        ("ph" in "physics")
      //   sub: it appears anywhere            ("ph" in "graph")
      // Without the exact tier, searching "pH" ranked "Physics" top.
      const exact = new RegExp('\\b' + esc(tk) + '\\b', 'i');
      const prefix = new RegExp('\\b' + esc(tk), 'i');
      const titleExact = exact.test(title);
      const titlePrefix = prefix.test(title);
      const titleSub = title.includes(tk);
      const textExact = exact.test(item.text);
      const textPrefix = prefix.test(item.text);
      const textSub = item.text.includes(tk);

      if (!titleSub && !textSub) { ok = false; break; }

      if (titleExact) score += 30;
      else if (titlePrefix) score += 8;
      else if (titleSub) score += 1;

      if (textExact) score += 6;
      else if (textPrefix) score += 2;
      else if (textSub) score += 0.25;
    }
    if (!ok) continue;

    if (title === q) score += 40;
    if (title.startsWith(q)) score += 14;
    if (item.kind === 'Subject') score += 6;
    if (item.isSection) score -= 3;      // prefer the whole topic over a section
    scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.item);
}

/* ---- Subject metadata that never returns undefined --------------------------
   Subjects a student ADDS from the NZQA catalogue (Economics, Te Reo Māori …)
   are stored on planner items as `x:<GROUP>` and have no entry in
   data/subjects.js: rather than every caller writing `subjectById[id] || {}`
   and falling back to one shared accent, this gives added subjects a stable,
   distinct colour derived from their group code, so two added subjects never
   look like the same thing on the calendar. */
/* Catalogue subjects, keyed by the same subject id data/exams.js uses. Without
   this, anything added from the catalogue fell through to the raw id: the exam
   timetable read "economics externals", and cryptic ids like "aghort", "dvc"
   and "temaori" showed up verbatim instead of their real names. */
const catalogueById = Object.fromEntries(catalogue.map(c => [c.id, c]));

/* A readable short label. "Agricultural & Horticultural Science" cannot fit in
   a 40px calendar cell, so take the first word unless it is a bare initialism. */
function shortLabel(name) {
  const first = String(name).split(/[\s&]+/)[0];
  return first.length <= 3 ? name.slice(0, 12) : first;
}

export function subjectMeta(id) {
  if (!id) return { name: '', short: '', dot: 'var(--accent)', icon: '📘' };
  const known = subjectById[id];
  if (known) return known;

  const group = String(id).startsWith('x:') ? String(id).slice(2) : String(id);

  /* A catalogue subject: use its real, properly capitalised name. Colour still
     comes from the hash below so it reads as "not one of the six taught ones". */
  const cat = catalogueById[group];
  // Deterministic hue from the group code, kept out of the phthalo band (90–160°)
  // so added subjects read as "not one of the six taught ones".
  let h = 0;
  for (let i = 0; i < group.length; i++) h = (h * 31 + group.charCodeAt(i)) % 360;
  if (h >= 90 && h <= 160) h = (h + 140) % 360;
  const dot = `hsl(${h} 45% 45%)`;
  if (cat) return { name: cat.name, short: shortLabel(cat.name), icon: cat.icon || '📘', dot };
  return { name: group, short: group, icon: '📘', dot };
}

/* ---- Subjects actually shown, after the student's own removals -------------
   `enrolledSubjects` is fixed at import time (it is derived from the shipped
   record). This is a FUNCTION because removals happen at runtime and every
   caller needs the current answer, not the one from page load. */
const GROUP_OF = { chemistry: '13CHE', physics: '13PHY', calculus: '13MAC',
                   statistics: '13MAS', biology: '13BIO', english: '13ENU' };
export const groupForSubject = (id) => GROUP_OF[id] || id;

export function visibleSubjects() {
  const hidden = new Set(store.hiddenStandards());
  return enrolledSubjects.filter(s => {
    const g = groupForSubject(s.id);
    const mine = results.filter(r => r.group === g);
    // Shown while at least one of its standards survives.
    return !mine.length || mine.some(r => !hidden.has(`${r.group}:${r.code}`));
  });
}
export function visibleStandards() {
  const ids = new Set(visibleSubjects().map(s => s.id));
  return enrolledStandards.filter(std => ids.has(std.subjectId));
}

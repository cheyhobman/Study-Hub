/* ============================================================================
   internals-catalog.js: the bridge between your NZQA record and the planner.
   ----------------------------------------------------------------------------
   One source of truth for "which internals exist, and what are their details".
   Both the Add-an-internal form (subject → standard dropdown) and the due-date
   widget on each topic page read from here, so a planner item created either
   way carries identical credits / code / recordKey / topicId.
   ========================================================================== */
import { results } from '../data/results.js';
import { SEED_DATES } from '../data/planner.js';
import { subjects, standardByTopicId } from './registry.js';
import { store } from './store.js';

const uid = () => 'int_' + Math.random().toString(36).slice(2, 9);

/** The subject id ('chemistry') for a results-row subject name ('Chemistry'). */
function subjectIdFor(name) {
  const s = subjects.find(x => x.name.toLowerCase() === String(name).toLowerCase());
  return s ? s.id : '';
}

/** Every internal THIS student is actually carrying.
    ---------------------------------------------------------------------------
    Three things make an internal "theirs", and this used to honour none of them:

      • standards they ADDED from the catalogue are internals too, so extras are
        merged in rather than only reading the shipped record;
      • standards they REMOVED on the Progress page are gone, so hidden keys are
        dropped, which is what stops a deleted standard reappearing in the
        planner, on the calendar and in "what's coming";
      • their own EDITS decide the status. Reading r.status straight from the
        file meant a standard they had marked achieved still showed up as
        outstanding and got offered by "Load my internals".

    The result is that "load my internals" loads the ones they are really
    sitting, not every internal the six subjects contain. */
export function allInternals() {
  const hidden = new Set(store.hiddenStandards());
  return [...results, ...store.extraStandards()]
    .filter(r => r.assess === 'Internal')
    .filter(r => !hidden.has(`${r.group}:${r.code}`))
    .map(r => {
      const key = `${r.group}:${r.code}`;
      const o = store.creditRecord(key) || {};
      return {
        recordKey: key,
        subjectId: subjectIdFor(r.subject),
        subjectName: r.subject,
        code: `${r.subject} ${r.code}`,
        shortCode: r.code,
        as: r.as,
        title: r.title,
        credits: o.credits != null ? o.credits : r.credits,
        topicId: r.topicId || '',
        status: o.status || r.status,   // 'todo' | 'pending' | 'achieved' | …
        grade: o.grade !== undefined ? o.grade : (r.grade || ''),
      };
    });
}

/** Just the ones still to finish: what the planner is actually for. */
export function outstandingInternals() {
  return allInternals().filter(i => ['todo', 'pending'].includes(i.status));
}

/** Internals for one subject id, outstanding ones first. */
export function internalsForSubject(subjectId) {
  const order = { todo: 0, pending: 1, achieved: 2 };
  return allInternals()
    .filter(i => i.subjectId === subjectId)
    .sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3) || a.shortCode.localeCompare(b.shortCode));
}

/** Is this topic an internally-assessed standard? */
export function internalForTopic(topicId) {
  return allInternals().find(i => i.topicId === topicId) || null;
}

/** Map a record status onto a planner status. */
export function plannerStatusFor(recordStatus) {
  if (recordStatus === 'achieved') return 'graded';
  if (recordStatus === 'pending') return 'submitted';
  return 'notstarted';
}

/** The inverse: a planner status → the credit-tracker record it should write.
    Both the My Internals page and the topic-page due widget save through this,
    so a status set in either place lands in the tracker identically. */
export function creditRecordFor(plannerStatus, grade = '', credits = 0) {
  if (plannerStatus === 'graded')    return { status: 'achieved', grade: grade || '', credits };
  if (plannerStatus === 'submitted') return { status: 'pending',  grade: '', credits };
  return { status: 'todo', grade: '', credits };
}

/** Build a fresh, fully pre-filled planner item from a catalogue entry. */
export function itemFromCatalogue(entry, overrides = {}) {
  const seeded = SEED_DATES[entry.recordKey] || {};
  const std = standardByTopicId[entry.topicId];
  return {
    id: uid(),
    subject: entry.subjectId,
    code: entry.code,
    title: entry.title || (std && std.title) || '',
    topicId: entry.topicId,
    recordKey: entry.recordKey,
    credits: entry.credits,
    dateMode: 'rough', term: null, week: null,
    status: plannerStatusFor(entry.status),
    grade: entry.grade || '',
    ...seeded,
    ...overrides,
  };
}

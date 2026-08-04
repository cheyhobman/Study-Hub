/* ============================================================================
   assessments.js: THE single source of truth for "what assessments do I have".
   ----------------------------------------------------------------------------
   Before this file existed, five views each worked it out for themselves:

     Progress & credits   read data/results.js + extras + credit overrides
     Assessments          read store.internals() only, so externals never showed
     What's coming        read store.internals() + a module-load-time exam list
     Calendar             read the same stale exam list again
     Exam timetable       read it a third time

   They disagreed constantly. Deleting a standard on Progress left it on the
   calendar; grading an internal left it sitting in the planner; a subject added
   from the catalogue never gained its exam sittings. Every one of those bugs
   was the same bug: five copies of one derivation.

   Now there is one derivation, here, and every view is a FILTER over it.

   ---- The model -------------------------------------------------------------
   An assessment is one standard on the student's record. It is:

     PRESENT   if it is in results.js or store.extraStandards(), and its key is
               not in store.hiddenStandards(). Adding or removing on Progress is
               exactly this, which is why removal propagates everywhere for free.
     GRADED    if its live status is 'achieved' AND a grade is recorded.
     DATED     internals from the planner (store.internals()); externals from
               the published exam timetable in data/exams.js.

   ---- Visibility rules (from the spec, kept in ONE place) --------------------
     Assessments page   present && !graded          (internals AND externals)
     What's coming      internals: present && not submitted/graded
                        externals: present, ALWAYS, even once graded
     Calendar           internals: present (finished ones drawn muted)
                        externals: present, ALWAYS
     Exam timetable     externals: present, ALWAYS

   Externals stay visible once graded on purpose: the exam date is a fact about
   your year, and you should still be able to see when you sat it.
   ========================================================================== */
import { results } from '../data/results.js';
import { store } from './store.js';
import { externalExams, derivedExams } from '../data/exams.js';
import { subjects } from '../data/subjects.js';

/* group code → subject id. The record is keyed by the school's class codes;
   everything else on the site is keyed by subject id. */
export const SUBJECT_OF_GROUP = {
  /* the six taught subjects */
  '13CHE': 'chemistry', '13PHY': 'physics', '13MAC': 'calculus', '13MAT': 'calculus',
  '13MAS': 'statistics', '13BIO': 'biology', '13ENU': 'english', '13ENG': 'english',
  /* every other subject in data/nzqa-catalogue.js. Without these a subject
     added from the catalogue resolved to a blank subject id, so it could never
     be matched to its exam sitting and silently had no exams at all. */
  '13ECO': 'economics', '13ACC': 'accounting', '13BUS': 'business',
  '13HIS': 'history', '13GEO': 'geography', '13CLA': 'classics',
  '13MED': 'media', '13MAO': 'temaori', '13FRE': 'french', '13GER': 'german',
  '13JPN': 'japanese', '13CHI': 'chinese', '13SPA': 'spanish',
  '13DRA': 'drama', '13MUS': 'music', '13ART': 'visualarts', '13ARH': 'arthistory',
  '13PED': 'pe', '13HEA': 'health', '13DIT': 'digitech', '13DVC': 'dvc',
  '13ESS': 'ess', '13AGH': 'aghort',
};

/* Externals that are SUBMITTED, not sat: a folio or portfolio with a due date
   set by the school, so they never appear on the NZQA examination timetable.
   Flagged so the "no sitting date yet" panel describes them correctly instead
   of implying the timetable is missing data. */
export const PORTFOLIO_SUBJECTS = new Set(['visualarts', 'dvc']);

const keyOf = (r) => `${r.group}:${r.code}`;
const nameToId = (name) => {
  const s = subjects.find(x => x.name.toLowerCase() === String(name || '').toLowerCase());
  return s ? s.id : '';
};

/** Every standard the student currently has, with live status applied. */
export function allAssessments() {
  const hidden = new Set(store.hiddenStandards());
  const planner = store.internals();
  return [...results, ...store.extraStandards()]
    .filter(r => !hidden.has(keyOf(r)))
    .map(r => {
      const key = keyOf(r);
      const o = store.creditRecord(key) || {};
      const status = o.status || r.status;
      const grade = o.grade !== undefined ? o.grade : (r.grade || '');
      const kind = String(r.assess || '').toLowerCase() === 'external' ? 'external' : 'internal';
      const subjectId = SUBJECT_OF_GROUP[r.group] || nameToId(r.subject);
      return {
        key, group: r.group, code: r.code, as: r.as || '',
        subjectId, subjectName: r.subject, title: r.title,
        credits: o.credits != null ? o.credits : r.credits,
        kind, status, grade,
        /* "Graded" means a result is actually recorded. Status alone is not
           enough: an internal can read 'achieved' with the grade box still
           empty while the student is mid-edit, and vanishing at that moment
           would be the jarring behaviour the spec explicitly rules out. */
        graded: status === 'achieved' && !!grade,
        resit: o.resit !== undefined ? !!o.resit : !!r.resit,
        plannerItem: planner.find(p => p.recordKey === key) || null,
      };
    });
}

/** Subject ids that still have at least one un-removed external to sit. */
export function subjectsWithExternals() {
  const live = new Set();
  allAssessments().forEach(a => { if (a.kind === 'external' && a.subjectId) live.add(a.subjectId); });
  return live;
}

/* ---- exam sittings --------------------------------------------------------
   A sitting exists because the student holds externals in that subject. Add
   Economics on Progress and its sittings appear; delete every Physics external
   and its sittings go. Graded externals still count: the exam still happened.
   Functions, not constants, because hidden standards live in localStorage and
   a value captured at import time cannot follow them. */
export function myExternalExams() {
  const live = subjectsWithExternals();
  return externalExams.filter(e => live.has(e.subject));
}
export function myDerivedExams() {
  const live = subjectsWithExternals();
  return derivedExams.filter(e => live.has(e.subject));
}

/* Subjects the student holds externals in that have NO published sitting in
   data/exams.js yet. They are real exams they will sit; we simply do not know
   the date. Surfacing them as "to be confirmed" is honest and actionable.
   Silently dropping them was the old behaviour and it made a subject look like
   it had no exam at all. */
export function externalsAwaitingDates() {
  const dated = new Set(externalExams.map(e => e.subject));
  const bySubject = {};
  allAssessments().forEach(a => {
    if (a.kind !== 'external' || !a.subjectId || dated.has(a.subjectId)) return;
    (bySubject[a.subjectId] = bySubject[a.subjectId] || {
      subject: a.subjectId, subjectName: a.subjectName,
      portfolio: PORTFOLIO_SUBJECTS.has(a.subjectId), standards: [],
    }).standards.push(a.as ? `AS ${a.as}` : `${a.subjectName} ${a.code}`);
  });
  return Object.values(bySubject).map(s => ({ ...s, standards: s.standards.join(' · ') }));
}

/* ---- per-view filters -----------------------------------------------------
   Each view calls one of these instead of re-deriving the rule. If a rule ever
   changes, it changes here and every view follows. */

/** Assessments page: everything still to action, internal or external. */
export function assessmentsPageItems({ keepVisible = new Set() } = {}) {
  return allAssessments().filter(a => !a.graded || keepVisible.has(a.key));
}

/** What's coming: internals you still have to hand in, externals always. */
export function upcomingAssessments() {
  return allAssessments().filter(a => a.kind === 'external'
    || !(a.plannerItem && ['submitted', 'graded'].includes(a.plannerItem.status)));
}

/** True if this planner item's standard is still on the record. */
export function plannerItemIsLive(item) {
  if (!item || !item.recordKey) return true;   // free-text internals are always live
  return !store.isStandardHidden(item.recordKey);
}

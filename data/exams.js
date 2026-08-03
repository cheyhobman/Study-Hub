/* ============================================================================
   exams.js — REAL exam timetables (from Chey's 2026 Wellington College sheets).
   ----------------------------------------------------------------------------
   Two timetables:
     • externalExams  — the actual NCEA external exams (Nov–Dec 2026)
     • derivedExams   — the school's Derived Grade / trial exams (Sept 2026)

   Each subject's external standards are examined in ONE session, so there is one
   row per subject. Times: NZQA morning exams start 9:30am, afternoon 2:00pm.
   The Derived Grade timetable lists "9am" and "1pm" sessions.

   ⚠️ Note on Calculus & Statistics derived-grade dates: Wellington College class
   codes 13MAC (Maths w/ Calculus) and 13MAS (Maths w/ Statistics) were used to
   place these. If your class code means something different, adjust below.
   ========================================================================== */

/* ---- REAL external exams (Nov 2026) — from the 2026 Examination Timetable ---- */
export const externalExams = [
  { subject: 'english',             standards: 'AS 91472 · 91473',        date: '2026-11-11T09:30', session: 'AM' },
  { subject: 'physics',             standards: 'AS 91523 · 91524 · 91526', date: '2026-11-12T14:00', session: 'PM' },
  { subject: 'calculus',            standards: 'AS 91577 · 91578 · 91579', date: '2026-11-16T09:30', session: 'AM' },
  { subject: 'biology',             standards: 'AS 91603 · 91605 · 91606', date: '2026-11-17T14:00', session: 'PM' },
  { subject: 'chemistry',           standards: 'AS 91390 · 91391 · 91392', date: '2026-11-20T14:00', session: 'PM' },
  { subject: 'statistics',          standards: 'AS 91584 · 91585 · 91586', date: '2026-11-24T09:30', session: 'AM' },
];

/* ---- DERIVED GRADE / trial exams (Sept 2026) — from the CAA & DGE Timetable ---- */
export const derivedExams = [
  { subject: 'english',             paper: '13ENGLISH (all courses)',     date: '2026-09-10T13:00', session: 'PM' },
  { subject: 'biology',             paper: '13BIO',                        date: '2026-09-11T09:00', session: 'AM' },
  { subject: 'chemistry',           paper: '13CHE',                        date: '2026-09-11T13:00', session: 'PM' },
  { subject: 'statistics',          paper: '13MAS',                        date: '2026-09-14T09:00', session: 'AM' },
  { subject: 'calculus',            paper: '13MAC',                        date: '2026-09-16T09:00', session: 'AM' },
  { subject: 'physics',             paper: '13PHY (2 hr)',                 date: '2026-09-16T13:00', session: 'PM' },
];

/* Back-compat: some views import `exams` = the real external list. */
export const exams = externalExams.map(e => ({ ...e, paper: `${e.standards}` }));

/* ============================================================================
   exams.js: REAL exam timetables (from Chey's 2026 Wellington College sheets).
   ----------------------------------------------------------------------------
   Two timetables:
     • externalExams, the actual NCEA external exams (Nov–Dec 2026)
     • derivedExams, the school's Derived Grade / trial exams (Sept 2026)

   Each subject's external standards are examined in ONE session, so there is one
   row per subject. Times: NZQA morning exams start 9:30am, afternoon 2:00pm.
   The Derived Grade timetable lists "9am" and "1pm" sessions.

   ⚠️ Note on Calculus & Statistics derived-grade dates: Wellington College class
   codes 13MAC (Maths w/ Calculus) and 13MAS (Maths w/ Statistics) were used to
   place these. If your class code means something different, adjust below.
   ========================================================================== */

/* ---- REAL external exams (Nov 2026), from the 2026 Examination Timetable ---- */
export const externalExams = [
  { subject: 'english',             standards: 'AS 91472 · 91473',        date: '2026-11-11T09:30', session: 'AM' },
  { subject: 'physics',             standards: 'AS 91523 · 91524 · 91526', date: '2026-11-12T14:00', session: 'PM' },
  { subject: 'calculus',            standards: 'AS 91577 · 91578 · 91579', date: '2026-11-16T09:30', session: 'AM' },
  { subject: 'biology',             standards: 'AS 91603 · 91605 · 91606', date: '2026-11-17T14:00', session: 'PM' },
  { subject: 'chemistry',           standards: 'AS 91390 · 91391 · 91392', date: '2026-11-20T14:00', session: 'PM' },
  { subject: 'statistics',          standards: 'AS 91584 · 91585 · 91586', date: '2026-11-24T09:30', session: 'AM' },
  /* ---- The rest of the Level 3 subjects, from the same 2026 NZQA timetable.
     A sitting only ever SHOWS if the student holds at least one un-removed
     external in that subject (see myExternalExams in js/assessments.js), so
     listing every subject here costs a student nothing. */
  { subject: 'digitech',   standards: 'AS 91908 · 91909',         date: '2026-11-10T14:00', session: 'PM' },
  { subject: 'history',    standards: 'AS 91436 · 91438 · 91439', date: '2026-11-16T14:00', session: 'PM' },
  { subject: 'german',     standards: 'AS 91548 · 91551',         date: '2026-11-16T14:00', session: 'PM' },
  { subject: 'health',     standards: 'AS 91462 · 91465',         date: '2026-11-18T09:30', session: 'AM' },
  { subject: 'japanese',   standards: 'AS 91553 · 91556',         date: '2026-11-18T09:30', session: 'AM' },
  { subject: 'economics',  standards: 'AS 91399 · 91400 · 91403', date: '2026-11-18T14:00', session: 'PM' },
  { subject: 'spanish',    standards: 'AS 91568 · 91571',         date: '2026-11-19T09:30', session: 'AM' },
  { subject: 'chinese',    standards: 'AS 91533 · 91536',         date: '2026-11-20T09:30', session: 'AM' },
  { subject: 'drama',      standards: 'AS 91514 · 91518',         date: '2026-11-20T09:30', session: 'AM' },
  { subject: 'aghort',     standards: 'AS 91530 · 91531 · 91532', date: '2026-11-23T14:00', session: 'PM' },
  { subject: 'geography',  standards: 'AS 91426 · 91427 · 91429', date: '2026-11-24T14:00', session: 'PM' },
  { subject: 'accounting', standards: 'AS 91404 · 91406 · 91408', date: '2026-11-25T14:00', session: 'PM' },
  { subject: 'temaori',    standards: 'AS 91652 · 91653',         date: '2026-11-26T09:30', session: 'AM' },
  { subject: 'media',      standards: 'AS 91490 · 91493',         date: '2026-11-26T14:00', session: 'PM' },
  { subject: 'music',      standards: 'AS 91420 · 91421 · 91423', date: '2026-11-27T09:30', session: 'AM' },
  { subject: 'arthistory', standards: 'AS 91482 · 91483 · 91484', date: '2026-11-27T14:00', session: 'PM' },
  { subject: 'classics',   standards: 'AS 91394 · 91395 · 91396', date: '2026-12-01T09:30', session: 'AM' },
  { subject: 'french',     standards: 'AS 91543 · 91546',         date: '2026-12-02T09:30', session: 'AM' },
  { subject: 'ess',        standards: 'AS 91413 · 91414',         date: '2026-12-02T14:00', session: 'PM' },
  { subject: 'business',   standards: 'AS 91379 · 91380 · 91381', date: '2026-12-03T14:00', session: 'PM' },
];

/* ---- DERIVED GRADE / trial exams (Sept 2026), from the CAA & DGE Timetable ---- */
export const derivedExams = [
  { subject: 'english',             paper: '13ENGLISH (all courses)',     date: '2026-09-10T13:00', session: 'PM' },
  { subject: 'biology',             paper: '13BIO',                        date: '2026-09-11T09:00', session: 'AM' },
  { subject: 'chemistry',           paper: '13CHE',                        date: '2026-09-11T13:00', session: 'PM' },
  { subject: 'statistics',          paper: '13MAS',                        date: '2026-09-14T09:00', session: 'AM' },
  { subject: 'calculus',            paper: '13MAC',                        date: '2026-09-16T09:00', session: 'AM' },
  { subject: 'physics',             paper: '13PHY (2 hr)',                 date: '2026-09-16T13:00', session: 'PM' },
  /* ---- The rest, from the same Wellington College CAA & DGE sheet. Class
     codes are the school's, e.g. Classical Studies sits as 13CLS. */
  { subject: 'classics',   paper: '13CLS',                date: '2026-09-09T09:00', session: 'AM' },
  { subject: 'music',      paper: '13MUC + 13MUS',        date: '2026-09-09T13:00', session: 'PM' },
  { subject: 'visualarts', paper: '13ART',                date: '2026-09-09T13:00', session: 'PM' },
  { subject: 'accounting', paper: '13ACC (Te Kura DGE)',  date: '2026-09-11T09:00', session: 'AM' },
  { subject: 'dvc',        paper: '13DVC',                date: '2026-09-11T09:00', session: 'AM' },
  { subject: 'german',     paper: '13GER',                date: '2026-09-11T13:00', session: 'PM' },
  { subject: 'health',     paper: '13HEA',                date: '2026-09-11T13:00', session: 'PM' },
  { subject: 'japanese',   paper: '13JAP',                date: '2026-09-14T09:00', session: 'AM' },
  { subject: 'chinese',    paper: '13CHI',                date: '2026-09-14T13:00', session: 'PM' },
  { subject: 'history',    paper: '13HIS',                date: '2026-09-14T13:00', session: 'PM' },
  { subject: 'business',   paper: '13BUS',                date: '2026-09-15T09:00', session: 'AM' },
  { subject: 'digitech',   paper: '13DTG',                date: '2026-09-15T09:00', session: 'AM' },
  { subject: 'media',      paper: '13MES',                date: '2026-09-16T09:00', session: 'AM' },
  { subject: 'french',     paper: '13FRE',                date: '2026-09-17T09:00', session: 'AM' },
  { subject: 'geography',  paper: '13GEO',                date: '2026-09-17T09:00', session: 'AM' },
  { subject: 'spanish',    paper: '13SPA',                date: '2026-09-17T09:00', session: 'AM' },
  { subject: 'drama',      paper: '13DRA',                date: '2026-09-18T09:00', session: 'AM' },
  { subject: 'economics',  paper: '13ECO',                date: '2026-09-18T09:00', session: 'AM' },
  { subject: 'temaori',    paper: '13MAO',                date: '2026-09-18T09:00', session: 'AM' },
];

/* ---- ADDING ANOTHER SUBJECT'S SITTINGS -------------------------------------
   Only the six subjects above have real dates, because those are the only ones
   the school's 2026 sheets covered. Every OTHER subject in
   data/nzqa-catalogue.js works end to end already, it just has no sitting yet:
   add it on Progress & credits and it appears on the Assessments page marked
   "date to be confirmed", and it starts appearing on the calendar, in What's
   coming and on the exam timetable the moment a row is added here.

   To add one, copy the shape above:

     externalExams.push({ subject: 'economics',
                          standards: 'AS 91399 · 91400',
                          date: '2026-11-18T09:30', session: 'AM' });

   `subject` must be the subject id used across the site (see data/subjects.js
   and SUBJECT_OF_GROUP in js/assessments.js), NOT the class code.

   ⚠️ Times are fixed by NZQA convention, not by the school: morning sessions
   start 9:30am, afternoon sessions 2:00pm. Derived-grade sittings are set by
   the school and follow its own 9:00am / 1:00pm pattern.

   ⚠️ DO NOT GUESS THESE. They are real exam dates a student will plan around.
   Take them from the school's timetable sheet or the published NZQA
   examination timetable for the year. */

/* Back-compat: some views import `exams` = the real external list. */
export const exams = externalExams.map(e => ({ ...e, paper: `${e.standards}` }));

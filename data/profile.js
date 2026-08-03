/* ============================================================================
   profile.js — WHO this copy of the study hub belongs to.
   ----------------------------------------------------------------------------
   If you are handing this site to another student, this is the first file to
   edit — and one of only four that carry anything personal at all:

     data/profile.js   ← you are here: name, school, year
     data/results.js   ← their NZQA Record of Learning (every standard + status)
     data/exams.js     ← their external + derived-grade timetables
     data/planner.js   ← their school's term dates (only affects "Term 3, Week 4"
                         style rough deadlines)

   EVERYTHING ELSE IS GENERIC. The ~756 KB of teaching content, all 570
   flashcards, all 301 questions, the whole app — none of it knows whose copy it
   is. A student taking different subjects doesn't even have to delete anything:
   enrolment is derived from data/results.js, so a subject with no rows on their
   record drops out of the sidebar, dashboard, exam tables and calendar by
   itself (see enrolledSubjects in js/registry.js).

   👉 SETUP.md is the step-by-step checklist for handing this on.
   ========================================================================== */

export const profile = {
  /* Shown in the dashboard greeting. Use whatever they want to be called. */
  name: 'Chey',

  /* Used only in explanatory copy (e.g. "dates from your school timetable"). */
  school: 'Wellington College',

  /* The NCEA year this copy is set up for. Shown in the sidebar. */
  year: 2026,
  level: 'NCEA Level 3',
};

/** Greeting name, with a safe fallback if the profile is left blank. */
export function displayName() {
  return (profile.name || '').trim() || 'there';
}

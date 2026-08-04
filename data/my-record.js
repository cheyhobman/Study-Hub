/* ============================================================================
   my-record.js: ONE STUDENT'S personal results. Not shipped as the default.
   ----------------------------------------------------------------------------
   data/results.js is the COURSE STRUCTURE: which standards exist for the six
   subjects, what they are worth, and whether they are internal or external.
   That part is the same for every Year 13 student at the school, so it ships as
   the default and a new visitor sees it with every credit blank.

   THIS file is the part that is personal: which standards have been passed,
   at what grade, and which are being re-sat. It is deliberately NOT applied
   automatically. A new user gets a blank slate; the owner of a copy loads their
   own record with one click on the Progress page ("Load my NZQA record"), which
   writes these values into localStorage as ordinary edits they can then change.

   👉 Handing this site to someone else? Empty PERSONAL_RECORD to {} and clear
      PERSONAL_QUALIFICATION, or just delete this file's contents. Nothing
      breaks: the app already treats a missing record as "nothing entered yet".

   Keys are `group:code`, matching the rows in results.js. Values use the credit
   record vocabulary: status 'achieved' | 'pending' | 'external' | 'todo' |
   'notassessed', an optional grade 'A' | 'M' | 'E', and resit: true for a
   standard already banked but being re-sat to lift the grade.
   ========================================================================== */

export const PERSONAL_RECORD = {
  '13CHE:3.1': { status: 'pending' },
  '13CHE:3.2': { status: 'todo' },
  '13CHE:3.4': { status: 'external' },
  '13CHE:3.5': { status: 'external' },
  '13CHE:3.6': { status: 'external' },
  '13CHE:3.7': { status: 'achieved', grade: 'E' },
  '13PHY:3.1': { status: 'pending' },
  '13PHY:3.3': { status: 'external' },
  '13PHY:3.4': { status: 'external' },
  '13PHY:3.5': { status: 'todo' },
  '13PHY:3.6': { status: 'external' },
  '13MAC:3.5': { status: 'achieved', grade: 'A', resit: true },
  '13MAC:3.6': { status: 'achieved', grade: 'A', resit: true },
  '13MAC:3.7': { status: 'achieved', grade: 'A', resit: true },
  '13MAC:3.3': { status: 'achieved', grade: 'E' },
  '13MAC:3.15': { status: 'achieved', grade: 'E' },
  '13MAC:3.2': { status: 'achieved', grade: 'E' },
  '13MAS:3.9': { status: 'achieved', grade: 'M' },
  '13MAS:3.10': { status: 'todo' },
  '13MAS:3.12': { status: 'external' },
  '13MAS:3.13': { status: 'external' },
  '13MAS:3.14': { status: 'external' },
  '13BIO:3.2': { status: 'todo' },
  '13BIO:3.3': { status: 'external' },
  '13BIO:3.4': { status: 'achieved', grade: 'E' },
  '13BIO:3.5': { status: 'external' },
  '13BIO:3.6': { status: 'external' },
  '13ENU:3.1': { status: 'external' },
  '13ENU:3.2': { status: 'external' },
  '13ENU:3.3': { status: 'notassessed' },
  '13ENU:3.4': { status: 'achieved', grade: 'E' },
  '13ENU:3.7': { status: 'todo' },
  '13ENU:3.9': { status: 'todo' },
};

/* The headline panel off the NZQA record: credits by level, literacy and
   numeracy. Blank for a new user (see qualification in results.js); these are
   the owner's real figures, applied by the same one-click load. */
export const PERSONAL_QUALIFICATION = {
  asAt: '2026-08-01',
  highestAwarded: 'Level 2 (NZQA 2025)',
  numeracy: { required: 10, have: 10, met: true, awarded: 'NZQA 2023' },
  literacy: { required: 10, have: 10, met: true, awarded: 'NZQA 2023' },
  ueLiteracy: { required: 10, met: true, awarded: 'NZQA 2025', read: 13, write: 12, readOrWrite: 8 },
  byLevel: [
    { level: 3, na: 0, a: 17, m: 4, e: 22, total: 43, attempted: 43 },
    { level: 2, na: 4, a: 14, m: 45, e: 56, total: 115, attempted: 119 },
    { level: 1, na: 0, a: 10, m: 12, e: 7, total: 29, attempted: 29 },
  ],
};

/* The internals this student had under way, with their planner statuses.
   Loaded by the same button. Course DUE DATES are generic and stay in
   data/planner.js (SEED_DATES); only the statuses here are personal. */
export const PERSONAL_INTERNAL_STATUS = {
  '13CHE:3.1':  'submitted',
  '13PHY:3.1':  'submitted',
  '13PHY:3.5':  'inprogress',
  '13CHE:3.2':  'inprogress',
  '13ENU:3.9':  'inprogress',
  '13MAS:3.10': 'inprogress',
  '13BIO:3.2':  'notstarted',
  '13ENU:3.7':  'notstarted',
};

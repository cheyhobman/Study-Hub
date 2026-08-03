/* ============================================================================
   results.js: Chey's REAL NZQA Record of Learning (transcribed 1 Aug 2026).
   ----------------------------------------------------------------------------
   This seeds the Progress page so credit totals are accurate out of the box.
   Anything you change on that page is saved as an override in localStorage and
   takes precedence over the values here.

   status values:
     'achieved', credits banked (grade: 'A' | 'M' | 'E')
     'external', sitting it in the November externals (no credits yet)
     'notassessed', entered but Standard Not Assessed (no credits, not pursuing)
     'na', Not Applicable on the record

   `resit: true`. Already achieved, but being re-sat this year to improve the
                    grade. Credits are already banked, so a resit can only
                    raise the grade, never lose the credits.

   ⚠️ The `as` (achievement standard) numbers are filled in for the standards
   this site teaches. A few standards on your record sit outside those subjects
   (e.g. Maths 3.2 / 3.3 / 3.15, Biology 3.4, the extra English standards). Their AS numbers are left blank rather than guessed. Add them if you want.
   ========================================================================== */

/* ---- Headline qualification status (from the summary panel) ---- */
export const qualification = {
  asAt: '2026-08-01',
  workingTowards: 'Level 3',
  highestAwarded: 'Level 2 (NZQA 2025)',
  numeracy: { required: 10, have: 10, met: true, awarded: 'NZQA 2023' },
  literacy: { required: 10, have: 10, met: true, awarded: 'NZQA 2023' },
  ueLiteracy: {
    required: 10, met: true, awarded: 'NZQA 2025',
    read: 13, write: 12, readOrWrite: 8,
  },
  /* Credit summary by level, straight off the record. */
  byLevel: [
    { level: 3, na: 0, a: 17, m: 4, e: 22, total: 43, attempted: 43 },
    { level: 2, na: 4, a: 14, m: 45, e: 56, total: 115, attempted: 119 },
    { level: 1, na: 0, a: 10, m: 12, e: 7, total: 29, attempted: 29 },
  ],
  /* NCEA Level 3 certificate needs 60 credits at L3 + 20 at L2 or above. */
  l3Required: 60,
};

/* ---- Every Level 3 standard on the record ---- */
export const results = [
  /* ============================== 13CHE ============================== */
  { group: '13CHE', subject: 'Chemistry', code: '3.1', as: '91387', topicId: 'chem-91387',
    title: 'Carry out an investigation in chemistry involving quantitative analysis',
    credits: 4, status: 'pending', assess: 'Internal' },
  { group: '13CHE', subject: 'Chemistry', code: '3.2', as: '91388', topicId: 'chem-91388',
    title: 'Demonstrate understanding of spectroscopic data in chemistry',
    credits: 3, status: 'todo', assess: 'Internal' },
  { group: '13CHE', subject: 'Chemistry', code: '3.4', as: '91390', topicId: 'chem-91390',
    title: 'Thermochemical principles and the properties of particles and substances',
    credits: 4, status: 'external', assess: 'External' },
  { group: '13CHE', subject: 'Chemistry', code: '3.5', as: '91391', topicId: 'chem-91391',
    title: 'The properties of organic compounds',
    credits: 5, status: 'external', assess: 'External' },
  { group: '13CHE', subject: 'Chemistry', code: '3.6', as: '91392', topicId: 'chem-91392',
    title: 'Equilibrium principles in aqueous systems',
    credits: 5, status: 'external', assess: 'External' },
  { group: '13CHE', subject: 'Chemistry', code: '3.7', as: '91393', topicId: 'chem-91393',
    title: 'Oxidation-reduction processes',
    credits: 3, status: 'achieved', grade: 'E', assess: 'Internal' },

  /* ============================== 13PHY ============================== */
  { group: '13PHY', subject: 'Physics', code: '3.1', as: '91521', topicId: 'phys-91521',
    title: 'Carry out a practical investigation (non-linear relationship)',
    credits: 4, status: 'pending', assess: 'Internal' },
  { group: '13PHY', subject: 'Physics', code: '3.3', as: '91523', topicId: 'phys-91523',
    title: 'Wave systems', credits: 4, status: 'external', assess: 'External' },
  { group: '13PHY', subject: 'Physics', code: '3.4', as: '91524', topicId: 'phys-91524',
    title: 'Mechanical systems', credits: 6, status: 'external', assess: 'External' },
  { group: '13PHY', subject: 'Physics', code: '3.5', as: '91525', topicId: 'phys-91525',
    title: 'Modern Physics (atoms, photons, spectra)', credits: 3, status: 'todo', assess: 'Internal' },
  { group: '13PHY', subject: 'Physics', code: '3.6', as: '91526', topicId: 'phys-91526',
    title: 'Electrical systems', credits: 6, status: 'external', assess: 'External' },

  /* ============================== 13MAC (Calculus) ==================== */
  /* ⚠️ 3.5 / 3.6 / 3.7 are already ACHIEVED. The credits are banked. Chey is
     re-sitting these three externals in Nov 2026 to lift the grade. */
  { group: '13MAC', subject: 'Calculus', code: '3.5', as: '91577', topicId: 'calc-91577',
    title: 'Apply the algebra of complex numbers in solving problems',
    credits: 5, status: 'achieved', grade: 'A', resit: true, assess: 'External' },
  { group: '13MAC', subject: 'Calculus', code: '3.6', as: '91578', topicId: 'calc-91578',
    title: 'Apply differentiation methods in solving problems',
    credits: 6, status: 'achieved', grade: 'A', resit: true, assess: 'External' },
  { group: '13MAC', subject: 'Calculus', code: '3.7', as: '91579', topicId: 'calc-91579',
    title: 'Apply integration methods in solving problems',
    credits: 6, status: 'achieved', grade: 'A', resit: true, assess: 'External' },
  { group: '13MAC', subject: 'Calculus', code: '3.3', as: '', topicId: null,
    title: 'Apply trigonometric methods in solving problems',
    credits: 4, status: 'achieved', grade: 'E', assess: 'Internal' },
  { group: '13MAC', subject: 'Calculus', code: '3.15', as: '', topicId: null,
    title: 'Apply systems of simultaneous equations in solving problems',
    credits: 3, status: 'achieved', grade: 'E', assess: 'Internal' },
  { group: '13MAC', subject: 'Calculus', code: '3.2', as: '', topicId: null,
    title: 'Apply linear programming methods in solving problems',
    credits: 3, status: 'achieved', grade: 'E', assess: 'Internal' },

  /* ============================== 13MAS (Statistics) ================== */
  { group: '13MAS', subject: 'Statistics', code: '3.9', as: '91581', topicId: null,
    title: 'Investigate bivariate measurement data',
    credits: 4, status: 'achieved', grade: 'M', assess: 'Internal' },
  { group: '13MAS', subject: 'Statistics', code: '3.10', as: '91582', topicId: 'stat-91582',
    title: 'Use statistical methods to make a formal inference',
    credits: 4, status: 'todo', assess: 'Internal' },
  { group: '13MAS', subject: 'Statistics', code: '3.12', as: '91584', topicId: 'stat-91584',
    title: 'Evaluate statistically based reports', credits: 4, status: 'external', assess: 'External' },
  { group: '13MAS', subject: 'Statistics', code: '3.13', as: '91585', topicId: 'stat-91585',
    title: 'Apply probability concepts in solving problems', credits: 4, status: 'external', assess: 'External' },
  { group: '13MAS', subject: 'Statistics', code: '3.14', as: '91586', topicId: 'stat-91586',
    title: 'Apply probability distributions in solving problems', credits: 4, status: 'external', assess: 'External' },

  /* ============================== 13BIO ============================== */
  { group: '13BIO', subject: 'Biology', code: '3.2', as: '91602', topicId: 'bio-91602',
    title: 'Integrate biological knowledge: socio-scientific issue',
    credits: 3, status: 'todo', assess: 'Internal' },
  { group: '13BIO', subject: 'Biology', code: '3.3', as: '91603', topicId: 'bio-91603',
    title: 'Responses of plants and animals to their external environment',
    credits: 5, status: 'external', assess: 'External' },
  { group: '13BIO', subject: 'Biology', code: '3.4', as: '', topicId: null,
    title: 'How an animal maintains a stable internal environment',
    credits: 3, status: 'achieved', grade: 'E', assess: 'Internal' },
  { group: '13BIO', subject: 'Biology', code: '3.5', as: '91605', topicId: 'bio-91605',
    title: 'Evolutionary processes leading to speciation',
    credits: 4, status: 'external', assess: 'External' },
  { group: '13BIO', subject: 'Biology', code: '3.6', as: '91606', topicId: 'bio-91606',
    title: 'Trends in human evolution', credits: 4, status: 'external', assess: 'External' },

  /* ============================== 13ENU ============================== */
  { group: '13ENU', subject: 'English', code: '3.1', as: '91472', topicId: 'eng-91472',
    title: 'Respond critically to studied written text(s)', credits: 4, status: 'external', assess: 'External' },
  { group: '13ENU', subject: 'English', code: '3.2', as: '91473', topicId: 'eng-91473',
    title: 'Respond critically to studied visual or oral text(s)', credits: 4, status: 'external', assess: 'External' },
  /* Unfamiliar texts, on the English programme but NOT being sat this year.
     Marked 'notassessed' so it appears on the record (and can be switched on
     later from the Progress page) without its credits counting anywhere. */
  { group: '13ENU', subject: 'English', code: '3.3', as: '91474', topicId: null,
    title: 'Respond critically to unfamiliar written texts through close reading',
    credits: 4, status: 'notassessed', assess: 'External' },
  { group: '13ENU', subject: 'English', code: '3.4', as: '91475', topicId: null,
    title: 'Produce a selection of fluent and coherent writing',
    credits: 6, status: 'achieved', grade: 'E', assess: 'Internal' },
  { group: '13ENU', subject: 'English', code: '3.7', as: '91478', topicId: 'eng-3-7',
    title: 'Respond critically to significant connections across texts',
    credits: 4, status: 'todo', assess: 'Internal' },
  { group: '13ENU', subject: 'English', code: '3.9', as: '91480', topicId: 'eng-3-9',
    title: 'Respond critically to visual and/or oral text(s) through close reading',
    credits: 3, status: 'todo', assess: 'Internal' },

];

/* Quick lookup by topicId for anything the site teaches. */
export const resultByTopic = Object.fromEntries(
  results.filter(r => r.topicId).map(r => [r.topicId, r])
);

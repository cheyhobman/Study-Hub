/* ============================================================================
   results.js: the COURSE STRUCTURE for the six Level 3 subjects.
   ----------------------------------------------------------------------------
   ⚠️ THERE IS NOTHING PERSONAL IN THIS FILE. It lists which standards exist,
   what each is worth, and whether it is internally or externally assessed. That
   is identical for every Year 13 student taking these subjects, so it ships as
   the default and a NEW VISITOR SEES EVERY CREDIT BLANK: internals read "still
   to do", externals read "sitting it", nothing is graded and nothing is a
   re-sit. They configure their own record from the Progress page.

   One student's actual results live in data/my-record.js and are applied only
   when they click "Load my NZQA record". See that file before handing this site
   to someone else.

   status values used here:
     'todo'      an internal not started yet          (every internal, by default)
     'external'  sitting it in the November externals (every external, by default)

   The full vocabulary the app understands, once a student starts editing:
     'achieved'    credits banked (with grade 'A' | 'M' | 'E')
     'pending'     handed in, awaiting a result
     'notassessed' entered but Standard Not Assessed
     'na'          Not Applicable on the record
     resit: true   already banked, being re-sat to lift the grade

   ⚠️ The `as` (achievement standard) numbers are filled in for the standards
   this site teaches. A few standards sit outside those subjects (e.g. Maths
   3.2 / 3.3 / 3.15, Biology 3.4, the extra English standards). Their AS numbers
   are left blank rather than guessed.
   ========================================================================== */

/* ---- Headline qualification status (from the summary panel) ---- */
export const qualification = {
  /* Blank by default. A new user has entered nothing, so the headline panel
     shows zeros until they either type their own figures on the Progress page
     or load a personal record from data/my-record.js. l3Required is the only
     genuinely fixed value here: 60 credits at Level 3 is the NCEA rule, not
     anybody's result. */
  asAt: null,
  workingTowards: 'Level 3',
  highestAwarded: null,
  numeracy: { required: 10, have: 0, met: false, awarded: null },
  literacy: { required: 10, have: 0, met: false, awarded: null },
  ueLiteracy: {
    required: 10, met: false, awarded: null,
    read: 0, write: 0, readOrWrite: 0,
  },
  byLevel: [
    { level: 3, na: 0, a: 0, m: 0, e: 0, total: 0, attempted: 0 },
    { level: 2, na: 0, a: 0, m: 0, e: 0, total: 0, attempted: 0 },
    { level: 1, na: 0, a: 0, m: 0, e: 0, total: 0, attempted: 0 },
  ],
  /* NCEA Level 3 certificate needs 60 credits at L3 + 20 at L2 or above. */
  l3Required: 60,
};

/* ---- Every Level 3 standard on the record ---- */
export const results = [
  /* ============================== 13CHE ============================== */
  { group: '13CHE', subject: 'Chemistry', code: '3.1', as: '91387', topicId: 'chem-91387',
    title: 'Carry out an investigation in chemistry involving quantitative analysis',
    credits: 4, status: 'todo', assess: 'Internal' },
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
    credits: 3, status: 'todo', assess: 'Internal' },

  /* ============================== 13PHY ============================== */
  { group: '13PHY', subject: 'Physics', code: '3.1', as: '91521', topicId: 'phys-91521',
    title: 'Carry out a practical investigation (non-linear relationship)',
    credits: 4, status: 'todo', assess: 'Internal' },
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
    credits: 5, status: 'external', assess: 'External' },
  { group: '13MAC', subject: 'Calculus', code: '3.6', as: '91578', topicId: 'calc-91578',
    title: 'Apply differentiation methods in solving problems',
    credits: 6, status: 'external', assess: 'External' },
  { group: '13MAC', subject: 'Calculus', code: '3.7', as: '91579', topicId: 'calc-91579',
    title: 'Apply integration methods in solving problems',
    credits: 6, status: 'external', assess: 'External' },
  { group: '13MAC', subject: 'Calculus', code: '3.3', as: '', topicId: null,
    title: 'Apply trigonometric methods in solving problems',
    credits: 4, status: 'todo', assess: 'Internal' },
  { group: '13MAC', subject: 'Calculus', code: '3.15', as: '', topicId: null,
    title: 'Apply systems of simultaneous equations in solving problems',
    credits: 3, status: 'todo', assess: 'Internal' },
  { group: '13MAC', subject: 'Calculus', code: '3.2', as: '', topicId: null,
    title: 'Apply linear programming methods in solving problems',
    credits: 3, status: 'todo', assess: 'Internal' },

  /* ============================== 13MAS (Statistics) ================== */
  { group: '13MAS', subject: 'Statistics', code: '3.9', as: '91581', topicId: null,
    title: 'Investigate bivariate measurement data',
    credits: 4, status: 'todo', assess: 'Internal' },
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
    credits: 3, status: 'todo', assess: 'Internal' },
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
    credits: 4, status: 'external', assess: 'External' },
  { group: '13ENU', subject: 'English', code: '3.4', as: '91475', topicId: null,
    title: 'Produce a selection of fluent and coherent writing',
    credits: 6, status: 'todo', assess: 'Internal' },
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

/* ============================================================================
   nzqa-catalogue.js: nCEA Level 3 achievement standards for subjects this
   site does NOT teach.
   ----------------------------------------------------------------------------
   PURPOSE: credit counting and deadline tracking only. There is deliberately
   no teaching content here. A student taking Economics or Te Reo Māori can
   still get an accurate credit total, rank score, ATAR estimate and calendar
   without this site pretending to teach those subjects.

   ✅ VERIFIED against NZQA on 3 Aug 2026, subject by subject, via
      nzqa.govt.nz/ncea/assessment/search.do (Level 3, achievement standards).
      Standard numbers, exact titles, credit values and internal/external
      status all come from that source, not from memory.

      The first draft of this file was written from general knowledge and was
      wrong in 19 of 25 subjects, whole standards missing, numbers shifted by
      one, internals listed as externals. That is why it is now checked rather
      than trusted, and why any future addition must be verified the same way
      before its `verified: true` flag goes on.

   ⚠️ NZQA does revise standards between years. If a value here disagrees with
      your course outline, trust your school and edit the row inline on the
      Progress page. Your edit is saved and always beats this file.

   SHAPE. Each standard is:
     { code, as, title, credits, assess: 'Internal' | 'External' }
   `code` is the conventional 3.x subject code where one is in common use.
   `group` is the class-code style label the credit tracker groups by.
   ========================================================================== */

export const catalogue = [
  /* ======================================================= COMMERCE */
  {
    id: 'economics', name: 'Economics', group: '13ECO', icon: '📈', area: 'Commerce',
    standards: [
      { code: '3.1', as: '91399', title: 'Demonstrate understanding of the efficiency of market equilibrium', credits: 4, assess: 'External' },
      { code: '3.2', as: '91400', title: 'Demonstrate understanding of the efficiency of different market structures using marginal analysis', credits: 4, assess: 'External' },
      { code: '3.3', as: '91401', title: 'Demonstrate understanding of micro-economic concepts', credits: 5, assess: 'Internal' },
      { code: '3.4', as: '91402', title: 'Demonstrate understanding of government interventions where the market fails to deliver efficient or equitable outcomes', credits: 5, assess: 'Internal' },
      { code: '3.5', as: '91403', title: 'Demonstrate understanding of macro-economic influences on the New Zealand economy', credits: 6, assess: 'External' },
    ],
  },
  {
    id: 'accounting', name: 'Accounting', group: '13ACC', icon: '🧾', area: 'Commerce',
    standards: [
      { code: '3.1', as: '91404', title: 'Demonstrate understanding of accounting concepts for a New Zealand reporting entity', credits: 4, assess: 'External' },
      { code: '3.2', as: '91405', title: 'Demonstrate understanding of accounting for partnerships', credits: 4, assess: 'Internal' },
      { code: '3.3', as: '91406', title: 'Demonstrate understanding of company financial statement preparation', credits: 5, assess: 'External' },
      { code: '3.4', as: '91407', title: 'Prepare a report for an external user that interprets the annual report of a New Zealand reporting entity', credits: 5, assess: 'Internal' },
      { code: '3.5', as: '91408', title: 'Demonstrate understanding of management accounting to inform decision-making', credits: 4, assess: 'External' },
      { code: '3.6', as: '91409', title: 'Demonstrate understanding of a job cost subsystem for an entity', credits: 4, assess: 'Internal' },
    ],
  },
  {
    id: 'business', name: 'Business Studies', group: '13BUS', icon: '💼', area: 'Commerce',
    standards: [
      { code: '3.1', as: '91379', title: 'Demonstrate understanding of how internal factors interact within a business that operates in a global context', credits: 4, assess: 'External' },
      { code: '3.2', as: '91380', title: 'Demonstrate understanding of strategic response to external factors by a business that operates in a global context', credits: 4, assess: 'External' },
      { code: '3.3', as: '91381', title: 'Apply business knowledge to address a complex problem(s) in a given global business context', credits: 4, assess: 'External' },
      { code: '3.4', as: '91382', title: 'Develop a marketing plan for a new or existing product', credits: 6, assess: 'Internal' },
      { code: '3.5', as: '91383', title: 'Analyse a human resource issue affecting businesses', credits: 3, assess: 'Internal' },
      { code: '3.6', as: '91384', title: 'Carry out, with consultation, an innovative and sustainable business activity', credits: 9, assess: 'Internal' },
      { code: '3.7', as: '91385', title: 'Investigate the exporting potential of a New Zealand business in a market, with consultation', credits: 3, assess: 'Internal' },
    ],
  },

  /* ======================================================= SOCIAL SCIENCES */
  {
    id: 'history', name: 'History', group: '13HIS', icon: '📜', area: 'Social sciences',
    standards: [
      { code: '3.1', as: '91434', title: 'Research an historical event or place of significance to New Zealanders, using primary and secondary sources', credits: 5, assess: 'Internal' },
      { code: '3.2', as: '91435', title: 'Analyse an historical event, or place, of significance to New Zealanders', credits: 5, assess: 'Internal' },
      { code: '3.3', as: '91436', title: 'Analyse evidence relating to an historical event of significance to New Zealanders', credits: 4, assess: 'External' },
      { code: '3.4', as: '91437', title: 'Analyse different perspectives of a contested event of significance to New Zealanders', credits: 5, assess: 'Internal' },
      { code: '3.5', as: '91438', title: 'Analyse the causes and consequences of a significant historical event', credits: 6, assess: 'External' },
      { code: '3.6', as: '91439', title: 'Analyse a significant historical trend and the force(s) that influenced it', credits: 6, assess: 'External' },
    ],
  },
  {
    id: 'geography', name: 'Geography', group: '13GEO', icon: '🗺️', area: 'Social sciences',
    standards: [
      { code: '3.1', as: '91426', title: 'Demonstrate understanding of how interacting natural processes shape a New Zealand geographic environment', credits: 4, assess: 'External' },
      { code: '3.2', as: '91427', title: 'Demonstrate understanding of how a cultural process shapes geographic environment(s)', credits: 4, assess: 'External' },
      { code: '3.3', as: '91428', title: 'Analyse a significant contemporary event from a geographic perspective', credits: 3, assess: 'Internal' },
      { code: '3.4', as: '91429', title: 'Demonstrate understanding of a given environment(s) through selection and application of geographic concepts and skills', credits: 4, assess: 'External' },
      { code: '3.5', as: '91430', title: 'Conduct geographic research with consultation', credits: 5, assess: 'Internal' },
      { code: '3.6', as: '91431', title: 'Analyse aspects of a contemporary geographic issue', credits: 3, assess: 'Internal' },
      { code: '3.7', as: '91432', title: 'Analyse aspects of a geographic topic at a global scale', credits: 3, assess: 'Internal' },
      { code: '3.8', as: '91433', title: 'Apply spatial analysis, with consultation, to solve a geographic problem', credits: 3, assess: 'Internal' },
    ],
  },
  {
    id: 'classics', name: 'Classical Studies', group: '13CLA', icon: '🏛️', area: 'Social sciences',
    standards: [
      { code: '3.1', as: '91394', title: 'Analyse ideas and values of the classical world', credits: 4, assess: 'External' },
      { code: '3.2', as: '91395', title: 'Analyse the significance of a work(s) of art in the classical world', credits: 4, assess: 'External' },
      { code: '3.3', as: '91396', title: 'Analyse the impact of a significant historical figure on the classical world', credits: 6, assess: 'External' },
      { code: '3.4', as: '91397', title: 'Demonstrate understanding of significant ideology(ies) in the classical world', credits: 6, assess: 'Internal' },
      { code: '3.5', as: '91398', title: 'Demonstrate understanding of the lasting influences of the classical world on other cultures across time', credits: 6, assess: 'Internal' },
    ],
  },
  {
    id: 'media', name: 'Media Studies', group: '13MED', icon: '🎬', area: 'Social sciences',
    standards: [
      { code: '3.1', as: '91490', title: 'Demonstrate understanding of an aspect of a media industry', credits: 4, assess: 'External' },
      { code: '3.2', as: '91491', title: 'Demonstrate understanding of the meaning of a media text through different readings', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91492', title: 'Demonstrate understanding of the media representation of an aspect of New Zealand culture or society', credits: 3, assess: 'Internal' },
      { code: '3.4', as: '91493', title: 'Demonstrate understanding of a relationship between a media genre and society', credits: 4, assess: 'External' },
      { code: '3.5', as: '91494', title: 'Produce a design for a media product that meets the requirements of a brief', credits: 4, assess: 'Internal' },
      { code: '3.6', as: '91495', title: 'Produce a media product to meet the requirements of a brief', credits: 6, assess: 'Internal' },
      { code: '3.7', as: '91496', title: 'Demonstrate understanding of a significant development in the media', credits: 3, assess: 'Internal' },
      { code: '3.8', as: '91497', title: 'Write a media text to meet the requirements of a brief', credits: 3, assess: 'Internal' },
    ],
  },

  /* ======================================================= LANGUAGES
     The L3 second-language standards share one five-standard pattern; only the
     AS numbers and the language name change. Each block below was checked
     individually, because the numbering is NOT evenly spaced between languages. */
  {
    id: 'temaori', name: 'Te Reo Māori', group: '13MAO', icon: '🌿', area: 'Languages',
    standards: [
      { code: '3.1', as: '91650', title: 'Whakarongo kia mōhio ki te reo Māori o te ao whānui', credits: 4, assess: 'Internal' },
      { code: '3.2', as: '91651', title: 'Kōrero kia whakamahi i te reo Māori o te ao whānui', credits: 6, assess: 'Internal' },
      { code: '3.3', as: '91652', title: 'Pānui kia mōhio ki te reo Māori o te ao whānui', credits: 6, assess: 'External' },
      { code: '3.4', as: '91653', title: 'Tuhi i te reo Māori o te ao whānui', credits: 6, assess: 'External' },
      { code: '3.5', as: '91654', title: 'Waihanga tuhinga whai take i te reo Māori o te ao whānui', credits: 6, assess: 'Internal' },
    ],
  },
  {
    id: 'french', name: 'French', group: '13FRE', icon: '🇫🇷', area: 'Languages',
    standards: [
      { code: '3.1', as: '91543', title: 'Demonstrate understanding of a variety of extended spoken French texts', credits: 5, assess: 'External' },
      { code: '3.2', as: '91544', title: 'Give a clear spoken presentation in French that communicates a critical response to stimulus material', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91545', title: 'Interact clearly using spoken French to explore and justify varied ideas and perspectives in different situations', credits: 6, assess: 'Internal' },
      { code: '3.4', as: '91546', title: 'Demonstrate understanding of a variety of extended written and/or visual French texts', credits: 5, assess: 'External' },
      { code: '3.5', as: '91547', title: 'Write a variety of text types in clear French to explore and justify varied ideas and perspectives', credits: 5, assess: 'Internal' },
    ],
  },
  {
    id: 'german', name: 'German', group: '13GER', icon: '🇩🇪', area: 'Languages',
    standards: [
      { code: '3.1', as: '91548', title: 'Demonstrate understanding of a variety of extended spoken German texts', credits: 5, assess: 'External' },
      { code: '3.2', as: '91549', title: 'Give a clear spoken presentation in German that communicates a critical response to stimulus material', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91550', title: 'Interact clearly using spoken German to explore and justify varied ideas and perspectives in different situations', credits: 6, assess: 'Internal' },
      { code: '3.4', as: '91551', title: 'Demonstrate understanding of a variety of extended written and/or visual German texts', credits: 5, assess: 'External' },
      { code: '3.5', as: '91552', title: 'Write a variety of text types in clear German to explore and justify varied ideas and perspectives', credits: 5, assess: 'Internal' },
    ],
  },
  {
    id: 'japanese', name: 'Japanese', group: '13JPN', icon: '🇯🇵', area: 'Languages',
    standards: [
      { code: '3.1', as: '91553', title: 'Demonstrate understanding of a variety of extended spoken Japanese texts', credits: 5, assess: 'External' },
      { code: '3.2', as: '91554', title: 'Give a clear spoken presentation in Japanese that communicates a critical response to stimulus material', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91555', title: 'Interact clearly using spoken Japanese to explore and justify varied ideas and perspectives in different situations', credits: 6, assess: 'Internal' },
      { code: '3.4', as: '91556', title: 'Demonstrate understanding of a variety of extended written and/or visual Japanese texts', credits: 5, assess: 'External' },
      { code: '3.5', as: '91557', title: 'Write a variety of text types in clear Japanese to explore and justify varied ideas and perspectives', credits: 5, assess: 'Internal' },
    ],
  },
  {
    id: 'chinese', name: 'Chinese', group: '13CHI', icon: '🇨🇳', area: 'Languages',
    standards: [
      { code: '3.1', as: '91533', title: 'Demonstrate understanding of a variety of extended spoken Chinese texts', credits: 5, assess: 'External' },
      { code: '3.2', as: '91534', title: 'Give a clear spoken presentation in Chinese that communicates a critical response to stimulus material', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91535', title: 'Interact clearly using spoken Chinese to explore and justify varied ideas and perspectives in different situations', credits: 6, assess: 'Internal' },
      { code: '3.4', as: '91536', title: 'Demonstrate understanding of a variety of extended written and/or visual Chinese texts', credits: 5, assess: 'External' },
      { code: '3.5', as: '91537', title: 'Write a variety of text types in clear Chinese to explore and justify varied ideas and perspectives', credits: 5, assess: 'Internal' },
    ],
  },
  {
    id: 'spanish', name: 'Spanish', group: '13SPA', icon: '🇪🇸', area: 'Languages',
    standards: [
      { code: '3.1', as: '91568', title: 'Demonstrate understanding of a variety of extended spoken Spanish texts', credits: 5, assess: 'External' },
      { code: '3.2', as: '91569', title: 'Give a clear spoken presentation in Spanish that communicates a critical response to stimulus material', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91570', title: 'Interact clearly using spoken Spanish to explore and justify varied ideas and perspectives in different situations', credits: 6, assess: 'Internal' },
      { code: '3.4', as: '91571', title: 'Demonstrate understanding of a variety of extended written and/or visual Spanish texts', credits: 5, assess: 'External' },
      { code: '3.5', as: '91572', title: 'Write a variety of text types in clear Spanish to explore and justify varied ideas and perspectives', credits: 5, assess: 'Internal' },
    ],
  },

  /* ======================================================= ARTS */
  {
    id: 'drama', name: 'Drama', group: '13DRA', icon: '🎭', area: 'Arts',
    standards: [
      { code: '3.1', as: '91512', title: 'Interpret scripted text to integrate drama techniques in performance', credits: 4, assess: 'Internal' },
      { code: '3.2', as: '91513', title: 'Devise and perform a drama to realise a concept', credits: 5, assess: 'Internal' },
      { code: '3.3', as: '91514', title: 'Interpret a text from a prescribed playwright to demonstrate knowledge of a theatre form or period', credits: 4, assess: 'External' },
      { code: '3.4', as: '91515', title: 'Select and use complex performance skills associated with a drama form or period', credits: 4, assess: 'Internal' },
      { code: '3.5', as: '91516', title: 'Demonstrate understanding of the work of a drama or theatre theorist or practitioner', credits: 4, assess: 'Internal' },
      { code: '3.6', as: '91517', title: 'Perform a substantial acting role in a significant production', credits: 5, assess: 'Internal' },
      { code: '3.7', as: '91518', title: 'Demonstrate understanding of live drama performance', credits: 4, assess: 'External' },
      { code: '3.8', as: '91519', title: 'Script a drama suitable for live performance', credits: 5, assess: 'Internal' },
      { code: '3.9', as: '91520', title: 'Direct a drama performance', credits: 5, assess: 'Internal' },
    ],
  },
  {
    id: 'music', name: 'Music', group: '13MUS', icon: '🎵', area: 'Arts',
    standards: [
      { code: '3.1', as: '91416', title: 'Perform two programmes of music as a featured soloist', credits: 8, assess: 'Internal' },
      { code: '3.2', as: '91417', title: 'Perform a programme of music as a featured soloist on a second instrument', credits: 4, assess: 'Internal' },
      { code: '3.3', as: '91418', title: 'Demonstrate ensemble skills by performing two substantial pieces of music as a member of a group', credits: 4, assess: 'Internal' },
      { code: '3.4', as: '91419', title: 'Communicate musical intention by composing three original pieces of music', credits: 8, assess: 'Internal' },
      { code: '3.5', as: '91420', title: 'Integrate aural skills into written representation', credits: 4, assess: 'External' },
      { code: '3.6', as: '91421', title: 'Demonstrate understanding of harmonic and tonal conventions in a range of music scores', credits: 4, assess: 'External' },
      { code: '3.7', as: '91422', title: 'Analyse a substantial music work', credits: 4, assess: 'Internal' },
      { code: '3.8', as: '91423', title: 'Examine the influence of context on a substantial music work', credits: 4, assess: 'External' },
      { code: '3.9', as: '91424', title: 'Create two arrangements for an ensemble', credits: 4, assess: 'Internal' },
      { code: '3.10', as: '91425', title: 'Research a music topic', credits: 6, assess: 'Internal' },
      { code: '3.11', as: '91849', title: 'Compose three original songs that express imaginative thinking', credits: 8, assess: 'Internal' },
    ],
  },
  {
    id: 'visualarts', name: 'Visual Arts', group: '13ART', icon: '🎨', area: 'Arts',
    standards: [
      /* Five parallel fields: design, painting, photography, printmaking,
         sculpture. Add only the ones for the field you actually take. */
      { code: '3.1 design',      as: '91440', title: 'Analyse methods and ideas from established design practice', credits: 4, assess: 'Internal' },
      { code: '3.1 painting',    as: '91441', title: 'Analyse methods and ideas from established painting practice', credits: 4, assess: 'Internal' },
      { code: '3.1 photography', as: '91442', title: 'Analyse methods and ideas from established photography practice', credits: 4, assess: 'Internal' },
      { code: '3.1 printmaking', as: '91443', title: 'Analyse methods and ideas from established printmaking practice', credits: 4, assess: 'Internal' },
      { code: '3.1 sculpture',   as: '91444', title: 'Analyse methods and ideas from established sculpture practice', credits: 4, assess: 'Internal' },
      { code: '3.2 design',      as: '91445', title: 'Use drawing to demonstrate understanding of conventions appropriate to design', credits: 4, assess: 'Internal' },
      { code: '3.2 painting',    as: '91446', title: 'Use drawing to demonstrate understanding of conventions appropriate to painting', credits: 4, assess: 'Internal' },
      { code: '3.2 photography', as: '91447', title: 'Use drawing to demonstrate understanding of conventions appropriate to photography', credits: 4, assess: 'Internal' },
      { code: '3.2 printmaking', as: '91448', title: 'Use drawing to demonstrate understanding of conventions appropriate to printmaking', credits: 4, assess: 'Internal' },
      { code: '3.2 sculpture',   as: '91449', title: 'Use drawing to demonstrate understanding of conventions appropriate to sculpture', credits: 4, assess: 'Internal' },
      { code: '3.3 design',      as: '91450', title: 'Systematically clarify ideas using drawing informed by established design practice', credits: 4, assess: 'Internal' },
      { code: '3.3 painting',    as: '91451', title: 'Systematically clarify ideas using drawing informed by established painting practice', credits: 4, assess: 'Internal' },
      { code: '3.3 photography', as: '91452', title: 'Systematically clarify ideas using drawing informed by established photography practice', credits: 4, assess: 'Internal' },
      { code: '3.3 printmaking', as: '91453', title: 'Systematically clarify ideas using drawing informed by established printmaking practice', credits: 4, assess: 'Internal' },
      { code: '3.3 sculpture',   as: '91454', title: 'Systematically clarify ideas using drawing informed by established sculpture practice', credits: 4, assess: 'Internal' },
      { code: '3.4 design',      as: '91455', title: 'Produce a systematic body of work that integrates conventions and regenerates ideas within design practice', credits: 14, assess: 'External' },
      { code: '3.4 painting',    as: '91456', title: 'Produce a systematic body of work that integrates conventions and regenerates ideas within painting practice', credits: 14, assess: 'External' },
      { code: '3.4 photography', as: '91457', title: 'Produce a systematic body of work that integrates conventions and regenerates ideas within photography practice', credits: 14, assess: 'External' },
      { code: '3.4 printmaking', as: '91458', title: 'Produce a systematic body of work that integrates conventions and regenerates ideas within printmaking practice', credits: 14, assess: 'External' },
      { code: '3.4 sculpture',   as: '91459', title: 'Produce a systematic body of work that integrates conventions and regenerates ideas within sculpture practice', credits: 14, assess: 'External' },
      { code: '3.5', as: '91460', title: 'Produce a resolved work that demonstrates purposeful control of skills appropriate to a visual arts cultural context', credits: 4, assess: 'Internal' },
    ],
  },
  {
    id: 'arthistory', name: 'Art History', group: '13ARH', icon: '🖼️', area: 'Arts',
    standards: [
      { code: '3.1', as: '91482', title: 'Demonstrate understanding of style in art works', credits: 4, assess: 'External' },
      { code: '3.2', as: '91483', title: 'Examine how meanings are communicated through art works', credits: 4, assess: 'External' },
      { code: '3.3', as: '91484', title: 'Examine the relationship(s) between art and context', credits: 4, assess: 'External' },
      { code: '3.4', as: '91485', title: 'Examine the impact of media and processes on art works', credits: 4, assess: 'Internal' },
      { code: '3.5', as: '91486', title: 'Construct an argument based on interpretation of research in art history', credits: 4, assess: 'Internal' },
      { code: '3.6', as: '91487', title: 'Examine the different values placed on art works', credits: 4, assess: 'Internal' },
      { code: '3.7', as: '91488', title: 'Examine the relationship(s) between a theory and art works', credits: 4, assess: 'Internal' },
      { code: '3.8', as: '91489', title: 'Analyse texts about art', credits: 4, assess: 'Internal' },
    ],
  },

  /* ======================================================= HEALTH & PE */
  {
    id: 'pe', name: 'Physical Education', group: '13PED', icon: '🏃', area: 'Health & PE',
    standards: [
      { code: '3.1', as: '91498', title: 'Evaluate physical activity experiences to devise strategies for lifelong well-being', credits: 4, assess: 'Internal' },
      { code: '3.2', as: '91499', title: 'Analyse a physical skill performed by self or others', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91500', title: 'Evaluate the effectiveness of a performance improvement programme', credits: 4, assess: 'Internal' },
      { code: '3.4', as: '91501', title: 'Demonstrate quality performance of a physical activity in an applied setting', credits: 4, assess: 'Internal' },
      { code: '3.5', as: '91502', title: 'Examine a current physical activity event, trend, or issue and its impact on New Zealand society', credits: 4, assess: 'Internal' },
      { code: '3.6', as: '91503', title: 'Evaluate the use of health promotion to influence participation in physical activity', credits: 5, assess: 'Internal' },
      { code: '3.7', as: '91504', title: 'Analyse issues in safety management for outdoor activity to devise safety management strategies', credits: 3, assess: 'Internal' },
      { code: '3.8', as: '91505', title: 'Examine contemporary leadership principles applied in physical activity contexts', credits: 4, assess: 'Internal' },
      { code: '3.9', as: '91789', title: 'Devise strategies for a physical activity outcome', credits: 4, assess: 'Internal' },
    ],
  },
  {
    id: 'health', name: 'Health', group: '13HEA', icon: '💚', area: 'Health & PE',
    standards: [
      { code: '3.1', as: '91461', title: 'Analyse a New Zealand health issue', credits: 5, assess: 'Internal' },
      { code: '3.2', as: '91462', title: 'Analyse an international health issue', credits: 5, assess: 'External' },
      { code: '3.3', as: '91463', title: 'Evaluate health practices currently used in New Zealand', credits: 5, assess: 'Internal' },
      { code: '3.4', as: '91464', title: 'Analyse a contemporary ethical issue in relation to well-being', credits: 4, assess: 'Internal' },
      { code: '3.5', as: '91465', title: 'Evaluate models for health promotion', credits: 5, assess: 'External' },
    ],
  },

  /* ======================================================= TECHNOLOGY & SCIENCE */
  {
    id: 'digitech', name: 'Digital Technologies', group: '13DIT', icon: '💻', area: 'Technology',
    standards: [
      { code: '3.1', as: '91900', title: 'Conduct a critical inquiry to propose a digital technologies outcome', credits: 6, assess: 'Internal' },
      { code: '3.2', as: '91901', title: 'Apply user experience methodologies to develop a design for a digital technologies outcome', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91902', title: 'Use complex techniques to develop a database', credits: 4, assess: 'Internal' },
      { code: '3.4', as: '91903', title: 'Use complex techniques to develop a digital media outcome', credits: 4, assess: 'Internal' },
      { code: '3.5', as: '91904', title: 'Use complex techniques to develop an electronics outcome', credits: 6, assess: 'Internal' },
      { code: '3.6', as: '91905', title: 'Use complex techniques to develop a network', credits: 4, assess: 'Internal' },
      { code: '3.7', as: '91906', title: 'Use complex programming techniques to develop a computer program', credits: 6, assess: 'Internal' },
      { code: '3.8', as: '91907', title: 'Use complex processes to develop a digital technologies outcome', credits: 6, assess: 'Internal' },
      { code: '3.9', as: '91908', title: 'Analyse an area of computer science', credits: 3, assess: 'External' },
      { code: '3.10', as: '91909', title: 'Present a reflective analysis of developing a digital outcome', credits: 3, assess: 'External' },
    ],
  },
  {
    id: 'dvc', name: 'Design & Visual Communication', group: '13DVC', icon: '📐', area: 'Technology',
    standards: [
      { code: '3.30', as: '91627', title: 'Initiate design ideas through exploration', credits: 4, assess: 'External' },
      { code: '3.31', as: '91628', title: 'Develop a visual presentation that exhibits a design outcome to an audience', credits: 6, assess: 'Internal' },
      { code: '3.32', as: '91629', title: 'Resolve a spatial design through graphics practice', credits: 6, assess: 'Internal' },
      { code: '3.33', as: '91630', title: 'Resolve a product design through graphics practice', credits: 6, assess: 'Internal' },
      { code: '3.34', as: '91631', title: 'Produce working drawings to communicate production details for a complex design', credits: 6, assess: 'External' },
    ],
  },
  {
    id: 'ess', name: 'Earth & Space Science', group: '13ESS', icon: '🌍', area: 'Science',
    standards: [
      { code: '3.1', as: '91410', title: 'Carry out an independent practical Earth and Space Science investigation', credits: 4, assess: 'Internal' },
      { code: '3.2', as: '91411', title: 'Investigate a socio-scientific issue in an Earth and Space Science context', credits: 4, assess: 'Internal' },
      { code: '3.3', as: '91412', title: 'Investigate the evidence related to dating geological event(s)', credits: 4, assess: 'Internal' },
      { code: '3.4', as: '91413', title: 'Demonstrate understanding of processes in the ocean system', credits: 4, assess: 'External' },
      { code: '3.5', as: '91414', title: 'Demonstrate understanding of processes in the atmosphere system', credits: 4, assess: 'External' },
      { code: '3.6', as: '91415', title: 'Investigate an aspect of astronomy', credits: 4, assess: 'Internal' },
    ],
  },
  {
    id: 'aghort', name: 'Agricultural & Horticultural Science', group: '13AGH', icon: '🌱', area: 'Science',
    standards: [
      { code: '3.1', as: '91528', title: 'Carry out an investigation into an aspect of a New Zealand primary product or its production', credits: 4, assess: 'Internal' },
      { code: '3.2', as: '91529', title: 'Research and report on the impact of factors on the profitability of a New Zealand primary product', credits: 6, assess: 'Internal' },
      { code: '3.3', as: '91530', title: 'Demonstrate understanding of how market forces affect supply of and demand for New Zealand primary products', credits: 5, assess: 'External' },
      { code: '3.4', as: '91531', title: 'Demonstrate understanding of how the production process meets market requirements for a New Zealand primary product(s)', credits: 4, assess: 'External' },
      { code: '3.5', as: '91532', title: 'Analyse a New Zealand primary production environmental issue', credits: 5, assess: 'External' },
    ],
  },

  /* ======================================================= MATHS & ENGLISH EXTRAS
     Standards from subjects the site DOES teach, but which it does not cover.
     They still count toward credits, rank score and ATAR. */
  {
    id: 'maths-extra', name: 'Mathematics: other standards', group: '13MAT', icon: '➗', area: 'Mathematics',
    standards: [
      { code: '3.1', as: '91573', title: 'Apply the geometry of conic sections in solving problems', credits: 3, assess: 'Internal' },
      { code: '3.2', as: '91574', title: 'Apply linear programming methods in solving problems', credits: 3, assess: 'Internal' },
      { code: '3.3', as: '91575', title: 'Apply trigonometric methods in solving problems', credits: 4, assess: 'Internal' },
      { code: '3.4', as: '91576', title: 'Use critical path analysis in solving problems', credits: 2, assess: 'Internal' },
      { code: '3.8', as: '91580', title: 'Investigate time series data', credits: 4, assess: 'Internal' },
      { code: '3.9', as: '91581', title: 'Investigate bivariate measurement data', credits: 4, assess: 'Internal' },
      { code: '3.11', as: '91583', title: 'Conduct an experiment to investigate a situation using experimental design principles', credits: 4, assess: 'Internal' },
      { code: '3.15', as: '91587', title: 'Apply systems of simultaneous equations in solving problems', credits: 3, assess: 'Internal' },
    ],
  },
];

/** Flat list of every catalogue standard, tagged with its subject. */
export const allCatalogueStandards = catalogue.flatMap(s =>
  s.standards.map(std => ({
    ...std,
    subjectId: s.id,
    subject: s.name,
    group: s.group,
    icon: s.icon,
    area: s.area,
  }))
);

/** Subject areas, in the order they should appear in the picker. */
export const AREAS = [...new Set(catalogue.map(s => s.area))];

/** Look one up by the key the credit tracker uses. */
export function catalogueStandard(group, code) {
  return allCatalogueStandards.find(s => s.group === group && s.code === code) || null;
}

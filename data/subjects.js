/* ============================================================================
   subjects.js — THE MASTER STRUCTURE OF THE SITE
   ----------------------------------------------------------------------------
   This single file drives the sidebar navigation, every subject overview page,
   and the progress tracker. Each subject lists its achievement standards.
   Each standard points at a `topicId` — the teaching content for that topic
   lives in data/content/<subject>.js keyed by the same id.

   HOW TO EDIT:
   - Change exam-relevant metadata (titles, credits, External/Internal) here.
   - `dot`  = the colour used for the little dot beside the subject in the nav
              (kept inside the phthalo-green family — see css/styles.css).
   - `icon` = emoji shown on the subject tile.
   - `verify: true` on a standard renders a "confirm against NZQA" reminder
     (used for Biology & English until their content is checked).
   ========================================================================== */

export const subjects = [
  /* ------------------------------------------------------------------ CHEMISTRY */
  {
    id: 'chemistry',
    name: 'Chemistry',
    short: 'Chem',
    level: 'NCEA Level 3',
    dot: '#2D8A5F',
    icon: '🧪',
    blurb: 'Thermochemistry, organic, aqueous equilibria, redox & spectroscopy — the priority build.',
    realWorld: {
      title: 'Where this leads in business & finance',
      html: "Chemistry is the backbone of some of the largest industries on the planet — pharmaceuticals, energy, materials, agritech — and the people who <em>understand the science and can read a balance sheet</em> are the ones running them. Equity analysts covering biotech or mining need to judge whether a compound or a process actually works before valuing the company. Fonterra, Zespri and the whole NZ primary-export sector are chemistry businesses. A chemistry background plus commercial skill is a genuinely rare combination: it's the profile of technical consultants, patent attorneys, R&amp;D managers and venture investors in deep tech.",
      video: 'careers combining chemistry and business finance biotech investing',
    },
    standards: [
      { code: 'AS 91390', num: '91390', assess: '3.4', title: 'Thermochemical principles', credits: 4, type: 'External',
        topicId: 'chem-91390', blurb: 'Enthalpy, entropy & Gibbs free energy; Hess’s law; bond enthalpies; spontaneity.' },
      { code: 'AS 91391', num: '91391', assess: '3.5', title: 'Organic compounds', credits: 5, type: 'External', priority: true,
        topicId: 'chem-91391', blurb: 'Functional groups, IUPAC naming, reaction pathways, isomerism & mechanisms.' },
      { code: 'AS 91392', num: '91392', assess: '3.6', title: 'Equilibrium principles in aqueous systems', credits: 5, type: 'External',
        topicId: 'chem-91392', blurb: 'Ka/Kb, pH, buffers, solubility (Ks) and titration curves.' },
      { code: 'AS 91388', num: '91388', assess: '3.2', title: 'Spectroscopic data', credits: 3, type: 'Internal', priority: true,
        topicId: 'chem-91388', blurb: 'Mass spec, IR and ¹H/¹³C NMR — deducing structures from combined data.' },
      { code: 'AS 91387', num: '91387', assess: '3.1', title: 'Investigation involving quantitative analysis', credits: 4, type: 'Internal',
        topicId: 'chem-91387', blurb: 'Titrations, gravimetric & colorimetric analysis; uncertainty & method.' },
      { code: 'AS 91393', num: '91393', assess: '3.7', title: 'Oxidation-reduction processes', credits: 3, type: 'Internal',
        topicId: 'chem-91393', blurb: 'Half-equations, E° cells, electrolysis and redox titrations.' },
    ],
  },

  /* ------------------------------------------------------------------ PHYSICS */
  {
    id: 'physics',
    name: 'Physics',
    short: 'Phys',
    level: 'NCEA Level 3',
    dot: '#1E9686',
    icon: '⚛️',
    blurb: 'Waves, mechanical systems and electrical systems — the three big externals.',
    realWorld: {
      title: 'Where this leads in business & finance',
      html: "Physics graduates are aggressively recruited by investment banks, hedge funds and trading firms — not for the physics, but for the modelling. Quantitative analysts (\\u201cquants\\u201d) build the pricing and risk models behind derivatives markets, and the maths is the same differential-equation and probability toolkit you're learning here. Jane Street, Optiver and every major bank hire physicists specifically because they can model complex systems under uncertainty. Closer to home, the same skills drive energy trading, insurance risk pricing, and the engineering economics behind Rocket Lab.",
      video: 'why banks hire physicists quantitative finance quant careers',
    },
    standards: [
      { code: 'AS 91523', num: '91523', assess: '3.3', title: 'Wave Systems', credits: 4, type: 'External',
        topicId: 'phys-91523', blurb: 'Interference, standing waves, resonance, diffraction, Doppler & refraction.' },
      { code: 'AS 91524', num: '91524', assess: '3.4', title: 'Mechanical Systems', credits: 6, type: 'External',
        topicId: 'phys-91524', blurb: 'Circular motion, rotation, SHM and gravitation / orbital mechanics.' },
      { code: 'AS 91526', num: '91526', assess: '3.6', title: 'Electrical Systems', credits: 6, type: 'External',
        topicId: 'phys-91526', blurb: 'DC circuits, capacitors, inductors and AC theory (RMS, reactance).' },
      { code: 'AS 91521', num: '91521', assess: '3.1', title: 'Practical Investigation', credits: 4, type: 'Internal',
        topicId: 'phys-91521', blurb: 'Design & carry out an investigation; linearising data and analysis.' },
      { code: 'AS 91525', num: '91525', assess: '3.5', title: 'Modern Physics', credits: 3, type: 'Internal',
        topicId: 'phys-91525', blurb: 'Atoms, photons, the photoelectric effect, spectra and nuclei.' },
    ],
  },

  /* ------------------------------------------------------------------ CALCULUS */
  {
    id: 'calculus',
    name: 'Calculus',
    short: 'Calc',
    level: 'NCEA Level 3',
    dot: '#38946B',
    icon: '∫',
    blurb: 'Complex numbers, differentiation and integration — three externals, 17 credits.',
    realWorld: {
      title: 'Where this leads in business & finance',
      html: 'Calculus <em>is</em> finance once you get past year one. Optimisation (your max/min problems) is how firms set prices and allocate capital; rates of change are how interest compounds and how bonds respond to yield moves; integration is how you value a cash flow stream. The Black\\u2013Scholes model that underpins global options markets is a differential equation. Every finance, economics, actuarial and data-science degree opens with exactly this content \\u2014 arriving already fluent puts you a year ahead.',
      video: 'how calculus is used in finance options pricing optimisation',
    },
    standards: [
      { code: 'AS 91577', num: '91577', assess: '3.5', title: 'Complex numbers', credits: 5, type: 'External',
        topicId: 'calc-91577', blurb: 'Argand diagrams, polar form, De Moivre’s theorem & roots.' },
      { code: 'AS 91578', num: '91578', assess: '3.6', title: 'Differentiation methods', credits: 6, type: 'External',
        topicId: 'calc-91578', blurb: 'Chain/product/quotient rules, implicit, related rates & optimisation.' },
      { code: 'AS 91579', num: '91579', assess: '3.7', title: 'Integration methods', credits: 6, type: 'External',
        topicId: 'calc-91579', blurb: 'Techniques, areas, volumes of revolution & differential equations.' },
    ],
  },

  /* ------------------------------------------------------------------ STATISTICS */
  {
    id: 'statistics',
    name: 'Statistics',
    short: 'Stats',
    level: 'NCEA Level 3',
    dot: '#5C9A57',
    icon: '📊',
    blurb: 'Statistical reports, probability concepts and probability distributions — three externals.',
    realWorld: {
      title: 'Where this leads in business & finance',
      html: "Statistics is the single most directly employable subject on this list. Risk, pricing, forecasting, A/B testing, credit scoring, fraud detection and portfolio construction are all applied statistics. Actuaries \\u2014 consistently among NZ's best-paid professions \\u2014 are essentially professional statisticians. And 91584 is training in something rarer than technique: the judgement to spot when a number is being used to mislead. In business that skill protects you from bad investments, bad consultants and bad strategy decks.",
      video: 'careers in data science actuarial finance statistics',
    },
    standards: [
      { code: 'AS 91584', num: '91584', assess: '3.12', title: 'Evaluate statistically based reports', credits: 4, type: 'External',
        topicId: 'stat-91584', blurb: 'Critiquing sampling, margins of error, causation vs correlation.' },
      { code: 'AS 91585', num: '91585', assess: '3.13', title: 'Apply probability concepts', credits: 4, type: 'External',
        topicId: 'stat-91585', blurb: 'Conditional probability, trees, risk & independence.' },
      { code: 'AS 91586', num: '91586', assess: '3.14', title: 'Apply probability distributions', credits: 4, type: 'External',
        topicId: 'stat-91586', blurb: 'Normal, binomial, Poisson & uniform; model selection.' },
      { code: 'AS 91582', num: '91582', assess: '3.10', title: 'Use statistical methods to make a formal inference', credits: 4, type: 'Internal',
        topicId: 'stat-91582', blurb: 'Bootstrapping, confidence intervals and making a justified formal inference.' },
    ],
  },

  /* ------------------------------------------------------------------ BIOLOGY */
  {
    id: 'biology',
    name: 'Biology',
    short: 'Bio',
    level: 'NCEA Level 3',
    dot: '#55AE76',
    icon: '🧬',
    blurb: 'The three Level 3 externals: plant & animal responses, evolution & speciation, and human evolution.',
    realWorld: {
      title: 'Where this leads in business & finance',
      html: "Biotech is one of the fastest-growing investment sectors globally, and it is notoriously hard to value \\u2014 you cannot judge a gene-therapy startup or an agritech firm without understanding the biology underneath the pitch. That is why life-science equity analysts and venture-capital associates are usually science graduates first. In NZ specifically, the primary sector (dairy, horticulture, aquaculture) is the country's export engine, and the commercial roles there \\u2014 from Zespri to Fonterra to LIC \\u2014 reward people who understand both the organism and the P&amp;L.",
      video: 'biotech investing venture capital life sciences careers',
    },
    standards: [
      // Verified against nzqa.govt.nz (2026 specifications), 31 Jul 2026.
      { code: 'AS 91603', num: '91603', assess: '3.3', title: 'Responses of plants and animals to their external environment', credits: 5, type: 'External',
        topicId: 'bio-91603', accent: '#C77B29', blurb: 'Tropisms & nastic responses, animal behaviour, biological rhythms, migration & homing.' },
      { code: 'AS 91605', num: '91605', assess: '3.5', title: 'Evolutionary processes leading to speciation', credits: 4, type: 'External',
        topicId: 'bio-91605', accent: '#2E7FA8', blurb: 'Mechanisms of evolution, reproductive isolation & speciation.' },
      { code: 'AS 91602', num: '91602', assess: '3.2', title: 'Integrate biological knowledge — socio-scientific issue', credits: 3, type: 'Internal',
        topicId: 'bio-91602', accent: '#3F8F86', blurb: 'Build an informed, evidence-based response to a biological issue in society.' },
      { code: 'AS 91606', num: '91606', assess: '3.6', title: 'Trends in human evolution', credits: 4, type: 'External',
        topicId: 'bio-91606', accent: '#8A5AA8', blurb: 'Bipedalism, skeletal changes and cultural evolution of hominins.' },
    ],
  },

  /* ------------------------------------------------------------------ ENGLISH */
  {
    id: 'english',
    name: 'English',
    short: 'Eng',
    level: 'NCEA Level 3',
    dot: '#6E9152',
    icon: '📖',
    blurb: 'The two external essays — a written-text response and a visual/oral-text response.',
    realWorld: {
      title: 'Where this leads in business & finance',
      html: "Ask anyone senior in business what actually separates people at the top and they will say communication. Building an argument from evidence, structuring it, and making someone believe it is precisely what an investment memo, a consulting deck, a pitch to a board or a legal submission is. Warren Buffett has said learning to write and speak clearly is the single skill that most increased his value. The close-reading muscle matters too: the ability to notice how a company's annual report is framing bad news is the same skill you use on a Nolan film.",
      video: 'why communication skills matter in business writing an investment memo',
    },
    standards: [
      // Verified against nzqa.govt.nz (2026 specifications), 31 Jul 2026.
      { code: 'AS 91472', num: '91472', assess: '3.7', title: 'Respond critically to studied written text(s)', credits: 4, type: 'External',
        topicId: 'eng-91472', blurb: 'Written-text essay — critical, evidence-supported response to studied text(s).' },
      { code: 'AS 91473', num: '91473', assess: '3.8', title: 'Respond critically to studied visual or oral text(s)', credits: 4, type: 'External',
        topicId: 'eng-91473', blurb: 'Visual-text essay — Inception / Interstellar; evidence-supported critical response.' },
      { code: 'English 3.7', num: '', assess: '3.7', title: 'Respond critically to significant connections across texts', credits: 4, type: 'Internal',
        topicId: 'eng-3-7', blurb: 'The connections essay — linking several texts around one idea, with evidence.' },
      { code: 'English 3.9', num: '', assess: '3.9', title: 'Respond critically to visual/oral text(s) through close reading', credits: 3, type: 'Internal',
        topicId: 'eng-3-9', blurb: 'Close reading of a short visual/oral extract — unpacking a few minutes in depth.' },
    ],
  },
];

/* ---- Derived lookups (built once) ---- */
export const subjectById = Object.fromEntries(subjects.map(s => [s.id, s]));

/** Flat list of every standard, tagged with its parent subject id. */
export const allStandards = subjects.flatMap(s =>
  s.standards.map(std => ({ ...std, subjectId: s.id, subjectName: s.name }))
);

/** topicId -> { standard, subject } for quick routing. */
export const standardByTopicId = Object.fromEntries(
  allStandards.map(std => [std.topicId, std])
);

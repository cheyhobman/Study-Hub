/* ============================================================================
   AS 91393 — Oxidation-reduction processes (Internal, 3 credits)
   Oxidation numbers · half-equations · E° cells · electrolysis · redox titrations
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for — UNLESS the same content is examined
     elsewhere. Oxidation of alcohols is examined in 91391 organic, and the link between
     E°cell and spontaneity connects to ΔG in 91390 thermochemistry.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['chem-91390', 'chem-91391'],

  title: 'Oxidation-reduction processes',
  tags: ['Half-equations', 'Oxidation numbers', 'E° cells', 'Electrolysis'],
  intro: 'Reactions where electrons transfer. You’ll assign oxidation numbers, write and combine half-equations, use standard potentials to predict cell voltages and spontaneity, and handle redox titrations. Spontaneity (E°cell) mirrors the ΔG idea from <a href="#/topic/chem-91390" data-link>Thermochemical principles →</a>.',

  flashcards: [
    { q: 'Calculate the oxidation number of Mn in MnO₄⁻', a: '+7', explain: 'Four oxygens at −2 = −8; total charge is −1, so Mn = +7. It is reduced to +2 in Mn²⁺, a 5-electron change.' },
    { q: 'Calculate the oxidation number of Cr in Cr₂O₇²⁻', a: '+6 (each Cr)', explain: 'Seven O at −2 = −14; total −2, so 2Cr = +12, i.e. +6 each. Reduced to +3 (green) — a 6-electron change overall.' },
    { q: 'What is disproportionation?', a: 'When the SAME species is both oxidised and reduced in one reaction', explain: 'e.g. Cl₂ + 2NaOH → NaCl + NaOCl: chlorine goes from 0 to both −1 and +1.' },
    { q: 'What are standard conditions for E°?', a: '1 mol L⁻¹ solutions, 100 kPa gases, 298 K', explain: 'Changing concentration shifts the actual potential away from E° (Le Châtelier applied to the half-cell).' },
    { q: 'In a cell diagram, which electrode is negative?', a: 'The anode (where oxidation happens) in a galvanic/voltaic cell', explain: 'Careful: in ELECTROLYSIS the polarity is imposed by the supply, so the cathode is the negative one.' },
    { q: 'Why use starch indicator in an iodine/thiosulfate titration?', a: 'It gives a sharp blue-black → colourless endpoint', explain: 'Add it near the endpoint (when the solution is pale straw), otherwise iodine binds too strongly to the starch.' },

    { q: 'State what the mnemonic OIL RIG stands for', a: 'Oxidation Is Loss, Reduction Is Gain (of electrons)', explain: 'Oxidation number increases on oxidation, decreases on reduction.' },
    { q: 'The oxidant (oxidising agent) is…', a: 'reduced — it gains electrons', explain: 'The reductant is the one oxidised (it gives electrons away).' },
    { q: 'List the steps, in order, for balancing a half-equation in acidic solution', a: 'balance the atom → O with H₂O → H with H⁺ → charge with e⁻', explain: 'Then scale each half-equation so electrons cancel, and add.' },
    { q: 'Write the formula for E°<sub>cell</sub>', a: 'E°(cathode) − E°(anode)', explain: 'A positive E°cell means the reaction is spontaneous (mirrors ΔG < 0).' },
    { q: 'A more positive E° means…', a: 'a stronger oxidant (more readily reduced)', explain: 'That half-reaction runs as the reduction (the cathode, +).' },
    { q: 'Do you multiply E° when you scale a half-equation?', a: 'No — E° is an intensive property', explain: 'Only balance electrons; never multiply the voltage.' },
    { q: 'Endpoint of a MnO₄⁻ redox titration?', a: 'The first permanent pink', explain: 'Purple MnO₄⁻ → colourless Mn²⁺, so it is self-indicating.' },
    { q: 'Cathode vs anode in electrolysis?', a: 'Cathode (−) = reduction; anode (+) = oxidation', explain: 'A power supply forces a non-spontaneous redox reaction to occur.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: oxidising agent vs the species oxidised', a: 'The <strong>oxidising agent</strong> is the one that is itself REDUCED (it gains electrons). The species <strong>oxidised</strong> loses electrons and is the reducing agent.', explain: 'This inversion is the single most common redox error. Say it as a sentence when you answer: "MnO₄⁻ is the oxidising agent because it is reduced from +7 to +2, gaining 5 electrons." Naming the oxidation-number change proves it rather than asserting it.' },
    { q: '⚖️ TELL THEM APART: galvanic (voltaic) cell vs electrolytic cell', a: '<strong>Galvanic</strong> — spontaneous, E°cell positive, converts chemical energy to electrical, anode is negative. <strong>Electrolytic</strong> — non-spontaneous, driven by an external supply, anode is positive.', explain: 'In BOTH cells oxidation happens at the anode and reduction at the cathode — that never changes. What flips is the sign of the electrodes, because in a galvanic cell the anode pushes electrons out, while in electrolysis the power supply pulls them from the anode. Remember the constant part, then reason out the signs.' },
    { q: '⚖️ TELL THEM APART: E° values and what a positive E°cell means', a: 'E°cell = E°(cathode) − E°(anode). A <strong>positive</strong> E°cell means the reaction as written is spontaneous under standard conditions.', explain: 'The half-reaction with the MORE positive E° is the one that proceeds as a reduction; the other reverses and becomes the oxidation. Note that E° values are intensive — do NOT multiply them when you scale a half-equation to balance electrons, even though you do multiply everything else.' },
    { q: '⚖️ TELL THEM APART: disproportionation vs an ordinary redox reaction', a: '<strong>Disproportionation</strong> is when a SINGLE species is simultaneously oxidised and reduced, ending up in two different oxidation states.', explain: 'The classic is chlorine in cold NaOH: Cl₂ (0) → Cl⁻ (−1) and ClO⁻ (+1). To spot it, assign oxidation numbers and look for one element appearing on the right in two states — one higher and one lower than it started.' },

    /* ---- reasoning depth ---- */
    { q: 'Set out the full method for balancing a redox half-equation in acidic solution', a: '1. Balance the element being oxidised/reduced. 2. Balance O by adding H₂O. 3. Balance H by adding H⁺. 4. Balance charge by adding electrons. Then scale the two halves so the electrons cancel and add.', explain: 'In BASIC solution, do all of that, then add enough OH⁻ to BOTH sides to neutralise every H⁺, converting them to water and cancelling any duplicates. Following the order strictly is what stops you getting lost — nearly every balancing error is a step done out of sequence.' },
    { q: 'What is the purpose of the salt bridge, and what happens without it?', a: 'It completes the circuit and maintains electrical neutrality by allowing ions to migrate between half-cells. Without it, charge builds up in each half-cell and current stops almost immediately.', explain: 'Anions move toward the anode (where positive metal ions are being produced) and cations toward the cathode (where positive ions are being consumed). A full-mark answer names the direction of ion movement, not just "it completes the circuit".' },
    { q: 'Why is the standard hydrogen electrode assigned E° = 0.00 V?', a: 'Because only potential DIFFERENCES can be measured, never an absolute single-electrode potential — so one electrode is defined as zero to give every other value a common reference.', explain: 'Its standard conditions are 1 mol L⁻¹ H⁺, 100 kPa H₂ and 298 K on an inert platinum electrode. Everything in the E° table is therefore a measurement made against this one arbitrary but universally agreed baseline.' },
    { q: 'Why do E° values only strictly apply under standard conditions?', a: 'Because electrode potential depends on the concentrations of the species involved; the tabulated values assume 1 mol L⁻¹ solutions, 100 kPa gases and 298 K.', explain: 'Changing a concentration shifts the half-cell equilibrium and so shifts its potential. This is why a predicted-spontaneous reaction can fail in practice, and why a good Excellence answer says "under standard conditions" rather than claiming E° settles the matter absolutely.' },
    { q: 'Why can E° predict that a reaction is feasible but not that it will actually happen?', a: 'Because E° is a thermodynamic quantity — it tells you about the position of equilibrium, not the rate. A reaction with a large positive E°cell may still be immeasurably slow if its activation energy is high.', explain: 'Carbon burning in air is the standard illustration: thermodynamically very favourable, but paper does not spontaneously ignite at room temperature. Distinguishing thermodynamic feasibility from kinetic accessibility is a classic Excellence discriminator, and it links straight to your thermochemistry standard.' },
    { q: 'How do you work out which product forms at each electrode during electrolysis of an aqueous solution?', a: 'Compare the E° values of every possible half-reaction, INCLUDING water. At the cathode the most easily reduced species wins; at the anode the most easily oxidised species wins.', explain: 'Water is the competitor students forget: it can be reduced to H₂ + OH⁻ or oxidised to O₂ + H⁺. That is why electrolysing aqueous NaCl gives hydrogen rather than sodium metal — water is far easier to reduce than Na⁺, which is why sodium must be extracted from the MOLTEN salt.' },
    { q: 'Why does a rechargeable battery work in both directions?', a: 'Discharging runs the cell galvanically (spontaneous); recharging applies an external voltage larger than the cell\'s own, forcing the reaction to run in reverse electrolytically.', explain: 'It only works if the electrode reactions are chemically reversible and the products stay put on the electrodes. Where products dissolve away or change structure irreversibly, the cell cannot be recharged — which is exactly the difference between a rechargeable and a single-use battery.' },
  ],

  sections: [
    /* ============================================ 0 CONNECTIONS */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Redox notation packs a lot into small symbols. Every one below appears on this page.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in oxidation–reduction', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'Oxidation number', def: 'A bookkeeping charge assigned to an atom, written with the <strong>sign first</strong>: +7, −2. It is not a real charge — it is a way of tracking electrons.', note: 'Distinguish from an ionic charge, written sign LAST: Na⁺, SO₄²⁻.' },
          { term: 'E° <span class="xs">(standard electrode potential)</span>', def: 'The voltage of a half-cell measured against the standard hydrogen electrode, under standard conditions. The ° means standard conditions.', note: 'A more positive E° means the species is more readily REDUCED.' },
          { term: 'E°<sub>cell</sub>', def: 'The overall cell voltage: E°(cathode) − E°(anode). <strong>Positive means the reaction is spontaneous.</strong>', note: 'E° is intensive — never multiply it when you scale a half-equation.' },
          { term: 'OIL RIG', def: 'Mnemonic: <strong>O</strong>xidation <strong>I</strong>s <strong>L</strong>oss (of electrons), <strong>R</strong>eduction <strong>I</strong>s <strong>G</strong>ain.' },
          { term: 'Anode / cathode', def: '<strong>Anode</strong> = where oxidation happens. <strong>Cathode</strong> = where reduction happens. True in BOTH galvanic and electrolytic cells.', note: 'Only the SIGNS flip: the anode is negative in a galvanic cell, positive in electrolysis.' },
          { term: '| and || <span class="xs">(cell diagrams)</span>', def: 'A single bar is a <strong>phase boundary</strong> (metal | its solution). A double bar is the <strong>salt bridge</strong> separating the two half-cells.' },
          { term: '(s) (l) (g) (aq)', def: 'State symbols: solid, liquid, gas, aqueous (dissolved in water). Required in full equations.' },
          { term: 'e⁻', def: 'An electron. In a half-equation, electrons on the LEFT means reduction (gain); on the RIGHT means oxidation (loss).' },
        ]},
        { t: 'tip', title: 'Sign first or sign last?', html: 'Oxidation number writes the sign FIRST (+2, −1). Ionic charge writes it LAST (Ca²⁺, Cl⁻). If you see “+2” it is an oxidation number; “2+” is a charge.' },
      ],
    },
    {
      id: 'connections', num: '0', title: 'How this connects to your other standards',
      intro: 'Redox is electron bookkeeping — and it overlaps heavily with organic oxidation and with the feasibility ideas from thermochemistry.',
      blocks: [
        { t: 'connects', intro: 'The three links worth knowing cold:', items: [
          { to: '#/topic/chem-91390', label: 'Thermochemical principles (91390) — E°cell IS spontaneity',
            why: 'E°cell > 0 means spontaneous, exactly like ΔG < 0. They are formally linked by ΔG = −nFE°. Being able to say “this cell is feasible because E°cell is positive, which corresponds to a negative ΔG” is a strong exam answer.' },
          { to: '#/topic/chem-91391', label: 'Organic compounds (91391) — organic oxidation is redox',
            why: 'Primary alcohol → aldehyde → carboxylic acid is a redox sequence. The oxidant K₂Cr₂O₇/H⁺ has the half-equation Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (orange → green), which is precisely the kind you balance here. The colour change you quote in organic IS the redox half-reaction.' },
          { to: '#/topic/chem-91392', label: 'Aqueous equilibria (91392) — H⁺ appears in half-equations',
            why: 'Most half-equations are balanced in acid, so [H⁺] matters — and the pH of the solution can change whether a reaction is feasible. Redox titrations also use identical mole-ratio and concordant-titre reasoning to acid–base ones.' },
          { to: '#/topic/chem-91387', label: 'Quantitative analysis (91387) — redox titrations',
            why: 'MnO₄⁻ and iodine/thiosulfate titrations are common choices for the analysis internal. The half-equations you balance here give you the mole ratio you need there.' },
        ]},
      ],
    },
    {
      id: 'ox-numbers', num: '1', title: 'Oxidation numbers & the language',
      blocks: [
        { t: 'key', title: 'Oxidation number rules (apply in order)', items: [
          'Uncombined element = 0 (e.g. O₂, Na, Cl₂).',
          'Monatomic ion = its charge (Na⁺ = +1, S²⁻ = −2).',
          'H = +1 (except −1 in metal hydrides); O = −2 (except −1 in peroxides, +2 in OF₂).',
          'Sum of oxidation numbers = 0 for a neutral compound, = charge for an ion.',
        ]},
        { t: 'tip', title: '🧠 Mnemonics — redox in three lines', html: '<strong>“OIL RIG”</strong> — <u>O</u>xidation <u>I</u>s <u>L</u>oss, <u>R</u>eduction <u>I</u>s <u>G</u>ain (of electrons).<br><strong>“An <u>OX</u> and a <u>RED</u> <u>CAT</u>”</strong> — oxidation happens at the <strong>an</strong>ode; <strong>red</strong>uction at the <strong>cat</strong>hode.<br><strong>“The agent does the opposite”</strong> — the oxid<em>ant</em> is itself redu<strong>ced</strong>; the reduct<em>ant</em> is itself oxid<strong>ised</strong>. (The agent gives its name away to the other guy.)' },
        { t: 'key', title: 'OIL RIG & the agents', items: [
          '<strong>O</strong>xidation <strong>I</strong>s <strong>L</strong>oss of electrons (oxidation number increases).',
          '<strong>R</strong>eduction <strong>I</strong>s <strong>G</strong>ain of electrons (oxidation number decreases).',
          'The <strong>oxidant</strong> (oxidising agent) is <em>reduced</em> — it takes electrons.',
          'The <strong>reductant</strong> (reducing agent) is <em>oxidised</em> — it gives electrons.',
        ]},
      ],
    },
    {
      id: 'half-equations', num: '2', title: 'Balancing half-equations',
      blocks: [
        { t: 'tip', title: '🧠 Mnemonic — balancing half-equations', html: '<strong>“<u>A</u>toms, <u>O</u>xygen, <u>H</u>ydrogen, <u>C</u>harge” = <em>“<u>A</u>ll <u>O</u>ther <u>H</u>ens <u>C</u>ount.”</em></strong> Balance the main atom → add H₂O for oxygen → add H⁺ for hydrogen → add e⁻ to balance charge. Always in that order.<br><br>🧠 For oxidation numbers: <strong>“<u>H</u>ydrogen is <u>plus one</u>, <u>O</u>xygen is <u>minus two</u> — unless they’re being weird”</strong> (H is −1 in metal hydrides; O is −1 in peroxides).' },
        { t: 'key', title: 'Method (acidic solution)', items: [
          '1. Balance the atom being oxidised/reduced.',
          '2. Balance <strong>O</strong> by adding H₂O.',
          '3. Balance <strong>H</strong> by adding H⁺.',
          '4. Balance charge by adding electrons (e⁻).',
          'To combine: multiply each half-equation so electrons cancel, then add.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'MnO₄⁻ → Mn²⁺', problem: 'Balance the reduction half-equation for permanganate in acid.', steps: [
          'Mn balanced: MnO₄⁻ → Mn²⁺.',
          'Balance O with H₂O: MnO₄⁻ → Mn²⁺ + 4H₂O.',
          'Balance H with H⁺: MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O.',
          'Balance charge with e⁻: left charge = −1+8 = +7, right = +2, add 5e⁻ to left.',
        ], answer: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O.' },
      ],
    },
    {
      id: 'cells', num: '3', title: 'Standard potentials & cells',
      video: 'NCEA Level 3 chemistry redox standard electrode potentials cells',
      blocks: [
        { t: 'p', html: `Each half-reaction has a <strong>standard reduction potential E°</strong> (vs the standard hydrogen electrode, 0.00 V). A more <strong>positive</strong> E° means a stronger oxidant (more readily reduced).` },
        { t: 'formulas', items: [
          { name: 'Cell potential', eq: 'E°<sub>cell</sub> = E°<sub>reduction (cathode)</sub> − E°<sub>reduction (anode)</sub>', tex: 'E^\\circ_{\\text{cell}}=E^\\circ_{\\text{cathode}}-E^\\circ_{\\text{anode}}', note: 'Equivalently E°(oxidant) − E°(reductant). A positive E°cell ⟹ spontaneous.' },
        ]},
        { t: 'key', title: 'Using an E° table', items: [
          'The half-reaction with the <strong>more positive</strong> E° proceeds as a <strong>reduction</strong> (cathode, +).',
          'The other one <strong>reverses</strong> (oxidation, anode, −).',
          'E°<sub>cell</sub> &gt; 0 ⟹ reaction is spontaneous as written; the bigger the value, the more feasible.',
          'E° is an intensive property — do <em>not</em> multiply it when you scale a half-equation.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Zn / Cu cell', problem: 'E°(Cu²⁺/Cu) = +0.34 V, E°(Zn²⁺/Zn) = −0.76 V. Find E°cell and identify the anode.', steps: [
          'More positive E° = Cu²⁺/Cu ⟹ reduction (cathode). Zn is oxidised (anode).',
          'E°cell = E°(cathode) − E°(anode) = (+0.34) − (−0.76) = +1.10 V.',
          'Positive ⟹ spontaneous. Zn electrode is the anode (negative terminal).',
        ], answer: 'E°cell = +1.10 V; Zn is oxidised at the anode, Cu²⁺ reduced at the cathode.' },
      ],
    },
    {
      id: 'electrolysis', num: '4', title: 'Electrolysis & redox titrations',
      blocks: [
        { t: 'key', title: 'Electrolysis', items: [
          'A power supply forces a <em>non-spontaneous</em> redox reaction.',
          '<strong>Cathode (−):</strong> reduction (cations gain electrons). <strong>Anode (+):</strong> oxidation.',
          'In aqueous solutions, water may be preferentially discharged — compare E° values.',
        ]},
        { t: 'key', title: 'Redox titrations', items: [
          'Self-indicating example: MnO₄⁻ is purple → colourless Mn²⁺; the endpoint is the first permanent pink.',
          'Use the mole ratio from the combined redox equation to relate titre to concentration.',
          'Iodine/thiosulfate titrations use starch indicator (blue-black → colourless at the endpoint).',
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA — Chemistry L3 (91393) assessment resources', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91393', note: 'Internal assessment resources & exemplars', verify: true },
    { label: 'No Brain Too Small — Redox', url: 'https://www.nobraintoosmall.co.nz/html/senior_chemistry/NCEA3_chemistry.html', note: 'Half-equations and E° questions', verified: true },
  ],

  quiz: [
    { type: 'mc', q: 'In MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O, manganese is:', choices: ['Oxidised from +2 to +7', 'Reduced from +7 to +2', 'Unchanged', 'Reduced from +2 to +7'], answer: 1, explanation: 'Mn goes from +7 (in MnO₄⁻) to +2 (Mn²⁺): a gain of electrons = reduction. Permanganate is the oxidant.' },
    { type: 'mc', q: 'Given E°(Cu²⁺/Cu) = +0.34 V and E°(Zn²⁺/Zn) = −0.76 V, E°cell for the spontaneous cell is:', choices: ['+0.42 V', '+1.10 V', '−1.10 V', '+0.34 V'], answer: 1, explanation: 'E°cell = E°(cathode) − E°(anode) = +0.34 − (−0.76) = +1.10 V.' },
    { type: 'sa', q: 'A positive E°cell means the reaction is ______ (one word).', accept: ['spontaneous', 'feasible'], answer: 'spontaneous', explanation: 'E°cell > 0 corresponds to ΔG < 0, i.e. a thermodynamically spontaneous (feasible) reaction.' },

    /* ---- application & reasoning questions ---- */
    { type: 'mc', q: 'In the reaction MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺, the permanganate ion is:', choices: ['Oxidised, and is the reducing agent', 'Reduced, and is the oxidising agent', 'Oxidised, and is the oxidising agent', 'Unchanged'], answer: 1, explanation: 'Mn goes from +7 to +2, gaining 5 electrons — that is reduction. The species that is reduced IS the oxidising agent, because it took electrons from something else. Always cite the oxidation-number change as your evidence.' },
    { type: 'mc', q: 'Cl₂ reacts with cold dilute NaOH to give Cl⁻ and ClO⁻. This is an example of:', choices: ['Neutralisation', 'Disproportionation', 'Precipitation', 'Displacement'], answer: 1, explanation: 'Chlorine starts at oxidation number 0 and ends up at −1 in Cl⁻ AND +1 in ClO⁻ — a single species both oxidised and reduced. Spot it by assigning oxidation numbers and looking for one element appearing on the right in two different states.' },
    { type: 'mc', q: 'Two half-cells have E° = +0.34 V (Cu²⁺/Cu) and E° = −0.76 V (Zn²⁺/Zn). In the spontaneous cell:', choices: ['Copper is oxidised; E°cell = 1.10 V', 'Zinc is oxidised at the anode; E°cell = +1.10 V', 'Zinc is reduced; E°cell = −1.10 V', 'No reaction occurs'], answer: 1, explanation: 'The more positive E° (copper) proceeds as the reduction at the cathode, so zinc reverses and is oxidised at the anode. E°cell = E°(cathode) − E°(anode) = 0.34 − (−0.76) = +1.10 V, and positive means spontaneous.' },
    { type: 'mc', q: 'When balancing a half-equation is scaled ×5 so electrons cancel, the E° value should be:', choices: ['Multiplied by 5', 'Divided by 5', 'Left unchanged', 'Made negative'], answer: 2, explanation: 'E° is an intensive property — a potential per unit charge — so it does not scale with the amount of substance. Multiply the species and the electrons, never the voltage. This is one of the most frequently dropped marks in the standard.' },
    { type: 'mc', q: 'Electrolysis of aqueous NaCl produces hydrogen at the cathode rather than sodium. Why?', choices: ['Sodium is too heavy', 'Water is more easily reduced than Na⁺', 'Sodium ions do not move', 'The current is too low'], answer: 1, explanation: 'Water is a competing reactant with a far less negative reduction potential than Na⁺, so it is reduced preferentially to H₂ and OH⁻. This is precisely why sodium metal must be extracted by electrolysing MOLTEN NaCl, where no water is present.' },
    { type: 'mc', q: 'A reaction has E°cell = +1.5 V but no observable change occurs at room temperature. The best explanation is:', choices: ['The E° values must be wrong', 'It is thermodynamically feasible but kinetically slow — the activation energy is high', 'E°cell should be negative', 'The reaction is at equilibrium'], answer: 1, explanation: 'E° tells you where the equilibrium lies, not how fast you get there. A large activation energy can make a thermodynamically favourable reaction immeasurably slow. Making this distinction explicitly is a reliable Excellence move.' },
    { type: 'mc', q: 'In a galvanic cell, anions in the salt bridge migrate toward the:', choices: ['Cathode, to balance the positive charge being consumed', 'Anode, to balance the positive metal ions being produced there', 'Neither — the bridge is inert', 'Both equally'], answer: 1, explanation: 'Oxidation at the anode releases positive metal ions into that half-cell, so anions move in to keep it electrically neutral; cations move toward the cathode where positive ions are being consumed. Stating the direction is what earns the full mark.' },
    { type: 'sa', q: 'In balancing a half-equation in acidic solution, which species do you add to balance oxygen?', accept: ['water', 'h2o', 'h₂o'], answer: 'H₂O', explanation: 'The order matters: balance the key element, then O with H₂O, then H with H⁺, then charge with electrons. Nearly every balancing error comes from doing these steps out of sequence.' },
    { type: 'sa', q: 'At which electrode does oxidation ALWAYS occur, in both galvanic and electrolytic cells?', accept: ['anode', 'the anode'], answer: 'the anode', explanation: 'Oxidation at the anode and reduction at the cathode are fixed. Only the electrode SIGNS flip between cell types — negative anode in a galvanic cell, positive anode in electrolysis.' },
  ],
};

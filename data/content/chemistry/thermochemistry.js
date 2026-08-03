/* ============================================================================
   AS 91390 — Thermochemical principles (External, 4 credits)
   Enthalpy · Hess's law · bond enthalpies · entropy · Gibbs free energy
   ========================================================================== */
export default {
  title: 'Thermochemical principles',
  tags: ['Enthalpy', 'Entropy', 'Gibbs', 'Hess’s law'],
  intro: 'Energy changes in reactions: how much heat is released or absorbed (enthalpy, ΔH), how disorder changes (entropy, ΔS), and how the two combine to decide whether a reaction happens on its own (Gibbs free energy, ΔG). The feasibility idea returns in <a href="#/topic/chem-91392" data-link>Aqueous equilibria →</a> and <a href="#/topic/chem-91393" data-link>Redox →</a>.',

  flashcards: [
    { q: 'Define standard enthalpy of formation', a: 'The enthalpy change when ONE mole of a compound forms from its elements in their standard states', explain: 'Under standard conditions (100 kPa, stated temperature). By definition it is zero for an element in its standard state.' },
    { q: 'Define standard enthalpy of combustion', a: 'The enthalpy change when one mole of a substance burns completely in excess oxygen', explain: 'Always exothermic (negative). Used with the reactants − products version of Hess’s law.' },
    { q: 'Hess’s law from COMBUSTION data — which way round?', a: 'ΔHr = Σ ΔHc(reactants) − Σ ΔHc(products)', explain: 'Note this is the REVERSE of the formation version (products − reactants). Mixing them up is a common error.' },
    { q: 'What happens to ΔH if you reverse a reaction? Double it?', a: 'Reverse → change the sign. Double → double the value', explain: 'Enthalpy is an extensive state function — this is what makes adding equations (Hess cycles) work.' },
    { q: 'Why is ΔH a “state function”?', a: 'It depends only on the initial and final states, not the route taken', explain: 'That IS Hess’s law, and it is why you can construct any convenient cycle to find an unmeasurable ΔH.' },
    { q: 'Why does entropy increase when a solid dissolves?', a: 'The ordered lattice breaks up and ions disperse through the solvent', explain: 'More ways to arrange the particles and their energy = higher entropy.' },
    { q: 'Predict ΔS for 2SO₂(g) + O₂(g) → 2SO₃(g)', a: 'Negative — 3 mol gas becomes 2 mol gas', explain: 'Fewer gas particles = more order = lower entropy. Counting gas moles on each side is the fastest way to get the sign.' },
    { q: 'What is true about ΔG at equilibrium?', a: 'ΔG = 0', explain: 'This is the bridge to the equilibrium standard — at equilibrium there is no net driving force in either direction.' },
    { q: 'Does a negative ΔG guarantee a fast reaction?', a: 'No — ΔG predicts feasibility, not rate', explain: 'Diamond → graphite has ΔG < 0 but is immeasurably slow due to a huge activation energy. Thermodynamics ≠ kinetics.' },

    { q: 'Sign of ΔH for an exothermic reaction?', a: 'Negative (ΔH < 0)', explain: 'Energy is released to the surroundings; products are lower in energy than reactants.' },
    { q: 'Write the Gibbs free energy equation and state what each term means', a: 'ΔG = ΔH − TΔS. ΔG = free energy change (negative → spontaneous); ΔH = enthalpy change; T = absolute temperature in K; ΔS = entropy change.', explain: 'T in kelvin. Convert ΔS from J to kJ before substituting — the #1 error here.' },
    { q: 'When is a reaction spontaneous (feasible)?', a: 'ΔG < 0', explain: 'ΔG = 0 at equilibrium; ΔG > 0 is non-spontaneous.' },
    { q: 'ΔH negative & ΔS negative → spontaneous when?', a: 'Only at low temperature', explain: 'As T rises the TΔS term makes ΔG positive.' },
    { q: 'ΔH positive & ΔS positive → spontaneous when?', a: 'Only at high temperature', explain: 'High T makes TΔS outweigh the positive ΔH.' },
    { q: 'Temperature at which a reaction just becomes feasible?', a: 'T = ΔH / ΔS  (set ΔG = 0)', explain: 'Units must match — convert ΔS to kJ K⁻¹ mol⁻¹ first.' },
    { q: 'Write the Hess’s law expression using ΔH<sub>f</sub>° data', a: 'ΔHr = ΣΔHf(products) − ΣΔHf(reactants)', explain: 'Multiply each ΔHf by its coefficient in the balanced equation.' },
    { q: 'Write the expression for ΔH calculated from bond enthalpies', a: 'Σ(bonds broken) − Σ(bonds formed)', explain: 'Broken − formed. Gas-phase only; values are averages, so the answer is approximate.' },
    { q: 'Predict the sign of ΔS when gas moles decrease', a: 'ΔS is negative (more order)', explain: 'Fewer gas particles = lower entropy.' },
    { q: 'Units of ΔS vs ΔH?', a: 'ΔS in J K⁻¹ mol⁻¹; ΔH in kJ mol⁻¹', explain: 'Mixing them (forgetting ÷1000) is the classic mistake.' },
    { q: 'ΔHf° of an element in its standard state?', a: 'Zero', explain: 'By definition — elements in their standard states have zero enthalpy of formation.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: ΔH, ΔS and ΔG — which one decides spontaneity?', a: 'Only <strong>ΔG</strong> decides. ΔG = ΔH − TΔS; negative ΔG means spontaneous. ΔH alone does not, and neither does ΔS alone.', explain: 'Endothermic reactions CAN be spontaneous if TΔS is large enough — dissolving ammonium nitrate absorbs heat yet happens readily, because the entropy increase dominates. Any answer claiming "exothermic therefore spontaneous" is wrong at Level 3.' },
    { q: '⚖️ TELL THEM APART: the four ΔH/ΔS sign combinations', a: 'ΔH −, ΔS + → spontaneous at ALL temperatures. ΔH +, ΔS − → NEVER spontaneous. ΔH −, ΔS − → spontaneous at LOW T. ΔH +, ΔS + → spontaneous at HIGH T.', explain: 'Derive rather than memorise: the TΔS term grows with temperature, so whenever ΔH and ΔS "disagree" in sign, temperature is the deciding factor. Setting ΔG = 0 gives the crossover temperature T = ΔH/ΔS, which exams frequently ask you to calculate.' },
    { q: '⚖️ TELL THEM APART: enthalpy of formation vs enthalpy of combustion', a: '<strong>ΔHf°</strong> — one mole of compound formed FROM its elements in their standard states. <strong>ΔHc°</strong> — one mole of substance completely burned in oxygen.', explain: 'The "one mole of" applies to different things: formation is per mole of product, combustion per mole of the fuel burned. And ΔHf° of an element in its standard state is zero BY DEFINITION — a fact worth several marks a year in Hess\'s law calculations.' },
    { q: '⚖️ TELL THEM APART: bond enthalpy calculations vs ΔHf° calculations', a: 'Bond enthalpies: ΔH = Σ(bonds broken) − Σ(bonds formed). Formation enthalpies: ΔH = Σ(ΔHf° products) − Σ(ΔHf° reactants).', explain: 'The subtraction runs the opposite way, which is why students mix them up. It makes sense: breaking bonds costs energy so it is the positive term, while products carry the positive sign in the ΔHf° version. Bond-enthalpy answers are also only approximate, because tabulated values are averages across many molecules — a caveat worth stating.' },
    { q: '⚖️ TELL THEM APART: entropy of the SYSTEM vs entropy of the universe', a: 'The system\'s entropy can decrease, and often does. It is the entropy of the UNIVERSE that must increase for a spontaneous process.', explain: 'Water freezing lowers the system entropy but releases heat that raises the surroundings\' entropy by more, so the universe still gains. Using ΔG already accounts for both, which is exactly why ΔG is the convenient criterion for a chemist working on the system alone.' },

    /* ---- reasoning depth ---- */
    { q: 'Rank the three states by entropy, and explain why', a: 'Gas ≫ liquid > solid, because entropy measures the number of ways energy and particles can be arranged, and gas particles have vastly more accessible positions and momenta.', explain: 'Use this to predict the SIGN of ΔS before calculating anything: count moles of gas on each side. More gas moles on the right means ΔS is positive. If gas moles are unchanged, look at the number of particles and their complexity instead — bigger, floppier molecules have more vibrational modes and so more entropy.' },
    { q: 'Why does Hess\'s law work at all?', a: 'Because enthalpy is a state function — ΔH depends only on the initial and final states, not on the route taken.', explain: 'That is what lets you build an unmeasurable enthalpy change out of measurable ones, and it is the justification examiners want stated. It is also why you may reverse an equation (flip the sign of ΔH) and scale it (multiply ΔH by the same factor) freely when constructing a cycle.' },
    { q: 'Why are bond enthalpy calculations only approximate?', a: 'Because tabulated bond enthalpies are AVERAGES taken across many different molecules, and the true strength of a given bond depends on its molecular environment.', explain: 'The four C–H bonds in methane, for instance, do not all require exactly the same energy to break. Bond-enthalpy methods also assume all species are gases, so they ignore the enthalpy changes involved in condensed phases — another reason the answer differs from a ΔHf°-based value.' },
    { q: 'How do you find the temperature at which a reaction becomes spontaneous?', a: 'Set ΔG = 0, so 0 = ΔH − TΔS, giving T = ΔH / ΔS.', explain: 'Watch the units — ΔH is usually tabulated in kJ mol⁻¹ and ΔS in J K⁻¹ mol⁻¹, so one of them must be converted before dividing. Failing to convert is the most common source of an answer that is out by a factor of 1000. Then check the sign combination to know whether spontaneity begins ABOVE or BELOW that temperature.' },
    { q: 'Why does ice melting have positive ΔH and positive ΔS, and what does that predict?', a: 'Melting absorbs heat (ΔH > 0) and increases disorder (ΔS > 0), so ΔG = ΔH − TΔS is negative only at high enough temperature — spontaneous above 0 °C.', explain: 'At exactly 273 K the two terms balance, ΔG = 0 and solid and liquid coexist at equilibrium. Every phase transition temperature is the point where ΔG = 0, which makes melting and boiling points a neat physical illustration of the ΔG criterion.' },
    { q: 'Explain why dissolving ammonium nitrate is spontaneous despite being endothermic', a: 'The large entropy increase from the ordered ionic lattice breaking up and dispersing through the solvent makes TΔS bigger than ΔH, so ΔG is negative.', explain: 'This is the classic counterexample to "spontaneous means exothermic" and the reason instant cold packs work. Whenever a question describes a process that gets COLD but happens anyway, it is testing exactly this entropy-driven reasoning.' },
  ],

  sections: [
    /* ============================================ 0 CONNECTIONS */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Thermochemistry is almost entirely symbols. Each one below appears on this page — none is difficult, but none is obvious either.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in thermochemistry', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'Δ <span class="xs">(capital delta)</span>', def: 'Means <strong>“change in”</strong>. ΔH is the change in enthalpy, ΔS the change in entropy, ΔG the change in free energy.', note: 'Always final minus initial. A negative Δ means the quantity went DOWN.' },
          { term: 'H <span class="xs">(enthalpy)</span>', def: 'Heat content at constant pressure. You never measure H itself, only the CHANGE, ΔH.', note: 'ΔH negative = exothermic (heat released); positive = endothermic (heat absorbed).' },
          { term: 'S <span class="xs">(entropy)</span>', def: 'A measure of how many ways the energy and particles of a system can be arranged — loosely, disorder.', note: 'Units J K⁻¹ mol⁻¹ — note JOULES, while ΔH is in kilojoules. Mismatched units are the commonest error in ΔG calculations.' },
          { term: 'G <span class="xs">(Gibbs free energy)</span>', def: 'The quantity that decides spontaneity: ΔG = ΔH − TΔS. Negative ΔG means spontaneous.' },
          { term: '° <span class="xs">(the degree symbol, e.g. ΔH°)</span>', def: 'Means <strong>standard conditions</strong>: 100 kPa, a stated temperature (usually 298 K), all solutions 1 mol L⁻¹.', note: 'A superscript circle. Not the same as °C, which is a temperature unit.' },
          { term: 'Subscripts f, c, r', def: '<strong>f</strong> = formation (from elements), <strong>c</strong> = combustion (burned in oxygen), <strong>r</strong> = reaction (the overall reaction).' },
          { term: 'Σ <span class="xs">(capital sigma)</span>', def: 'Greek capital S, meaning <strong>“the sum of”</strong>. Σ ΔH<sub>f</sub>°(products) means add up every product’s formation enthalpy.' },
          { term: 'T', def: 'Absolute temperature in <strong>kelvin</strong> (K), not °C. K = °C + 273.', note: 'TΔS is meaningless in Celsius — the equation requires kelvin.' },
        ]},
        { t: 'tip', title: 'Where the small letters go', html: 'A subscript after ΔH says WHICH enthalpy change (f = formation, c = combustion). A superscript ° says under what CONDITIONS. So ΔH<sub>f</sub>° reads: “standard enthalpy change of formation”.' },
      ],
    },
    {
      id: 'connections', num: '0', title: 'How this connects to your other standards',
      intro: 'Thermochemistry is the “will it happen?” standard. That question reappears in equilibria and redox in different clothes.',
      blocks: [
        { t: 'connects', intro: 'Where these ideas resurface:', items: [
          { to: '#/topic/chem-91392', label: 'Aqueous equilibria (91392) — ΔG explains Le Châtelier',
            why: 'A system is at equilibrium precisely when ΔG = 0. Every Le Châtelier prediction (heat an endothermic reaction → shifts right) is really a ΔG = ΔH − TΔS argument. Even Kw rising with temperature is because water’s ionisation is endothermic.' },
          { to: '#/topic/chem-91393', label: 'Redox (91393) — E°cell is ΔG in volts',
            why: 'ΔG < 0 (spontaneous) and E°cell > 0 (spontaneous) are the same statement, linked by ΔG = −nFE°. If you can reason about one, you can reason about the other — and examiners like asking you to connect them.' },
          { to: '#/topic/chem-91391', label: 'Organic compounds (91391) — the bonds in bond enthalpy',
            why: 'Every bond-enthalpy calculation uses organic bonds (C–H, C–C, C=C, C=O, O–H). Hydrogenating an alkene, or combusting an alcohol, are organic reactions used as the standard thermochemistry examples.' },
        ]},
      ],
    },
    /* ---------------------------------------------------------------- 1 */
    {
      id: 'enthalpy', num: '1', title: 'Enthalpy (ΔH)',
      blocks: [
        { t: 'p', html: `<strong>Enthalpy change (ΔH)</strong> is the heat energy exchanged with the surroundings at constant pressure. It is measured in <strong>kJ mol⁻¹</strong>.` },
        { t: 'tip', title: '🧠 Mnemonic — exo vs endo, and bonds', html: '<strong>“<u>Exo</u> = <u>exit</u>s (energy leaves, ΔH negative). <u>Endo</u> = <u>enters</u> (energy absorbed, ΔH positive).”</strong><br><br>For bonds: <strong>“<u>B</u>reaking <u>B</u>urns energy; <u>F</u>orming <u>F</u>rees it.”</strong> Bond breaking is endothermic (costs energy); bond forming is exothermic (releases it). That’s why ΔH = Σ(broken) − Σ(formed).' },
        { t: 'key', title: 'The two signs', items: [
          '<strong>Exothermic, ΔH &lt; 0</strong> — energy released to the surroundings; products lower in energy than reactants (e.g. combustion, neutralisation).',
          '<strong>Endothermic, ΔH &gt; 0</strong> — energy absorbed from the surroundings; products higher in energy than reactants (e.g. thermal decomposition, photosynthesis).',
          'Bonds <em>breaking</em> absorbs energy (endothermic); bonds <em>forming</em> releases energy (exothermic).',
        ]},
        { t: 'table', caption: 'Standard enthalpy changes you must know', headers: ['Symbol', 'Name', 'Definition (per mole, standard conditions)'], rows: [
          ['ΔH<sub>f</sub>°', 'Formation', 'Formed from elements in their standard states'],
          ['ΔH<sub>c</sub>°', 'Combustion', 'Completely burned in excess O₂'],
          ['ΔH<sub>r</sub>°', 'Reaction', 'For the reaction as written'],
          ['ΔH<sub>vap</sub> / ΔH<sub>fus</sub>', 'Vaporisation / Fusion', 'Liquid→gas / solid→liquid'],
        ]},
        { t: 'note', title: 'Standard conditions', html: 'The ° symbol means standard state: <strong>100 kPa</strong> pressure, a stated temperature (usually 298 K), and 1 mol L⁻¹ for solutions. ΔH<sub>f</sub>° of an element in its standard state is <strong>zero</strong>.' },
      ],
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'hess', num: '2', title: 'Hess’s Law',
      blocks: [
        { t: 'p', html: `<strong>Hess’s Law:</strong> the total enthalpy change for a reaction is independent of the route taken — it depends only on the initial and final states. This lets you calculate a ΔH you can’t measure directly.` },
        { t: 'formulas', title: 'Two ways to use it', items: [
          { name: 'From enthalpies of formation', eq: 'ΔH<sub>r</sub>° = Σ ΔH<sub>f</sub>°(products) − Σ ΔH<sub>f</sub>°(reactants)', note: 'Remember to multiply each by its coefficient in the balanced equation.' },
          { name: 'From combustion data', eq: 'ΔH<sub>r</sub>° = Σ ΔH<sub>c</sub>°(reactants) − Σ ΔH<sub>c</sub>°(products)', note: 'Note this is reactants − products (the reverse of the formation version).' },
          { name: 'Adding equations', eq: 'Reverse an equation ⟹ change the sign of ΔH; multiply an equation ⟹ multiply ΔH', note: 'Cancel species that appear on both sides.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Hess’s law from formation data', problem: 'Find ΔH° for C₂H₄(g) + H₂(g) → C₂H₆(g), given ΔH<sub>f</sub>°: C₂H₄ = +52, C₂H₆ = −85 kJ mol⁻¹ (H₂ is an element, so 0).', steps: [
          'ΔH<sub>r</sub>° = Σ ΔH<sub>f</sub>°(products) − Σ ΔH<sub>f</sub>°(reactants)',
          '= [ΔH<sub>f</sub>°(C₂H₆)] − [ΔH<sub>f</sub>°(C₂H₄) + ΔH<sub>f</sub>°(H₂)]',
          '= (−85) − (+52 + 0)',
          '= −137 kJ mol⁻¹',
        ], answer: 'ΔH° = −137 kJ mol⁻¹ (exothermic — an addition/hydrogenation reaction).' },
      ],
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'bond-enthalpy', num: '3', title: 'Bond enthalpies',
      blocks: [
        { t: 'p', html: `Average <strong>bond enthalpy</strong> is the energy to break one mole of a particular bond in the gas phase. Because breaking absorbs and forming releases energy:` },
        { t: 'formulas', items: [
          { name: 'Reaction enthalpy from bonds', eq: 'ΔH = Σ(bonds broken) − Σ(bonds formed)', note: 'Broken − formed. Only works if everything is gaseous.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'H₂ + Cl₂ → 2HCl', problem: 'Bond enthalpies (kJ mol⁻¹): H–H 436, Cl–Cl 242, H–Cl 431.', steps: [
          'Bonds broken = 1(H–H) + 1(Cl–Cl) = 436 + 242 = 678',
          'Bonds formed = 2(H–Cl) = 2 × 431 = 862',
          'ΔH = 678 − 862 = −184 kJ mol⁻¹',
        ], answer: 'ΔH = −184 kJ mol⁻¹.' },
        { t: 'mistake', title: 'Bond-enthalpy values are averages', html: 'Bond enthalpy answers are <em>approximate</em> because they use averaged values across many molecules — they won’t exactly match ΔH<sub>f</sub> data. Always state this if asked to compare methods.' },
      ],
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'entropy', num: '4', title: 'Entropy (ΔS)',
      blocks: [
        { t: 'p', html: `<strong>Entropy (S)</strong> is a measure of the disorder or number of ways energy can be arranged in a system. Units: <strong>J K⁻¹ mol⁻¹</strong> (note joules, not kilojoules).` },
        { t: 'key', title: 'Predicting the sign of ΔS', items: [
          'Entropy <strong>increases</strong> (ΔS &gt; 0) going solid → liquid → gas.',
          'ΔS &gt; 0 when the number of moles of <strong>gas increases</strong>. Count gas moles on each side.',
          'ΔS &gt; 0 when a solid dissolves, or a large molecule breaks into smaller ones.',
          'ΔS &lt; 0 when gas moles decrease, or particles become more ordered (e.g. freezing, precipitation).',
        ]},
        { t: 'formulas', items: [
          { name: 'Entropy change of reaction', eq: 'ΔS° = Σ S°(products) − Σ S°(reactants)', note: 'Elements have non-zero standard entropies (unlike ΔH<sub>f</sub>).' },
        ]},
        { t: 'tip', title: 'Quick check', html: 'For N₂(g) + 3H₂(g) → 2NH₃(g): 4 mol gas → 2 mol gas, so ΔS is negative (fewer gas particles = more order).' },
      ],
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'gibbs', num: '5', title: 'Gibbs free energy (ΔG) & spontaneity',
      video: 'NCEA Level 3 chemistry Gibbs free energy entropy spontaneity',
      blocks: [
        { t: 'p', html: `Whether a reaction is <strong>spontaneous (feasible)</strong> depends on both enthalpy and entropy, combined in the Gibbs free energy:` },
        { t: 'formulas', items: [
          { name: 'Gibbs free energy', eq: 'ΔG = ΔH − TΔS', tex: '\\Delta G=\\Delta H-T\\Delta S', note: 'T in kelvin. Watch units: ΔH in kJ, ΔS usually in J — convert ΔS to kJ (÷1000) first!' },
          { name: 'Feasibility test', eq: 'ΔG &lt; 0 → spontaneous  ·  ΔG = 0 → equilibrium  ·  ΔG &gt; 0 → not spontaneous', note: '“Spontaneous” means thermodynamically feasible, not necessarily fast.' },
          { name: 'Temperature of change-over', eq: 'T = ΔH / ΔS  (set ΔG = 0)', tex: 'T=\\frac{\\Delta H}{\\Delta S}\\quad(\\Delta G=0)', note: 'The temperature at which a reaction just becomes feasible.' },
        ]},
        { t: 'tip', title: '🧠 Mnemonic — spontaneity', html: '<strong>“<u>G</u>ood reactions <u>G</u>o when ΔG is <u>ne<u>G</u>ative</u>.”</strong> ΔG &lt; 0 = spontaneous/feasible.<br><br>For the four cases: <strong>“Exo + more mess = always. Endo + more order = never. Otherwise, temperature decides.”</strong> (Exothermic AND entropy-increasing → always spontaneous. Endothermic AND entropy-decreasing → never. Mixed signs → T is the tie-breaker.)' },
        { t: 'table', caption: 'Sign of ΔG from the signs of ΔH and ΔS', headers: ['ΔH', 'ΔS', 'Spontaneous?'], rows: [
          ['− (exo)', '+ (more disorder)', 'Always (ΔG always −)'],
          ['+ (endo)', '− (more order)', 'Never (ΔG always +)'],
          ['− (exo)', '− (more order)', 'Only at low T'],
          ['+ (endo)', '+ (more disorder)', 'Only at high T'],
        ]},
        { t: 'example', tag: 'Worked example', title: 'Find the temperature a reaction becomes feasible', problem: 'For a reaction ΔH = +178 kJ mol⁻¹ and ΔS = +161 J K⁻¹ mol⁻¹. Above what temperature is it feasible?', steps: [
          'Feasible when ΔG ≤ 0, i.e. ΔH − TΔS ≤ 0, so T ≥ ΔH / ΔS.',
          'Convert ΔS to kJ: 161 J = 0.161 kJ K⁻¹ mol⁻¹.',
          'T = ΔH / ΔS = 178 / 0.161 = 1106 K',
        ], answer: 'Feasible above ≈ 1106 K (about 833 °C). This is the CaCO₃ → CaO + CO₂ type reaction.' },
        { t: 'mistake', title: 'The #1 exam error here', html: 'Forgetting to convert ΔS from J to kJ (or ΔH from kJ to J). Mixing units gives an answer off by 1000×. Convert before substituting.' },
      ],
    },
  ],

  /* ---- past papers & schedules ---- */
  links: [
    { label: 'NZQA — Chemistry L3 (91390) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91390&view=exams', note: 'Official exam papers + assessment schedules by year', verify: true },
    { label: 'No Brain Too Small — Chemistry (Thermochemistry)', url: 'https://www.nobraintoosmall.co.nz/html/senior_chemistry/NCEA3_chemistry.html', note: 'Questions collated by topic, with answers', verified: true },
  ],

  /* ---- practice quiz ---- */
  quiz: [
    { type: 'mc', q: 'A reaction has ΔH = −92 kJ mol⁻¹ and ΔS = −198 J K⁻¹ mol⁻¹. At which temperatures is it spontaneous?', choices: ['All temperatures', 'No temperatures', 'Only at low temperatures', 'Only at high temperatures'], answer: 2, explanation: 'ΔH is − and ΔS is −, so ΔG = ΔH − TΔS becomes positive as T rises. It is only spontaneous at low temperatures (small TΔS term).' },
    { type: 'mc', q: 'Which change has a positive ΔS?', choices: ['2SO₂(g) + O₂(g) → 2SO₃(g)', 'H₂O(l) → H₂O(s)', 'CaCO₃(s) → CaO(s) + CO₂(g)', 'N₂(g) + 3H₂(g) → 2NH₃(g)'], answer: 2, explanation: 'CaCO₃ → CaO + CO₂ produces a gas from a solid (0 → 1 mol gas), increasing disorder. The others all decrease gas moles or increase order.' },
    { type: 'sa', q: 'Using ΔH = Σ(broken) − Σ(formed): for H₂ + Cl₂ → 2HCl with H–H 436, Cl–Cl 242, H–Cl 431, what is ΔH in kJ mol⁻¹?', accept: ['-184', '−184'], answer: '−184 kJ mol⁻¹', explanation: '(436 + 242) − (2 × 431) = 678 − 862 = −184.' },
    { type: 'mc', q: 'Why might a bond-enthalpy calculation of ΔH differ from a value found using ΔHf° data?', choices: ['Bond enthalpies are average values', 'Formation data is always wrong', 'Bonds do not store energy', 'They should be identical'], answer: 0, explanation: 'Average bond enthalpies are averaged over many different molecules, so they give an approximate ΔH rather than an exact one.' },

    /* ---- application & reasoning questions ---- */
    { type: 'mc', q: 'A reaction has ΔH = +25 kJ mol⁻¹ and ΔS = +120 J K⁻¹ mol⁻¹. It is spontaneous:', choices: ['At all temperatures', 'At no temperature', 'Only above about 208 K', 'Only below about 208 K'], answer: 2, explanation: 'With ΔH and ΔS both positive, the TΔS term must grow large enough to overcome ΔH. Setting ΔG = 0: T = ΔH/ΔS = 25000/120 ≈ 208 K, and above that temperature ΔG turns negative. Note the unit conversion — kJ to J — which is the usual source of an answer out by 1000.' },
    { type: 'mc', q: 'Dissolving NH₄NO₃ in water makes the beaker feel cold, yet it dissolves readily. This is because:', choices: ['The reaction is exothermic', 'ΔS is large and positive, so TΔS outweighs the positive ΔH', 'ΔG is positive', 'Entropy decreases'], answer: 1, explanation: 'Cold beaker means endothermic (ΔH > 0). Spontaneity still follows because breaking up the ordered lattice and dispersing ions through the solvent raises entropy substantially, making TΔS the dominant term and ΔG negative.' },
    { type: 'mc', q: 'For N₂(g) + 3H₂(g) → 2NH₃(g), the sign of ΔS is:', choices: ['Positive, because a new substance forms', 'Negative, because 4 mol of gas become 2 mol of gas', 'Zero', 'Positive, because ammonia is a gas'], answer: 1, explanation: 'Count gas moles: 4 on the left, 2 on the right. Fewer gas particles means fewer accessible arrangements and so lower entropy. Counting moles of gas is the fastest reliable way to predict the sign of ΔS.' },
    { type: 'mc', q: 'ΔHf° of O₂(g) is:', choices: ['Equal to the bond enthalpy of O=O', '0 kJ mol⁻¹ by definition', 'Negative', 'Not defined'], answer: 1, explanation: 'By definition, the standard enthalpy of formation of an ELEMENT in its standard state is zero — forming it from itself involves no change. This shortcut appears in most Hess\'s law calculations and is worth checking for before you start substituting.' },
    { type: 'mc', q: 'A ΔH calculated from average bond enthalpies differs from one calculated using ΔHf° data. The best explanation is:', choices: ['One of them must be wrong', 'Bond enthalpies are averages across many molecules and assume all species are gases', 'ΔHf° values are less reliable', 'The reaction is not at equilibrium'], answer: 1, explanation: 'A given bond varies in strength depending on its molecular environment, so tabulated averages only approximate any particular case. Bond-enthalpy methods also treat everything as gaseous, ignoring enthalpy changes for condensed phases — so the ΔHf° route is generally the more accurate.' },
    { type: 'mc', q: 'Which sign combination makes a reaction spontaneous at ALL temperatures?', choices: ['ΔH positive, ΔS negative', 'ΔH negative, ΔS positive', 'ΔH negative, ΔS negative', 'ΔH positive, ΔS positive'], answer: 1, explanation: 'With ΔH negative and ΔS positive, both terms of ΔG = ΔH − TΔS push it negative regardless of T. The opposite combination is never spontaneous, and the two "disagreeing" combinations depend on temperature.' },
    { type: 'mc', q: 'Water freezing at −10 °C lowers the entropy of the water. Does this violate the second law?', choices: ['Yes, so it cannot happen', 'No — heat released raises the entropy of the surroundings by more, so the universe\'s entropy increases', 'No, because entropy does not apply to phase changes', 'Yes, but only briefly'], answer: 1, explanation: 'The second law constrains the entropy of the UNIVERSE, not of the system alone. Freezing is exothermic, and the heat dumped into the surroundings raises their entropy more than the water\'s falls. Using ΔG for the system already accounts for both contributions.' },
    { type: 'sa', q: 'Write the equation for the temperature at which ΔG = 0.', accept: ['t=deltah/deltas', 't = h/s', 't=h/s', 'deltah/deltas', 'h/s', 't = deltah/deltas'], answer: 'T = ΔH / ΔS', explanation: 'Set ΔH − TΔS = 0 and rearrange. Convert ΔH from kJ to J first, since ΔS is tabulated in J K⁻¹ mol⁻¹ — mismatched units are the classic error here.' },
    { type: 'sa', q: 'Which thermodynamic quantity alone determines whether a reaction is spontaneous?', accept: ['gibbs free energy', 'delta g', 'g', 'free energy', 'δg', 'gibbs'], answer: 'ΔG (Gibbs free energy)', explanation: 'Negative ΔG means spontaneous. Neither ΔH nor ΔS decides on its own, which is why endothermic reactions can still proceed when the entropy gain is large enough.' },
  ],
};

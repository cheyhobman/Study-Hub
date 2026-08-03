/* ============================================================================
   AS 91392 — Equilibrium principles in aqueous systems (External, 5 credits)
   Kw / pH · weak acids Ka · buffers · salt hydrolysis · solubility Ks ·
   titration curves
   ========================================================================== */
export default {
  title: 'Equilibrium principles in aqueous systems',
  tags: ['pH', 'Ka / Kb', 'Buffers', 'Solubility (Ks)', 'Titrations'],
  intro: 'Acid–base and solubility equilibria in water. You’ll calculate pH of strong and weak acids/bases, explain and calculate buffers, work with solubility products (Ks), and interpret titration curves. Take care with logs and assumptions. The Le Châtelier reasoning links to <a href="#/topic/chem-91390" data-link>Thermochemical principles →</a> and <a href="#/topic/chem-91393" data-link>Redox →</a>.',

  flashcards: [
    { q: 'Define a Brønsted–Lowry acid and base', a: 'Acid = proton (H⁺) donor; base = proton acceptor', explain: 'Every acid–base reaction transfers a proton and creates a conjugate pair on each side.' },
    { q: 'What is a conjugate base?', a: 'What remains after an acid donates its proton (HA → A⁻)', explain: 'Strong acid ⟹ very weak conjugate base. Ethanoic acid (weak) has ethanoate, a moderately strong conjugate base — which is why its salts are basic.' },
    { q: 'What is an amphiprotic species? Give an example', a: 'One that can both donate and accept a proton — e.g. H₂O, HCO₃⁻', explain: 'Water acts as an acid with ammonia and as a base with HCl.' },
    { q: 'Why does Kw increase when temperature rises?', a: 'The self-ionisation of water is endothermic, so heating shifts it right (Le Châtelier)', explain: 'This means neutral pH is below 7 at temperatures above 25 °C — a nice link to thermochemistry.' },
    { q: 'How do you choose the best acid for a buffer at a target pH?', a: 'Pick one whose pKa is closest to the target pH', explain: 'Buffering is most effective within about ±1 pH unit of pKa, where both HA and A⁻ are plentiful.' },
    { q: 'Which indicator for a weak acid–strong base titration, and why?', a: 'Phenolphthalein (8.3–10) — the equivalence point is basic', explain: 'The indicator range must fall inside the steep vertical section of the curve. Methyl orange would change far too early.' },
    { q: 'What does the assumption [HA] ≈ c require?', a: 'That dissociation is small (< ~5%)', explain: 'True for weak acids at reasonable concentration. Always check afterwards — if it exceeds 5%, the approximation is invalid.' },
    { q: 'Why is a solution of sodium ethanoate basic?', a: 'CH₃COO⁻ is a conjugate base and hydrolyses water: A⁻ + H₂O ⇌ HA + OH⁻', explain: 'The released OH⁻ raises the pH above 7. This is why the equivalence point of a weak acid–strong base titration is basic.' },
    { q: 'How does temperature affect solubility and Ks?', a: 'For most salts dissolving is endothermic, so higher T increases solubility and Ks', explain: 'Ks is only constant at a fixed temperature — a common exam trap.' },

    { q: 'State the value of K<sub>w</sub> at 25 °C', a: '[H⁺][OH⁻] = 1.0×10⁻¹⁴', explain: 'Always holds in aqueous solution; increases with temperature.' },
    { q: 'Write the formula relating pH to [H⁺]', a: 'pH = −log[H⁺] ; [H⁺] = 10⁻ᵖᴴ', explain: 'And pH + pOH = 14 at 25 °C.' },
    { q: 'Write the approximation used to find [H⁺] for a weak acid', a: '[H⁺] = √(Ka·c)', explain: 'Valid when dissociation is small (<~5%): assumes [HA] ≈ c and [H⁺] ≈ [A⁻].' },
    { q: 'Write the Henderson–Hasselbalch equation for buffer pH', a: 'pH = pKa + log([A⁻]/[HA])', explain: 'When [A⁻] = [HA], pH = pKa.' },
    { q: 'What is a buffer?', a: 'A weak acid + its conjugate base in comparable amounts', explain: 'A⁻ mops up added H⁺; HA neutralises added OH⁻ — so pH barely changes.' },
    { q: 'Ka × Kb = ?', a: 'Kw (for a conjugate acid–base pair)', explain: 'Lets you find Kb of the conjugate base from Ka.' },
    { q: 'pH of a salt of a weak acid + strong base (e.g. CH₃COONa)?', a: 'Basic (> 7)', explain: 'The anion is a conjugate base: A⁻ + H₂O ⇌ HA + OH⁻.' },
    { q: 'pH of an NH₄Cl solution?', a: 'Acidic (< 7)', explain: 'NH₄⁺ is the conjugate acid of weak base NH₃; it donates H⁺.' },
    { q: 'Derive an expression for K<sub>s</sub> of Mg(OH)₂ in terms of solubility s', a: '4s³', explain: '[Mg²⁺] = s, [OH⁻] = 2s, so Ks = s·(2s)² = 4s³.' },
    { q: 'When does a precipitate form?', a: 'When the ionic product Q > Ks', explain: 'Q < Ks stays dissolved; Q = Ks is saturated.' },
    { q: 'pH at the half-equivalence point of a weak acid titration?', a: 'pH = pKa', explain: '[HA] = [A⁻] there — read Ka straight off the curve.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: strong acid vs concentrated acid', a: '<strong>Strong</strong> = fully dissociated (a property of the substance). <strong>Concentrated</strong> = a lot of solute per litre (a property of the solution).', explain: 'They are independent: you can have dilute hydrochloric acid (strong but not concentrated) and concentrated ethanoic acid (concentrated but weak). Exams exploit this constantly — a question comparing "equal concentrations of HCl and CH₃COOH" is testing whether you know that only the strong one dissociates fully, so it has the far higher [H₃O⁺] and lower pH.' },
    { q: '⚖️ TELL THEM APART: Ka vs pKa — which way round is stronger?', a: 'A <strong>larger Ka</strong> means a stronger acid. A <strong>smaller pKa</strong> means a stronger acid, because pKa = −log Ka.', explain: 'The sign flip catches people out under pressure. Anchor it with a known pair: ethanoic acid pKa 4.76, and a stronger acid like methanoic acid pKa 3.75. Lower number, stronger acid — the same logic as pH itself.' },
    { q: '⚖️ TELL THEM APART: equivalence point vs end point vs half-equivalence point', a: '<strong>Equivalence</strong> = stoichiometrically equal moles have reacted. <strong>End point</strong> = where the indicator actually changes colour. <strong>Half-equivalence</strong> = halfway there, where pH = pKa.', explain: 'A good indicator is one whose end point falls within the steep vertical section, so it coincides closely with equivalence — that is the whole basis of indicator choice. The half-equivalence point is the exam favourite because it lets you read pKa straight off a titration curve, since [HA] = [A⁻] makes the Henderson–Hasselbalch log term zero.' },
    { q: '⚖️ TELL THEM APART: a buffer vs a solution that merely resists dilution', a: 'A <strong>buffer</strong> contains significant amounts of BOTH a weak acid and its conjugate base, so it can neutralise added acid AND added base.', explain: 'Made either by mixing a weak acid with its salt, or by partially neutralising a weak acid with a strong base (which generates the conjugate in situ). A strong acid alone is not a buffer no matter how concentrated — it has no conjugate base reservoir to mop up added H₃O⁺.' },
    { q: '⚖️ TELL THEM APART: Kc/Ka vs the reaction quotient Q', a: 'K is the ratio of concentrations AT equilibrium; Q is the same expression evaluated at ANY moment. Q < K means the reaction shifts right; Q > K shifts left; Q = K means it is at equilibrium.', explain: 'For solubility this becomes the ionic product versus Ks: if the ionic product exceeds Ks, precipitation occurs. Framing a "will it precipitate?" question as a Q-versus-K comparison turns it from guesswork into a calculation.' },
    { q: '⚖️ TELL THEM APART: what a catalyst changes and what it does not', a: 'A catalyst speeds up the rate at which equilibrium is REACHED. It does NOT change the position of equilibrium or the value of K.', explain: 'It lowers the activation energy of forward and reverse reactions equally, so both rates rise by the same factor and the ratio at equilibrium is untouched. This is the most commonly dropped mark in Le Châtelier questions — always say what a catalyst does not do.' },

    /* ---- reasoning depth ---- */
    { q: 'Why does an aqueous NH₄Cl solution turn out acidic?', a: 'The NH₄⁺ ion is the conjugate acid of the weak base ammonia, so it hydrolyses: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺, releasing H₃O⁺.', explain: 'General rule: a salt of a STRONG acid and a WEAK base is acidic; weak acid + strong base is basic; strong + strong is neutral. Work out the parentage of each ion, then ask which one is the conjugate of something weak — that is the ion that hydrolyses.' },
    { q: 'Why is pH = pKa at the half-equivalence point?', a: 'Half the weak acid has been converted to its conjugate base, so [HA] = [A⁻]; the log([A⁻]/[HA]) term becomes log 1 = 0, leaving pH = pKa.', explain: 'This is the most efficient way to determine pKa experimentally: titrate, find the equivalence volume, halve it, read the pH. It also explains why a buffer is most effective at pH ≈ pKa — that is where the acid and base reservoirs are equal and it resists change in both directions equally well.' },
    { q: 'Why does a weak acid titration curve start higher and have a shorter vertical section than a strong acid one?', a: 'It starts higher because the weak acid is only partly dissociated, so [H₃O⁺] is lower. The vertical section is shorter because buffering by the HA/A⁻ mixture flattens the curve before equivalence, and the equivalence point sits above pH 7.', explain: 'The above-7 equivalence follows from the conjugate base hydrolysing. This directly controls indicator choice: phenolphthalein (range 8.3–10) suits weak acid/strong base, methyl orange (3.1–4.4) suits strong acid/weak base.' },
    { q: 'How do you decide whether a precipitate forms?', a: 'Calculate the ionic product using the concentrations after mixing (remember the dilution), then compare with Ks. Ionic product > Ks means a precipitate forms.', explain: 'The step almost everyone forgets is the dilution: mixing two solutions changes both concentrations, so recalculate using the total volume before you substitute. Skipping that gives an ionic product that is too large and the wrong conclusion.' },
    { q: 'Explain, using Le Châtelier, why adding a common ion reduces solubility', a: 'The added ion increases the ionic product above Ks, so the equilibrium shifts toward the solid to restore the product to Ks — reducing the amount dissolved.', explain: 'The classic case is AgCl being much less soluble in NaCl solution than in pure water. Note that Ks itself does not change (only temperature changes K) — what changes is the position of the equilibrium and hence the measured solubility.' },
    { q: 'Why does increasing temperature change K, when pressure and concentration do not?', a: 'Because K is temperature-dependent by definition. For an endothermic reaction K increases with temperature; for an exothermic one K decreases.', explain: 'Treat heat as a reactant in an endothermic reaction and as a product in an exothermic one, then apply Le Châtelier. Concentration and pressure changes shift the POSITION of equilibrium so the same K is satisfied again — only temperature alters the constant itself.' },
    { q: 'Why does diluting a buffer barely change its pH?', a: 'Because dilution reduces [HA] and [A⁻] by the same factor, so their RATIO is unchanged — and pH depends on that ratio, not on the absolute concentrations.', explain: 'A neat consequence of the Henderson–Hasselbalch relationship, and a favourite exam question. Note the limit: dilute far enough and buffer capacity becomes too small to absorb any real addition of acid or base, even though the pH held up under dilution alone.' },
  ],

  sections: [
    /* ============================================ 0 CONNECTIONS */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'This standard uses many subscripted K values and log-scale quantities. Here is what each actually means.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in aqueous equilibria', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: '⇌ <span class="xs">(double half-arrow)</span>', def: 'A <strong>reversible reaction at equilibrium</strong> — both directions occur at once. Different from →, which means the reaction goes essentially to completion.' },
          { term: 'K <span class="xs">(equilibrium constant)</span>', def: 'The ratio of products to reactants at equilibrium, each raised to its coefficient. Large K means products are favoured.', note: 'K changes ONLY with temperature. Concentration and pressure shift the position of equilibrium, not K.' },
          { term: 'K<sub>a</sub> / K<sub>b</sub>', def: 'Acid and base <strong>dissociation constants</strong> — how far a weak acid or base ionises. Larger K<sub>a</sub> = stronger acid.', note: 'For a conjugate pair, K<sub>a</sub> × K<sub>b</sub> = K<sub>w</sub>.' },
          { term: 'K<sub>w</sub>', def: 'The <strong>ionic product of water</strong>: [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C.' },
          { term: 'K<sub>s</sub> <span class="xs">(solubility product)</span>', def: 'The equilibrium constant for a sparingly soluble solid dissolving. A precipitate forms when the ionic product exceeds K<sub>s</sub>.' },
          { term: 'p <span class="xs">(the p in pH, pK<sub>a</sub>, pOH)</span>', def: 'An operator meaning <strong>−log₁₀</strong>. pH = −log[H⁺]; pK<sub>a</sub> = −log K<sub>a</sub>.', note: 'The minus sign INVERTS the scale: a smaller pK<sub>a</sub> means a larger K<sub>a</sub>, i.e. a stronger acid.' },
          { term: '[X] <span class="xs">(square brackets)</span>', def: 'The <strong>concentration</strong> of X in mol L⁻¹. [H⁺] is the hydrogen-ion concentration.', note: 'Here square brackets always mean concentration, not mathematical grouping.' },
          { term: 'mol L⁻¹', def: 'Moles per litre. The ⁻¹ means “per”, so L⁻¹ is “per litre”.' },
        ]},
        { t: 'tip', title: 'Reading a negative superscript', html: 'A superscript −1 means “per”. mol L⁻¹ = moles per litre; J K⁻¹ mol⁻¹ = joules per kelvin per mole; cm⁻¹ = per centimetre. It is division, written compactly.' },
      ],
    },
    {
      id: 'connections', num: '0', title: 'How this connects to your other standards',
      intro: 'Aqueous equilibria is where thermochemistry, redox and organic all cash out in real solutions.',
      blocks: [
        { t: 'connects', intro: 'The links that matter most for the external:', items: [
          { to: '#/topic/chem-91390', label: 'Thermochemical principles (91390) — WHY equilibria shift',
            why: 'Le Châtelier is really thermodynamics in disguise. A reaction reaches equilibrium exactly when ΔG = 0. Heating an endothermic dissolution (ΔH positive) shifts it right — that is the ΔG = ΔH − TΔS relationship in action. Kw itself increases with temperature because water’s self-ionisation is endothermic. If you understand ΔG, Le Châtelier stops being a rule to memorise.' },
          { to: '#/topic/chem-91393', label: 'Redox (91393) — E°cell is the redox version of ΔG',
            why: 'Both standards answer “will this reaction go?”. Here it is ΔG < 0 / Q vs K; there it is E°cell > 0. They are the same idea in different currency (ΔG = −nFE°). Redox titrations also use the exact mole-ratio reasoning you use in acid–base titrations.' },
          { to: '#/topic/chem-91391', label: 'Organic compounds (91391) — the weak acids are organic',
            why: 'Ethanoic acid, the classic weak acid in every Ka calculation, is an organic carboxylic acid. Knowing that –COOH is the acidic proton (not the C–H hydrogens) is organic knowledge you apply here.' },
          { to: '#/topic/chem-91387', label: 'Quantitative analysis (91387) — titration curves come alive',
            why: 'The internal has you physically perform the titration whose curve you interpret here. Indicator choice, equivalence point and concordant titres are the practical face of this theory.' },
        ]},
      ],
    },
    /* -------------------------------------------------- 1 water / pH */
    {
      id: 'water-ph', num: '1', title: 'Water, Kw and pH',
      blocks: [
        { t: 'formulas', title: 'The essentials', items: [
          { name: 'Ionic product of water', eq: 'K<sub>w</sub> = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴  (at 25 °C)', tex: 'K_w=[\\ce{H+}][\\ce{OH-}]=1.0\\times10^{-14}\\ \\text{(25 °C)}', note: 'Always true in aqueous solution. Increases with temperature (self-ionisation is endothermic).' },
          { name: 'pH and pOH', eq: 'pH = −log[H⁺]   ·   [H⁺] = 10⁻ᵖᴴ   ·   pH + pOH = 14', tex: '\\mathrm{pH}=-\\log[\\ce{H+}]\\qquad[\\ce{H+}]=10^{-\\mathrm{pH}}\\qquad \\mathrm{pH}+\\mathrm{pOH}=14', note: 'Neutral at 25 °C: pH 7. Acidic pH < 7, basic pH > 7.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'pH of a strong base', problem: 'Find the pH of 0.050 mol L⁻¹ NaOH.', steps: [
          'NaOH is strong ⟹ [OH⁻] = 0.050 mol L⁻¹.',
          '[H⁺] = K<sub>w</sub>/[OH⁻] = 1.0×10⁻¹⁴ / 0.050 = 2.0×10⁻¹³.',
          'pH = −log(2.0×10⁻¹³) = 12.7.',
        ], answer: 'pH = 12.7  (or: pOH = −log0.050 = 1.3, pH = 14 − 1.3 = 12.7).' },
      ],
    },

    /* -------------------------------------------------- 2 weak acids */
    {
      id: 'weak-acids', num: '2', title: 'Weak acids & bases (Ka, Kb)',
      blocks: [
        { t: 'p', html: `<strong>Strong</strong> acids/bases ionise completely; <strong>weak</strong> ones only partially, setting up an equilibrium. The extent is measured by <strong>K<sub>a</sub></strong> (acid) — larger K<sub>a</sub> (smaller pK<sub>a</sub>) = stronger acid.` },
        { t: 'formulas', items: [
          { name: 'Acid dissociation constant', eq: 'HA ⇌ H⁺ + A⁻    K<sub>a</sub> = [H⁺][A⁻] / [HA]', tex: '\\ce{HA <=> H+ + A^-}\\qquad K_a=\\frac{[\\ce{H+}][\\ce{A^-}]}{[\\ce{HA}]}', note: 'pK<sub>a</sub> = −log K<sub>a</sub>' },
          { name: 'pH of a weak acid (approximation)', eq: '[H⁺] = √(K<sub>a</sub> × c)', tex: '[\\ce{H+}]=\\sqrt{K_a\\,c}', note: 'Valid when dissociation is small (< ~5%): assumes [HA] ≈ initial c and [H⁺] ≈ [A⁻].' },
          { name: 'Ka × Kb relationship', eq: 'K<sub>a</sub> × K<sub>b</sub> = K<sub>w</sub>  (for a conjugate acid–base pair)', tex: 'K_a\\times K_b=K_w', note: 'Lets you find Kb of the conjugate base from Ka.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'pH of a weak acid', problem: 'Find the pH of 0.10 mol L⁻¹ ethanoic acid, K<sub>a</sub> = 1.8×10⁻⁵.', steps: [
          '[H⁺] = √(K<sub>a</sub> × c) = √(1.8×10⁻⁵ × 0.10) = √(1.8×10⁻⁶).',
          '[H⁺] = 1.34×10⁻³ mol L⁻¹.',
          'pH = −log(1.34×10⁻³) = 2.87.',
          'Check dissociation: 1.34×10⁻³ / 0.10 = 1.3% (< 5%, so the approximation is valid).',
        ], answer: 'pH = 2.87.' },
        { t: 'mistake', title: 'Weak ≠ dilute', html: 'A <em>weak</em> acid is one that partially ionises (small K<sub>a</sub>); a <em>dilute</em> acid just has a low concentration. A concentrated weak acid and a dilute strong acid can have the same pH for very different reasons.' },
      ],
    },

    /* -------------------------------------------------- 3 buffers */
    {
      id: 'buffers', num: '3', title: 'Buffers',
      video: 'NCEA Level 3 chemistry buffers pH calculations',
      blocks: [
        { t: 'p', html: `A <strong>buffer</strong> resists pH change when small amounts of acid or base are added. It’s a mixture of a <strong>weak acid and its conjugate base</strong> (e.g. CH₃COOH / CH₃COO⁻) in comparable amounts.` },
        { t: 'tip', title: '🧠 Mnemonic — buffers', html: '<strong>“A buffer is a <u>couple</u> that argues but never leaves.”</strong> You need a weak acid AND its conjugate base together (a conjugate <em>pair</em>) in similar amounts. Add acid → the base partner absorbs it; add base → the acid partner absorbs it. The pH barely moves.<br><br>🧠 And: <strong>“pH = pKa when it’s 50:50.”</strong> Equal amounts of HA and A⁻ ⟹ the log term is zero ⟹ pH = pKa. That’s also the half-equivalence point on a titration curve.' },
        { t: 'key', title: 'How a buffer works', items: [
          'Add <strong>acid (H⁺)</strong>: the conjugate base A⁻ mops it up →  A⁻ + H⁺ → HA.',
          'Add <strong>base (OH⁻)</strong>: the weak acid HA neutralises it →  HA + OH⁻ → A⁻ + H₂O.',
          'Both HA and A⁻ are present in large reserves, so the ratio [A⁻]/[HA] barely changes ⟹ pH barely changes.',
        ]},
        { t: 'formulas', items: [
          { name: 'Henderson–Hasselbalch', eq: 'pH = pK<sub>a</sub> + log( [A⁻] / [HA] )', tex: '\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{[\\ce{A^-}]}{[\\ce{HA}]}', note: 'When [A⁻] = [HA], pH = pK<sub>a</sub>. Choose an acid with pK<sub>a</sub> near the target pH.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Buffer pH', problem: 'A buffer is 0.20 mol L⁻¹ ethanoic acid + 0.30 mol L⁻¹ sodium ethanoate. K<sub>a</sub> = 1.8×10⁻⁵.', steps: [
          'pK<sub>a</sub> = −log(1.8×10⁻⁵) = 4.74.',
          'pH = pK<sub>a</sub> + log([A⁻]/[HA]) = 4.74 + log(0.30/0.20).',
          'pH = 4.74 + log(1.5) = 4.74 + 0.18 = 4.92.',
        ], answer: 'pH = 4.92.' },
      ],
    },

    /* -------------------------------------------------- 4 salts */
    {
      id: 'salts', num: '4', title: 'pH of salt solutions',
      blocks: [
        { t: 'tip', title: '🧠 Mnemonic — salt pH', html: '<strong>“The <u>weak</u> parent wins the argument.”</strong> Whichever parent (acid or base) was weak controls the pH of the salt. Weak acid + strong base → the anion is basic → <strong>pH &gt; 7</strong>. Strong acid + weak base → the cation is acidic → <strong>pH &lt; 7</strong>. Both strong → neutral.' },
        { t: 'key', title: 'Predicting salt pH', items: [
          'Salt of <strong>strong acid + strong base</strong> (e.g. NaCl) → <strong>neutral</strong> (pH 7).',
          'Salt of <strong>weak acid + strong base</strong> (e.g. CH₃COONa) → <strong>basic</strong>; the anion is a conjugate base (A⁻ + H₂O ⇌ HA + OH⁻).',
          'Salt of <strong>strong acid + weak base</strong> (e.g. NH₄Cl) → <strong>acidic</strong>; the cation donates H⁺ (NH₄⁺ ⇌ NH₃ + H⁺).',
        ]},
        { t: 'tip', title: 'Think “which parent was weak”', html: 'The ion from the <em>weak</em> parent hydrolyses water and controls the pH. Weak-acid anion → basic; weak-base cation → acidic.' },
      ],
    },

    /* -------------------------------------------------- 5 solubility */
    {
      id: 'solubility', num: '5', title: 'Solubility & solubility product (Ks)',
      blocks: [
        { t: 'p', html: `For a sparingly soluble salt, a saturated solution is at equilibrium with the solid. The <strong>solubility product K<sub>s</sub></strong> (Ksp) is the product of ion concentrations, each raised to its coefficient.` },
        { t: 'formulas', items: [
          { name: 'General', eq: 'AₓBᵧ(s) ⇌ x Aⁿ⁺ + y Bᵐ⁻    K<sub>s</sub> = [Aⁿ⁺]ˣ[Bᵐ⁻]ʸ', tex: '\\mathrm{A}_x\\mathrm{B}_y(s)\\rightleftharpoons x\\,\\mathrm{A}^{n+}+y\\,\\mathrm{B}^{m-}\\qquad K_s=[\\mathrm{A}^{n+}]^x[\\mathrm{B}^{m-}]^y', note: 'Pure solids are not in the expression.' },
          { name: 'AgCl (1:1)', eq: 'K<sub>s</sub> = [Ag⁺][Cl⁻] = s²', tex: 'K_s=[\\ce{Ag+}][\\ce{Cl-}]=s^2', note: 's = molar solubility. So s = √K<sub>s</sub>.' },
          { name: 'Mg(OH)₂ (1:2)', eq: 'K<sub>s</sub> = [Mg²⁺][OH⁻]² = (s)(2s)² = 4s³', tex: 'K_s=[\\ce{Mg^2+}][\\ce{OH-}]^2=(s)(2s)^2=4s^3', note: 's = ∛(K<sub>s</sub>/4).' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Solubility from Ks', problem: 'K<sub>s</sub>(Mg(OH)₂) = 6.0×10⁻¹². Find its molar solubility s.', steps: [
          'Dissolving: Mg(OH)₂ ⇌ Mg²⁺ + 2OH⁻. If s dissolves, [Mg²⁺] = s and [OH⁻] = 2s.',
          'K<sub>s</sub> = [Mg²⁺][OH⁻]² = s(2s)² = 4s³.',
          's³ = K<sub>s</sub>/4 = 6.0×10⁻¹²/4 = 1.5×10⁻¹².',
          's = ∛(1.5×10⁻¹²) = 1.14×10⁻⁴ mol L⁻¹.',
        ], answer: 's = 1.1×10⁻⁴ mol L⁻¹.' },
        { t: 'tip', title: '🧠 Mnemonic — will it precipitate?', html: '<strong>“<u>Q</u> beats <u>K</u>, it goes a<u>way</u>.”</strong> If the ionic product Q &gt; Ks, the solution is over-saturated and a solid precipitates out. Q &lt; Ks → stays dissolved. Q = Ks → exactly saturated.<br><br>🧠 Common-ion effect: <strong>“Add a twin, less gets in.”</strong> Adding an ion already in the equilibrium pushes it left, so solubility drops.' },
        { t: 'key', title: 'Predicting precipitation & the common-ion effect', items: [
          'Calculate the <strong>ionic product</strong> Q with the actual concentrations. If <strong>Q &gt; K<sub>s</sub></strong> → precipitate forms; Q &lt; K<sub>s</sub> → stays dissolved; Q = K<sub>s</sub> → saturated.',
          '<strong>Common-ion effect:</strong> adding an ion already in the equilibrium shifts it left (Le Châtelier) → solubility <em>decreases</em>. e.g. AgCl is less soluble in NaCl solution.',
        ]},
      ],
    },

    /* -------------------------------------------------- 6 titrations */
    {
      id: 'titration-curves', num: '6', title: 'Titration curves',
      blocks: [
        { t: 'key', title: 'Reading the curve', items: [
          'The <strong>equivalence point</strong> is where moles acid = moles base (steep vertical jump).',
          'Strong acid + strong base: equivalence at <strong>pH 7</strong>.',
          'Weak acid + strong base: equivalence is <strong>basic</strong> (&gt; 7, the salt is a conjugate base).',
          'Strong acid + weak base: equivalence is <strong>acidic</strong> (&lt; 7).',
          'At the <strong>half-equivalence point</strong> for a weak acid, [HA] = [A⁻], so <strong>pH = pK<sub>a</sub></strong> — a buffer region.',
        ]},
        { t: 'p', html: `<strong>Indicator choice:</strong> pick an indicator whose colour-change range lies within the steep vertical part of the curve. Phenolphthalein (8.3–10) suits weak acid–strong base; methyl orange (3.1–4.4) suits strong acid–weak base.` },
        { t: 'tip', title: 'Half-equivalence trick', html: 'To find K<sub>a</sub> of a weak acid from a titration curve: read the pH at exactly half the volume needed to reach equivalence — that pH equals pK<sub>a</sub>.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Chemistry L3 (91392) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91392&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'No Brain Too Small — Aqueous equilibria', url: 'https://www.nobraintoosmall.co.nz/html/senior_chemistry/NCEA3_chemistry.html', note: 'pH, buffers and solubility questions by topic', verified: true },
  ],

  quiz: [
    { type: 'sa', q: 'What is the pH of 0.010 mol L⁻¹ HCl (a strong acid)? Give to 1 dp.', accept: ['2', '2.0'], answer: 'pH = 2.0', explanation: 'Strong acid: [H⁺] = 0.010 = 1.0×10⁻². pH = −log(10⁻²) = 2.0.' },
    { type: 'mc', q: 'A buffer is made from a weak acid HA and its salt NaA. Adding a small amount of NaOH causes:', choices: ['A large pH rise', 'HA to neutralise the OH⁻, small pH change', 'The buffer to stop working immediately', 'A⁻ to react with OH⁻'], answer: 1, explanation: 'The weak acid HA reacts with added OH⁻ (HA + OH⁻ → A⁻ + H₂O), so the pH changes only slightly.' },
    { type: 'mc', q: 'For Mg(OH)₂, Ks = [Mg²⁺][OH⁻]². In terms of solubility s, Ks equals:', choices: ['s²', '2s²', '4s³', 's³'], answer: 2, explanation: '[Mg²⁺] = s and [OH⁻] = 2s, so Ks = s·(2s)² = 4s³.' },
    { type: 'mc', q: 'At the half-equivalence point of a weak acid–strong base titration:', choices: ['pH = 7', 'pH = pKa', 'pH = 14', '[H⁺] = 0'], answer: 1, explanation: 'Half-neutralised means [HA] = [A⁻], so by Henderson–Hasselbalch pH = pKa.' },
    { type: 'mc', q: 'An aqueous solution of NH₄Cl (from a strong acid + weak base) is:', choices: ['Neutral', 'Acidic', 'Basic', 'A buffer'], answer: 1, explanation: 'NH₄⁺ is the conjugate acid of the weak base NH₃; it donates H⁺ (NH₄⁺ ⇌ NH₃ + H⁺), making the solution acidic.' },

    /* ---- application & calculation-reasoning questions ---- */
    { type: 'mc', q: 'Equal concentrations (0.1 mol L⁻¹) of HCl and CH₃COOH are compared. Which statement is correct?', choices: ['They have the same pH because the concentrations are equal', 'HCl has the lower pH because it is fully dissociated', 'CH₃COOH has the lower pH because it is more concentrated', 'Both are strong acids'], answer: 1, explanation: 'Concentration and strength are different properties. HCl dissociates completely, giving [H₃O⁺] = 0.1; ethanoic acid dissociates only slightly, so its [H₃O⁺] is far lower and its pH higher. This distinction is tested almost every year.' },
    { type: 'mc', q: 'Acid A has pKa 3.75; acid B has pKa 4.76. Which is stronger, and why?', choices: ['B, because a larger pKa means more dissociation', 'A, because a smaller pKa means a larger Ka and more dissociation', 'They are equal', 'It depends on concentration'], answer: 1, explanation: 'pKa = −log Ka, so smaller pKa means larger Ka means stronger acid. The negative logarithm inverts the ordering — the same reason a lower pH means a MORE acidic solution.' },
    { type: 'mc', q: 'A titration curve of a weak acid with NaOH has its equivalence point at pH 8.8. The best indicator is:', choices: ['Methyl orange (3.1–4.4)', 'Phenolphthalein (8.3–10.0)', 'Bromothymol blue (6.0–7.6)', 'Any of them'], answer: 1, explanation: 'The indicator\'s range must lie within the steep vertical section so the end point coincides with equivalence. Phenolphthalein brackets pH 8.8; methyl orange would change colour far too early, giving a titre that is much too small.' },
    { type: 'mc', q: 'Which mixture is a buffer?', choices: ['0.1 mol L⁻¹ HCl alone', '0.1 mol L⁻¹ CH₃COOH + 0.1 mol L⁻¹ CH₃COONa', '0.1 mol L⁻¹ NaOH alone', '0.1 mol L⁻¹ NaCl'], answer: 1, explanation: 'A buffer needs appreciable amounts of BOTH a weak acid and its conjugate base, so it can neutralise added base (via CH₃COOH) and added acid (via CH₃COO⁻). A strong acid or base alone has no conjugate reservoir; NaCl is a neutral salt of two strong parents.' },
    { type: 'mc', q: 'A catalyst is added to an equilibrium mixture at constant temperature. The result is:', choices: ['K increases', 'The yield of product increases', 'Equilibrium is reached faster, with K and the position unchanged', 'The equilibrium shifts left'], answer: 2, explanation: 'A catalyst lowers the activation energy of the forward and reverse reactions equally, so both rates increase by the same factor and the equilibrium ratio is unaffected. It changes how fast you get there, never where you end up.' },
    { type: 'mc', q: 'A solution of NaCH₃COO in water is:', choices: ['Acidic', 'Neutral', 'Basic, because CH₃COO⁻ hydrolyses to give OH⁻', 'A buffer'], answer: 2, explanation: 'It is the salt of a WEAK acid and a STRONG base. The acetate ion is the conjugate base of a weak acid, so it hydrolyses: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻. The sodium ion, being the conjugate of a strong base, does nothing.' },
    { type: 'mc', q: 'AgCl is dissolved in water, and then solid NaCl is added. The solubility of AgCl:', choices: ['Increases, because there are more ions', 'Decreases, because the common ion raises the ionic product so equilibrium shifts toward the solid', 'Is unchanged, because Ks is constant', 'Becomes zero'], answer: 1, explanation: 'The common-ion effect. Adding Cl⁻ pushes the ionic product above Ks, so AgCl precipitates until the product returns to Ks. Note the distinction the third option is testing: Ks genuinely is unchanged — it is the SOLUBILITY, not the constant, that falls.' },
    { type: 'mc', q: 'For an exothermic reaction, raising the temperature will:', choices: ['Increase K and the yield', 'Decrease K and the yield', 'Leave K unchanged but speed up the reaction', 'Have no effect'], answer: 1, explanation: 'Treat heat as a product: adding heat shifts the equilibrium left, reducing yield, and temperature is the ONE variable that actually changes the value of K. This is the industrial compromise behind the Haber process — a lower temperature would give a better yield but an unusably slow rate.' },
    { type: 'mc', q: 'A buffer is diluted tenfold with water. Its pH:', choices: ['Rises by 1', 'Falls by 1', 'Stays almost the same, because the acid:base ratio is unchanged', 'Becomes 7'], answer: 2, explanation: 'Both [HA] and [A⁻] fall by the same factor, so their ratio — which is what sets the pH — is unchanged. Buffer CAPACITY does fall, so the diluted buffer will cope with much less added acid or base before its pH breaks.' },
    { type: 'sa', q: 'At the half-equivalence point of a weak acid titration, pH equals what quantity?', accept: ['pka', 'pKa', 'the pka'], answer: 'pKa', explanation: 'Half the acid has been converted to its conjugate base, so [HA] = [A⁻] and the log term vanishes. This gives you a direct experimental route to pKa: find the equivalence volume, halve it, and read off the pH.' },
    { type: 'sa', q: 'What must be true of the ionic product compared with Ks for a precipitate to form?', accept: ['greater than ks', 'greater', 'ionic product > ks', 'exceeds ks', 'bigger than ks', '>ks'], answer: 'the ionic product must be greater than Ks', explanation: 'Remember to account for dilution when two solutions are mixed — recalculate both concentrations using the combined volume before evaluating the ionic product, or you will overestimate it.' },
  ],
};

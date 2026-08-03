/* ============================================================================
   AS 91387. Investigation involving quantitative analysis (Internal, 4 credits)
   Titrations · gravimetric / colorimetric analysis · moles · uncertainty
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for, UNLESS the same content is examined
     elsewhere. Titration technique, mole ratios and uncertainty all reappear in the
     91392 aqueous-equilibrium exam (titration curves, finding Ka).
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['chem-91392'],

  title: 'Investigation involving quantitative analysis',
  tags: ['Titration', 'Moles', 'Uncertainty', 'Method'],
  intro: 'A practical internal: you carry out a quantitative analysis (usually a titration) and process the data with proper mole calculations and uncertainty. Merit/Excellence comes from precise technique and honest evaluation of reliability.',

  flashcards: [
    { q: 'Why rinse a conical flask with distilled water only (not the analyte)?', a: 'Extra water does not change the NUMBER OF MOLES of analyte present', explain: 'Moles, not concentration, determine the titre. Rinsing with analyte would add extra moles and inflate your result.' },
    { q: 'What is a primary standard, and what makes a good one?', a: 'A reagent of accurately known concentration: must be pure, stable, non-hygroscopic, high molar mass', explain: 'e.g. anhydrous sodium carbonate. NaOH is NOT a primary standard: it absorbs water and CO₂ from the air.' },
    { q: 'State the correct technique for reading a meniscus', a: 'Read the BOTTOM of the meniscus at eye level', explain: 'Reading at an angle causes parallax error, a systematic error that biases every titre the same way.' },
    { q: 'How do you reduce percentage uncertainty in a titration?', a: 'Measure larger volumes (a bigger titre), and use more precise glassware', explain: 'Absolute uncertainty is roughly fixed (±0.05 mL per reading), so a larger titre makes that a smaller PERCENTAGE.' },
    { q: 'Why is a pipette more accurate than a measuring cylinder?', a: 'It is calibrated to deliver one fixed volume with a much smaller tolerance', explain: 'A 25.00 mL pipette is typically ±0.03 mL; a measuring cylinder might be ±0.5 mL, over ten times worse.' },

    { q: 'State the units required for each term in n = c × V', a: 'n in mol, c in mol L⁻¹, V in LITRES', explain: 'Convert mL → L by dividing by 1000 first.' },
    { q: 'n = m / M gives…', a: 'moles from mass (M = molar mass, g mol⁻¹)', explain: '' },
    { q: 'State how percentage uncertainties combine when quantities are multiplied or divided', a: 'Add the individual % uncertainties', explain: 'Then convert back to an absolute value for the final answer.' },
    { q: 'Rinse the burette with… and the pipette with…', a: 'Burette with the titrant; pipette with the analyte', explain: 'Prevents dilution errors.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: accuracy vs precision', a: '<strong>Accuracy</strong> = how close a result is to the true value. <strong>Precision</strong> = how closely repeated measurements agree with each other.', explain: 'They are independent, and a titration can be precise but inaccurate. Concordant titres every time, all wrong because the standard solution was mis-made. Concordance demonstrates PRECISION only. Accuracy needs a correct method, correctly standardised solutions and correctly calibrated glassware, and saying so is what earns Merit in an evaluation.' },
    { q: 'TELL THEM APART: random error vs systematic error', a: '<strong>Random</strong> errors scatter results either side of the true value and are reduced by repeating and averaging. <strong>Systematic</strong> errors shift every result the same way and are NOT reduced by repeating.', explain: 'This distinction drives your whole evaluation section. An uncalibrated burette or an unstandardised solution is systematic. More repeats will not help, and only a change of method or calibration will. Judging end point colour slightly differently each time is random. Classify each error you discuss, then say how it could actually be fixed.' },
    { q: 'TELL THEM APART: rinsing the burette vs rinsing the conical flask', a: 'Rinse the <strong>burette</strong> with the titrant and the <strong>pipette</strong> with the analyte. Rinse the <strong>conical flask</strong> with DISTILLED WATER only.', explain: 'The logic is about moles. Residual water in the burette or pipette would dilute the solution being delivered, changing its concentration and hence the titre. Water in the flask does not matter because it changes the volume but NOT the number of moles of analyte present, and moles are what the calculation uses.' },
    { q: 'TELL THEM APART: equivalence point vs end point in a practical write-up', a: '<strong>Equivalence</strong> is the theoretical point where moles react exactly. <strong>End point</strong> is where you observe the indicator change.', explain: 'The gap between them is the indicator error, a genuine systematic error worth naming in an evaluation. Minimise it by choosing an indicator whose range lies in the steep part of the curve, and by taking the very first persistent colour change rather than a definite deep colour.' },

    /* ---- method & evaluation depth ---- */
    { q: 'Why do you average only CONCORDANT titres?', a: 'Because titres within 0.1 mL of each other demonstrate precision; including an outlier that disagrees would drag the mean toward a result you have reason to distrust.', explain: 'The usual outlier is the rough titre, where you overshoot to locate the approximate end point. State the concordance criterion explicitly in your method: "titres agreeing within 0.10 mL were averaged", because the marking schedule looks for the standard, not just the practice.' },
    { q: 'What is a primary standard, and what four properties must it have?', a: 'A substance pure and stable enough to make a solution of accurately known concentration directly by weighing. It must be: very pure, stable in air (not hygroscopic or oxidised), of high molar mass, and readily soluble.', explain: 'High molar mass matters because weighing errors are a smaller PERCENTAGE of a larger mass. Sodium carbonate and potassium hydrogen phthalate qualify; sodium hydroxide does not, because it absorbs water and CO₂ from the air, which is exactly why NaOH must be standardised against a primary standard rather than trusted from its weighed mass.' },
    { q: 'How do you combine percentage uncertainties through a titration calculation?', a: 'Convert each absolute uncertainty to a percentage, ADD the percentages for quantities that are multiplied or divided, then convert back to an absolute uncertainty at the end.', explain: 'Remember that a burette reading involves TWO readings (initial and final), so its absolute uncertainty is doubled, ±0.05 mL each gives ±0.10 mL on the titre. Identifying which measurement contributes the largest percentage tells you exactly what to improve, and saying so turns a calculation into an evaluation.' },
    { q: 'Explain why a 10 mL titre carries a larger percentage uncertainty than a 25 mL titre, and calculate both.', a: 'Because the absolute uncertainty (≈±0.10 mL) is fixed, so it forms a bigger fraction of a small titre. Aim for titres in the 20–30 mL range by adjusting concentrations or the aliquot volume.', explain: 'A 10 mL titre carries about 1% uncertainty from the burette alone; a 25 mL titre carries about 0.4%. This is one of the most concrete, quantified improvements you can suggest in an evaluation: far stronger than "be more careful".' },
    { q: 'What are the essential steps in making a standard solution accurately?', a: 'Weigh accurately by difference; dissolve fully in a beaker with less than the final volume; transfer quantitatively, rinsing the beaker and stirring rod into the flask; make up to the mark with the meniscus on the line at eye level; stopper and invert repeatedly to mix.', explain: 'The two steps students omit are the rinsings (any solute left behind lowers the true concentration. A systematic error) and the final inversions (an unmixed flask gives a concentration gradient, so aliquots drawn from the top are unrepresentative).' },
    { q: 'Why must a colorimeter be zeroed with a blank, and what should the blank contain?', a: 'To subtract absorbance due to the solvent and the cuvette itself, so that the measured absorbance is due only to the analyte. The blank should contain everything EXCEPT the species being measured.', explain: 'Beer\'s law (A = εcl) assumes absorbance is proportional to the analyte concentration alone. Using pure water when your samples contain other absorbing reagents leaves a constant offset in every reading, a systematic error that shifts the entire calibration line.' },
    { q: 'In gravimetric analysis, why do you heat to CONSTANT mass?', a: 'Because a single heating may leave residual water or solvent; reheating and reweighing until two consecutive masses agree proves that all volatile material has been driven off.', explain: 'Stopping too early leaves water in the sample and gives a mass that is too high: a systematic error that inflates your calculated result. The same "to constant mass" logic applies to drying a precipitate before weighing it.' },
  ],

  sections: [
    /* ============================================ 0 CONNECTIONS */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Titration and gravimetric work is mostly units. Getting these straight is most of the accuracy.',
      blocks: [
        { t: 'definitions', title: 'Symbols and units in quantitative analysis', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'n', def: '<strong>Number of moles</strong> (mol). n = c × V for a solution, n = m ÷ M for a solid.' },
          { term: 'c', def: '<strong>Concentration</strong> in mol L⁻¹ (moles per litre), sometimes written M.', note: 'If a volume is given in mL you MUST convert to litres before using n = cV.' },
          { term: 'V', def: '<strong>Volume</strong>. In n = cV it must be in <strong>litres</strong>, not millilitres.' },
          { term: 'm and M', def: 'Lower-case <strong>m</strong> = mass in grams. Capital <strong>M</strong> = molar mass in g mol⁻¹. n = m ÷ M.', note: 'Case matters: m and M are different quantities.' },
          { term: 'mol L⁻¹ / g mol⁻¹', def: 'The ⁻¹ means “per”. mol L⁻¹ = moles per litre; g mol⁻¹ = grams per mole.' },
          { term: '± <span class="xs">(plus-or-minus)</span>', def: 'The <strong>absolute uncertainty</strong> on a measurement. 25.00 ± 0.05 mL means the true value lies between 24.95 and 25.05.' },
          { term: 'Concordant', def: 'Titres agreeing within <strong>0.10 mL</strong> of each other. Only concordant titres are averaged.' },
          { term: 'Aliquot / titre', def: '<strong>Aliquot</strong> = the measured volume pipetted into the flask. <strong>Titre</strong> = the volume delivered from the burette.' },
          { term: '3 s.f. <span class="xs">(significant figures)</span>', def: 'How many digits carry real information. Match the least precise measurement; quote uncertainty to one significant figure.' },
        ]},
        { t: 'tip', title: 'The unit trap', html: 'n = cV needs LITRES. A burette reads millilitres. Dividing by 1000 at the right moment is the single most common place marks are lost in this standard.' },
      ],
    },
    {
      id: 'connections', num: '0', title: 'How this connects to your other standards',
      intro: 'This internal is where the theory becomes something you physically do, and it borrows from almost every other standard.',
      blocks: [
        { t: 'connects', intro: 'What this internal draws on:', items: [
          { to: '#/topic/chem-91392', label: 'Aqueous equilibria (91392): the theory behind your titration',
            why: 'Your titration curve, equivalence point and indicator choice are all 91392 content. Titrating a weak acid with a strong base gives a BASIC equivalence point (pH > 7), which is why phenolphthalein is correct and methyl orange is not. Do the theory and you stop guessing indicators.' },
          { to: '#/topic/chem-91388', label: 'Spectroscopic data (91388): the other analysis internal',
            why: 'Two halves of analytical chemistry: this one measures HOW MUCH (concentration), 91388 identifies WHAT (structure). Both require careful evidence, uncertainty and evaluation. If your unknown needs identifying first, colorimetry and spectroscopy overlap directly.' },
          { to: '#/topic/chem-91393', label: 'Redox (91393): if you do a redox titration',
            why: 'MnO₄⁻ (self-indicating, first permanent pink) or iodine/thiosulfate titrations need balanced half-equations to get the mole ratio right. Get the half-equation wrong and every calculation after it is wrong.' },
          { to: '#/topic/chem-91391', label: 'Organic compounds (91391): what you are often titrating',
            why: 'Ethanoic acid, citric acid and aspirin are common analytes. Knowing which proton is acidic (–COOH) tells you the mole ratio per molecule. Vital when a diprotic or triprotic acid appears.' },
        ]},
      ],
    },
    {
      id: 'moles', num: '1', title: 'Core mole calculations',
      video: 'NCEA Level 3 chemistry titration calculations moles uncertainty',
      blocks: [
        { t: 'formulas', title: 'The relationships you’ll use constantly', items: [
          { name: 'Moles from concentration', eq: 'n = c × V', tex: 'n=cV', note: 'V in litres. c in mol L⁻¹.' },
          { name: 'Moles from mass', eq: 'n = m / M', tex: 'n=\\frac{m}{M}', note: 'M = molar mass (g mol⁻¹).' },
          { name: 'Titration link', eq: 'n(A) / n(B) = ratio from the balanced equation', tex: '\\frac{n(\\text{A})}{n(\\text{B})}=\\text{ratio from the balanced equation}', note: 'Use the equation’s coefficients to convert between the two reactants.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'A standard titration calculation', problem: '25.0 mL of NaOH is neutralised by 22.4 mL of 0.100 mol L⁻¹ HCl. Find [NaOH].', steps: [
          'n(HCl) = c×V = 0.100 × 0.0224 = 2.24×10⁻³ mol.',
          'HCl + NaOH → NaCl + H₂O, ratio 1:1, so n(NaOH) = 2.24×10⁻³ mol.',
          'c(NaOH) = n/V = 2.24×10⁻³ / 0.0250 = 0.0896 mol L⁻¹.',
        ], answer: '[NaOH] = 0.0896 mol L⁻¹ (≈ 0.090 mol L⁻¹).' },
      ],
    },
    {
      id: 'technique', num: '2', title: 'Titration technique (for Merit/Excellence)',
      blocks: [
        { t: 'key', title: 'Good practice that earns marks', items: [
          'Rinse burette with the titrant, pipette with the analyte (avoids dilution errors).',
          'Do a rough titration first, then <strong>concordant</strong> titres (within 0.1 mL) and average only those.',
          'Read the burette to the bottom of the meniscus at eye level (0.05 mL precision).',
          'Swirl constantly; add dropwise near the endpoint; the endpoint is the <em>first permanent</em> colour change.',
          'Use an appropriate indicator for the acid/base strength (e.g. phenolphthalein for strong base–weak acid).',
        ]},
      ],
    },
    {
      id: 'uncertainty', num: '3', title: 'Uncertainty & evaluation',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Combining uncertainties (for × and ÷)', eq: '% uncertainty of result = Σ (% uncertainties of each measurement)', note: 'Add the relative (%) uncertainties of every measured quantity.' },
          { name: 'Absolute from percent', eq: 'absolute = (% / 100) × value', tex: '\\text{absolute}=\\frac{\\%}{100}\\times\\text{value}', note: 'Report the final answer as value ± absolute uncertainty.' },
        ]},
        { t: 'key', title: 'Evaluating reliability', items: [
          'Identify the <strong>largest</strong> source of uncertainty (often the smallest volume measured) and how to reduce it.',
          'Distinguish <strong>random</strong> errors (scatter, reduce by repeats) from <strong>systematic</strong> errors (bias, e.g. uncalibrated glassware).',
          'Comment on concordance of titres as evidence of precision.',
        ]},
        { t: 'note', title: 'Colorimetric / gravimetric options', html: 'The internal may instead use <strong>colorimetry</strong> (absorbance ∝ concentration, calibration curve, Beer–Lambert) or <strong>gravimetric</strong> analysis (precipitate, filter, dry to constant mass). The mole reasoning is the same. Measure a quantity, convert to moles, use the ratio.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, Chemistry L3 (91387) assessment resources', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91387', note: 'Internal assessment resources, exemplars & conditions', verify: true },
  ],

  quiz: [
    { type: 'sa', q: '20.0 mL of HCl is neutralised by 18.0 mL of 0.050 mol L⁻¹ NaOH (1:1). What is [HCl] in mol L⁻¹? (3 sf)', accept: ['0.045', '0.0450'], answer: '0.045 mol L⁻¹', explanation: 'n(NaOH) = 0.050 × 0.0180 = 9.0×10⁻⁴ mol = n(HCl). c = 9.0×10⁻⁴ / 0.0200 = 0.045 mol L⁻¹.' },
    { type: 'mc', q: 'Why average only concordant titres?', choices: ['To use more decimal places', 'They agree within 0.1 mL, showing precision and excluding the rough titre', 'It is required by law', 'To make the number smaller'], answer: 1, explanation: 'Concordant titres (within ~0.1 mL) are precise and repeatable; averaging them excludes the less accurate rough run.' },

    /* ---- application & evaluation questions ---- */
    { type: 'mc', q: 'A student\'s four titres are 24.15, 24.20, 24.18 and 24.17 mL, but the true value is 25.60 mL. The results are:', choices: ['Accurate and precise', 'Precise but not accurate', 'Accurate but not precise', 'Neither'], answer: 1, explanation: 'The titres agree closely with each other (precise) but are consistently far from the true value (not accurate). A consistent offset like this points to a SYSTEMATIC error, most likely a mis-made standard solution or uncalibrated glassware, and repeating the titration will not fix it.' },
    { type: 'mc', q: 'Which error would NOT be reduced by doing more repeats?', choices: ['Slight variation in judging the end point colour', 'Small differences in reading the meniscus', 'An unstandardised NaOH solution that is more dilute than assumed', 'Occasional drops clinging to the burette tip'], answer: 2, explanation: 'A wrongly assumed concentration shifts every single result in the same direction: a systematic error. Averaging more of the same biased measurements cannot remove it; only standardising the solution against a primary standard will.' },
    { type: 'mc', q: 'A conical flask is rinsed with distilled water and some remains before the aliquot is added. The effect on the titre is:', choices: ['It increases', 'It decreases', 'No effect, because the number of moles of analyte is unchanged', 'It becomes unpredictable'], answer: 2, explanation: 'The extra water dilutes the solution but adds no analyte and removes none, so the moles requiring titration are identical and the titre is unaffected. Contrast this with water left in the BURETTE or PIPETTE, which dilutes the delivered solution and does change the result.' },
    { type: 'mc', q: 'Why is NaOH unsuitable as a primary standard?', choices: ['It is too soluble', 'Its molar mass is too high', 'It absorbs water and CO₂ from the air, so its weighed mass is not purely NaOH', 'It reacts too slowly'], answer: 2, explanation: 'Being hygroscopic and reacting with atmospheric CO₂, a weighed sample contains an unknown amount of water and carbonate, so you cannot calculate its concentration from mass alone. It must be standardised against a genuine primary standard such as potassium hydrogen phthalate.' },
    { type: 'mc', q: 'A titre of 25.00 mL is read from a burette with ±0.05 mL per reading. The percentage uncertainty in the titre is approximately:', choices: ['0.2%', '0.4%', '0.05%', '2%'], answer: 1, explanation: 'Two readings are required (initial and final), so the absolute uncertainty is ±0.10 mL. (0.10/25.00) × 100 = 0.4%. Forgetting to double the burette uncertainty halves the stated value and is a very common error.' },
    { type: 'mc', q: 'A student obtains titres of about 8 mL. The best improvement is to:', choices: ['Read the burette more carefully', 'Dilute the titrant or use a larger aliquot so titres fall in the 20–30 mL range', 'Use a different indicator', 'Repeat more times'], answer: 1, explanation: 'The burette\'s absolute uncertainty is fixed at about ±0.10 mL, so a small titre carries a much larger percentage uncertainty (≈1.3% at 8 mL versus ≈0.4% at 25 mL). Adjusting concentrations to land in the 20–30 mL window is a concrete, quantified improvement.' },
    { type: 'mc', q: 'A colorimeter is zeroed using pure water, but the samples also contain a coloured reagent. The result is:', choices: ['A random error in each reading', 'A systematic offset in every absorbance reading', 'No effect', 'Only the first reading is affected'], answer: 1, explanation: 'Every sample now includes absorbance from the reagent that was never subtracted, shifting the whole calibration consistently. The blank must contain everything EXCEPT the analyte so only the analyte\'s absorbance is measured.' },
    { type: 'sa', q: 'What is the maximum spread, in mL, for titres to be called concordant?', accept: ['0.1', '0.10', '0.1 ml', '0.10 ml'], answer: '0.10 mL', explanation: 'Titres agreeing within 0.10 mL are averaged; the rough titre and any outliers are excluded. State this criterion explicitly in your method. The marking schedule looks for the standard being applied, not just the arithmetic.' },
    { type: 'sa', q: 'In gravimetric analysis, what phrase describes reheating and reweighing until two masses agree?', accept: ['constant mass', 'heating to constant mass', 'to constant mass'], answer: 'heating to constant mass', explanation: 'It proves all volatile material has been driven off. Stopping after a single heating leaves residual water, giving a mass that is too high and a systematically inflated result.' },
  ],
};

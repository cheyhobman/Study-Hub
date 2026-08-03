/* ============================================================================
   AS 91391. Organic compounds (External, 5 credits)  ★ PRIORITY / WEAK AREA
   Functional groups · IUPAC naming · isomerism · reactions · pathways ·
   mechanisms (with curly-arrow SVGs) · practice bank
   ----------------------------------------------------------------------------
   This is the most built-out topic. Everything is data. Add rows to the
   tables, steps to the reaction map, or questions to the practice bank freely.
   ========================================================================== */




import { SN2_SVG, ADDITION_SVG, ELIM_SVG, ARROW_LEGEND } from './mechanisms-svg.js';

export default {
  title: 'Organic compounds',
  tags: ['Functional groups', 'IUPAC naming', 'Isomerism', 'Mechanisms', 'Pathways'],
  intro: 'The big external. You need to name compounds, recognise functional groups, predict products and reagents for reactions, interconvert functional groups (pathways), understand isomerism, and draw reaction mechanisms with curly arrows. This page builds all of that up. Take it section by section. It pairs directly with <a href="#/topic/chem-91388" data-link>Spectroscopic data →</a>, where you identify these compounds from their spectra.',

  /* ---- flashcards: reagents/conditions, naming, mechanisms, isomerism ---- */
  flashcards: [
    { q: 'General formula of an alkane / alkene?', a: 'Alkane CₙH₂ₙ₊₂ ; Alkene CₙH₂ₙ', explain: 'Each C=C or ring removes two hydrogens from the saturated formula, useful for working out degrees of unsaturation from a molecular formula.' },
    { q: 'What is a nucleophile?', a: 'An electron-pair DONOR, attracted to positive/δ+ centres', explain: 'Nucleophile = “nucleus-loving”. Examples: OH⁻, CN⁻, NH₃, H₂O. They all have a lone pair to donate.' },
    { q: 'What is an electrophile?', a: 'An electron-pair ACCEPTOR, attracted to electron-rich regions', explain: 'Electrophile = “electron-loving”. Examples: H⁺, the δ+ H of HBr, carbocations. They attack π bonds and lone pairs.' },
    { q: 'Rank the carbocation types in order of stability, most stable first', a: 'tertiary > secondary > primary > methyl', explain: 'Alkyl groups are electron-donating, so more of them spreads out (stabilises) the positive charge. This is exactly why Markovnikov addition happens.' },
    { q: 'Why does a 1° haloalkane react by SN2 rather than SN1?', a: 'Little steric hindrance, and a primary carbocation would be too unstable for SN1', explain: 'SN2 needs backside access to the carbon (easy for 1°). SN1 needs a stable carbocation (only good for 3°).' },
    { q: 'State the reagent and conditions: alkene → alkane', a: 'H₂ with a Ni catalyst (hydrogenation)', explain: 'An addition reaction. Used industrially to harden vegetable oils into margarine.' },
    { q: 'State the reagent for: alkene → dibromoalkane, and the colour change observed', a: 'Br₂. Bromine water goes orange → colourless', explain: 'Electrophilic addition across the C=C. This decolourisation is THE test for unsaturation.' },
    { q: 'Name the product of: haloalkane + excess NH₃', a: 'A primary amine', explain: 'Nucleophilic substitution: ammonia’s lone pair attacks. Excess NH₃ is used to stop further substitution making 2°/3° amines.' },
    { q: 'What functional group does an ester contain, and how is it named?', a: '–COO– ; named alcohol-part first (–yl) then acid-part (–oate)', explain: 'CH₃COOCH₂CH₃ = ethyl ethanoate: ethyl from ethanol, ethanoate from ethanoic acid.' },
    { q: 'Acid hydrolysis vs base hydrolysis of an ester: different products?', a: 'Acid → carboxylic acid + alcohol (reversible). Base → carboxylate SALT + alcohol (irreversible)', explain: 'Base hydrolysis (saponification) is irreversible because the carboxylate ion won’t react back with the alcohol.' },
    { q: 'Compare positional, chain and functional-group isomers, with an example of each', a: 'Positional = group in a different place; chain = different skeleton; functional = different group entirely', explain: 'butan-1-ol vs butan-2-ol (positional); butane vs 2-methylpropane (chain); ethanol vs methoxymethane (functional).' },
    { q: 'What are enantiomers?', a: 'Non-superimposable mirror-image isomers, from a chiral carbon', explain: 'They rotate plane-polarised light in opposite directions but are otherwise nearly identical. Important in pharmaceuticals, one enantiomer can be active, the other inactive or harmful.' },
    { q: 'Why can’t a C=C rotate (and why does that matter)?', a: 'The π bond locks it: which is what makes E/Z isomers possible', explain: 'Single bonds rotate freely so no geometric isomers; the rigid double bond fixes groups on one side or the other.' },
    { q: 'How do you convert a carboxylic acid into an ester?', a: 'React with an alcohol + conc H₂SO₄ catalyst, heat', explain: 'Esterification, a condensation (water is eliminated). Reversible: driven by removing water or using excess reagent.' },
    { q: 'What does “reflux” mean and why use it?', a: 'Boiling with a vertical condenser so vapour condenses back: heats without losing volatile material', explain: 'Contrast with distillation, which REMOVES the product as it forms. Reflux → full oxidation to acid; distil → stop at aldehyde.' },
    { q: 'Describe the chemical test that distinguishes a primary from a tertiary alcohol', a: 'K₂Cr₂O₇/H⁺, 1° turns orange→green (oxidised); 3° stays orange (no reaction)', explain: 'The dichromate is reduced from Cr(VI) orange to Cr(III) green only if there is an H on the carbinol carbon.' },
    { q: 'Why is a carboxylic acid acidic but an alcohol is not?', a: 'The carboxylate ion formed is stabilised by delocalisation over both oxygens', explain: 'That resonance stabilisation makes losing H⁺ favourable. An alkoxide (from an alcohol) has no such stabilisation, so alcohols are essentially neutral.' },
    { q: 'Amines are basic: why?', a: 'The nitrogen lone pair can accept a proton', explain: 'That same lone pair is why amines act as nucleophiles in substitution reactions. One structural feature, two behaviours.' },

    { q: 'List the IUPAC suffix priority order, highest priority first', a: 'acid > ester > amide > nitrile > aldehyde > ketone > alcohol > amine > alkene', explain: 'The highest-priority group takes the suffix and the lowest locant; everything else becomes a prefix (hydroxy-, oxo-, amino-, halo-).' },
    { q: 'State the reagent and conditions: haloalkane → alcohol', a: 'NaOH(aq), warm', explain: 'Nucleophilic substitution: OH⁻ replaces the halogen. Aqueous (not ethanolic) favours substitution over elimination.' },
    { q: 'State the reagent and conditions: haloalkane → alkene', a: 'KOH in ethanol, heat', explain: 'Elimination, ethanolic conditions + heat remove HX to form a C=C. Same reagent as → alcohol but different solvent.' },
    { q: 'State the reagent and conditions: haloalkane → nitrile', a: 'KCN in ethanol', explain: 'Nucleophilic substitution; CN⁻ adds a carbon: the ONLY chain-lengthening step at Level 3.' },
    { q: 'State the reagent and conditions: alkene → alcohol', a: 'H₂O with H⁺ catalyst (dilute H₂SO₄)', explain: 'Hydration: electrophilic addition of water across the C=C, following Markovnikov.' },
    { q: 'State the reagent and conditions: alcohol → alkene', a: 'conc H₂SO₄, heat (or Al₂O₃)', explain: 'Dehydration: an elimination that removes water to form a C=C.' },
    { q: 'Oxidise a 1° alcohol: how to stop at the aldehyde vs go to the acid?', a: 'Distil → aldehyde; reflux → carboxylic acid', explain: 'K₂Cr₂O₇/H⁺. Distilling removes the aldehyde before it oxidises further; reflux keeps it in to fully oxidise.' },
    { q: 'What happens when a 3° alcohol meets K₂Cr₂O₇/H⁺?', a: 'No reaction', explain: 'The carbinol carbon has no H to lose, so it cannot be oxidised.' },
    { q: 'Describe the chemical test that distinguishes an aldehyde from a ketone', a: "Tollens' reagent → silver mirror with the aldehyde only", explain: "Aldehydes are oxidised (reduce Ag⁺→Ag). Ketones aren't. Fehling's/Benedict's give a brick-red Cu₂O precipitate with aldehydes." },
    { q: "Markovnikov's rule (HX + unsymmetrical alkene)", a: "H adds to the carbon with MORE H's; X to the more substituted carbon", explain: 'Goes via the more stable carbocation. e.g. propene + HBr → mainly 2-bromopropane.' },
    { q: 'What makes a carbon a chiral centre?', a: 'Four different groups attached', explain: 'Gives non-superimposable mirror images (enantiomers) that rotate plane-polarised light in opposite directions.' },
    { q: 'E vs Z isomers?', a: 'E = higher-priority groups on opposite sides; Z = same side', explain: 'E = entgegen (opposite), Z = zusammen (together). Needs a C=C where each carbon carries two different groups.' },
    { q: 'Describe the S<sub>N</sub>2 mechanism in one sentence', a: 'Nucleophile attacks the δ+ carbon from the side opposite the leaving group, one concerted step, with inversion', explain: 'Two curly arrows: nucleophile lone pair → carbon, and the C–LG bond → leaving group.' },
    { q: 'Describe the electrophilic addition mechanism for alkene + HBr, step by step', a: 'π electrons attack the δ+ H → carbocation → Br⁻ attacks the carbocation', explain: 'The C=C acts as the nucleophile; the more stable carbocation forms (Markovnikov).' },
    { q: 'Name: CH₃CH(OH)CH₃', a: 'propan-2-ol', explain: '3-carbon chain with OH on C2: a secondary alcohol.' },
    { q: 'Name the ester CH₃COOCH₂CH₃', a: 'ethyl ethanoate', explain: 'Alcohol part (ethyl) first, then the acid part (ethanoate).' },
    { q: 'State the reagent and conditions: nitrile → amine', a: 'H₂/Ni (or LiAlH₄)', explain: 'Reduction adds H across the C≡N triple bond.' },
    { q: 'State the reagent and conditions: nitrile → carboxylic acid', a: 'dilute acid, reflux (hydrolysis)', explain: 'The C≡N is hydrolysed all the way to –COOH.' },
    { q: 'State the reagent and conditions: carboxylic acid + alcohol → ester', a: 'conc H₂SO₄ catalyst, heat', explain: 'Esterification (a condensation): reversible; H₂SO₄ is catalyst and dehydrating agent.' },
    { q: 'Base hydrolysis of an ester gives…', a: 'a carboxylate salt + an alcohol', explain: 'Saponification: ester + NaOH(aq), reflux → RCOO⁻Na⁺ + R′OH.' },
    { q: 'Describe the chemical test for a C=C double bond, including the observation', a: 'Bromine water decolourises (orange → colourless)', explain: 'Electrophilic addition of Br₂ across the double bond removes the colour.' },
    { q: 'Describe the chemical test for a carboxylic acid, including the observation', a: 'Add NaHCO₃ → fizzes (CO₂ released)', explain: 'Acids react with hydrogencarbonate to release CO₂; they also turn damp litmus red.' },
    { q: 'Functional-group isomers of C₃H₆O?', a: 'propanal (aldehyde) and propanone (ketone)', explain: 'Same formula, different group. Tell them apart by ¹H NMR. The aldehyde H is ~9.7 ppm (see Spectroscopic data).' },
    { q: 'State the reagent and the product when an aldehyde or ketone is reduced', a: 'NaBH₄ (or H₂/Ni) → an alcohol', explain: 'Aldehyde → primary alcohol; ketone → secondary alcohol.' },
    { q: 'Curly arrow: what do the tail and head represent?', a: 'Tail = electron source (a lone pair or a bond); head = where the new bond forms', explain: 'A full (double-headed) arrow always shows a PAIR of electrons moving. Charges must balance at every step.' },
    { q: 'Planning a synthesis: how do you add a carbon?', a: 'Convert to a haloalkane, then react with KCN → nitrile', explain: 'It is the only chain-lengthening step. Then reduce the nitrile (→ amine) or hydrolyse it (→ acid).' },

    /* ---- discrimination cards: the pairs that cost the most marks ---- */
    { q: 'TELL THEM APART: Markovnikov vs anti-Markovnikov addition', a: 'Markovnikov (HX or H₂O/H⁺ across an alkene): the <strong>H adds to the carbon that already has more H atoms</strong>, so the halogen/OH ends up on the MORE substituted carbon. Anti-Markovnikov is the reverse and is not required at Level 3.', explain: 'The reason is carbocation stability. Adding H⁺ first gives a carbocation, and the pathway taken is the one giving the MORE stable cation. Tertiary > secondary > primary, because alkyl groups are electron-donating and spread the positive charge. So the H goes where it produces the better cation, and the nucleophile attacks there. Learn the reason, not the rhyme: exams ask you to justify the major product, not just name it.' },
    { q: 'TELL THEM APART: S<sub>N</sub>1 vs S<sub>N</sub>2', a: '<strong>S<sub>N</sub>2</strong>: one step, backside attack, inversion of configuration, rate depends on BOTH species, favoured by primary haloalkanes. <strong>S<sub>N</sub>1</strong>: two steps via a carbocation, racemisation, rate depends only on the haloalkane, favoured by tertiary.', explain: 'Substrate is the deciding factor. A tertiary carbon is too crowded for backside attack but forms a stable carbocation, so it goes S<sub>N</sub>1; a primary carbon is open to attack but forms a terrible carbocation, so it goes S<sub>N</sub>2. Secondary can do either. If a question gives you a stereocentre and asks about the product\'s optical activity. It is testing precisely this: inversion (S<sub>N</sub>2) versus a racemic mixture (S<sub>N</sub>1).' },
    { q: 'TELL THEM APART: elimination vs substitution of a haloalkane', a: 'Same reagent set, different conditions: <strong>substitution</strong> uses aqueous NaOH/KOH (warm) and gives an alcohol; <strong>elimination</strong> uses concentrated alcoholic KOH (hot) and gives an alkene.', explain: 'The solvent is the tell. In water, OH⁻ is well solvated and acts as a nucleophile attacking carbon; in ethanol it is less solvated, more basic, and pulls off a β-hydrogen instead. Exams award the conditions, so writing "KOH" alone is only half an answer, always state aqueous vs alcoholic and warm vs hot.' },
    { q: 'TELL THEM APART: structural isomers vs stereoisomers', a: '<strong>Structural</strong> isomers differ in which atoms are bonded to which (chain, positional, functional group). <strong>Stereoisomers</strong> have identical connectivity but different 3D arrangement: geometric (cis/trans, E/Z) and optical (enantiomers).', explain: 'Test it by asking: could I convert one into the other only by breaking bonds? If yes it is structural; if you only need to rotate or reflect, it is stereo. This matters because geometric isomerism needs a C=C with two different groups on each carbon, and optical isomerism needs a carbon with four DIFFERENT groups, two very specific structural conditions you must check before claiming either.' },
    { q: 'TELL THEM APART: E/Z vs cis/trans', a: 'cis/trans works only when each alkene carbon carries one H; E/Z uses <strong>Cahn–Ingold–Prelog priority</strong> (higher atomic number wins) and always works. Z = higher priorities on the same side (<em>zusammen</em>), E = opposite (<em>entgegen</em>).', explain: 'Once an alkene carbon carries two different non-H groups, cis/trans becomes ambiguous and only E/Z is defined. Note that Z does not always equal cis: if priority order flips relative to the "obvious" groups, a cis-looking arrangement can be E. Always assign priorities explicitly rather than eyeballing it.' },
    { q: 'TELL THEM APART: an enantiomer vs a diastereomer', a: '<strong>Enantiomers</strong> are non-superimposable mirror images (opposite at EVERY stereocentre) with identical physical properties except the direction they rotate plane-polarised light. <strong>Diastereomers</strong> differ at some but not all stereocentres, and have genuinely different physical properties.', explain: 'The practical consequence matters: enantiomers cannot be separated by distillation or ordinary chromatography because their boiling points and polarities are identical. You need a chiral environment. Diastereomers can be separated by ordinary means. This is also why one enantiomer of a drug can be therapeutic and the other inactive or harmful: receptors are themselves chiral.' },
    { q: 'TELL THEM APART: an amide vs an amine', a: 'An <strong>amine</strong> is N attached only to carbon/hydrogen and is BASIC (the lone pair accepts H⁺). An <strong>amide</strong> has N attached to a carbonyl carbon and is essentially NEUTRAL.', explain: 'The difference is delocalisation: in an amide the nitrogen lone pair is drawn into the C=O π system, so it is no longer available to accept a proton. This one fact explains why proteins (chains of amide/peptide bonds) are not strongly basic along the backbone, and why amide bonds are far harder to hydrolyse than esters.' },
    { q: 'TELL THEM APART: oxidation products of primary vs secondary vs tertiary alcohols', a: 'Primary → aldehyde (distil off immediately) → carboxylic acid (reflux). Secondary → ketone, and it stops there. Tertiary → no reaction.', explain: 'The rule is mechanical: oxidation removes an H from the carbon bearing the OH. A tertiary alcohol has no such H, so nothing happens. That is the standard test to distinguish it. The primary case is the one exams exploit: the SAME reagent gives a different product depending on whether you distil (removing the aldehyde before it oxidises further) or reflux (returning it to the flask to be oxidised again).' },

    /* ---- mechanism and reasoning depth ---- */
    { q: 'Why does a tertiary carbocation form more readily than a primary one?', a: 'Alkyl groups are electron-donating (inductive effect) and there are three of them delocalising the positive charge, so the tertiary cation is significantly more stable.', explain: 'Stability of the intermediate controls which pathway a reaction takes, so this single idea explains Markovnikov addition AND why tertiary haloalkanes react by S<sub>N</sub>1. If you can state "the more stable carbocation forms preferentially, and alkyl groups stabilise positive charge", you can derive the major product of most Level 3 addition and substitution questions rather than memorising them.' },
    { q: 'Why must you distil immediately when oxidising a primary alcohol to an aldehyde?', a: 'Because the aldehyde is more easily oxidised than the alcohol, leaving it in contact with the oxidising agent converts it straight through to the carboxylic acid.', explain: 'Distilling works because the aldehyde has no O–H, so it cannot hydrogen bond to itself and boils well below both the alcohol and the acid. Removing it from the flask as it forms is a physical solution to a kinetic problem, and stating that reasoning, not just "distil". Is what earns the Merit mark.' },
    { q: 'Why is a carboxylic acid a stronger acid than an alcohol?', a: 'Because the carboxylate ion left after losing H⁺ is stabilised by delocalisation of the negative charge over two equivalent oxygens; an alkoxide ion has the charge localised on one oxygen.', explain: 'Anything that stabilises the conjugate base strengthens the acid. This also predicts substituent effects: adding electronegative groups near the COOH (e.g. chlorine) pulls electron density away and stabilises the anion further, so chloroethanoic acid is a stronger acid than ethanoic acid. That connects directly to Ka in your equilibrium standard.' },
    { q: 'Explain the full esterification equilibrium and how to drive it toward product', a: 'Carboxylic acid + alcohol ⇌ ester + water, with concentrated H₂SO₄ as catalyst. Drive it right by using excess alcohol or by removing water as it forms.', explain: 'The sulfuric acid does two jobs. It catalyses by protonating the carbonyl, and it is hygroscopic so it removes water, shifting the position of equilibrium by Le Châtelier. Note it is a CATALYST, not a reagent, so it does not appear in the overall equation. This is a nice cross-link to your equilibrium standard: same principle, organic context.' },
    { q: 'How do you convert a nitrile into a carboxylic acid, and why is that route useful?', a: 'Hydrolyse it with dilute acid and heat: R–C≡N + 2H₂O + H⁺ → R–COOH + NH₄⁺.', explain: 'It matters because the nitrile step (haloalkane + KCN) is the ONE way at this level to lengthen a carbon chain by one atom. So "make a compound with one more carbon than your starting material" almost always means: alcohol → haloalkane → nitrile → carboxylic acid. Recognising that signature in a synthesis question saves you a lot of time.' },
    { q: 'Why can\'t you make an amine cleanly by reacting a haloalkane with ammonia?', a: 'Because the amine product is itself a nucleophile and reacts further with more haloalkane, giving a mixture of primary, secondary, tertiary amines and the quaternary salt.', explain: 'Using a large excess of ammonia biases the statistics toward the primary amine, but the reaction is inherently messy. This is a good example of a question that rewards explaining WHY a route is poor rather than just naming a product: a genuine Excellence-level distinction.' },
    { q: 'What structural conditions are required for optical isomerism?', a: 'A carbon atom bonded to four DIFFERENT groups (a chiral centre), giving a molecule with no plane of symmetry.', explain: 'Check all four substituents explicitly. Students routinely miss that two chains differing further down the molecule still count as different. The consequence is a pair of enantiomers that rotate plane-polarised light equally in opposite directions; a 50:50 racemic mixture shows no net rotation, which is exactly what an S<sub>N</sub>1 reaction on a single enantiomer produces.' },
  ],

  sections: [
    /* ============================================ 0 CONNECTIONS */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Organic chemistry has its own shorthand for structures, reactions and mechanisms. Each convention below is used on this page.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols and conventions in organic chemistry', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'R <span class="xs">(as in R–OH)</span>', def: 'A stand-in for “any carbon chain”. R–OH means <strong>any alcohol</strong>. The reaction works whatever the chain is.', note: 'R and R′ (R-prime) in the same equation mean two chains that may be different.' },
          { term: '→ vs ⇌', def: 'A single arrow means the reaction goes essentially <strong>to completion</strong>. A double half-arrow (⇌) means it reaches an <strong>equilibrium</strong>. Esterification is the one you meet.' },
          { term: 'Conditions above/below the arrow', def: 'Written above the arrow: the <strong>reagent</strong>. Written below: the <strong>conditions</strong> (solvent, heat, catalyst). Both are needed for full marks.' },
          { term: 'Curly arrow (double-headed, ⤻)', def: 'Shows the movement of a <strong>PAIR of electrons</strong>. The TAIL starts at the electron source (a lone pair or a bond); the HEAD points where the pair ends up.', note: 'A single-headed “fish-hook” arrow means one electron, not needed at Level 3.' },
          { term: 'δ⁺ and δ⁻ <span class="xs">(lower-case delta)</span>', def: 'A <strong>partial</strong> charge caused by unequal electron sharing in a polar bond: much smaller than a full + or −.', note: 'Not the same δ as NMR chemical shift; same Greek letter, different job.' },
          { term: 'S<sub>N</sub>1 / S<sub>N</sub>2', def: '<strong>S</strong>ubstitution, <strong>N</strong>ucleophilic. The number is the <strong>molecularity</strong>: how many species are in the rate-determining step (1 = just the haloalkane; 2 = haloalkane and nucleophile together).' },
          { term: '1°, 2°, 3° <span class="xs">(primary, secondary, tertiary)</span>', def: 'How many <strong>carbon atoms</strong> are attached to the carbon bearing the functional group. 1° = one, 2° = two, 3° = three.', note: 'This single classification decides oxidation products, S<sub>N</sub>1 vs S<sub>N</sub>2, and carbocation stability.' },
          { term: 'E / Z', def: 'Geometric isomer labels using Cahn–Ingold–Prelog priority. <strong>Z</strong> = higher priorities on the same side (<em>zusammen</em>, together); <strong>E</strong> = opposite sides (<em>entgegen</em>).', note: 'Z does not always mean cis: assign priorities explicitly.' },
          { term: 'Prefixes and suffixes', def: 'The <strong>suffix</strong> names the highest-priority group (…-ol, …-one, …-oic acid). A <strong>prefix</strong> names lower-priority groups (hydroxy-, oxo-, amino-).' },
          { term: 'Δ <span class="xs">(over a reaction arrow)</span>', def: 'Means <strong>heat</strong> is applied. Often written “reflux” or “warm” instead.' },
        ]},
        { t: 'tip', title: 'Curly arrows in one line', html: 'Tail = where the electrons come FROM, head = where they go TO. Always from negative/electron-rich to positive/electron-poor: never the other way round.' },
      ],
    },
    {
      id: 'connections', num: '0', title: 'How this connects to your other standards',
      intro: 'Organic chemistry is the hub of Level 3 Chemistry: it feeds directly into three other standards. Read this first so you know what you’re building toward.',
      blocks: [
        { t: 'connects', intro: 'Structure and naming here are the raw material every other standard uses:', items: [
          { to: '#/topic/chem-91388', label: 'Spectroscopic data (91388): the identification twin',
            why: 'This standard asks “what IS this molecule?” using MS, IR and NMR. You literally cannot answer that without organic structure and naming. Every functional group in the table below has a fingerprint: a C=O shows at ~1700 in IR, an aldehyde carbon at δ 190–200 in ¹³C NMR, a COOH loses 45 in mass spec. Learn the group here → recognise its signal there.' },
          { to: '#/topic/chem-91387', label: 'Quantitative analysis (91387): the same compounds, measured',
            why: 'The titrations you do in the internal are often organic acids (ethanoic, benzoic). Knowing that –COOH is the acidic group, and that esters hydrolyse back to acids, tells you what you are actually titrating and why the mole ratio is what it is.' },
          { to: '#/topic/chem-91392', label: 'Aqueous equilibria (91392): why carboxylic acids are weak',
            why: 'Carboxylic acids appear in both standards. Here you learn –COOH exists; there you learn it only partially ionises (small Ka), which is why you use [H⁺]=√(Ka·c) rather than treating it as strong. The functional group explains the equilibrium behaviour.' },
          { to: '#/topic/chem-91390', label: 'Thermochemical principles (91390): bond enthalpies are organic bonds',
            why: 'Every ΔH = Σ(broken) − Σ(formed) calculation uses C–H, C–C, C=C and C=O bond enthalpies. The reactions you learn here (hydrogenation, combustion) are exactly the ones used as thermochemistry examples.' },
          { to: '#/topic/chem-91393', label: 'Redox (91393): oxidation IS an organic reaction',
            why: 'Oxidising a primary alcohol → aldehyde → carboxylic acid is a redox reaction. K₂Cr₂O₇/H⁺ is the oxidant, and its half-equation (Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O) is exactly what you balance in the redox standard.' },
        ]},
        { t: 'tip', title: 'The big picture in one sentence', html: 'Organic tells you <em>what the molecule is and how to change it</em>; spectroscopy tells you <em>how to prove it</em>; equilibria and redox tell you <em>how it behaves in solution and in electron transfer</em>; thermochemistry tells you <em>whether the change is energetically worth it</em>.' },
      ],
    },
    /* ============================================================ 1 GROUPS */
    {
      id: 'functional-groups', num: '1', title: 'Functional group reference',
      intro: 'Every organic question starts with recognising the functional group. Learn this table cold, the suffix/prefix drives naming, and the group drives the reactions.',
      video: 'NCEA Level 3 chemistry organic functional groups explained',
      blocks: [
        { t: 'table', mono: true, caption: 'Level 3 functional groups', headers: ['Class', 'Group', 'Example (condensed)', 'Suffix / prefix'], rows: [
          ['Alkane', 'C–C only', 'CH₃CH₃  ethane', '-ane'],
          ['Alkene', 'C=C', 'CH₂=CH₂  ethene', '-ene'],
          ['Haloalkane', 'C–X (F,Cl,Br,I)', 'CH₃CH₂Br  bromoethane', 'halo- prefix'],
          ['Alcohol', '–OH', 'CH₃CH₂OH  ethanol', '-ol'],
          ['Aldehyde', '–CHO (end)', 'CH₃CHO  ethanal', '-al'],
          ['Ketone', 'C=O (middle)', 'CH₃COCH₃  propanone', '-one'],
          ['Carboxylic acid', '–COOH', 'CH₃COOH  ethanoic acid', '-oic acid'],
          ['Ester', '–COO–', 'CH₃COOCH₃  methyl ethanoate', '-yl -oate'],
          ['Amine', '–NH₂', 'CH₃CH₂NH₂  ethylamine', '-amine / amino-'],
          ['Amide', '–CONH₂', 'CH₃CONH₂  ethanamide', '-amide'],
          ['Nitrile', '–C≡N', 'CH₃CN  ethanenitrile', '-nitrile'],
        ]},
        { t: 'tip', title: 'Mnemonic: suffix priority order', html: '<strong>“<u>A</u>ll <u>E</u>xcellent <u>A</u>lchemists <u>N</u>eed <u>A</u> <u>K</u>een <u>A</u>nalytical <u>A</u>pproach”</strong> → <strong>A</strong>cid · <strong>E</strong>ster · <strong>A</strong>mide · <strong>N</strong>itrile · <strong>A</strong>ldehyde · <strong>K</strong>etone · <strong>A</strong>lcohol · <strong>A</strong>mine. (Alkene/alkyne and halogens never win: they’re always prefixes or the parent chain.)' },
        { t: 'key', title: 'Naming priority (which group gets the suffix)', items: [
          'Priority order (highest first): <strong>carboxylic acid &gt; ester &gt; amide &gt; nitrile &gt; aldehyde &gt; ketone &gt; alcohol &gt; amine &gt; alkene</strong>.',
          'The <strong>highest-priority</strong> group takes the suffix and lowest locant; everything else becomes a prefix (hydroxy-, oxo-, amino-, halo-).',
          'Alkene/alkyl chains and halogens are always prefixes or the parent chain.',
        ]},
      ],
    },

    /* ============================================================ 2 NAMING */
    {
      id: 'naming', num: '2', title: 'IUPAC naming',
      intro: 'Follow the same procedure every time: it turns “impossible” names into a checklist.',
      video: 'NCEA Level 3 chemistry IUPAC naming organic compounds',
      blocks: [
        { t: 'key', title: 'The 5-step naming procedure', items: [
          '<strong>1. Longest chain</strong> containing the main functional group = the parent (meth/eth/prop/but/pent/hex…).',
          '<strong>2. Number</strong> the chain to give the main functional group the <em>lowest</em> locant.',
          '<strong>3. Identify substituents</strong> (branches, halogens, other groups) and their numbers.',
          '<strong>4. Alphabetise</strong> substituents; use di/tri/tetra for repeats (ignore these when alphabetising).',
          '<strong>5. Assemble</strong>: locants-prefixes-parent-suffix, e.g. 3-bromo-2-methylbutan-1-ol.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'A branched alcohol', problem: 'Name: CH₃CH(CH₃)CH₂CH₂OH', steps: [
          'Longest chain through the –OH: 4 carbons → butan-…-ol (–OH is highest priority, gets the suffix).',
          'Number from the –OH end so it gets the lowest locant: OH on C1 → butan-1-ol.',
          'Methyl branch on C3.',
          'Assemble: 3-methylbutan-1-ol.',
        ], answer: '3-methylbutan-1-ol' },
        { t: 'example', tag: 'Tricky case', title: 'Two functional groups: priority matters', problem: 'Name: HOOC–CH₂–CH(OH)–CH₃', steps: [
          'Groups present: carboxylic acid (–COOH) and alcohol (–OH). Carboxylic acid is higher priority ⟹ it takes the suffix and C1.',
          'Parent chain = 4 carbons → butanoic acid. –COOH carbon is C1.',
          'The –OH is now a prefix: hydroxy-, located on C3.',
          'Assemble: 3-hydroxybutanoic acid.',
        ], answer: '3-hydroxybutanoic acid (not “…-ol”, the acid outranks the alcohol).' },
        { t: 'example', tag: 'Tricky case', title: 'Lowest set of locants', problem: 'Name: CH₃–CH(Cl)–CH(CH₃)–CH₂–CH₃', steps: [
          'Longest chain = 5 C → pentane. Substituents: Cl and CH₃.',
          'Number from the left: Cl on C2, methyl on C3 → locant set {2,3}. From the right: {3,4}. Choose the lower set {2,3}.',
          'Alphabetise: chloro before methyl.',
          'Assemble: 2-chloro-3-methylpentane.',
        ], answer: '2-chloro-3-methylpentane' },
        { t: 'tip', title: 'Naming esters', html: 'Esters are named <strong>alcohol part + acid part</strong>: the group from the alcohol (–yl) comes first, then the acid chain (–oate). CH₃COOCH₂CH₃ = <strong>ethyl ethanoate</strong> (ethyl from ethanol, ethanoate from ethanoic acid).' },
      ],
    },

    /* ============================================================ 3 ISOMERISM */
    {
      id: 'isomerism', num: '3', title: 'Isomerism',
      intro: 'Isomers have the same molecular formula but a different arrangement. Two big families: structural (different connectivity) and stereo (same connectivity, different 3-D arrangement).',
      blocks: [
        { t: 'table', caption: 'Types of isomerism', headers: ['Type', 'What differs', 'Example (both C₄H₁₀ or as noted)'], rows: [
          ['<strong>Chain / branching</strong>', 'Carbon skeleton', 'butane vs 2-methylpropane'],
          ['<strong>Positional</strong>', 'Position of the group on the chain', 'butan-1-ol vs butan-2-ol'],
          ['<strong>Functional group</strong>', 'Different functional group, same formula', 'ethanol (C₂H₆O) vs methoxymethane (ether)'],
          ['<strong>Geometric (E/Z)</strong>', '3-D arrangement across a C=C', 'cis/trans but-2-ene'],
          ['<strong>Optical</strong>', 'Non-superimposable mirror images', 'butan-2-ol (chiral C)'],
        ]},
        { t: 'p', html: `<strong>E/Z (geometric) isomerism</strong> happens when a C=C can’t rotate and each carbon of the double bond carries two <em>different</em> groups.` },
        { t: 'key', title: 'Assigning E / Z', items: [
          'On each carbon of the C=C, find the <strong>higher-priority</strong> group (higher atomic number).',
          '<strong>Z</strong> (zusammen = together): higher-priority groups on the <em>same</em> side.',
          '<strong>E</strong> (entgegen = opposite): higher-priority groups on <em>opposite</em> sides.',
          'No E/Z if either carbon has two identical groups (e.g. CH₂=).',
        ]},
        { t: 'figure', title: 'E / Z isomers of but-2-ene', html: `
          <svg viewBox="0 0 520 170" width="100%" style="max-width:520px" fill="none" stroke="currentColor" font-family="var(--font-mono)">
            <style>.l{fill:currentColor;stroke:none;font-size:15px}.c{fill:var(--muted);stroke:none;font-size:13px}</style>
            <!-- Z / cis -->
            <line x1="60" y1="80" x2="140" y2="80" stroke="currentColor" stroke-width="1.6"/>
            <line x1="60" y1="88" x2="140" y2="88" stroke="currentColor" stroke-width="1.6"/>
            <text class="l" x="30" y="60">CH₃</text><text class="l" x="150" y="60">CH₃</text>
            <text class="l" x="30" y="120">H</text><text class="l" x="150" y="120">H</text>
            <line x1="55" y1="70" x2="40" y2="62"/><line x1="145" y1="70" x2="160" y2="62"/>
            <line x1="55" y1="98" x2="45" y2="110"/><line x1="145" y1="98" x2="158" y2="110"/>
            <text class="c" x="55" y="150">Z (cis), CH₃ same side</text>
            <!-- E / trans -->
            <line x1="340" y1="80" x2="420" y2="80" stroke="currentColor" stroke-width="1.6"/>
            <line x1="340" y1="88" x2="420" y2="88" stroke="currentColor" stroke-width="1.6"/>
            <text class="l" x="310" y="60">CH₃</text><text class="l" x="430" y="120">CH₃</text>
            <text class="l" x="315" y="120">H</text><text class="l" x="430" y="60">H</text>
            <line x1="335" y1="70" x2="320" y2="62"/><line x1="425" y1="98" x2="440" y2="110"/>
            <line x1="335" y1="98" x2="322" y2="110"/><line x1="425" y1="70" x2="440" y2="62"/>
            <text class="c" x="330" y="150">E (trans): CH₃ opposite</text>
          </svg>`, caption: 'The C=C can’t rotate, so these are genuinely different molecules with different physical properties.' },
        { t: 'p', html: `<strong>Optical isomerism</strong> occurs at a <strong>chiral carbon</strong>, one bonded to four <em>different</em> groups. The two mirror-image forms (enantiomers) are non-superimposable, like left and right hands.` },
        { t: 'key', title: 'Spotting a chiral centre', items: [
          'Look for a carbon with <strong>four different</strong> atoms/groups attached.',
          'Enantiomers rotate plane-polarised light in <em>opposite</em> directions (optically active).',
          'They are otherwise identical in most physical/chemical properties.',
          'Example: butan-2-ol. C2 holds H, OH, CH₃ and C₂H₅ (all different) ⟹ chiral.',
        ]},
        { t: 'mistake', title: 'Common isomer traps', html: '① A carbon in a C=CH₂ has two H’s: <strong>no E/Z</strong>. ② A carbon needs <em>four different</em> groups for chirality. If two are the same, it’s not chiral. ③ Don’t confuse functional-group isomers (e.g. aldehyde vs ketone, C₃H₆O) with positional isomers.' },
      ],
    },

    /* ============================================================ 4 REACTIONS */
    {
      id: 'reactions', num: '4', title: 'Reactions & reagents',
      intro: 'For every transformation you must know the reagent AND the conditions. Examiners award marks for correct conditions (concentrated vs dilute, aqueous vs ethanolic, heat/reflux).',
      blocks: [
        { t: 'table', caption: 'Key reactions by functional group', headers: ['Starting group', 'Reagent & conditions', 'Product', 'Reaction type'], rows: [
          ['Alkene', 'H₂ / Ni catalyst', 'Alkane', 'Addition (hydrogenation)'],
          ['Alkene', 'HBr (or HCl)', 'Haloalkane', 'Electrophilic addition'],
          ['Alkene', 'Br₂ (decolourises)', 'Dibromoalkane', 'Electrophilic addition (test for C=C)'],
          ['Alkene', 'H₂O, H⁺ catalyst (dilute H₂SO₄)', 'Alcohol', 'Hydration'],
          ['Haloalkane', 'NaOH(aq), warm', 'Alcohol', 'Nucleophilic substitution'],
          ['Haloalkane', 'KCN in ethanol', 'Nitrile', 'Nucleophilic substitution'],
          ['Haloalkane', 'excess NH₃', 'Amine', 'Nucleophilic substitution'],
          ['Haloalkane', 'KOH in ethanol, heat', 'Alkene', 'Elimination'],
          ['1° Alcohol', 'K₂Cr₂O₇ / H⁺, distil', 'Aldehyde', 'Partial oxidation'],
          ['Aldehyde', 'K₂Cr₂O₇ / H⁺, reflux', 'Carboxylic acid', 'Oxidation'],
          ['2° Alcohol', 'K₂Cr₂O₇ / H⁺, reflux', 'Ketone', 'Oxidation'],
          ['3° Alcohol', 'K₂Cr₂O₇ / H⁺', 'No reaction', '–'],
          ['Alcohol', 'conc H₂SO₄, heat (or Al₂O₃)', 'Alkene', 'Dehydration (elimination)'],
          ['Carboxylic acid + alcohol', 'conc H₂SO₄ catalyst, heat', 'Ester + water', 'Esterification (condensation)'],
          ['Ester', 'dilute acid, reflux', 'Acid + alcohol', 'Hydrolysis'],
          ['Ester', 'NaOH(aq), reflux', 'Carboxylate salt + alcohol', 'Base hydrolysis (saponification)'],
          ['Nitrile', 'H₂ / Ni (or LiAlH₄)', 'Amine', 'Reduction'],
          ['Nitrile', 'dilute acid, reflux', 'Carboxylic acid', 'Hydrolysis'],
          ['Aldehyde / ketone', 'NaBH₄ (or H₂/Ni)', 'Alcohol', 'Reduction'],
        ]},
        { t: 'key', title: 'Distinguishing tests (very examinable)', items: [
          '<strong>Alkene:</strong> shakes with bromine water → orange to colourless.',
          '<strong>Aldehyde vs ketone:</strong> Tollens’ reagent → aldehyde gives a silver mirror, ketone doesn’t. Fehling’s/Benedict’s → aldehyde gives brick-red Cu₂O.',
          '<strong>Carboxylic acid:</strong> add NaHCO₃ → fizzes (CO₂). Also turns damp litmus red.',
          '<strong>Alcohol / carbonyl:</strong> 2,4-DNPH → orange precipitate confirms aldehyde or ketone (C=O).',
        ]},
        { t: 'warn', title: 'Markovnikov’s rule: “the rich get richer”', html: '<strong>Mnemonic: <em>the rich get richer.</em></strong> The carbon that’s already <em>rich</em> in hydrogens gets the new H; the halogen goes to the poorer (more substituted) carbon.<br><br>When HX adds to an unsymmetrical alkene, H adds to the carbon with <em>more</em> H’s already; X goes to the more substituted carbon. <strong>Why?</strong> That route goes via the <em>more stable</em> carbocation (tertiary > secondary > primary, because alkyl groups push electron density onto the positive carbon). e.g. propene + HBr → mainly 2-bromopropane.' },
        { t: 'tip', title: 'Anti-Markovnikov: “the poor get poorer”', html: '<strong>Mnemonic: <em>the poor get poorer.</em></strong> With peroxides present (radical mechanism), it flips. The hydrogen-<em>poor</em> carbon gets the halogen’s partner instead, so you get the “wrong” product (1-bromopropane from propene). Peroxide → radical → reversal.' },
      ],
    },

    /* ============================================================ 5 PATHWAYS */
    {
      id: 'pathways', num: '5', title: 'Reaction pathways (interconversions)',
      intro: 'Multi-step synthesis questions ask you to get from compound A to compound B. Learn the map. Then any route is just joining arrows. Alkene and haloalkane are the two central “hubs”.',
      blocks: [
        { t: 'rxnmap', title: 'Core interconversions', steps: [
          { from: 'Alkene', arrow: 'H₂O / H⁺', to: 'Alcohol', note: 'hydration' },
          { from: 'Alkene', arrow: 'HBr', to: 'Haloalkane', note: 'electrophilic addition' },
          { from: 'Alcohol', arrow: 'conc H₂SO₄, Δ', to: 'Alkene', note: 'dehydration' },
          { from: 'Haloalkane', arrow: 'NaOH(aq)', to: 'Alcohol', note: 'nucleophilic subst.' },
          { from: 'Haloalkane', arrow: 'KCN / ethanol', to: 'Nitrile', note: 'adds a carbon!' },
          { from: 'Haloalkane', arrow: 'KOH / ethanol, Δ', to: 'Alkene', note: 'elimination' },
          { from: 'Nitrile', arrow: 'H₂ / Ni', to: 'Amine', note: 'reduction' },
          { from: 'Nitrile', arrow: 'dil. acid, reflux', to: 'Carboxylic acid', note: 'hydrolysis' },
          { from: '1° Alcohol', arrow: 'K₂Cr₂O₇/H⁺, distil', to: 'Aldehyde', note: 'partial oxidation' },
          { from: 'Aldehyde', arrow: 'K₂Cr₂O₇/H⁺, reflux', to: 'Carboxylic acid', note: 'full oxidation' },
          { from: 'Acid + Alcohol', arrow: 'conc H₂SO₄', to: 'Ester', note: 'esterification' },
        ]},
        { t: 'tip', title: 'Planning a synthesis', html: 'Work <em>backwards</em> from the target. Need to add a carbon? The only chain-lengthening step at L3 is <strong>haloalkane → nitrile (KCN)</strong>. Need an amine? Go via a nitrile or a haloalkane + NH₃. Need a carboxylic acid? Oxidise a 1° alcohol/aldehyde, or hydrolyse a nitrile.' },
        { t: 'example', tag: 'Worked example', title: 'Ethene → ethanoic acid (2 steps + why)', problem: 'Convert CH₂=CH₂ into CH₃COOH.', steps: [
          'Step 1, hydrate the alkene: CH₂=CH₂ + H₂O (H⁺ catalyst) → CH₃CH₂OH (ethanol).',
          'Step 2, fully oxidise the 1° alcohol under reflux: CH₃CH₂OH + K₂Cr₂O₇/H⁺, reflux → CH₃COOH.',
          '(Reflux, not distillation: distilling would stop at the aldehyde ethanal.)',
        ], answer: 'Ethene → ethanol (hydration) → ethanoic acid (oxidation, reflux).' },
      ],
    },

    /* ============================================================ 6 MECHANISMS */
    {
      id: 'mechanisms', num: '6', title: 'Mechanisms & curly arrows',
      intro: 'A curly arrow shows the movement of a PAIR of electrons, from a lone pair or bond (the source) to where the new bond forms (the head). Draw them precisely: examiners check the tail and head positions.',
      video: 'NCEA Level 3 chemistry reaction mechanisms curly arrows nucleophilic substitution',
      blocks: [
        { t: 'figure', title: 'Reading the diagrams: what each symbol means', html: ARROW_LEGEND, caption: 'Every arrow below starts at a real electron source (a lone pair or a bond) and ends where those electrons go.' },
        { t: 'p', html: `<strong>Nucleophilic substitution (SN2)</strong>, a nucleophile (electron-pair donor) attacks a carbon bearing a leaving group. Primary haloalkanes react by SN2 in one concerted step:` },
        { t: 'figure', title: 'SN2: OH⁻ + CH₃Br → CH₃OH + Br⁻', html: SN2_SVG, caption: 'Arrow 1: lone pair on HO⁻ → carbon. Arrow 2: C–Br bonding pair → Br. One step, backside attack, inversion of configuration.' },
        { t: 'p', html: `<strong>Electrophilic addition</strong>, the C=C π electrons act as the nucleophile and attack an electrophile (e.g. the δ+ H of HBr), forming a carbocation, which is then attacked by the nucleophile (Br⁻):` },
        { t: 'figure', title: 'Electrophilic addition: ethene + HBr', html: ADDITION_SVG, caption: 'Step 1: π electrons attack H, H–Br breaks (Br⁻ leaves) → carbocation. Step 2: Br⁻ attacks the carbocation.' },
        { t: 'p', html: `<strong>Elimination</strong>, a base removes a β-hydrogen; those electrons form a new C=C as the leaving group departs, making an alkene:` },
        { t: 'figure', title: 'Elimination: bromoethane + OH⁻ (ethanolic) → ethene', html: ELIM_SVG, caption: 'Ethanolic KOH/NaOH favours elimination; aqueous favours substitution. Same reagent, different solvent, different product.' },
        { t: 'tip', title: 'Mnemonic: leaving group ability', html: '<strong>“<u>W</u>eak bases are <u>g</u>reat leavers”</strong>, the weaker the base, the better the leaving group. Down the halogens: <strong>I⁻ &gt; Br⁻ &gt; Cl⁻ &gt; F⁻</strong> (“<em>Iブ Can Fly</em>”, iodide flies away fastest). Why? I⁻ is the biggest, most stable anion, so it holds the negative charge comfortably. OH⁻ is a <em>terrible</em> leaving group (strong base), which is why alcohols need acid to react (protonate the OH first so water leaves instead).' },
        { t: 'tip', title: 'Mnemonic: aqueous vs ethanolic (substitution vs elimination)', html: '<strong>“<u>Wat</u>er <u>sub</u>stitutes; <u>eth</u>anol <u>elim</u>inates.”</strong> NaOH in <strong>water</strong> → nucleophilic <strong>substitution</strong> (alcohol). KOH in <strong>ethanol</strong> + heat → <strong>elimination</strong> (alkene). Identical reagent, different solvent, completely different product: a favourite exam trick.' },
        { t: 'key', title: 'Curly-arrow rules', items: [
          'Arrow <strong>tail</strong> starts at the electron source: a lone pair or the middle of a bond.',
          'Arrow <strong>head</strong> points to where the new bond forms (an atom) or to an atom taking the electrons.',
          'A bond breaking has an arrow leaving it; a bond forming has an arrow pointing to it.',
          'Charges must balance across the mechanism. Track them at every step.',
        ]},
      ],
    },

    /* ============================================================ 7 PRACTICE */
    {
      id: 'practice-bank', num: '7', title: 'Naming & structure practice bank',
      intro: 'Cover the answer, work it out, then reveal. Add your own with the data file.',
      blocks: [
        { t: 'reveals', title: 'Name → structure', items: [
          { q: 'Draw/condense: 2-methylbutan-2-ol', a: '(CH₃)₂C(OH)CH₂CH₃. A tertiary alcohol (the C–OH carbon has three C neighbours).' },
          { q: 'Condense: 3-chloro-2-methylpentane', a: 'CH₃CH(CH₃)CH(Cl)CH₂CH₃' },
          { q: 'Condense: methyl propanoate', a: 'CH₃CH₂COOCH₃ (propanoic acid part + methyl from methanol).' },
          { q: 'Condense: N/A. Draw but-2-ene showing why it has E/Z', a: 'CH₃CH=CHCH₃. Each double-bond carbon carries a CH₃ and an H (two different groups), so cis (Z) and trans (E) forms exist.' },
        ]},
        { t: 'reveals', title: 'Structure → name', items: [
          { q: 'Name: CH₃CH₂CH₂CHO', a: 'butanal (aldehyde, –CHO on the end carbon = C1).' },
          { q: 'Name: CH₃COCH₂CH₃', a: 'butanone (ketone; C=O on C2).' },
          { q: 'Name: HOCH₂CH₂CH₂COOH', a: '4-hydroxybutanoic acid (acid outranks alcohol → acid gets the suffix and C1).' },
          { q: 'Name: CH₃CH(NH₂)COOH', a: '2-aminopropanoic acid (this is alanine: acid suffix, amino prefix).' },
        ]},
        { t: 'reveals', title: 'Predict the product', items: [
          { q: 'Propene + HBr → ? (main product + why)', a: '2-bromopropane. Markovnikov: H adds to the terminal CH₂ (more H’s), Br to the middle C via the more stable secondary carbocation.' },
          { q: 'Bromoethane + KCN in ethanol → ?', a: 'Propanenitrile, CH₃CH₂CN (nucleophilic substitution; chain lengthened by one carbon).' },
          { q: 'Butan-2-ol + K₂Cr₂O₇/H⁺, reflux → ?', a: 'Butanone (a secondary alcohol oxidises to a ketone; no further oxidation).' },
          { q: 'Ethyl ethanoate + NaOH(aq), reflux → ?', a: 'Sodium ethanoate (CH₃COO⁻Na⁺) + ethanol (base hydrolysis).' },
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA, Chemistry L3 (91391) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91391&view=exams', note: 'Organic + spectroscopy questions appear together here', verify: true },
    { label: 'No Brain Too Small: L3 Chemistry (Organic)', url: 'https://www.nobraintoosmall.co.nz/html/senior_chemistry/NCEA3_chemistry.html', note: 'Organic & structure-determination questions collated by topic', verified: true },
  ],

  quiz: [
    { type: 'sa', q: 'Name: CH₃CH(OH)CH₂CH₃', accept: ['butan-2-ol', 'butan2ol', '2-butanol'], answer: 'butan-2-ol', explanation: 'Four-carbon chain, –OH on C2. Numbering from the nearer end gives the OH the lower locant.' },
    { type: 'mc', q: 'Which reagent/conditions convert a haloalkane into an alkene?', choices: ['NaOH(aq), warm', 'KOH in ethanol, heat', 'K₂Cr₂O₇/H⁺', 'H₂/Ni'], answer: 1, explanation: 'Ethanolic KOH (alcoholic conditions) with heat drives elimination → alkene. Aqueous NaOH would instead substitute → alcohol.' },
    { type: 'mc', q: 'Which carbon is a chiral centre (four different groups)?', choices: ['C in CH₄', 'C2 in CH₃CH(OH)CH₂CH₃', 'C in CCl₄', 'C1 in CH₃CH₂OH'], answer: 1, explanation: 'C2 of butan-2-ol bears H, OH, CH₃ and C₂H₅, four different groups, so it is chiral and shows optical isomerism.' },
    { type: 'mc', q: 'To convert ethene to ethanoic acid you should:', choices: ['Hydrate to ethanol, then oxidise under reflux', 'React directly with oxygen', 'Add HBr then NaOH', 'Distil with dichromate'], answer: 0, explanation: 'Ethene → ethanol (hydration, H₂O/H⁺), then ethanol → ethanoic acid (oxidation with K₂Cr₂O₇/H⁺ under reflux, not distillation).' },
    { type: 'mc', q: 'In a curly-arrow mechanism, an arrow represents the movement of:', choices: ['A proton', 'A single electron', 'A pair of electrons', 'An atom'], answer: 2, explanation: 'A full (double-headed) curly arrow always shows a pair of electrons moving; a half-headed “fishhook” arrow (radical chemistry) shows a single electron.' },
    { type: 'sa', q: 'Assign E or Z: the higher-priority groups on a C=C are on OPPOSITE sides. (Answer E or Z)', accept: ['e'], answer: 'E', explanation: 'E = entgegen = opposite. Z = zusammen = same side.' },

    /* ---- application & reasoning questions ---- */
    { type: 'mc', q: 'HBr is added to propene. Which is the major product, and why?', choices: ['1-bromopropane, because the Br adds to the end carbon', '2-bromopropane, because the H adds to the carbon with more H atoms, giving the more stable secondary carbocation', '1-bromopropane, because primary products are always favoured', 'An equal mixture of both'], answer: 1, explanation: 'Markovnikov addition. H⁺ adds first; adding it to C1 (which already has 2 H) generates a SECONDARY carbocation at C2, which is more stable than the primary alternative because two electron-donating alkyl groups spread the charge. Br⁻ then attacks C2, giving 2-bromopropane.' },
    { type: 'mc', q: 'A single enantiomer of a tertiary haloalkane is hydrolysed and the product shows NO optical rotation. This tells you the mechanism was:', choices: ['S<sub>N</sub>2, giving inversion', 'S<sub>N</sub>1, via a planar carbocation attacked from both faces', 'Elimination', 'No reaction occurred'], answer: 1, explanation: 'A tertiary substrate goes S<sub>N</sub>1. The intermediate carbocation is planar (sp²), so the nucleophile attacks either face with equal probability, producing a 50:50 racemic mixture whose rotations cancel. S<sub>N</sub>2 would have given a single inverted enantiomer, which WOULD rotate light.' },
    { type: 'mc', q: 'You have 2-bromopropane. Which conditions give propene rather than propan-2-ol?', choices: ['Dilute aqueous NaOH, warm', 'Concentrated KOH in ethanol, hot', 'Water alone', 'Aqueous KCN'], answer: 1, explanation: 'Alcoholic conditions make OH⁻ behave as a BASE, removing a β-hydrogen and giving elimination to the alkene. Aqueous conditions make it behave as a nucleophile, giving substitution to the alcohol. The reagent is nominally the same: the solvent decides, so always state it.' },
    { type: 'mc', q: 'Butan-2-ol is oxidised with acidified dichromate under reflux. The product is:', choices: ['Butanal', 'Butanoic acid', 'Butanone', 'No reaction'], answer: 2, explanation: 'Butan-2-ol is a SECONDARY alcohol, so oxidation gives a ketone (butanone) and stops there. There is no further H on the carbonyl carbon to remove. Only primary alcohols continue on to the carboxylic acid, and tertiary alcohols do not react at all.' },
    { type: 'mc', q: 'Which conversion requires the KCN/nitrile route?', choices: ['Propan-1-ol → propanoic acid', 'Propan-1-ol → butanoic acid', 'Propene → propan-2-ol', 'Ethanol → ethanal'], answer: 1, explanation: 'Count the carbons: propan-1-ol has 3, butanoic acid has 4. Only the nitrile route adds a carbon at this level. Convert the alcohol to a haloalkane, react with KCN to give the nitrile (now 4 C), then hydrolyse with dilute acid. The other options keep the carbon count unchanged.' },
    { type: 'mc', q: 'Why is ethanamide (an amide) essentially neutral while ethylamine is basic?', choices: ['The amide has more hydrogen atoms', 'The amide nitrogen\'s lone pair is delocalised into the C=O, so it cannot accept a proton', 'Amides are larger molecules', 'The amide has no lone pair'], answer: 1, explanation: 'The lone pair is still there, but it is drawn into the carbonyl π system and is no longer available to bond a proton. This delocalisation also explains why amide (peptide) bonds are planar and much harder to hydrolyse than esters: directly relevant to protein chemistry.' },
    { type: 'mc', q: 'Which pair CANNOT be separated by simple distillation?', choices: ['Ethanol and water', 'Propanal and propanoic acid', 'The two enantiomers of butan-2-ol', 'cis- and trans-but-2-ene'], answer: 2, explanation: 'Enantiomers have identical boiling points, densities and polarities, they differ only in how they rotate plane-polarised light and in how they interact with other chiral molecules. Separating them needs a chiral environment. Diastereomers and geometric isomers DO have different physical properties and can be separated conventionally.' },
    { type: 'mc', q: 'Concentrated H₂SO₄ is used in esterification. Its role is best described as:', choices: ['A reagent that is consumed', 'A catalyst that also removes water, shifting the equilibrium right', 'An oxidising agent', 'A solvent only'], answer: 1, explanation: 'It protonates the carbonyl to speed the reaction (catalysis) and, being hygroscopic, absorbs the water produced: which by Le Châtelier drives the equilibrium toward the ester. Because it is a catalyst it does not appear in the overall equation, a detail exams check.' },
    { type: 'mc', q: 'Which molecule shows optical isomerism?', choices: ['CH₃CH₂CH₂OH', 'CH₃CH(OH)CH₃', 'CH₃CH(OH)CH₂CH₃', 'CH₃COCH₃'], answer: 2, explanation: 'Butan-2-ol\'s C2 carries four different groups: H, OH, CH₃ and CH₂CH₃. In propan-2-ol the C2 carries two identical methyl groups, so it is not chiral. Always list all four substituents explicitly rather than assuming.' },
    { type: 'sa', q: 'What single word describes the 50:50 mixture of enantiomers produced by an S<sub>N</sub>1 reaction?', accept: ['racemic', 'racemate', 'racemic mixture'], answer: 'racemic (a racemate)', explanation: 'The planar carbocation is attacked equally from both faces, so equal amounts of each enantiomer form and their optical rotations cancel exactly. The mixture is optically inactive despite every molecule in it being chiral.' },
    { type: 'sa', q: 'Which alcohol class gives NO reaction with acidified dichromate?', accept: ['tertiary', 'tertiary alcohol', '3', '3 degree'], answer: 'tertiary', explanation: 'Oxidation must remove a hydrogen from the carbon bearing the OH group. A tertiary alcohol has no such hydrogen. Its OH carbon is bonded to three carbons. This is the standard chemical test distinguishing tertiary alcohols from primary and secondary.' },
  ],
};

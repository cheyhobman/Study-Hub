/* ============================================================================
   AS 91388 — Spectroscopic data (Internal, 3 credits)  ★ DEEP-DIVE TOPIC
   Mass spectrometry · IR · ¹H & ¹³C NMR · combined structure determination
   ----------------------------------------------------------------------------
   Also directly useful for the 91391 external, where spectroscopy is combined
   with organic reasoning.
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for — UNLESS the same content is examined
     elsewhere. Structure determination is examined inside the 91391 organic paper —
     MS/IR/NMR data is routinely used there to identify an unknown.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['chem-91391'],

  title: 'Spectroscopic data',
  tags: ['Mass spec', 'IR', '¹H NMR', '¹³C NMR', 'Structure ID'],
  intro: 'Four techniques that, combined, let you deduce an unknown structure: mass spectrometry (mass + fragments), IR (which functional groups), and NMR (the carbon–hydrogen framework). The skill examiners want is piecing them together, step by step. Learn it alongside <a href="#/topic/chem-91391" data-link>Organic compounds →</a> — you’ll be identifying exactly those molecules.',

  flashcards: [
    { q: 'What does the base peak represent?', a: 'The most abundant fragment ion (set to 100% relative abundance)', explain: 'It is usually the most STABLE fragment — often a tertiary or resonance-stabilised carbocation, or an acylium ion.' },
    { q: 'Fragment at m/z 43 suggests…', a: 'CH₃CO⁺ (acylium) or C₃H₇⁺ (propyl)', explain: 'A strong 43 with a C=O in IR points to a methyl ketone (CH₃CO–).' },
    { q: 'Fragment at m/z 77 suggests…', a: 'C₆H₅⁺ — a phenyl (benzene) ring', explain: 'A classic aromatic marker in mass spec.' },
    { q: 'Which m/z peak marks a primary amine, and why is it that one rather than NH₂⁺ at 16?', a: 'm/z 30, CH₂=NH₂⁺ — amines break by α-cleavage and the nitrogen KEEPS the charge because it stabilises it', explain: 'NH₂⁺ really does weigh 16, but you would be throwing away the atom stabilising the positive charge, so that route is unfavourable — and m/z 16 is ambiguous anyway (equally O⁺ or CH₄⁺˙). Low-mass fragments are poor evidence. Loss of 16 (NH₂) IS useful for amides, where NH₃ (17) is usually lost as well.' },
    { q: 'Loss of 18 from M⁺ suggests…', a: 'Loss of H₂O — an alcohol', explain: 'Alcohols readily dehydrate in the spectrometer.' },
    { q: 'How does the M+1 peak help?', a: 'Its relative size indicates the NUMBER OF CARBONS', explain: '¹³C is ~1.1% naturally abundant, so M+1 ≈ 1.1% × (number of carbons) of the M⁺ height.' },
    { q: 'IR: N–H appears where, and how does it differ from O–H?', a: '3300–3500 cm⁻¹, and it is SHARPER (often 1–2 spikes) vs the broad O–H hump', explain: 'Primary amines show two N–H bands; secondary show one. O–H is always noticeably broader.' },
    { q: 'IR: where does C–O absorb?', a: '1000–1300 cm⁻¹ (strong)', explain: 'Present in alcohols, esters and ethers. Useful supporting evidence, though it sits near the fingerprint region.' },
    { q: 'What is the IR fingerprint region and what is it used for?', a: 'Below ~1500 cm⁻¹ — a complex pattern unique to each compound', explain: 'Not used to identify individual bonds, but an exact match against a database confirms a compound’s identity.' },
    { q: 'State the approximate ¹H NMR shift for CH₃ next to C=O', a: 'δ 2.0–2.6', explain: 'The electron-withdrawing carbonyl deshields the protons, moving them downfield from a plain alkyl CH₃ (0.8–1.2).' },
    { q: 'State the approximate ¹H NMR shift for H on a carbon attached to O', a: 'δ 3.3–4.5', explain: 'Oxygen is very electronegative, so it deshields the attached CH strongly. A quartet here suggests –O–CH₂–CH₃.' },
    { q: 'State the approximate ¹H NMR shift for aromatic hydrogens', a: 'δ 6.5–8.0', explain: 'Ring current effects deshield aromatic protons strongly.' },
    { q: 'Why do OH and COOH protons have variable, broad ¹H signals?', a: 'They exchange rapidly with other protons and hydrogen bond', explain: 'They also usually appear as singlets (no coupling) and can be removed by a D₂O shake — a classic identification trick.' },
    { q: '¹³C shift for an alkene carbon?', a: 'δ 110–150', explain: 'Nitrile carbons overlap this region (110–125), so check IR (~2250) to distinguish.' },
    { q: 'How many ¹³C signals does propanone (CH₃COCH₃) give?', a: 'Two', explain: 'The two CH₃ groups are equivalent by symmetry, so they give ONE signal, plus one for the C=O. Counting symmetry is essential.' },
    { q: 'What does a 6H singlet in ¹H NMR usually indicate?', a: 'Two equivalent CH₃ groups with no neighbouring H', explain: 'Classic for propanone (CH₃COCH₃) or a gem-dimethyl group.' },
    { q: 'Degrees of unsaturation — what does each one mean?', a: 'Each degree = one ring OR one double bond (a triple bond = 2)', explain: 'Compare the molecular formula to the saturated CₙH₂ₙ₊₂; every 2 H missing = 1 degree. It tells you how many C=C/C=O/rings to look for.' },

    { q: 'What does the molecular ion peak (M⁺) tell you?', a: 'The relative molecular mass (Mr) — the highest-mass significant peak', explain: 'It is the intact molecule after losing one electron.' },
    { q: 'Mass-spec fragment loss of 15 suggests…', a: 'loss of CH₃ (a methyl group)', explain: 'M⁺ − 15 means a methyl broke off.' },
    { q: 'Fragment loss of 45 suggests…', a: 'COOH (carboxylic acid) or OC₂H₅ (ethyl ester)', explain: '45 = CO₂H — pair with a broad IR O–H to confirm an acid.' },
    { q: 'Fragment loss of 29 suggests…', a: 'CHO (aldehyde) or C₂H₅ (ethyl)', explain: 'Use the IR / NMR to decide which.' },
    { q: 'M and M+2 peaks in a ~3:1 ratio means…', a: 'Chlorine is present', explain: '³⁵Cl : ³⁷Cl ≈ 3 : 1.' },
    { q: 'M and M+2 peaks in a ~1:1 ratio means…', a: 'Bromine is present', explain: '⁷⁹Br : ⁸¹Br ≈ 1 : 1.' },
    { q: 'State the nitrogen rule and what it tells you', a: 'An ODD molecular-ion mass → an odd number of nitrogen atoms', explain: 'Spot an odd M⁺ and suspect an amine, amide or nitrile.' },
    { q: 'Identify the functional group: IR shows a very broad 2500–3300 cm⁻¹ band plus a strong ~1710 cm⁻¹ peak', a: 'Carboxylic acid', explain: 'Broad low O–H plus a C=O is the acid signature.' },
    { q: 'Identify the functional group: IR shows a broad 3200–3550 cm⁻¹ band with NO C=O peak', a: 'Alcohol (O–H)', explain: 'Higher, broad O–H and no carbonyl.' },
    { q: 'Identify the functional group: IR shows a sharp peak at ~2250 cm⁻¹', a: 'Nitrile (C≡N)', explain: 'Sits in the otherwise-empty triple-bond region.' },
    { q: 'Where does a C=O stretch appear in IR?', a: '~1670–1750 cm⁻¹ (strong, sharp)', explain: 'Present in aldehydes, ketones, acids, esters and amides.' },
    { q: 'State the n+1 rule and what it tells you about a ¹H NMR signal', a: 'n neighbouring H’s split a signal into n+1 peaks', explain: '0→singlet, 1→doublet, 2→triplet, 3→quartet.' },
    { q: 'Describe the ¹H NMR pattern produced by an ethyl group (CH₃CH₂–)', a: 'CH₃ = triplet, CH₂ = quartet', explain: 'CH₃ has 2 neighbours (triplet); CH₂ has 3 (quartet).' },
    { q: 'What does integration tell you in ¹H NMR?', a: 'The ratio of the number of H’s in each environment', explain: 'Peak areas are proportional to proton counts.' },
    { q: '¹H NMR: a 1H signal at δ 9.5–10 indicates…', a: 'An aldehyde –CHO proton', explain: 'Very downfield — the classic aldehyde giveaway.' },
    { q: 'Identify the carbon environment: a ¹³C NMR peak at δ 190–220', a: 'A ketone or aldehyde C=O', explain: 'Acids/esters/amides are lower (160–185).' },
    { q: 'List the order in which to use MS, IR, ¹³C and ¹H data to determine a structure', a: 'Mr from M⁺ → formula/unsaturation → IR (groups) → ¹³C (carbons & C=O) → ¹H (framework, integration, splitting) → confirm with fragments', explain: 'A systematic route beats guessing.' },
    { q: 'M⁺=60, broad low O–H + C=O, singlet 3H at 2.1, broad 1H at 11.5 — what is it?', a: 'Ethanoic acid, CH₃COOH', explain: 'COOH (45) + CH₃ (15) = 60; 11.5 ppm proton = COOH.' },
    { q: 'Distinguish propanal from propanone (both C₃H₆O)', a: 'Propanal shows a ¹H peak ~9.7 (CHO); propanone shows one 6H singlet (two equivalent CH₃)', explain: 'The aldehyde proton is decisive — links to organic functional-group isomers.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: what each technique actually tells you', a: '<strong>MS</strong> → molecular mass and fragments (so molecular formula, and Cl/Br from isotope patterns). <strong>IR</strong> → which functional groups are present. <strong>¹³C NMR</strong> → how many chemically different carbons. <strong>¹H NMR</strong> → how many different H environments, how many H in each, and what is next door.', explain: 'Structure-determination questions are marked on using the RIGHT evidence for each deduction. Saying "the IR shows it is an aldehyde" is wrong — IR shows a C=O; it takes the ¹H peak near δ 9.7 to say aldehyde. Always name which spectrum gave you which conclusion.' },
    { q: '⚖️ TELL THEM APART: IR of an alcohol vs a carboxylic acid', a: 'An <strong>alcohol</strong> shows a broad O–H around 3200–3600 cm⁻¹ and NO C=O. A <strong>carboxylic acid</strong> shows a very broad O–H (2500–3300 cm⁻¹, often overlapping the C–H peaks) PLUS a strong C=O near 1700 cm⁻¹.', explain: 'The presence or absence of the C=O is the decisive evidence — never rely on the O–H shape alone. The acid O–H is broader and starts lower because of strong hydrogen-bonded dimers. If you see a broad O–H and no carbonyl, it is an alcohol; both together means acid.' },
    { q: '⚖️ TELL THEM APART: aldehyde vs ketone from spectra', a: 'Both show a strong C=O near 1700 cm⁻¹ in IR. The difference is in ¹H NMR: an <strong>aldehyde</strong> has a distinctive 1H signal at δ 9–10 (the CHO proton); a <strong>ketone</strong> has nothing above about δ 2.6.', explain: 'IR alone cannot separate them, which is exactly why exams pair the two spectra. In MS, aldehydes also often show a characteristic M−1 peak (loss of the CHO hydrogen) and a fragment at m/z 29 (CHO⁺), which is useful corroborating evidence.' },
    { q: '⚖️ TELL THEM APART: chlorine vs bromine from the mass spectrum', a: '<strong>Cl</strong> gives M and M+2 in roughly a <strong>3:1</strong> ratio (³⁵Cl:³⁷Cl). <strong>Br</strong> gives M and M+2 in roughly a <strong>1:1</strong> ratio (⁷⁹Br:⁸¹Br).', explain: 'This is one of the most reliable single deductions available in MS, so exams use it often. The ratio comes straight from natural isotopic abundance. Two chlorines give M : M+2 : M+4 in about 9:6:1 — worth recognising, because a three-peak pattern immediately tells you there are two halogens.' },
    { q: '⚖️ TELL THEM APART: number of ¹³C signals vs number of ¹H signals', a: '¹³C counts chemically distinct CARBON environments; ¹H counts distinct HYDROGEN environments. They are usually different numbers.', explain: 'A quaternary carbon or a C=O appears in ¹³C but contributes no ¹H signal at all. Propanone is the clean example: two carbon environments (C=O and the two equivalent CH₃) but only ONE hydrogen environment. Comparing the two counts is often the fastest route to a symmetric structure.' },
    { q: '⚖️ TELL THEM APART: integration vs splitting in ¹H NMR', a: '<strong>Integration</strong> (peak area) gives the RATIO of hydrogens in each environment. <strong>Splitting</strong> (the n+1 rule) tells you how many hydrogens are on the ADJACENT carbon.', explain: 'They answer different questions and exams expect both to be used. A 3H triplet means: three equivalent H (integration) next to a carbon bearing two H (splitting) — i.e. a CH₃ attached to a CH₂. Combining them lets you assemble fragments rather than guess.' },

    /* ---- reasoning depth ---- */
    { q: 'What does the n+1 rule state, and what causes it?', a: 'A hydrogen environment with n equivalent hydrogens on the adjacent carbon is split into n+1 peaks. It is caused by spin–spin coupling with those neighbouring nuclei.', explain: 'Practise reading it backwards, which is what exams require: a quartet means 3 neighbouring H, a triplet means 2, a doublet means 1, a singlet means 0. The classic ethyl group signature is a 3H triplet plus a 2H quartet — recognise that pair instantly and you have found a CH₃CH₂ fragment.' },
    { q: 'Why is TMS used as the NMR reference, and where is it set?', a: 'Tetramethylsilane is set as δ = 0. It is used because it is chemically inert, volatile (easily removed), soluble in organic solvents, and its 12 equivalent hydrogens give a single sharp peak well clear of almost all sample signals.', explain: 'Silicon is less electronegative than carbon, so TMS protons are unusually shielded — putting its peak below essentially everything you will measure. That is why nearly all chemical shifts are positive numbers.' },
    { q: 'Why does a ¹³C shift table list C–C, C–O and C–N, but never C–H?', a: 'Because in ¹³C NMR you are observing the CARBON, and hydrogen (EN 2.20) barely deshields a carbon (2.55) — so a carbon bonded only to C and H is already the “C–C alkyl, 5–40” row. There is no separate C–H environment.', explain: 'The ¹H table is full of C–H entries because there you observe the HYDROGEN, so what matters is what its carbon carries. Same molecule, different nucleus, different question — this is a classic mix-up. Use electronegativity to order the ¹³C table rather than memorising it: N (3.04) deshields less than O (3.44), so C–N (20–60) sits below C–O (50–90), and both sit below anything with a π bond.' },
    { q: 'Why do electronegative atoms shift ¹H signals DOWNFIELD?', a: 'They withdraw electron density from nearby hydrogens, so those hydrogens are deshielded — they experience more of the external magnetic field and resonate at a higher chemical shift.', explain: 'This gives you a predictive tool rather than a lookup table: H on a carbon bearing O or a halogen appears around δ 3.5–4.5, H next to a C=O around δ 2.1–2.6, and plain alkyl H around δ 0.9–1.5. The effect also falls off sharply with distance, so a CH₃ two carbons from an oxygen barely shifts at all.' },
    { q: 'Set out the standard order of attack for a structure-determination question', a: '1. Molecular ion → molecular mass; check isotope patterns for Cl/Br and an odd mass for N. 2. IR → functional groups. 3. ¹³C → count carbon environments. 4. ¹H → integration for ratios, splitting for neighbours. 5. Assemble, then CHECK the structure against every piece of data.', explain: 'The final check is the step students skip and markers reward. A structure that fits the ¹H but contradicts the ¹³C count is wrong, and saying "this structure is consistent with all four spectra because…" is the sentence that lifts an answer to Excellence.' },
    { q: 'What is the degree of unsaturation (index of hydrogen deficiency) and how do you use it?', a: 'For CcHhNnOoXx: DoU = (2c + 2 + n − h − x) / 2. Each unit means one ring or one π bond.', explain: 'It is the fastest sanity check available. DoU = 1 with a C=O in the IR means the carbonyl accounts for everything — so there are no rings and no C=C. DoU = 4 almost always signals a benzene ring (3 π bonds + 1 ring). Calculate it before you start assembling, and it will rule out most wrong structures immediately.' },
    { q: 'Why does an odd molecular ion mass suggest nitrogen?', a: 'Because of the nitrogen rule: a compound of C, H and O always has an even molecular mass, so an odd molecular ion implies an odd number of nitrogen atoms.', explain: 'It follows from nitrogen being trivalent with an even mass — it is the only common element that breaks the parity pattern. Combined with an IR N–H stretch around 3300 cm⁻¹, an odd M⁺ is strong evidence for an amine or amide, and it costs you no working to spot.' },
    { q: 'How do you distinguish propan-1-ol from propan-2-ol using ¹H NMR alone?', a: 'Propan-1-ol (CH₃CH₂CH₂OH) has four environments in a 3:2:2:1 ratio. Propan-2-ol ((CH₃)₂CHOH) has three environments in a 6:1:1 ratio, with a distinctive 6H doublet.', explain: 'The 6H doublet is the giveaway — two equivalent methyl groups on the same carbon, each split by the single adjacent CH. Whenever integration gives you 6H as one signal, look for two equivalent methyls and a symmetric structure.' },
  ],

  sections: [
    /* ============================================ 0 CONNECTIONS */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Spectroscopy is written in shorthand. None of it is hard, but it is all assumed — so if a symbol has never been explained to you, it is not obvious. Everything you will meet on this page is defined here.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols and units used in spectroscopy', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: '¹H and ¹³C <span class="xs">(the small number, top-left)</span>',
            def: 'The raised number in front of an element is its <strong>mass number</strong> — protons + neutrons — so it names a specific <strong>isotope</strong>. <strong>¹H</strong> is ordinary hydrogen (1 proton, no neutrons). <strong>¹³C</strong> is carbon-13 (6 protons + 7 neutrons).',
            note: 'It is written top-LEFT so it is not confused with a charge (top-right, e.g. Na⁺) or a subscript count (bottom-right, e.g. H₂O). Only ¹H and ¹³C are NMR-active among the common isotopes — ordinary ¹²C gives no NMR signal at all, which is exactly why ¹³C NMR specifies the isotope.' },
          { term: 'δ <span class="xs">(delta — the "squiggly" symbol)</span>',
            def: 'The Greek lower-case letter delta, used here to mean <strong>chemical shift</strong>: how far a signal sits from the reference peak on an NMR spectrum.',
            note: 'A larger δ means the nucleus is more <em>deshielded</em> (more electron density pulled away from it), so it appears further LEFT on the spectrum — conventionally called "downfield".' },
          { term: 'ppm <span class="xs">(parts per million)</span>',
            def: 'The <strong>unit of chemical shift</strong>. It is a ratio: the frequency difference between the signal and the reference, divided by the spectrometer’s operating frequency, × 10⁶.',
            note: 'Because it is a ratio, ppm values are the SAME on any spectrometer — a peak at δ 7.3 is at 7.3 ppm whether the machine runs at 60 MHz or 400 MHz. That is the whole point of the scale, and why shift tables are universal.' },
          { term: 'Δδ <span class="xs">(delta delta)</span>',
            def: 'A <strong>difference in chemical shift</strong> between two signals, or the shift caused by a change in structure. Capital Δ means "change in"; lower-case δ is the shift itself.',
            note: 'So Δδ = 0.4 ppm means two peaks sit 0.4 ppm apart. Capital Δ means "change in" everywhere in science — the same convention as ΔH and ΔG in thermochemistry.' },
          { term: 'TMS', def: 'Tetramethylsilane, Si(CH₃)₄ — the reference compound whose single peak is <strong>defined as δ = 0</strong>.', note: 'Every other shift is measured relative to it.' },
          { term: 'm/z', def: 'Mass-to-charge ratio, the x-axis of a mass spectrum. Since almost all fragments carry a single positive charge (z = 1), you can read m/z as simply <strong>the mass of that fragment</strong>.' },
          { term: 'M⁺ <span class="xs">(the molecular ion)</span>',
            def: 'The peak produced by the WHOLE molecule after losing one electron. Its m/z gives you the <strong>molecular mass</strong> of the compound.',
            note: 'M+1, M+2 etc. are isotope peaks — M+2 at about a third the height of M signals chlorine; M+2 roughly equal in height signals bromine.' },
          { term: 'cm⁻¹ <span class="xs">(wavenumber)</span>',
            def: 'The unit of the IR x-axis: the number of wave cycles per centimetre, i.e. 1/wavelength. Higher wavenumber = higher energy.',
            note: 'Read it as "per centimetre". It is used instead of wavelength because it is directly proportional to energy, so stronger bonds and lighter atoms absorb at higher wavenumbers.' },
          { term: 'Upfield / downfield', def: '<strong>Downfield</strong> = larger δ, further left on the spectrum, more deshielded. <strong>Upfield</strong> = smaller δ, further right, more shielded.' },
          { term: 'Integration', def: 'The relative AREA under a ¹H peak, which gives the <strong>ratio</strong> of hydrogens in that environment — not the absolute number.' },
          { term: 'Splitting / multiplicity', def: 'How many sub-peaks a signal is split into. The <strong>n+1 rule</strong>: n hydrogens on the neighbouring carbon split a signal into n+1 peaks (singlet, doublet, triplet, quartet…).' },
        ]},
        { t: 'tip', title: 'Where the small numbers go', html: 'Chemistry puts four different numbers around a symbol and each means something different:<br><strong>Top-left</strong> = mass number / isotope (<em>¹³C</em>) · <strong>Top-right</strong> = charge (<em>Na⁺</em>, <em>SO₄²⁻</em>) · <strong>Bottom-right</strong> = how many atoms (<em>H₂O</em>) · <strong>In front</strong> = how many molecules (<em>2H₂O</em>).' },
      ],
    },
    {
      id: 'connections', num: '1', title: 'How this connects to your other standards',
      intro: 'Spectroscopy is the evidence standard — it proves what a compound is. It sits directly on top of organic chemistry and feeds your analysis internal.',
      blocks: [
        { t: 'connects', intro: 'You cannot do this standard in isolation — here is exactly what it leans on:', items: [
          { to: '#/topic/chem-91391', label: 'Organic compounds (91391) — the prerequisite',
            why: 'Every structure you deduce here is an organic molecule you must be able to NAME and DRAW. If MS gives Mr=60, IR shows a broad low O–H and a C=O, and NMR shows a 3H singlet — you must know that CH₃COOH is ethanoic acid. Deduction is useless without the naming skills from 91391. Do that page first if you are shaky.' },
          { to: '#/topic/chem-91387', label: 'Quantitative analysis (91387) — the other measurement internal',
            why: 'Both are “analyse an unknown” internals. 91387 answers HOW MUCH (concentration, by titration/gravimetry); 91388 answers WHAT (identity, by spectra). Together they are the two halves of real analytical chemistry — and both demand care with uncertainty, significant figures and honest evaluation of your evidence.' },
          { to: '#/topic/chem-91392', label: 'Aqueous equilibria (91392) — identifying acids you then titrate',
            why: 'Spot a carboxylic acid from a broad 2500–3300 O–H plus C=O, and you immediately know it will behave as a WEAK acid in water — partially ionised, pH from √(Ka·c), and giving a basic salt. Identification predicts behaviour.' },
        ]},
        { t: 'tip', title: 'Study them together, not separately', html: 'The most efficient revision move: take any compound from the organic reaction pathways, and ask “what would its mass spec, IR and NMR look like?” Doing this in both directions locks in 91391 and 91388 at the same time.' },
      ],
    },
    /* ============================================================ 1 MS */
    {
      id: 'mass-spec', num: '2', title: 'Mass spectrometry',
      intro: 'A molecule is ionised and broken into fragments. The heaviest peak (the molecular ion, M⁺) gives the molar mass; the pattern of fragment losses tells you which pieces broke off.',
      video: 'NCEA Level 3 chemistry mass spectrometry interpreting fragments',
      blocks: [
        { t: 'key', title: 'Reading a mass spectrum', items: [
          'The <strong>molecular ion peak (M⁺)</strong> is the highest-mass significant peak = the relative molecular mass (M<sub>r</sub>).',
          'The <strong>base peak</strong> is the tallest peak (most stable/abundant fragment) — set to 100% relative abundance.',
          'A <strong>fragment</strong> forms when a bond breaks; the mass <em>lost</em> (M⁺ − fragment) identifies the group that left.',
          'A small <strong>M+1 peak</strong> comes from the ¹³C isotope — its size hints at the number of carbons.',
        ]},
        { t: 'table', mono: true, caption: 'Common fragment losses (M⁺ − fragment)', headers: ['Mass lost', 'Group lost', 'Suggests'], rows: [
          ['15', 'CH₃', 'a methyl branch'],
          ['16', 'NH₂', 'primary amide (usually seen alongside a loss of 17)'],
          ['17', 'OH or NH₃', 'carboxylic acid / alcohol — or an amide/amine'],
          ['18', 'H₂O', 'alcohol (dehydration)'],
          ['28', 'CO or C₂H₄', 'carbonyl / ethyl chain'],
          ['29', 'CHO or C₂H₅', 'aldehyde / ethyl group'],
          ['31', 'OCH₃ or CH₂OH', 'methyl ester / alcohol'],
          ['43', 'CH₃CO or C₃H₇', 'methyl ketone / propyl'],
          ['45', 'COOH or OC₂H₅', 'carboxylic acid / ethyl ester'],
        ]},
        { t: 'table', mono: true, caption: 'Common fragment ions (m/z)', headers: ['m/z', 'Likely ion'], rows: [
          ['15', 'CH₃⁺'],
          ['29', 'CHO⁺ or C₂H₅⁺'],
          ['30', 'CH₂=NH₂⁺ — the primary-amine marker'],
          ['43', 'CH₃CO⁺ (acylium) or C₃H₇⁺'],
          ['44', 'CONH₂⁺ (amide) or CO₂⁺'],
          ['45', 'COOH⁺ or CH₃CH(OH)⁺'],
          ['77', 'C₆H₅⁺ (phenyl — aromatic)'],
        ]},
        { t: 'note', title: 'Nitrogen compounds: look at 30, not 16', html: 'NH₂⁺ does weigh 16, but you will rarely use it as evidence — <strong>m/z 16 is ambiguous</strong> (it is equally O⁺ or CH₄⁺˙) and very low-mass fragments carry almost no structural information.<br><br>Amines fragment by <strong>α-cleavage</strong>: the bond <em>next to</em> the nitrogen breaks, and the nitrogen <strong>stays with the charge</strong> because it stabilises it. So a primary amine gives a strong <strong>m/z 30 (CH₂=NH₂⁺)</strong> — often the base peak. Snapping NH₂ off to leave a bare carbocation discards the very atom that was stabilising the charge, so it is the less favourable route.<br><br>Loss of 16 <em>is</em> worth knowing for <strong>amides</strong>, where NH₂ and NH₃ (17) are both lost. Chain it with the nitrogen rule: odd M⁺ → suspect N → sharp N–H near 3300 cm⁻¹ in IR → m/z 30 says primary amine, m/z 44 with a C=O says amide.' },
        { t: 'note', title: 'Isotope patterns — halogens are a giveaway', html: '<strong>Chlorine:</strong> M⁺ and M+2 peaks in roughly <strong>3 : 1</strong> ratio (³⁵Cl : ³⁷Cl). <strong>Bromine:</strong> M⁺ and M+2 in roughly <strong>1 : 1</strong> (⁷⁹Br : ⁸¹Br). Seeing an M+2 peak of similar height to M⁺ ⟹ bromine present.' },
        { t: 'example', tag: 'Worked example', title: 'Interpreting fragments', problem: 'A compound has M⁺ = 46, with a fragment at m/z 31 and another at 29.', steps: [
          'M⁺ = 46 → M<sub>r</sub> = 46. Loss of 15 (46→31) = CH₃; the m/z 31 ion = CH₂OH⁺ or CHO... 31 = CH₃O.',
          'A peak at 29 = CHO⁺ or C₂H₅⁺.',
          'Formula with M<sub>r</sub> 46 containing O: C₂H₆O (ethanol) or CH₂O₂ (methanoic acid).',
          'The m/z 31 (CH₂OH⁺) fragment points to ethanol, CH₃CH₂OH (loses CH₃ to give ⁺CH₂OH at 31).',
        ], answer: 'M⁺ = 46 → ethanol, CH₃CH₂OH (confirm with IR broad O–H, no C=O).' },
      ],
    },

    /* ============================================================ 2 IR */
    {
      id: 'ir', num: '3', title: 'Infrared (IR) spectroscopy',
      intro: 'IR tells you which bonds/functional groups are present, from the wavenumber (cm⁻¹) at which bonds absorb. Look at the diagnostic region above ~1500 cm⁻¹; the fingerprint region below is compound-specific.',
      blocks: [
        { t: 'table', mono: true, caption: 'Characteristic IR absorptions', headers: ['Bond', 'Wavenumber (cm⁻¹)', 'Appearance / group'], rows: [
          ['O–H (alcohol)', '3200–3550', 'strong, broad'],
          ['O–H (carboxylic acid)', '2500–3300', 'very broad (spreads over C–H)'],
          ['N–H (amine / amide)', '3300–3500', 'medium; 1–2 sharper bands'],
          ['C–H', '2850–3100', 'sharp (just below 3000 = alkane)'],
          ['C≡N (nitrile)', '2200–2260', 'sharp, distinctive gap region'],
          ['C=O (carbonyl)', '1670–1750', 'strong, sharp'],
          ['C=C (alkene)', '1620–1680', 'medium'],
          ['C–O', '1000–1300', 'strong (esters, alcohols)'],
        ]},
        { t: 'key', title: 'Distinguishing similar groups', items: [
          '<strong>Carboxylic acid O–H</strong>: very broad, low (2500–3300), overlapping the C–H peaks — plus a C=O near 1710. <strong>Alcohol O–H</strong>: broad but higher (3200–3550) and no C=O.',
          '<strong>N–H</strong> is sharper and often shows one or two spikes, versus the broad O–H humps.',
          '<strong>C=O present + broad low O–H</strong> ⟹ carboxylic acid. <strong>C=O present, no O–H</strong> ⟹ aldehyde, ketone or ester (use NMR/MS to choose).',
          '<strong>No C=O, broad O–H</strong> ⟹ alcohol. <strong>Sharp peak ~2250, nothing else</strong> ⟹ nitrile.',
        ]},
        { t: 'tip', title: '🧠 Mnemonic — IR peak identification', html: '<strong>“<u>B</u>road and <u>L</u>ow = <u>a</u>ci<u>d</u>; <u>B</u>road and <u>H</u>igh = a<u>l</u>co<u>h</u>ol.”</strong><br>Then: <strong>“1700 is the carbonyl gate”</strong> — a strong sharp peak near 1700 means a C=O is present; nothing there means no carbonyl.<br>And for the empty region: <strong>“2250 is lonely — only nitriles live there.”</strong> (Almost nothing else absorbs in the triple-bond gap, so a sharp spike there is a giveaway C≡N.)' },
        { t: 'tip', title: 'A quick IR decision tree', html: 'Ask in order: <strong>C=O (~1700)?</strong> → yes: broad low O–H too? acid : (ester/aldehyde/ketone). → no: broad O–H? alcohol : sharp ~2250? nitrile : N–H? amine.' },
      ],
    },

    /* ============================================================ 3 NMR */
    {
      id: 'nmr', num: '4', title: 'NMR spectroscopy (¹H and ¹³C)',
      intro: 'NMR maps out the hydrogen and carbon environments. ¹³C tells you how many distinct carbons; ¹H tells you the number, environment, neighbours and ratio of hydrogens.',
      video: 'NCEA Level 3 chemistry NMR spectroscopy proton carbon-13 splitting',
      blocks: [
        { t: 'p', html: `<strong>Number of signals</strong> = number of chemically different environments. Equivalent atoms (related by symmetry) give one signal.` },
        { t: 'table', mono: true, caption: '¹H NMR — approximate chemical shifts (δ, ppm)', headers: ['Environment', 'δ (ppm)'], rows: [
          ['R–CH₃', '0.8–1.2'],
          ['R–CH₂–R', '1.2–1.5'],
          ['CH₃ next to C=O (CH₃CO–)', '2.0–2.6'],
          ['CH next to O (R–O–CH)', '3.3–4.5'],
          ['=C–H (alkene)', '4.5–6.5'],
          ['aromatic H', '6.5–8.0'],
          ['–CHO (aldehyde)', '9.4–10.0'],
          ['–COOH / –OH (variable, broad)', '2–12'],
        ]},
        { t: 'table', mono: true, caption: '¹³C NMR — approximate chemical shifts (δ, ppm)', headers: ['Carbon environment', 'δ (ppm)'], rows: [
          ['C–C (alkyl)', '5–40'],
          ['C–N (amine — the C attached to N)', '20–60'],
          ['C–O (alcohol / ester)', '50–90'],
          ['C=C (alkene)', '110–150'],
          ['C≡N (nitrile)', '110–125'],
          ['C=O (ester / acid / amide)', '160–185'],
          ['C=O (aldehyde / ketone)', '190–220'],
        ]},
        { t: 'mistake', title: 'Why there is no “C–H” row here', html: 'Students look for C–H in this table because the ¹H table above is full of C–H entries. It is not an omission — <strong>there is no such thing as a distinct C–H environment in ¹³C NMR</strong>.<br><br>In ¹³C you are observing the <strong>carbon</strong>, and a carbon’s shift is set by its hybridisation and by <em>how electronegative its neighbours are</em>. Hydrogen (2.20) is barely more electronegative than carbon (2.55), so a C–H bond pulls almost no electron density away — it shifts the carbon hardly at all. A carbon carrying only C and H <em>is</em> the <strong>C–C (alkyl), 5–40</strong> row.<br><br>The ¹H table lists C–H environments because there you are observing the <strong>hydrogen</strong>, so what matters is what that hydrogen’s carbon is attached to. Same molecule, different nucleus, different question.<br><br>Use the electronegativity logic instead of memorising: N (3.04) deshields less than O (3.44), so <strong>C–N (20–60) sits below C–O (50–90)</strong> — and both sit below anything with a π bond.' },
        { t: 'key', title: 'The n+1 splitting rule (¹H NMR)', items: [
          'A signal is split into <strong>(n+1)</strong> peaks by <strong>n</strong> equivalent H’s on the <em>neighbouring</em> carbon(s).',
          '0 neighbours → <strong>singlet</strong>; 1 → doublet; 2 → triplet; 3 → quartet.',
          'Classic ethyl group (CH₃CH₂–): the CH₃ (next to 2 H) is a <strong>triplet</strong>; the CH₂ (next to 3 H) is a <strong>quartet</strong>.',
          '<strong>Integration</strong> (area under each signal) gives the <em>ratio</em> of H’s in each environment.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Reading an ethyl pattern', problem: 'A ¹H NMR shows a triplet (3H, δ 1.2) and a quartet (2H, δ 3.7), plus a singlet (3H, δ 2.0). Suggest fragments.', steps: [
          'Triplet 3H + quartet 2H, coupled = a –O–CH₂–CH₃ ethyl group (CH₂ near O at 3.7).',
          'Singlet 3H at δ 2.0 = CH₃ next to C=O with no neighbouring H (CH₃CO–).',
          'Putting them together: CH₃–CO–O–CH₂–CH₃.',
        ], answer: 'Ethyl ethanoate, CH₃COOCH₂CH₃ (an ester — confirm C=O in IR ~1740, no broad O–H).' },
      ],
    },

    /* ============================================================ 4 COMBINED */
    {
      id: 'combined', num: '5', title: 'Combining the data — full structure determination',
      intro: 'The exam-style skill: take MS + IR + NMR together and reason to a single structure. Use this order every time.',
      blocks: [
        { t: 'key', title: 'A reliable method', items: [
          '<strong>1. M<sub>r</sub></strong> from the M⁺ peak → work out a molecular formula (use M+2 for Cl/Br).',
          '<strong>2. Degrees of unsaturation</strong> — a C=O or C=C or ring each removes 2 H from the saturated formula (CₙH₂ₙ₊₂).',
          '<strong>3. IR</strong> → identify the functional group(s) present.',
          '<strong>4. ¹³C</strong> → count distinct carbons; check for C=O (190–220 ketone/aldehyde, 160–185 acid/ester).',
          '<strong>5. ¹H</strong> → environments, integration ratios, splitting → assemble the skeleton.',
          '<strong>6. Fragments</strong> from MS → confirm the pieces fit.',
        ]},
        { t: 'example', tag: 'Full worked example', title: 'Deduce the unknown (M⁺ = 60)', problem: 'M⁺ = 60. IR: very broad 2500–3300 cm⁻¹ AND strong 1715 cm⁻¹. ¹H NMR: singlet 3H at δ 2.1; broad singlet 1H at δ 11.5. Fragment at m/z 45 and 15.', steps: [
          'Step 1 — M<sub>r</sub> = 60. Step 2 — broad low O–H + C=O in IR ⟹ carboxylic acid (–COOH).',
          'Step 3 — –COOH accounts for 45 mass units (CO₂H). 60 − 45 = 15 = CH₃.',
          'Step 4 — ¹H: singlet 3H at 2.1 = CH₃ next to C=O (no H neighbours → singlet). Broad 1H at 11.5 = COOH proton.',
          'Step 5 — fragments: m/z 45 = COOH⁺, m/z 15 = CH₃⁺ — matches the two pieces.',
          'Assemble: CH₃–COOH.',
        ], answer: 'Ethanoic acid, CH₃COOH.' },
        { t: 'example', tag: 'Full worked example', title: 'Aldehyde vs ketone (M⁺ = 58)', problem: 'M⁺ = 58 (C₃H₆O). IR: strong 1715 cm⁻¹, no broad O–H. Compound A: ¹H NMR one singlet (6H, δ 2.1); ¹³C peak at δ 206. Compound B: ¹H NMR triplet, quartet, and a 1H peak at δ 9.7; ¹³C at δ 202.', steps: [
          'Both are C₃H₆O with a C=O (IR ~1715, no O–H → not an acid).',
          'Compound A: a single 6H singlet = two equivalent CH₃ groups either side of C=O; ¹³C 206 (ketone) ⟹ propanone, CH₃COCH₃.',
          'Compound B: the δ 9.7 (1H) is a classic aldehyde –CHO; the triplet/quartet = an ethyl group ⟹ propanal, CH₃CH₂CHO.',
        ], answer: 'A = propanone (ketone); B = propanal (aldehyde). The δ 9.5–10 ¹H peak is the aldehyde giveaway.' },
      ],
    },

    /* ============================================================ 5 PRACTICE */
    {
      id: 'id-bank', num: '6', title: '“Identify the compound” practice bank',
      intro: 'Increasing difficulty. Work through the data, then reveal. These mirror the internal’s data-to-structure task.',
      blocks: [
        { t: 'reveals', title: 'Set A — warm up', items: [
          { q: 'M⁺ = 32. IR: broad O–H ~3300, no C=O. ¹H: singlet 3H (δ 3.4) + 1H (δ 2, broad). ¹³C: one peak δ 50.', a: 'Methanol, CH₃OH. One carbon (¹³C single peak, C–O region), one CH₃ environment + OH.' },
          { q: 'M⁺ = 44. IR: strong C=O 1730, no O–H. ¹H: 1H at δ 9.8, quartet+triplet? Actually 2 signals.', a: 'Ethanal (acetaldehyde) CH₃CHO — δ 9.8 aldehyde H; C=O in IR; M<sub>r</sub> 44.' },
        ]},
        { t: 'reveals', title: 'Set B — halogens & esters', items: [
          { q: 'M⁺ = 94 with an M+2 peak of similar height (~1:1). IR: C–H only. ¹H: two signals (triplet 3H, quartet 2H).', a: 'Bromoethane, CH₃CH₂Br. The ~1:1 M/M+2 pattern = bromine; ethyl triplet/quartet; 94 = C₂H₅⁷⁹Br.' },
          { q: 'M⁺ = 74. IR: strong C=O 1740, no broad O–H. ¹H: singlet 3H (δ 3.7) + singlet 3H (δ 2.0). ¹³C: peak δ 171.', a: 'Methyl ethanoate, CH₃COOCH₃. Two 3H singlets (OCH₃ at 3.7, CH₃CO at 2.0); ¹³C 171 = ester C=O.' },
        ]},
        { t: 'reveals', title: 'Set C — combine everything', items: [
          { q: 'M⁺ = 88. IR: broad 2500–3300 + C=O 1710. ¹H: triplet 3H (δ 1.0), multiplet 2H (δ 1.6), triplet 2H (δ 2.3), broad 1H (δ 11). ', a: 'Butanoic acid, CH₃CH₂CH₂COOH. Broad low O–H + C=O = acid; the propyl chain gives the 1.0/1.6/2.3 pattern; 11 ppm = COOH; M<sub>r</sub> 88.' },
          { q: 'M⁺ = 59, odd → contains N. IR: sharp 2250 cm⁻¹. ¹H: triplet 3H + quartet 2H. ¹³C: peak δ 119.', a: 'Propanenitrile, CH₃CH₂CN. Odd M<sub>r</sub> = one N; sharp 2250 = C≡N; ¹³C 119 = nitrile carbon; ethyl pattern.' },
        ]},
        { t: 'note', title: '🧠 The nitrogen rule — “odd mass, odd N”', html: 'An <strong>odd</strong> molecular ion mass usually means an <strong>odd number of nitrogen atoms</strong> in the molecule. Spot an odd M⁺ → suspect an amine, amide or nitrile.<br><br>🧠 For isotopes: <strong>“Chlorine is a 3:1 split; Bromine is a fair 1:1 twin.”</strong>' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Chemistry L3 (91388) internal exemplars', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91388', note: 'Internal assessment resources, exemplars & clarifications', verify: true },
    { label: 'NZQA — 91391 papers (spectroscopy in the external)', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91391&view=exams', note: 'Structure-determination questions combined with organic', verify: true },
    { label: 'No Brain Too Small — Structure determination', url: 'https://www.nobraintoosmall.co.nz/html/senior_chemistry/NCEA3_chemistry.html', note: 'MS/IR/NMR combined questions by topic', verified: true },
  ],

  quiz: [
    { type: 'mc', q: 'A mass spectrum shows M⁺ and M+2 peaks of roughly equal height. This indicates:', choices: ['Chlorine present', 'Bromine present', 'Two carbons', 'A carboxylic acid'], answer: 1, explanation: 'Bromine’s two isotopes (⁷⁹Br, ⁸¹Br) are ~50:50, giving M and M+2 of similar height. Chlorine gives a 3:1 ratio.' },
    { type: 'mc', q: 'A very broad IR absorption from 2500–3300 cm⁻¹ together with a strong peak at 1710 cm⁻¹ indicates:', choices: ['An alcohol', 'An amine', 'A carboxylic acid', 'An alkene'], answer: 2, explanation: 'The very broad low O–H plus a C=O stretch is the signature of a carboxylic acid.' },
    { type: 'mc', q: 'In ¹H NMR, a CH₃ group next to a CH₂ appears as a:', choices: ['Singlet', 'Doublet', 'Triplet', 'Quartet'], answer: 2, explanation: 'n+1 rule: the CH₃ has 2 neighbouring H (the CH₂), so it is split into 2+1 = 3 peaks (a triplet).' },
    { type: 'mc', q: 'A ¹³C peak at δ 205 ppm most likely indicates:', choices: ['A C–C bond', 'An aromatic carbon', 'A ketone/aldehyde C=O', 'A C–O of an alcohol'], answer: 2, explanation: 'Ketone and aldehyde carbonyl carbons appear far downfield, ~190–220 ppm (acids/esters are lower, 160–185).' },
    { type: 'sa', q: 'A molecule has an odd molecular ion mass (M⁺ = 59). What element does this suggest is present?', accept: ['nitrogen', 'n'], answer: 'Nitrogen', explanation: 'The nitrogen rule: an odd M⁺ mass indicates an odd number of nitrogen atoms.' },

    /* ---- application & structure-determination questions ---- */
    { type: 'mc', q: 'A mass spectrum shows peaks at m/z 108 and 110 with roughly equal intensity. This indicates:', choices: ['Two chlorine atoms', 'One bromine atom', 'One chlorine atom', 'A nitrogen atom'], answer: 1, explanation: 'A 1:1 M / M+2 pattern is the signature of bromine (⁷⁹Br and ⁸¹Br are almost equally abundant). One chlorine would give a 3:1 ratio; two chlorines would give three peaks at about 9:6:1.' },
    { type: 'mc', q: 'An IR spectrum shows a strong absorption at 1715 cm⁻¹ and NO broad peak above 3000 cm⁻¹. The ¹H NMR shows no signal beyond δ 2.6. The compound is most likely:', choices: ['A carboxylic acid', 'An aldehyde', 'A ketone', 'An alcohol'], answer: 2, explanation: 'The 1715 cm⁻¹ peak is a C=O, and the absence of a broad O–H rules out acid and alcohol. The absence of any signal at δ 9–10 rules out an aldehyde — leaving a ketone. Note how each conclusion is tied to specific evidence; that is what the marking schedule rewards.' },
    { type: 'mc', q: 'A ¹H NMR spectrum shows a 3H triplet at δ 1.2 and a 2H quartet at δ 4.1. This fragment is:', choices: ['An isopropyl group', 'An ethyl group attached to an electronegative atom', 'A methyl group only', 'A benzene ring'], answer: 1, explanation: 'Triplet (2 neighbours) + quartet (3 neighbours) with 3:2 integration is the classic CH₃CH₂ signature. The quartet sitting at δ 4.1 rather than δ 1.5 means those CH₂ hydrogens are strongly deshielded — so the ethyl is attached to oxygen, as in an ester or ether.' },
    { type: 'mc', q: 'A compound C₃H₆O shows two ¹³C signals and ONE ¹H signal. It is:', choices: ['Propanal', 'Propanone', 'Prop-2-en-1-ol', 'Cyclopropanol'], answer: 1, explanation: 'One hydrogen environment means all six H are equivalent — only propanone ((CH₃)₂C=O) achieves that, with its two identical methyls. Its two carbon environments are the carbonyl and the equivalent methyls. Propanal would show three of each.' },
    { type: 'mc', q: 'A molecular ion appears at m/z 73 (an odd number) and the IR shows absorption near 3300 cm⁻¹. The compound most likely contains:', choices: ['A carboxylic acid group', 'Nitrogen', 'A bromine atom', 'A benzene ring'], answer: 1, explanation: 'The nitrogen rule: a C/H/O compound has an even molecular mass, so an odd M⁺ implies an odd number of nitrogens. The 3300 cm⁻¹ absorption fits an N–H stretch, supporting an amine or amide.' },
    { type: 'mc', q: 'A compound has molecular formula C₄H₈O₂ and its IR shows a strong C=O at 1740 cm⁻¹ but no O–H. Its degree of unsaturation and likely class are:', choices: ['DoU 0; an ether', 'DoU 1; an ester', 'DoU 2; a diketone', 'DoU 1; a carboxylic acid'], answer: 1, explanation: 'DoU = (2×4 + 2 − 8)/2 = 1, accounted for entirely by the C=O — so no rings or C=C. No O–H rules out the carboxylic acid, and with two oxygens and a carbonyl near 1740 cm⁻¹ the compound is an ester.' },
    { type: 'mc', q: 'Which piece of evidence would let you distinguish butanal from butanoic acid MOST directly?', choices: ['Both show a C=O near 1700 cm⁻¹', 'The very broad O–H (2500–3300 cm⁻¹) present only in the acid', 'Both contain four carbons', 'The molecular ion of each'], answer: 1, explanation: 'Both have a carbonyl, so the C=O cannot separate them. The acid\'s hydrogen-bonded dimer produces an unmistakably broad O–H stretching right across the C–H region. The aldehyde\'s δ 9–10 ¹H signal would work equally well as a second line of evidence.' },
    { type: 'mc', q: 'A ¹H NMR shows a 6H doublet and a 1H septet. This indicates:', choices: ['An ethyl group', 'An isopropyl group, (CH₃)₂CH–', 'A tert-butyl group', 'Two separate methyl groups'], answer: 1, explanation: 'Six equivalent H as a doublet means two identical methyls each next to a single H; the septet (6+1) is that lone CH split by all six methyl hydrogens. tert-Butyl would give a 9H singlet, since it has no adjacent hydrogens at all.' },
    { type: 'sa', q: 'Calculate the degree of unsaturation for C₆H₆.', accept: ['4', 'four'], answer: '4', explanation: 'DoU = (2×6 + 2 − 6)/2 = 4. That is the benzene signature: three π bonds plus one ring. Spotting DoU = 4 in a formula should immediately make you consider an aromatic ring.' },
    { type: 'sa', q: 'In ¹H NMR, what does the AREA under a peak tell you?', accept: ['number of hydrogens', 'ratio of hydrogens', 'how many hydrogens', 'integration', 'the relative number of hydrogens'], answer: 'the relative number of hydrogens in that environment', explanation: 'Integration gives ratios, not absolute counts — a 3:2 ratio could be 3:2 or 6:4. Use the molecular formula from the mass spectrum to convert the ratio into actual numbers of hydrogens.' },
    { type: 'sa', q: 'What chemical shift (δ) value in ¹H NMR is the giveaway for an aldehyde proton?', accept: ['9.7', '9-10', '9 to 10', '9.5', '9', '10', 'about 9.7'], answer: 'δ 9–10 (typically ~9.7)', explanation: 'Nothing else at Level 3 appears that far downfield, so a 1H signal in this region is essentially conclusive for CHO. It is the single most useful piece of evidence for separating aldehydes from ketones, which look identical in IR.' },
  ],
};

/* ============================================================================
   AS 91388, Spectroscopic data (Internal, 3 credits)  ★ DEEP-DIVE TOPIC
   Mass spectrometry · IR · ¹³C NMR · combined structure determination
   ----------------------------------------------------------------------------
   REBUILT (3 Aug 2026) directly from the Year 13 Chemistry NCEA Level 3
   Workbook, Chemistry 3.2, every table, range, worked example and rule below
   is transcribed from that book and its AS91388 data sheet.

   SCOPE RULE, explanatory note 3 of the standard limits the data to
   MASS SPECTROMETRY, INFRARED and ¹³C NMR. There is NO ¹H NMR in this
   standard, so there is none on this page: the n+1 splitting rule,
   integration, ¹H shift tables and the δ 9.7 aldehyde proton were all removed
   in the rebuild. If you meet them later they belong to other courses.

   Also directly useful for the 91391 external, where spectroscopy is combined
   with organic reasoning.
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for, UNLESS the same content is examined
     elsewhere. Structure determination is examined inside the 91391 organic paper. MS/IR/NMR data is routinely used there to identify an unknown.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['chem-91391'],

  title: 'Spectroscopic data',
  tags: ['Mass spec', 'IR', '¹³C NMR', 'Structure ID'],
  intro: 'Three techniques that, combined, let you identify an unknown organic molecule: <strong>mass spectrometry</strong> (molar mass, nitrogen, halogens, fragments), <strong>infrared</strong> (which functional groups) and <strong>¹³C NMR</strong> (how many carbon environments, and what kind). The assessed skill is integrating all three. That is exactly what separates Achieved from Excellence. Learn it alongside <a href="/topic/chem-91391" data-link>Organic compounds →</a>, whose molecules are the ones you will be identifying.',

  flashcards: [
    /* ---- the standard itself ---- */
    { q: 'Which three techniques are assessed in AS91388, and which is NOT?', a: 'Mass spectrometry, infrared (IR) and ¹³C NMR. ¹H NMR is NOT part of this standard.', explain: 'Explanatory note 3 limits the spectroscopic data to those three. Anything you have seen about splitting patterns, the n+1 rule or integration belongs to ¹H NMR and cannot be asked here.' },
    { q: 'What separates Achieved, Merit and Excellence in AS91388?', a: 'Achieved = IDENTIFY discrete aspects of the structure. Merit = DETERMINE the structure. Excellence = JUSTIFY the structure by INTEGRATING the spectroscopic data.', explain: 'The verbs are the whole marking schedule. Excellence is not about knowing more chemistry. It is about explicitly tying each conclusion to the spectrum that supports it, and saying why the other candidate structures fail.' },
    { q: 'Which classes of organic molecule can AS91388 use?', a: 'Alkanes, alkenes, alcohols, haloalkanes, amines, aldehydes, ketones, carboxylic acids, amides, acid chlorides and esters.', explain: 'From explanatory note 4. Aspects of structure are limited to molar mass and molecular formula, functional groups, and the carbon framework including structural isomers. You do not need properties, nomenclature or reactions for this standard.' },
    { q: 'What is the difference between spectroscopy and spectrometry?', a: 'If you use EM radiation to acquire the spectrum it is spectroscopy; if you are measuring particles in some way it is spectrometry.', explain: 'Hence infrared and NMR spectroscopy, but mass spectrometry. A spectrum is a graph of intensity against a property of the radiation, typically wavelength or frequency. "Spectra" is the plural.' },
    { q: 'What is the difference between absorption and emission spectroscopy?', a: 'Emission: the sample is given energy or excited, and the EM radiation it then emits is analysed. Absorption: EM radiation is passed through the sample and the remaining light is compared to a blank.', explain: 'Absorption spectroscopy is the focus of this topic.' },
    { q: 'Which region of the EM spectrum drives NMR, and which drives IR?', a: 'NMR uses radio frequency photons (10⁶–10⁹ Hz), which cause spin transitions. IR uses infrared radiation (10¹²–10¹⁵ Hz), which causes molecular vibrations.', explain: 'The other regions in the workbook: microwaves (10⁹–10¹¹ Hz) for rotational spectroscopy; visible and UV (10¹⁵–10¹⁷ Hz) for electronic transitions; X-rays and gamma rays (10¹⁷–10²⁴ Hz), which ionise core electrons and can give elemental composition: used for analysing art and artefacts.' },

    /* ---- IR ---- */
    { q: 'What does infrared spectroscopy actually measure?', a: 'The vibrational properties of a molecule: which frequencies of IR radiation the bonds absorb, measured in wavenumbers (cm⁻¹).', explain: 'The frequency of vibration relates directly to the strength of the bonding and the mass of the atoms, so different bond types have distinct absorption profiles.' },
    { q: 'What are the two ways an IR spectrum can be used to analyse a molecule?', a: '1. Compare the whole spectrum to a library of spectra. A match gives great confidence in identity. 2. Examine the distinct absorptions produced by particular functional groups.', explain: 'The library method has been used historically in forensics, especially to identify illicit drugs. The functional-group method is the one this course focuses on.' },
    { q: 'Which two IR absorptions should you focus on first, and what does each mean?', a: 'A broad absorption around 3000–3500 cm⁻¹ means N–H or O–H. A sharp, intense absorption around 1600–1800 cm⁻¹ (depending on functionality) means C=O.', explain: 'You should also expect a peak or series of peaks around 3000 cm⁻¹ for C–H, but that is present in virtually all samples analysed, so it tells you almost nothing on its own.' },
    { q: 'IR: butane, butan-1-ol, butanone and butanoic acid: what does each show?', a: 'Butane: no O–H/N–H, no C=O (C–H at 2950 only). Butan-1-ol: O–H at 3350, no C=O. Butanone: no O–H/N–H, clear C=O at 1700. Butanoic acid: O–H at 3100 AND C=O at 1700.', explain: 'These are four of the workbook\'s series of six 4-carbon compounds with varying combinations of C=O, N–H and O–H. Butane is the reference, it shows what "nothing but a carbon skeleton" looks like.' },
    { q: 'IR: how do 1-aminobutane, ethyl ethanoate and butanamide differ?', a: '1-aminobutane: O–H/N–H at 3350, no C=O. Ethyl ethanoate: no O–H, C=O at 1700. Butanamide: N–H absorptions at BOTH 3200 and 3400, plus C=O at 1650.', explain: 'The amide is the distinctive one, two N–H bands rather than one, and its C=O sits noticeably lower (1650) than a ketone or ester.' },
    { q: 'Why do totally symmetrical molecules such as methane give extremely weak IR absorption?', a: 'Because IR absorption involves a CHANGE IN DIPOLE. A molecule with no overall dipole has very little to change.', explain: 'This is the reason a C=C stretch is listed as "variable" intensity in the data sheet: symmetry reduces its intensity.' },
    { q: 'What does an ATR module do, and why is it used?', a: 'Attenuated total reflectance. A mounted diamond reflects IR off the surface of the sample by total internal reflection, and the radiation comes back minus whatever the sample absorbed.', explain: 'It is much faster to use and needs around 100 times less sample than the traditional beam-through-a-chamber setup. The University of Auckland uses an ATR-equipped FTIR (Fourier transform infrared) spectrometer, where the sample is simply pressed onto the diamond.' },

    /* ---- NMR: principles ---- */
    { q: 'What does NMR exploit, and why are superconducting electromagnets needed?', a: 'The magnetic spin property of certain nuclei (¹³C, ¹H, ²H, ¹⁵N…). An external magnetic field influences the orientation of that spin, but the effect is relatively weak, so powerful superconducting electromagnets are used to produce a significant effect.', explain: 'Under an intense field the nuclei either align WITH the field (lower energy, increased stability) or AGAINST it (raised energy, decreased stability). Radio-wave photons carry just the right small energy to flip nuclei from the lower to the higher state, and the machine detects which frequencies are absorbed.' },
    { q: 'Why is ¹³C NMR historically difficult?', a: '¹³C nuclei make up only 1.1% of carbon nuclei, which gives a small signal.', explain: 'Modern machines with powerful superconducting electromagnets, advanced noise reduction and sophisticated software can now analyse even complex examples. The same 1.1% figure explains the small M+1 isotope peak in mass spectrometry.' },
    { q: 'What is the shielding effect?', a: 'Electrons surrounding a nucleus reduce the intensity of the external magnetic field that actually reaches it. So the energy of the radio-wave photons absorbed depends on both the type of nucleus AND the density of electrons around it.', explain: 'More electronegative atoms draw electrons towards themselves (shielding themselves) and away from other atoms (deshielding them). Each bond contributes a shielding or deshielding effect and these add together, and the more deshielded an atom is, the more it deshields the atoms it is bonded to.' },
    { q: 'How do delocalised electrons affect shielding?', a: 'Delocalised electrons circulate about a section of the molecule and create extra magnetic fields that REINFORCE the external field, so they deshield the surrounding atoms, particularly those directly involved in the bonds.', explain: 'They are present in double and triple bonds and are especially active in conjugated systems, where bonds alternate single and double along a chain or around a ring.' },

    /* ---- NMR: environments ---- */
    { q: 'Define the chemical environment of an atom.', a: 'The sum total of all the shielding effects acting on that atom. Two atoms have a different chemical environment unless they have the same sequence of bonds as each other.', explain: 'This is the definition the workbook uses, and it is worth quoting almost word for word: "same sequence of bonds" is the test you apply.' },
    { q: 'How many chemical environments does propane have, and why?', a: 'Two. Carbon 1 is bonded to 3 H and a CH₂CH₃; carbon 3 is bonded to 3 H and a CH₂CH₃, identical, so they share an environment. Carbon 2 (2 H and 2 CH₃) is different.', explain: 'Compare 1-chloropropane: C1 has 3 H and a CH₂CH₂Cl, C2 has 2 H, a CH₃ and a CH₂Cl, C3 has 2 H, a Cl and a CH₂CH₃. None identical, so all three carbons are different environments.' },
    { q: 'What is the symmetry shortcut for counting environments?', a: 'When an atom (typically carbon or nitrogen) has identical groups attached to it, those groups have identical chemical environments. If a group has multiple environments, each is mirrored by the other symmetric group.', explain: 'Example: 3-ethylpentan-2-ol. Carbon 3 has two identical groups off it, which makes carbons 4 and 6 equivalent, and carbons 5 and 7 equivalent, so the molecule has five environments, not seven.' },
    { q: 'What does the number of chemical environments tell you in a ¹³C spectrum?', a: 'It equals the number of peaks, and it gives you the MINIMUM number of carbons present in the molecule.', explain: 'Minimum, because chemically equivalent carbons are counted as one environment. Propane has three carbons but two environments.' },

    /* ---- NMR: shifts ---- */
    { q: 'What is a chemical shift (δ) a measure of, and what unit is used?', a: 'How shielded or deshielded an atom is, measured in ppm. The greater the chemical shift, the greater the magnetic field experienced by the nucleus and therefore the MORE deshielded it is.', explain: 'It is a relative measure, compared to a reference molecule.' },
    { q: 'What three things influence a carbon\'s chemical shift?', a: 'The element bonded to it (in particular its electronegativity), the chemical environment of that atom, and the type of bonding present (single, double, triple or conjugated).', explain: 'The basic idea: anything that draws electrons AWAY from a carbon is deshielding and consequently RAISES the chemical shift. Double and triple bonds add further deshielding because of how their electrons behave.' },
    { q: 'In alkanes, why do longer chains have higher chemical shifts?', a: 'Carbon is more electronegative than hydrogen, so the more carbon atoms bonded to a given carbon, the more deshielded it is, and each carbon influences the others, so longer chains are more deshielded.', explain: 'You cannot predict exact shifts without significant computation, but the general rules apply, and crucially, carbons in the same chemical environment ALWAYS have the same chemical shift.' },
    { q: 'What are the three major ¹³C divisions that apply without exception in this course?', a: 'δ 0–100: carbons with single bonds only, or with a triple bond. δ 100–150: carbons double bonded to other carbons (C=C). δ 150–250: carbonyl carbons (C=O).', explain: 'These three divisions are the first cut you make on any ¹³C spectrum. Everything else is subdividing within them.' },
    { q: 'Why do ketones and aldehydes appear at a HIGHER δ than esters, amides, acyl chlorides and carboxylic acids?', a: 'When another atom WITH LONE PAIRS is attached to the carbonyl carbon, the carbonyl draws electrons towards it, making that carbon more SHIELDED and so reducing its shift. Ketones and aldehydes have no such atom.', explain: 'Result: 180–220 for ketones and aldehydes, 160–185 for carboxylic acids, acyl chlorides, amides and esters. Being able to state this reason, not just the numbers, is the kind of thing that lifts an answer.' },
    { q: 'What δ range is almost always a CH₃ bonded to a CH₂?', a: 'The very low region, 0–15 ppm.', explain: 'The most distinguished signals are in the low region 0–20 ppm, corresponding to CH₃. For the other signals the information gained is supportive, and works best combined with IR and MS data.' },
    { q: 'Why does a ¹³C shift table list C–C, C–O and C–N but never C–H?', a: 'In ¹³C NMR you observe the CARBON, and hydrogen barely deshields a carbon, so a carbon bonded only to C and H is already covered by the plain alkyl entries at the bottom of the table. There is no separate C–H environment.', explain: 'Use electronegativity to reconstruct the ordering rather than memorising it: C–N sits below C–O because nitrogen is less electronegative than oxygen, and both sit below anything with a π bond.' },

    /* ---- NMR: reading spectra ---- */
    { q: 'Which way does the x-axis of a ¹³C spectrum run?', a: 'δ increases from RIGHT to LEFT. Low shifts on the right are highly shielded carbons; towards the left, carbons are increasingly deshielded.', explain: 'The full range recorded is normally 0–250 ppm and is then trimmed of any blank space, so always read the scale before making interpretations. The workbook\'s hexane example is plotted over only 13–34 ppm.' },
    { q: 'What does the height (intensity) of a ¹³C peak tell you?', a: 'Nothing usable. Each peak is treated as ONE environment regardless of height.', explain: 'Many factors contribute to differences in peak height and they are not easily interpreted. If you are given a spectrum with varied peak heights, resist the temptation to read anything into them.' },
    { q: 'If only ONE signal appears in the C=C region, what can you conclude?', a: 'The molecule is completely symmetric around the double bond, because a double bond always involves at least 2 carbons. The consequence is that every peak has at least 2 carbons in its environment.', explain: 'The workbook\'s example is cis-hex-3-ene, which gives just three peaks for its six carbons.' },
    { q: 'State the four-step method for reading a ¹³C spectrum.', a: '1. Count the carbon environments → the minimum number of carbons. 2. Divide them into three groups: saturated/triple bonded, double bonded, carbonyl. 3. Subdivide using the table to indicate likely functional groups. 4. Combine steps 1–3 to conclude things about the molecule as a whole.', explain: 'The first and most important piece of information a ¹³C spectrum gives you is the number of carbon environments.' },
    { q: 'What solvents are used for ¹³C NMR, and which is most common?', a: 'Deuterated solvents, where the majority of hydrogen atoms are ²H (D): CD₃OD (methanol), D₂O (heavy water) and CDCl₃ (deuterated chloroform). CDCl₃ is used in most spectra you will encounter.', explain: 'The samples go into long thin NMR tubes and then into the spectrometer, whose superconducting electromagnet is cooled to −269 °C with liquid helium. The sample is exposed to a radio pulse and sensors detect an echo, which the computer turns into a spectrum.' },
    { q: 'If you see a three-peak signal at 77.0 ppm, what is it and what should you do?', a: 'It is the CDCl₃ solvent peak. Ignore it for your analysis.', explain: 'Many spectra are altered to remove solvent peaks, but some run in CDCl₃ still show it. Counting it as a carbon environment would give you the wrong number of carbons.' },
    { q: 'Why are chemical shifts quoted in ppm rather than Hz?', a: 'The spectrum is initially in Hz relative to TMS, but each machine produces a different frequency depending on its size (e.g. 300 vs 600 MHz). Dividing by the machine\'s resonance frequency makes the shifts consistent regardless of which machine was used.', explain: 'The shift relative to TMS is in thousands of Hz while the machine operates in hundreds of millions of Hz, so the values work out to 10–100 millionths: hence parts per million.' },
    { q: 'What is TMS and what is it used for?', a: 'Tetramethylsilane, (CH₃)₄Si. The traditional reference, whose carbon signal is defined as 0 ppm.', explain: 'In modern machines most solvents have a carbon signal that has been calibrated against TMS, so chemists can just use the solvent peak for calibration instead.' },

    /* ---- MS ---- */
    { q: 'What happens to a sample in mass spectrometry?', a: 'It is vaporised and ionised, passed through a detector, and the mass of each molecule is determined.', explain: 'The output is a graph of m/z (mass/charge) against intensity. Most peaks result from ONE electron being lost, so m/z can be read as the mass of the molecule or of a fragment.' },
    { q: 'Compare EI and ESI ionisation.', a: 'EI (electron ionisation / electron impact) bombards a vaporised molecule with fast-moving electrons that knock one of its electrons away. ESI (electrospray ionisation) focuses the sample through a fine needle at intense voltage, ripping off an electron as it sprays into the detector.', explain: 'ESI\'s advantage is that the molecule mostly reaches the detector INTACT rather than breaking into fragments. Unless you are informed otherwise, assume the traditional EI method with high degrees of fragmentation.' },
    { q: 'What is the molecular ion, and where is it on the spectrum?', a: '[M⁺·], the peak produced by the original molecule, at the RIGHT of the spectrum. It is the highest m/z peak, with the exception of isotope peaks.', explain: 'The other peaks are fragments of the molecule, torn apart by the harsh ionisation process.' },
    { q: 'What is the base peak?', a: 'The largest peak in the spectrum, whether it is a fragment or the molecular ion, defined as having a relative intensity of 100.', explain: 'For butane, 58 is the molecular ion but 43 is the base peak. Never assume the tallest peak is the molecular ion.' },
    { q: 'State the nitrogen rule.', a: 'A molecular ion has an odd numbered mass IF AND ONLY IF it has an odd number of nitrogen atoms present.', explain: 'Workbook examples: CH₃CH₂CH₃ M = 44 (no N), CH₃CH₂CH₂NH₂ M = 59 (one N), NH₂CH₂CH₂CH₂NH₂ M = 74 (two N). An even mass means 0, 2 or 4… nitrogens, which is why you cannot be certain an even-mass compound has no nitrogen.' },
    { q: 'Why does every carbon-containing peak have a small companion one mass unit higher?', a: 'Carbon is naturally 1.1% ¹³C, so each fragment containing carbon is accompanied by a much smaller peak one mass unit up.', explain: 'That peak is no more than one tenth the size of the main peak and can be freely ignored at this level. A common mistake in assessment is confusing the ¹³C isotope peak with the molecular ion or with other isotope peaks.' },
    { q: 'How do you spot chlorine, bromine and iodine in a mass spectrum?', a: 'Chlorine: isotopes 35 and 37 in a 3:1 ratio, so an M+2 peak 1/3 the size of the main peak. Bromine: isotopes 79 and 81 in approximately 1:1, so M and M+2 of near equal height. Iodine: no multiple isotopes, but its very large mass of 127 is distinctive.', explain: 'Iodine also often turns up as a peak at 127, sometimes with HI⁺ at 128, and leaves a large separation between the molecular ion and the other fragments. Iodoethane shows [M⁺] = 156, fragments at 127 and 128, and a fragment at 29 from the loss of I.' },
    { q: 'Define fragmentation.', a: 'The process by which an ionised particle dissipates excess energy by breaking covalent bonds.', explain: 'In a traditional EI mass spectrum there are usually many peaks because of it.' },
    { q: 'What are you expected, and not expected, to do with fragmentation in this standard?', a: 'Expected: calculate the difference in mass between the molecular ion and a fragment, and give possible conclusions from that mass loss for simple examples. NOT expected: to explain the formation of fragments.', explain: 'You can use simple fragmentations as supporting evidence for a structure, but because fragmentation is complex it should NOT be used as the primary justification. Treat it as less important than IR or NMR information.' },
    { q: 'A fragment loss of 18 suggests what, and what fragment loss is typical of alcohols in general?', a: 'Loss of 18 is H₂O, indicating an –OH (alcohol).', explain: 'Butan-1-ol shows a very weak [M⁺] = 74 and a base peak at m/z 56 from the loss of H₂O, which is typical for alcohols. Losses of 1, 15, 17 or 18 are the distinct and useful ones; larger fragmentations get increasingly hard to draw meaningful conclusions from.' },
    { q: 'Why does the ABSENCE of a fragment tell you nothing?', a: 'There are often complex reasons why a particular fragment will not form for certain molecules, so its absence does not mean the functional group is absent.', explain: 'This is in direct contrast to IR and NMR, where you CAN conclude something from an absent signal, for example no broad 3000–3500 absorption means no O–H or N–H. Ethanoic acid illustrates it: molecule ion 60, fragments at 45 and 43, but no loss of 1 even though that is typical of carboxylic acids.' },
    { q: 'What happens if the molecular ion does not appear in the spectrum at all?', a: 'Examiners will either tell you that you cannot see the molecular ion, or give you its value. It is NOT possible to work it out from analysis of the spectrum.', explain: 'Fragmentation using EI can sometimes be so significant that the molecular ion disappears entirely.' },
    { q: 'List the five things to take away from a mass spectrum, in order.', a: '1. The molar mass (the molecular ion). 2. The nitrogen rule. 3. Whether Cl, Br or I are present, by isotopic analysis. 4. Fragmentation, which may indicate functionality. 5. Revisit the MS data in light of what the NMR and IR told you.', explain: 'Note that step 5 is explicit in the workbook. The mass spectrum is worth a second look once you have narrowed things down with the other two techniques.' },

    /* ---- integration ---- */
    { q: 'In one line each: what do MS, IR and NMR each tell you?', a: 'MS: the molar mass and some of the atoms present, indicating possible structures. IR: which functional groups are present (OH, NH or C=O). NMR: the arrangement of the molecule\'s structure, plus some of the functionality.', explain: 'Combined, these data sets enable the identification of many compounds, and that problem-solving process is the focus of this topic\'s assessment.' },
    { q: 'When you have several spectra, what should you take from each FIRST?', a: 'From MS: the molecular mass, and whether it indicates nitrogen. From ¹³C NMR: the number of chemical environments, and whether any are carbonyl or alkene carbons. From IR: the presence of C=O, and the presence or absence of OH/NH.', explain: 'Take the most robust and easily interpreted information from each spectrum first. After that your analysis should be directed by what is actually needed to tell the remaining candidate structures apart.' },
    { q: 'Once you know some facts about a molecule, what arithmetic trick narrows it down?', a: 'Subtract the mass of the parts you have established (the C=O, the OH, the carbons you have counted) from the molar mass, and see what is left.', explain: 'That remainder tells you exactly how much molecule is unaccounted for, so you can evaluate what possibilities remain. In the workbook\'s full example, 102 − 76 = 26, and 26 being smaller than two nitrogens (28) was what ruled nitrogen out entirely.' },
    { q: 'What is the single most important thing to do in a structure-determination question?', a: 'Read the question fully. Sometimes part of the formula or other information is provided in addition to the spectral data. A common example is being given the empirical formula, which you use with the mass spectrum to get the molecular formula.', explain: 'Questions typically also provide a selection of potential structures, which changes the task from "invent a molecule" to "eliminate five of these six".' },
  ],

  sections: [
    /* ============================================ 0 NOTATION */
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Spectroscopy is written in shorthand. None of it is hard, but it is all assumed, so if a symbol has never been explained to you, it is not obvious. Everything you will meet on this page is defined here.',
      blocks: [
        { t: 'definitions', title: 'Symbols and units used in spectroscopy', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: '¹³C <span class="xs">(the small number, top-left)</span>',
            def: 'The raised number in front of an element is its <strong>mass number</strong>, protons + neutrons, so it names a specific <strong>isotope</strong>. <strong>¹³C</strong> is carbon-13 (6 protons + 7 neutrons).',
            note: 'It is written top-LEFT so it is not confused with a charge (top-right, e.g. Na⁺) or a subscript count (bottom-right, e.g. H₂O). ¹³C makes up just 1.1% of carbon nuclei, which is both why ¹³C NMR gives a small signal, and why every carbon-containing mass-spec peak has a tiny companion one mass unit higher.' },
          { term: 'δ <span class="xs">(delta: the "squiggly" symbol)</span>',
            def: 'The Greek lower-case letter delta, used here to mean <strong>chemical shift</strong>: a measure of how shielded or deshielded an atom is.',
            note: 'A larger δ means the nucleus is more <em>deshielded</em>, it experiences a greater magnetic field, and it appears further LEFT on the spectrum.' },
          { term: 'ppm <span class="xs">(parts per million)</span>',
            def: 'The <strong>unit of chemical shift</strong>. The spectrum is measured in Hz relative to TMS, then divided by the machine’s resonance frequency.',
            note: 'The shift relative to TMS is thousands of Hz while the machine runs at hundreds of millions of Hz, so the numbers come out as 10–100 millionths. Dividing this way also makes shifts <strong>consistent regardless of which machine was used</strong>. A 300 MHz and a 600 MHz instrument give the same ppm value.' },
          { term: 'cm⁻¹ <span class="xs">(wavenumber)</span>',
            def: 'The <strong>unit on the x-axis of an IR spectrum</strong>, the frequency of the IR radiation, expressed as a wavenumber.',
            note: 'Higher wavenumber = higher frequency. IR spectra are conventionally plotted with wavenumber decreasing left to right.' },
          { term: 'm/z',
            def: '<strong>Mass divided by charge</strong>, the x-axis of a mass spectrum.',
            note: 'Generally most peaks result from a single electron being lost, so z = 1 and you can read m/z directly as <strong>the mass of the molecule or fragment</strong>.' },
          { term: '[M⁺·] <span class="xs">(the molecular ion)</span>',
            def: 'The peak produced by the <strong>whole original molecule</strong> after losing one electron. Its m/z gives you the <strong>molar mass</strong> of the compound.',
            note: 'It sits at the right-hand end of the spectrum and is the highest m/z peak, apart from isotope peaks.' },
          { term: 'Transmittance <span class="xs">(the y-axis of an IR spectrum)</span>',
            def: 'How much IR radiation passed <strong>through</strong> the sample. Absorptions therefore point <strong>downwards</strong> as dips, not upwards as peaks.',
            note: 'This catches people out: a "strong absorption" is a deep trough.' },
          { term: 'TMS',
            def: '<strong>Tetramethylsilane, (CH₃)₄Si</strong>. The traditional NMR reference, whose carbon signal is defined as <strong>0 ppm</strong>.',
            note: 'Modern machines usually calibrate off the solvent peak instead, which has itself been calibrated against TMS.' },
        ]},
      ],
    },

    /* ============================================ 1 CONNECTIONS */
    {
      id: 'connections', num: '1', title: 'How this connects to your other standards',
      intro: 'This standard is pure detective work, and it borrows its evidence from elsewhere.',
      blocks: [
        { t: 'connects', intro: 'Where the content on this page comes from and where it goes:', items: [
          { to: '#/topic/chem-91391', label: 'Organic compounds (91391): the molecules you are identifying',
            why: 'Explanatory note 4 limits this standard to alkanes, alkenes, alcohols, haloalkanes, amines, aldehydes, ketones, carboxylic acids, amides, acid chlorides and esters: exactly the families taught in 91391. You cannot deduce a structure you cannot draw. The workbook says as much: students should be fluent in drawing structures, identifying functional groups and evaluating structural isomers before starting here.' },
        ]},
        { t: 'note', title: 'What this standard is, in one box', html: '<strong>AS91388 · Chemistry 3.2 · Internal · 3 credits.</strong><br><br>• <strong>Achieved</strong>, <em>identifying discrete aspects</em> of the structure of organic molecules using teacher-provided spectroscopic data.<br>• <strong>Merit</strong>, <em>determining the structure</em> of organic molecules using spectroscopic data.<br>• <strong>Excellence</strong>, <em>justifying the structure</em> of organic molecules by <strong>integrating</strong> spectroscopic data.<br><br>Spectroscopic data is limited to <strong>mass, infrared (IR) and ¹³C nuclear magnetic resonance</strong>. Aspects of structure are limited to molar mass and molecular formulae, functional groups, and the carbon framework including structural isomers.' },
        { t: 'tip', title: 'What you are expected to be able to do', html: 'The workbook’s specific learning outcomes for this standard:<br><br>• state what you understand about the techniques and their applications<br>• interpret IR spectra to identify the presence or absence of <strong>carbonyl</strong> groups and/or <strong>hydrogen bonding (N–H, O–H)</strong>, and use IR to judge possible structures<br>• <strong>identify carbon environments</strong> for a given molecular structure<br>• use ¹³C data to judge possible structures from the <strong>number of environments</strong>, from the <strong>magnitude of the shifts</strong>, and from <strong>both together</strong><br>• interpret the molecular ion and isotopic variations, molecular mass, number of nitrogens (odd or even), number of carbons (from the ¹³C isotope ratio), and the presence of <strong>Cl, Br and I</strong><br>• make basic interpretations of <strong>primary fragmentations</strong> (single bond breakages)<br>• <strong>integrate</strong> knowledge from all three techniques to evaluate the identity of unknowns' },
        { t: 'mistake', title: 'There is no ¹H NMR in this standard', html: 'Explanatory note 3 limits the data to <strong>mass, IR and ¹³C NMR</strong>. If you have met the <strong>n+1 splitting rule</strong>, <strong>integration</strong>, ¹H chemical shift tables or the <strong>δ 9.7 aldehyde proton</strong>, those all belong to ¹H NMR and <strong>cannot be assessed here</strong>. Spending revision time on them is time you are not spending on carbon environments, which is where the marks actually are.' },
      ],
    },

    /* ============================================ 2 INTRODUCTION */
    {
      id: 'intro-spec', num: '2', title: 'Spectroscopy and spectrometry',
      intro: 'Both are techniques used to analyse a sample by the measurement or observation of radiation either passing through or being emitted by the sample. The process produces a spectrum, a graph of intensity versus a property of the radiation, typically the wavelength or frequency of EM radiation. ("Spectra" is the plural of "spectrum".)',
      blocks: [
        { t: 'key', title: 'Spectroscopy or spectrometry?', items: [
          'If you use <strong>EM radiation</strong> (e.g. visible light) to acquire a spectrum, we call it <strong>spectroscopy</strong>.',
          'If instead you are <strong>measuring particles</strong> in some way to give a spectrum, we call it <strong>spectrometry</strong>.',
          'Hence <strong>IR spectroscopy</strong> and <strong>¹³C NMR spectroscopy</strong>, but <strong>mass spectrometry</strong>.',
        ]},
        { t: 'key', title: 'Absorption vs emission', items: [
          'In <strong>emission spectroscopy</strong>, the sample is provided with energy, or excited, and the resulting emission of EM radiation is analysed.',
          'In <strong>absorption spectroscopy</strong>, EM radiation is passed through the sample and the remaining light is analysed and compared to a <strong>blank</strong> (no sample) spectrum.',
          '<strong>Absorption spectroscopy is the focus of this topic.</strong>',
        ]},
        { t: 'table', mono: true, caption: 'Which part of the EM spectrum does what', headers: ['Radiation', 'Frequency (Hz)', 'What it probes'], rows: [
          ['Radio frequency', '10⁶–10⁹', 'Spin transitions of charged particles: the basis of NMR'],
          ['Microwaves', '10⁹–10¹¹', 'Rotational spectroscopy: size and rotational nature of the molecule'],
          ['Infrared', '10¹²–10¹⁵', 'Vibrations in molecules'],
          ['Visible & ultraviolet', '10¹⁵–10¹⁷', 'Electronic transitions; conjugated systems; d-orbitals'],
          ['X-rays & gamma rays', '10¹⁷–10²⁴', 'Ionises core electrons: elemental composition'],
        ]},
        { t: 'note', title: 'Where these get used in the real world', html: '<strong>Infrared:</strong> the frequency of vibration relates directly to the strength of the bonding and the mass of the atoms, so different bond types have distinct absorption profiles. Satellites use this to track the CO₂ emissions of a region, or to measure water levels.<br><br><strong>Visible/UV:</strong> most visible absorptions relate to large conjugated systems (many alternating double and single bonds) or to transitions between d-orbitals in transition metals. One example is <strong>atomic absorption spectroscopy</strong>, where a flame system atomises a mist of solution and the concentration of those atoms is determined from the level of absorption.<br><br><strong>X-rays and gamma rays:</strong> direct absorption ionises core electrons, which can be used to analyse the elemental composition of a material <em>without outright destroying the sample</em>, which is why it is used on art and artefacts.' },
      ],
    },

    /* ============================================ 3 IR */
    {
      id: 'ir', num: '3', title: 'Infrared (IR) spectroscopy',
      intro: 'Infrared spectroscopy studies the vibrational properties of a molecule. The bonds and atoms present in a molecule vibrate in different ways and at different frequencies, and these vibrations are generally quite distinct for each molecule. Each vibration can be measured by passing IR radiation through a sample and measuring which frequencies are absorbed: measured in wavenumbers, cm⁻¹.',
      video: 'NCEA Level 3 chemistry infrared spectroscopy functional groups',
      blocks: [
        { t: 'key', title: 'Two ways to analyse a molecule with IR', items: [
          '<strong>Compare the spectrum to a library of spectra.</strong> If there is a match you can usually have great confidence in the molecule’s identity. This has been used historically in forensics, especially to identify illicit drugs.',
          '<strong>Examine the distinct absorptions produced by particular functional groups.</strong> This is the approach used in this course.',
        ]},
        { t: 'key', title: 'The two absorptions to focus on', items: [
          '<strong>Broad absorption(s) around 3000–3500 cm⁻¹</strong> ⟹ the presence of either <strong>N–H or O–H</strong> bonds.',
          '<strong>A sharp, intense absorption around 1600–1800 cm⁻¹</strong> (depending on functionality) ⟹ the presence of a <strong>C=O</strong> bond.',
          'You should also note a peak or series of peaks around <strong>3000 cm⁻¹</strong> for <strong>C–H</strong>, but this is present in virtually all samples analysed, so on its own it tells you almost nothing.',
        ]},
        { t: 'table', mono: true, caption: 'The six 4-carbon compounds: varying combinations of C=O, N–H and O–H', headers: ['Compound', 'O–H / N–H', 'C=O'], rows: [
          ['Butane (reference)', 'none', 'none: only C–H at 2950'],
          ['Butan-1-ol', 'O–H at 3350', 'none'],
          ['1-aminobutane', 'N–H at 3350', 'none'],
          ['Butanone', 'none', 'clear C=O at 1700'],
          ['Butanoic acid', 'O–H at 3100', 'C=O at 1700'],
          ['Ethyl ethanoate', 'none', 'C=O at 1700'],
          ['Butanamide', 'N–H at 3200 AND 3400', 'C=O at 1650'],
        ]},
        { t: 'tip', title: 'How to use that table', html: 'These seven compounds are the whole decision tree in miniature. Ask two questions in order:<br><br><strong>1. Is there a broad absorption at 3000–3500?</strong> No → butane, butanone or ethyl ethanoate. Yes → alcohol, amine, acid or amide.<br><strong>2. Is there a C=O at 1600–1800?</strong> Combine the two answers and you have already narrowed seven compounds to at most two.<br><br>Then use the finer detail: <strong>butanamide shows TWO N–H bands</strong> (3200 and 3400) where the amine shows one, and its <strong>C=O sits lower at 1650</strong>.' },
        { t: 'note', title: 'Why some absorptions are weak', html: 'IR absorption involves a <strong>change in dipole</strong>, so molecules which have no overall dipole (totally symmetrical, e.g. methane) have extremely weak IR absorption. This is also why the data sheet lists the C=C stretch as <strong>variable</strong> intensity: symmetry reduces its intensity.' },
        { t: 'table', mono: true, caption: 'AS91388 data sheet: IR stretching vibrations', headers: ['Functional group', 'Range (cm⁻¹)', 'Intensity', 'Assignment'], rows: [
          ['Alkanes', '2850–3000', 'med–str', 'C–H, 2 or 3 peaks'],
          ['Haloalkanes', '600–800', 'str', 'C–Cl'],
          ['Haloalkanes', '500–600', 'str', 'C–Br'],
          ['Alkenes', '3020–3100', 'med', '=C–H & =CH₂ (usually sharp)'],
          ['Alkenes', '1630–1680', 'var', 'C=C (symmetry reduces intensity)'],
          ['Alcohols', '3200–3550', 'str', 'O–H (H-bonded), usually broad'],
          ['Alcohols', '970–1250', 'str', 'C–O'],
          ['Amines & amides', '3300–3500', 'wk–med', 'N–H (1° amines); N–H (amides) – 2 peaks; N–H (2° amines)'],
          ['Amines & amides', '1000–1250', 'med', 'C–N'],
          ['Aldehydes & ketones', '2690–2840', 'med', 'C–H, 2 peaks (aldehyde C–H)'],
          ['Aldehydes & ketones', '1720–1740', 'str', 'C=O (saturated aldehyde)'],
          ['Aldehydes & ketones', '1710–1720', 'str', 'C=O (saturated ketone)'],
          ['Carboxylic acids & derivatives', '2500–3300 (c.acids), overlaps C–H', 'str', 'O–H (very broad)'],
          ['Carboxylic acids & derivatives', '1705–1720 (c.acids)', 'str', 'C=O (H-bonded)'],
          ['Carboxylic acids & derivatives', '1210–1320 (c.acids)', 'med', 'O–C (sometimes 2 peaks)'],
          ['Carboxylic acids & derivatives', '1785–1815 (acid chlorides)', 'str', 'C=O'],
          ['Carboxylic acids & derivatives', '1735–1750 (esters)', 'str', 'C=O'],
          ['Carboxylic acids & derivatives', '1000–1300', 'str', 'O–C (2 peaks)'],
          ['Carboxylic acids & derivatives', '1630–1695 (amides)', 'str', 'C=O'],
        ]},
        { t: 'table', mono: true, caption: 'AS91388 data sheet: IR bending vibrations', headers: ['Functional group', 'Range (cm⁻¹)', 'Intensity', 'Assignment'], rows: [
          ['Amines & amides', '2850–3000', 'med', 'N–H (1° amine)'],
          ['Amines & amides', '1550–1640', 'str', 'N–H (1° amine)'],
          ['Amines & amides', '1590–1650', 'med', 'N–H (amide)'],
          ['Alkane', '1450–1470', 'med', 'C–H'],
          ['Carboxylic acids', '910–950', 'med', 'O–H'],
          ['Alkene', '650–1000', 'med–str', '=C–H'],
        ]},
        { t: 'p', html: '<span class="xs muted">Key: str = strong, med = medium, wk = weak, var = variable.</span>' },
        { t: 'note', title: 'Extra info: IR instrumentation: how is it done?', html: 'There are many different machines that analyse IR spectra. The <strong>traditional</strong> system has a beam of IR radiation, covering all wavelengths, passing through a sample and then to a detector; the detector sends the signal to a computer which produces the spectrum. These systems have a large chamber in the middle where various modules can be placed to handle solid, liquid or gas samples.<br><br>A <strong>modern module</strong> currently employed by The University of Auckland is an <strong>ATR (attenuated total reflectance)</strong> module, which uses a mounted diamond to reflect IR radiation off the surface of a sample by total internal reflection. The radiation is reflected back minus whatever the sample absorbed. This system is <strong>much faster to use and requires around 100 times less sample</strong> to run. The instrument is an ATR-equipped <strong>FTIR (Fourier transform infrared)</strong> spectrometer. The solid or liquid sample is simply pressed down onto the diamond at the top of the machine.' },
      ],
    },

    /* ============================================ 4 13C NMR */
    {
      id: 'nmr', num: '4', title: 'Carbon-13 NMR spectroscopy',
      intro: 'NMR gives details on the structure and functionality of a chemical. It is an immensely powerful technique that can fully identify many chemicals, especially ones previously unheard of, and it is the most common identification technique for organic chemists because both hydrogen and carbon are easily analysed with it. For this standard, ¹³C NMR is the technique assessed.',
      video: 'NCEA Level 3 chemistry carbon 13 NMR chemical environments',
      blocks: [
        { t: 'key', title: 'How NMR works', items: [
          'The technique uses the <strong>magnetic spin property</strong> of some nuclei, which depends on the exact isotope being studied (¹³C, ¹H, ²H, ¹⁵N…). Some nuclei are ideal for analysis while others show very little absorption.',
          'The orientation of the spin of an NMR-active nucleus can be influenced by an <strong>external magnetic field</strong>, but this effect is relatively weak, so <strong>powerful superconducting electromagnets</strong> are used to produce a significant effect.',
          'Under these intense fields, nuclei either <strong>align with</strong> the field (lowered energy, increased stability) or <strong>against</strong> it (raised energy, decreased stability), and there is a difference in energy between the two arrangements.',
          '<strong>Photons in radio waves</strong> carry a very small energy, just the right amount to flip the nuclei from the lower to the higher energy state. The machine detects which frequencies the nuclei absorb. Over time they return to the lower state.',
          'Think of the nuclei as <strong>tiny bar magnets</strong>, with the north end turning to face the south of the external field, and radio waves being just right for knocking them around to the opposite orientation.',
        ]},
        { t: 'note', title: 'Why ¹³C specifically', html: '¹³C NMR analyses the ¹³C nuclei in carbon-containing (organic) molecules. Statistically, <strong>¹³C nuclei make up 1.1% of carbon nuclei</strong>, which results in a small signal. While that low abundance <em>historically</em> made ¹³C NMR difficult, modern machines with powerful superconducting electromagnets, advanced noise reduction equipment and sophisticated computer software can analyse even the most complex examples.' },

        { t: 'p', html: '<h4>Shielding</h4>' },
        { t: 'key', title: 'The shielding effect', items: [
          'Nuclei are not present in isolation. They are surrounded by spinning electrons, each with their own magnetic properties. When an external magnetic field is applied, these electrons <strong>reduce the intensity of the field that reaches the nucleus</strong>. This is the <strong>shielding effect</strong>.',
          'The result is that the energy of the radio-wave photons absorbed depends on <strong>both the type of nucleus and the density of electrons surrounding it</strong>.',
          'In covalently bonded molecules the sharing of electrons depends on the atoms present: <strong>more electronegative atoms draw electrons towards them</strong> (making themselves shielded) <strong>and away from other atoms</strong> (making those deshielded). Each bond has a shielding or deshielding effect and these effects <strong>add together</strong>.',
          'This in turn changes the effect an atom has on adjacent atoms: <strong>the more deshielded an atom, the more it deshields the atoms it is covalently bonded to.</strong>',
          'In addition, extra magnetic fields are created by <strong>delocalised electrons</strong> circulating about a section of the molecule. These are present in double and triple bonds and are especially active in <strong>conjugated systems</strong> (bonds alternating single and double along a chain or around a ring). These fields <strong>reinforce</strong> the external field and so <strong>deshield</strong> the surrounding atoms, particularly those directly involved in the bonds.',
        ]},
        { t: 'note', title: 'Extra for experts: ions', html: 'For ions there is a large change in electron shielding compared to their atomic counterparts. More electrons results in greater shielding and therefore a reduced magnetic field for the nucleus; equivalently, fewer electrons translates to an increased magnetic field for the nucleus. This gives rise to a significant difference in the energy of the photons absorbed, higher energy for positively charged, lower energy for negatively charged.' },

        { t: 'p', html: '<h4>Chemical environments</h4>' },
        { t: 'key', title: 'The definition and the test', items: [
          'The <strong>chemical environment</strong> of an atom is the <strong>sum total of all the shielding effects acting on that atom</strong>.',
          'Atoms in a molecule will have a <strong>different</strong> chemical environment <strong>unless they have the same sequence of bonds as each other</strong>.',
          'The number of chemical environments is very important, it <strong>directly translates to the number of peaks</strong> in an NMR spectrum. When counting environments, carbons that are chemically equivalent are treated as being in one environment.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Counting environments: propane vs 1-chloropropane', problem: 'How many chemical environments does each of propane and 1-chloropropane have?', steps: [
          '<strong>Propane.</strong> Carbon 1 is bonded to 3 H’s and a CH₂CH₃; carbon 2 is bonded to 2 H’s and 2 CH₃’s; carbon 3 is bonded to 3 H’s and a CH₂CH₃.',
          'Carbons 1 and 3 have <em>exactly the same</em> groups bonded to them, so they have the same chemical environment. Carbon 2 is different.',
          '<strong>1-chloropropane.</strong> Carbon 1 is bonded to 3 H’s and a CH₂CH₂Cl; carbon 2 is bonded to 2 H’s, 1 CH₃ and 1 CH₂Cl; carbon 3 is bonded to 2 H’s, 1 Cl and 1 CH₂CH₃.',
          'None of these carbons have exactly the same groups attached, so all three have different chemical environments.',
        ], answer: 'Propane has TWO chemical environments (so two peaks). 1-chloropropane has THREE.' },
        { t: 'example', tag: 'Worked example', title: 'The symmetry shortcut: 3-ethylpentan-2-ol', problem: 'Commonly we short cut the process and look for symmetry. How many environments does 3-ethylpentan-2-ol have?', steps: [
          'When an atom (typically a carbon or nitrogen) has <strong>identical groups attached to it</strong>, those groups will have identical chemical environments. If a group has multiple environments, each environment is mirrored by the other symmetric group.',
          'Carbon 3 has two identical groups off it.',
          'This lets us identify carbons 4 and 6 as chemically equivalent, as well as carbons 5 and 7.',
        ], answer: 'FIVE chemical environments: even though the molecule has seven carbons.' },

        { t: 'p', html: '<h4>Chemical shifts</h4>' },
        { t: 'key', title: 'What δ means and what changes it', items: [
          '<strong>Chemical shifts, symbol δ</strong>, are a measure of how shielded or deshielded an atom is, measured in <strong>ppm</strong>. The greater the chemical shift, the greater the magnetic field experienced by the nuclei and therefore the <strong>more deshielded</strong> they are. It is a relative measure compared to a reference molecule.',
          'The chemical shift of a carbon is influenced by <strong>the atoms bonded to the carbon</strong>. How each bonded atom modifies the shift depends on <strong>the element</strong> (in particular its electronegativity), <strong>the chemical environment</strong> of that atom, and <strong>the type of bonding</strong> present (single, double, triple or conjugated).',
          'The basic idea: <strong>anything that draws electrons away from a carbon is deshielding and consequently raises the chemical shift.</strong> Bonding to highly electronegative atoms, and carbons that are highly deshielded, produce high chemical shifts; bonding to low electronegativity atoms, and carbons that are relatively shielded, produce low chemical shifts. Double and triple bonds have additional deshielding properties.',
          'In alkanes, carbon is more electronegative than hydrogen, so <strong>the more carbon atoms bonded to a given carbon, the more deshielded</strong> it will be. As each carbon is influenced by the others, longer chains are more deshielded and have higher chemical shifts.',
          'It is <strong>not possible to predict</strong> chemical shifts without significant computation, but the general rules apply, and most importantly, <strong>carbons in the same chemical environment always have the same chemical shift.</strong>',
        ]},
        { t: 'table', mono: true, caption: '¹³C shifts for a selection of 4-carbon molecules (ppm)', headers: ['Molecule', 'Shifts along the chain'], rows: [
          ['Butane', '13.8 · 25.1 · 25.1 · 13.8'],
          ['Butan-1-ol', '14.4 · 19.7 · 35.5 · 62.2 (the C–OH)'],
          ['Butanal', '13.5 · 15.8 · 45.8 · 202.0 (the CHO)'],
          ['1-chlorobutane', '13.2 · 20.0 · 34.8 · 44.2 (the C–Cl)'],
          ['1-aminobutane', '14.1 · 20.4 · 36.6 · 42.2 (the C–NH₂)'],
          ['But-2-ene', '14.3 · 125.0 · 125.0 · 14.3'],
        ]},
        { t: 'tip', title: 'Read that table sideways', html: 'All six have four carbons, and the first two or three shifts barely move. What changes is <strong>the carbon carrying the functional group</strong>: 62.2 for the alcohol, 44.2 for the chloride, 42.2 for the amine, and 202.0 once it becomes a carbonyl. Electronegativity plus a double bond gives you by far the biggest jump, which is exactly why the carbonyl region sits alone at the far left of every spectrum.' },
        { t: 'table', mono: true, caption: 'AS91388 data sheet: approximate ¹³C chemical shifts', headers: ['Carbon environment', 'δ (ppm)'], rows: [
          ['C=O (in ketones)', '205–220'],
          ['C=O (in aldehydes)', '190–200'],
          ['C=O (carboxylic acids, acid chlorides, amides and esters)', '160–185'],
          ['C=C (in alkenes)', '115–140'],
          ['RCO₂CH₂R′ (esters)', '60–80'],
          ['RCH₂OH (C–OH between 50–90)', '50–70'],
          ['RCH₂Cl', '40–45'],
          ['RCH₂Br', '30–40'],
          ['RCH₂NH₂', '35–45'],
          ['RCH(NH₂)R', '30–60'],
          ['R₃CH', '25–60'],
          ['CH₃CO', '20–30'],
          ['R–CH₂–R', '15–50'],
          ['R–CH₃', '8–35'],
        ]},
        { t: 'table', mono: true, caption: 'The three major divisions. These apply WITHOUT EXCEPTION to any molecule in this course', headers: ['δ (ppm)', 'Carbons associated with this region'], rows: [
          ['0–100', 'Carbons with single bonds only, or carbons with a triple bond'],
          ['100–150', 'Carbons with double bonds to other carbons (i.e. C=C)'],
          ['150–250', 'Carbonyl carbons (C=O)'],
        ]},
        { t: 'table', mono: true, caption: 'Breaking the saturated / triple-bonded region into parts: general (but not always perfect) rules', headers: ['δ (ppm)', 'Carbons associated with this region'], rows: [
          ['0–15', 'CH₃CH₂– (i.e. CH₃ bonded to a carbon with just H)'],
          ['15–30', 'CH₃ not directly bonded to an electronegative element/group'],
          ['20–35', 'CH₂ not directly bonded to an electronegative element/group'],
          ['30–60', 'C–N, C–Cl, C–Br or C–C=O'],
          ['50–70', 'C–O'],
          ['60–90', 'C≡C (not assessed in this standard)'],
        ]},
        { t: 'p', html: 'The most distinguished signals are in the <strong>low region (0–20 ppm)</strong>, corresponding to CH₃, and in particular the very low region (<strong>0–15 ppm</strong>) is almost always a <strong>CH₃ bonded to a CH₂</strong>. For the other signals, the information gained is <strong>supportive</strong> when combined with other data such as IR and MS.' },
        { t: 'note', title: 'Why carbonyls split into two ranges', html: 'Carbonyls have especially deshielded carbons, due to the very high electronegativity of oxygen and the presence of a double bond. <strong>Secondly</strong>, when another atom <strong>with lone pairs</strong> is attached to the carbonyl carbon, the carbonyl draws electrons to it, making the carbonyl carbon <em>more shielded</em> and therefore giving it a <strong>reduced</strong> chemical shift.<br><br>The result is that ketones and aldehydes are typically distinguishable from carboxylic acids and their derivatives (esters, amides and acyl chlorides):<br><br>• <strong>180–220 ppm</strong>, ketones and aldehydes<br>• <strong>160–185 ppm</strong>, carboxylic acids, acyl chlorides, amides and esters<br><br>This is a genuinely useful piece of reasoning to be able to state, not just a pair of numbers to memorise.' },
        { t: 'table', mono: true, caption: 'Student NMR table. This is the table you are given in the assessment', headers: ['δ (ppm)', 'Carbons associated with this region'], rows: [
          ['0–15', 'CH₃CH₂–'],
          ['15–30', 'CH₃–'],
          ['20–35', '–CH₂–'],
          ['30–60', 'C–N, C–Cl, C–Br, C–C=O'],
          ['50–70', 'C–O'],
          ['60–90', 'C≡C'],
          ['100–150', 'C=C'],
          ['160–185', 'C=O present in carboxylic acids, esters, acyl chlorides and amides'],
          ['180–220', 'C=O present in aldehydes and ketones'],
        ]},
        { t: 'mistake', title: 'Why there is no “C–H” row in any of these tables', html: 'It is not an omission, <strong>there is no distinct C–H environment in ¹³C NMR</strong>. You are observing the <strong>carbon</strong>, and a carbon’s shift is set by its hybridisation and by how electronegative its neighbours are. Hydrogen barely pulls electron density away from carbon, so a C–H bond shifts the carbon hardly at all. A carbon carrying only C and H <em>is</em> the plain alkyl entry at the bottom of the table.<br><br>Use the electronegativity logic instead of memorising the order: <strong>C–N (30–60) sits below C–O (50–70)</strong> because nitrogen is less electronegative than oxygen, and both sit below anything with a π bond.' },

        { t: 'p', html: '<h4>Reading a ¹³C spectrum</h4>' },
        { t: 'key', title: 'What the axes do', items: [
          '¹³C spectra appear as a <strong>series of lines</strong>, with intensity on the y-axis and chemical shift (δ, ppm) on the x-axis.',
          'The x-axis values <strong>increase from right to left</strong>. Low chemical shifts on the right relate to carbons that are highly <strong>shielded</strong>; towards the left, carbons are increasingly <strong>deshielded</strong>.',
          'The full range recorded is normally <strong>0–250 ppm</strong> and is then trimmed of any “blank” space, so you must be <strong>careful to read the scale before making interpretations</strong>. The workbook’s hexane example is plotted over only 13–34 ppm.',
        ]},
        { t: 'mistake', title: 'Peak height tells you nothing', html: 'The intensity (the height) of a peak <strong>does not necessarily give any usable information</strong>. If you are given a spectrum with varied peak heights, <strong>each peak can be treated as one environment regardless of height</strong>. There are many factors that contribute to differences in peak height and they are not easily interpreted.' },
        { t: 'tip', title: 'A deduction you can make from the number of signals', html: 'Double bonds <strong>always involve at least 2 carbons</strong>. Therefore if only <strong>one</strong> signal is present in the C=C region, the molecule is <strong>completely symmetric around the double bond</strong>, and the consequence is that every peak has at least 2 carbons in its environment.<br><br>Example: <strong>cis-hex-3-ene</strong> has six carbons but produces only three peaks.' },
        { t: 'example', tag: 'Worked example', title: 'A spectrum with all three regions', problem: 'H₂C=CH–CH₂–CH₂–CO–CH₃ gives signals at δ 207.9, 137.2, 115.2, 42.8, 29.9 and 27.9. Assign the regions.', steps: [
          'The carbonyl carbon has <strong>δ = 207.9 ppm</strong>, in the 150–250 carbonyl region, and specifically in the 180–220 ketone/aldehyde band.',
          'The double bond carbons have <strong>δ = 137.2 and 115.2 ppm</strong>, the 100–150 C=C region.',
          'The remaining saturated carbons sit at <strong>δ = 42.8, 29.9 and 27.9 ppm</strong>, the 0–100 region.',
        ], answer: 'Six environments spread across all three major divisions: one carbonyl, two alkene carbons, three saturated carbons.' },
        { t: 'key', title: '¹³C NMR spectra: what do you learn?', items: [
          '<strong>First and most important:</strong> the <strong>number of carbon environments</strong>. This tells you the <strong>minimum number of carbons</strong> present in the molecule.',
          '<strong>Secondly,</strong> divide these environments into three groups: <strong>saturated or triple bonded</strong> carbons, <strong>double bonded</strong> carbons, and carbons in <strong>carbonyl</strong> groups.',
          '<strong>Thirdly,</strong> further divide these carbon environments up based on the table, to indicate the likely functional groups responsible for those shifts.',
          '<strong>Lastly,</strong> combine all the information from steps 1–3 and you may conclude additional things about the molecule as a whole.',
        ]},
        { t: 'note', title: 'Extra info: ¹³C NMR instrumentation: how is it done?', html: 'Samples are dissolved in <strong>special solvents where the majority of hydrogen atoms are the deuterium isotope</strong> (²H, or more commonly D). These solvents are chosen to enable clean ¹H NMR spectra to be run directly, but once that is run the ¹³C NMR is normally run directly afterwards. Common examples are <strong>CD₃OD</strong> (methanol), <strong>D₂O</strong> (heavy water) and <strong>CDCl₃</strong> (deuterated chloroform), and in most spectra you will encounter, CDCl₃ is used.<br><br>The samples are loaded into long thin <strong>NMR tubes</strong> and in turn into the spectrometer. The spectrometer is a superconducting electromagnet <strong>cooled to −269 °C with liquid helium</strong>, and has several radio pulse generators and receivers. It produces an intense magnetic field where the sample sits but is relatively minor elsewhere, thanks to special walls. Samples are exposed to a radio pulse and then the sensors detect an <strong>echo</strong> from the sample, which is analysed by computer to produce a spectrum.<br><br>The University of Auckland uses a <strong>300 NMR</strong> for day-to-day spectra and a larger <strong>600 NMR</strong> for samples that are difficult to analyse, such as proteins and peptides.' },
        { t: 'mistake', title: 'The CDCl₃ peak at 77.0 ppm', html: 'Many of the spectra you will encounter have been altered to <strong>not include</strong> solvent peaks. However, some spectra you may see have been run in CDCl₃ and have a <strong>three-peak signal at 77.0 ppm</strong>. If you encounter this peak, <strong>you should ignore it for your analysis</strong>. Counting it as a carbon environment will give you the wrong number of carbons.' },
        { t: 'example', tag: 'Practice', title: 'Chemical shift problems', problem: 'Use the tables and what you know about chemical environments to answer these three (they come straight from the workbook).', steps: [
          '<strong>1. Assign the shifts to the carbons of these substances.</strong> (a) 9.1, 27.8, 181.0: propanoic acid, CH₃CH₂COOH. (b) 27.2, 53.5: 2-chloropropane, (CH₃)₂CHCl. (c) 14.4, 35.3, 45.9: N-methylethanamine, CH₃CH₂NHCH₃. (d) 7.5, 28.4, 36.0, 207.4: butanone, CH₃CH₂COCH₃.',
          '<strong>2. Four samples are either an aldehyde, an ester, a chloroalkane or an alkene.</strong> Use the characteristic shift to say which is which: (a) 170.0 (b) 55.8 (c) 143.1 (d) 202.8.',
          '<strong>3. Four samples give these characteristic peaks: 206.7, 172.2, 47.4, 90.1.</strong> Which belongs to (a) a bromoalkane (b) an alkyne (c) a ketone (d) an amide?',
        ], answer: 'Q2: (a) 170.0 = ester, (b) 55.8 = chloroalkane, (c) 143.1 = alkene, (d) 202.8 = aldehyde. Q3: (a) bromoalkane = 47.4, (b) alkyne = 90.1, (c) ketone = 206.7, (d) amide = 172.2.' },
      ],
    },

    /* ============================================ 5 MASS SPECTROMETRY */
    {
      id: 'ms', num: '5', title: 'Mass spectrometry',
      intro: 'Mass spectrometry is a technique where a sample is vaporised and ionised, passed through a detector, and the mass of each molecule is determined.',
      video: 'NCEA Level 3 chemistry mass spectrometry molecular ion fragments',
      blocks: [
        { t: 'key', title: 'How the ions are made', items: [
          'Ion formation is achieved by a number of methods; two are discussed for this topic.',
          'Traditionally the most common technique is <strong>EI (electron ionisation, aka electron impact)</strong>, where a vaporised molecule is bombarded with fast-moving electrons and these electrons knock one of the molecule’s electrons away.',
          'Modern setups typically use <strong>ESI (electrospray ionisation)</strong>, where samples are focused through a fine needle with an intense voltage applied. This rips an electron off the molecules as they are sprayed into the detector. The advantage is that <strong>the molecule mostly reaches the detector intact</strong> rather than breaking apart into smaller fragments.',
          '<strong>Unless otherwise informed, you should assume that a sample is run using the traditional EI method, with high degrees of fragmentation.</strong>',
        ]},
        { t: 'key', title: 'Detection and output', items: [
          'Numerous detectors are used. Traditionally the most common high-accuracy device is a <strong>magnetic sector</strong>, where the magnetic field causes the particles to deflect depending on the ratio of mass to charge.',
          'Regardless of the apparatus, the output is a graph of <strong>m/z (mass/charge) against intensity</strong>, a mass spectrum. Generally most peaks are the result of <strong>one electron being lost</strong>, therefore m/z = the mass of the molecule analysed, or the mass of a fragment.',
          'The <strong>molecular ion [M⁺·]</strong> is the peak produced by the original molecule and is located at the <strong>right</strong> of the spectrum. It is the <strong>highest m/z peak with the exception of isotope peaks</strong>. Other peaks arise from fragments of the molecule, torn apart by the harsh ionisation process.',
          'The <strong>largest peak, be it a fragment or the molecular ion, is the base peak</strong>, and has a defined relative intensity of <strong>100</strong>.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'The mass spectrum of butane', problem: 'Butane’s spectrum shows peaks including one at 58 and a very tall one at 43. Which is the molecular ion and which is the base peak?', steps: [
          'Butane is C₄H₁₀, M<sub>r</sub> = 4(12) + 10(1) = 58.',
          'The <strong>58 peak is the molecular ion</strong>. It is the highest m/z peak and sits at the right of the spectrum.',
          'The <strong>43 peak is the base peak</strong>. It is the tallest, so it is assigned a relative intensity of 100.',
        ], answer: 'The molecular ion is 58; the base peak is 43. They are not the same peak. Never assume the tallest peak gives you the molar mass.' },
        { t: 'note', title: 'Out of scope: HRMS', html: '<strong>High Resolution Mass Spectrometry (HRMS)</strong> is done with highly sensitive (and expensive) equipment. Using this technique, molecular mass can be measured to 8 decimal places and the exact molecular formula calculated. <strong>This technique is outside any assessment for this course.</strong>' },
        { t: 'table', mono: true, caption: 'AS91388 data sheet: fragments in a mass spectrum', headers: ['Relative mass', 'Molecular ion, M⁺'], rows: [
          ['15', 'CH₃⁺'],
          ['17', 'OH⁺'],
          ['28', 'CO⁺'],
          ['29', 'CH₃CH₂⁺ or CHO⁺'],
          ['30', 'CH₂NH₂⁺'],
          ['31', 'CH₃O⁺ or CH₂OH⁺'],
          ['43', 'C₃H₇⁺ or CH₃CO⁺'],
          ['44', 'CONH₂⁺'],
          ['45', 'COOH⁺ or CH₃CHOH⁺ or CH₃CH₂O⁺'],
          ['57', 'C₄H₉⁺'],
        ]},
        { t: 'p', html: '<span class="xs muted">Molar masses given on the data sheet: H = 1, C = 12, N = 14, O = 16, Cl = 35.5, Br = 80.</span>' },

        { t: 'p', html: '<h4>The nitrogen rule</h4>' },
        { t: 'key', title: 'The rule', items: [
          '<strong>A molecular ion has an odd numbered mass if and only if it has an odd number of nitrogen atoms present.</strong>',
          'Examples: CH₃CH₂CH₃ (M = 44, no nitrogen) · CH₃CH₂CH₂NH₂ (M = 59, one nitrogen) · NH₂CH₂CH₂CH₂NH₂ (M = 74, two nitrogens).',
          'Note the consequence: an <strong>even</strong> mass means <strong>0, 2 or 4…</strong> nitrogens, so you can never say for certain that an even-mass compound contains no nitrogen.',
        ]},
        { t: 'example', tag: 'Practice', title: 'Mass spectrum problems', problem: 'From the workbook. Use m/z(H) = 1, m/z(C) = 12, m/z(N) = 14, m/z(O) = 16.', steps: [
          '<strong>1. Calculate the molecular ion expected for:</strong> (a) C₂H₆ (b) C₃H₈O (c) C₄H₉N (d) C₅H₁₁NO (e) C₆H₁₂O₂',
          '<strong>2a. Use the nitrogen rule</strong> to determine which of these molecular ions are <em>only</em> produced by molecules containing nitrogen: A: 87 · B: 40 · C: 103 · D: 84',
          '<strong>2b.</strong> Explain why you cannot say for certain whether the other molecular ions have nitrogen or not.',
          '<strong>3a.</strong> If an amine (containing at least one carbon) has a molecular ion of 60, predict how many nitrogen atoms are present.',
        ], answer: 'Q1: (a) 30 (b) 60 (c) 71 (d) 101 (e) 116. Q2a: A (87) and C (103), both odd, so both must contain an odd number of nitrogens. Q2b: 40 and 84 are even, which means 0, 2 or 4… nitrogens. Even is consistent with having nitrogen, so it proves nothing either way. Q3a: 60 is even, so an even number of nitrogens; since it is an amine it must have at least one, so it has TWO.' },

        { t: 'p', html: '<h4>Isotopic analysis</h4>' },
        { t: 'key', title: 'Reading the isotope peaks', items: [
          'Each peak depends on the exact isotopes present in the molecule, and the natural occurrence of each isotope can tell the reader a great deal about the molecule in question.',
          '<strong>Carbon is naturally 1.1% ¹³C</strong>, so each peak that has carbon in the fragment will be accompanied by a much smaller peak <strong>one mass unit higher</strong>. This smaller peak is <strong>no more than one tenth the size of the main peak and can be freely ignored at this level.</strong>',
          '<strong>Chlorine</strong> has isotopes 35 and 37 in a <strong>3:1 ratio</strong>. So a fragment or molecular ion with an <strong>M+2 peak that is 1/3 the size of the main peak</strong> suggests Cl is present. (Example: chloroethane.)',
          '<strong>Bromine</strong> has two common isotopes, 79 and 81, which occur in an approximate <strong>1:1 ratio</strong>. (Example: bromoethane.)',
          '<strong>Iodine</strong> does not have multiple isotopes, however its very large mass of <strong>127</strong> is very distinct and often turns up in the mass spectrum, sometimes accompanied by <strong>HI⁺ (m/z = 128)</strong>. In addition there is a <strong>large separation</strong> between the molecular ion and other fragments.',
          'Example: the spectrum of <strong>iodoethane</strong> shows [M⁺] = 156, fragments for I and HI (m/z = 127 and 128), as well as a fragment with the loss of I (m/z = 29).',
        ]},
        { t: 'mistake', title: 'Confusing the ¹³C peak with the molecular ion', html: 'One common mistake is to confuse the <strong>¹³C isotope peak</strong> with the molecular ion or with other isotope peaks, <strong>so be careful during assessment</strong>. The workbook illustrates this with <strong>cyclobutane</strong>: its molecular ion sits at 56, and magnifying the region just above it reveals the small ¹³C peak one mass unit up.' },

        { t: 'p', html: '<h4>Fragmentation analysis</h4>' },
        { t: 'key', title: 'What fragmentation is, and how far you need to take it', items: [
          '<strong>Fragmentation</strong> is the process by which an ionised particle <strong>dissipates excess energy by breaking covalent bonds</strong>. In a traditional mass spectrum (using EI) there are usually many peaks due to fragmentation.',
          'A full discussion of fragmentation is <strong>beyond the scope of this course</strong>. You <strong>can</strong> be expected to <strong>calculate the difference in mass of the molecular ion and a fragment, and give possible conclusions from this mass loss for simple examples</strong>.',
          'You would <strong>not</strong> be expected to explain the <em>formation</em> of fragments, but could use simple fragmentations as <strong>supporting evidence</strong> for the assignment of a molecule’s structure.',
          'Due to the complexity of fragmentations, <strong>it should not be used as the primary justification for a molecule’s structure</strong> without theory beyond the scope of this course.',
        ]},
        { t: 'table', mono: true, caption: 'Simple fragmentation examples', headers: ['Fragment mass', 'Fragment', 'Indicated functionality'], rows: [
          ['1', 'H', '–COOH or –CHO or –NH– or sometimes –OH'],
          ['15', 'CH₃', '–CH₃'],
          ['17', 'OH', '–COOH or –OH, but can come from any O containing molecule'],
          ['18', 'H₂O', '–OH (alcohol)'],
          ['29', 'CH₃CH₂ or CHO', '–CH₂CH₃ or –CHO'],
          ['43', 'CH₃CO', 'CH₃CO–'],
        ]},
        { t: 'table', mono: true, caption: 'Worked fragmentation examples from the workbook', headers: ['Compound', 'What its spectrum shows'], rows: [
          ['Ethanamine', '[M⁺] = 45; a fragment at m/z 44 (H loss) and one at m/z 30 (CH₃ loss)'],
          ['Propanoic acid', '[M⁺] = 74; m/z 73 (H loss) and m/z 57 (OH loss)'],
          ['Ethanal', '[M⁺] = 44; fragment at 43 (H loss); also loss of 15 (CH₃) to produce m/z 29'],
          ['Butan-1-ol', 'very weak [M⁺] = 74; m/z 73 (H loss); base peak m/z 56 from loss of H₂O, typical for alcohols'],
          ['Pentan-3-one', '[M⁺] = 86; base peak m/z 57, due to a loss of 29 (–CH₂CH₃)'],
          ['Ethanoic acid', 'molecule ion 60; fragments 45 (loss of 15, CH₃) and 43 (loss of 17, OH), but NO loss of 1'],
        ]},
        { t: 'mistake', title: 'The absence of a fragment proves nothing', html: 'Generally, a loss of <strong>1, 15, 17 or 18</strong> is fairly distinct and very useful for analysis, but larger fragmentations become increasingly difficult to make meaningful conclusions from.<br><br>It is important to note that <strong>the absence of a fragmentation does not mean a functional group is not present.</strong> This is <strong>in contrast to IR and NMR</strong>, where such conclusions <em>can</em> be made.<br><br>The workbook’s own example makes the point: <strong>ethanoic acid shows no loss of 1</strong>, even though a loss of 1 is typical of carboxylic acid groups.' },
        { t: 'warn', title: 'Sometimes the molecular ion is not there at all', html: 'Fragmentation can sometimes be so significant (generally using EI) that <strong>the molecular ion does not appear in the mass spectrum</strong>. Under these circumstances, examiners will either inform you that you cannot see the molecular ion, or provide the value for it. <strong>It is not possible to work this out from the analysis of the spectrum.</strong>' },
        { t: 'key', title: 'Mass spectrometry: what should you take away?', items: [
          '<strong>1.</strong> The most important piece of information is the <strong>molar mass of the molecule</strong>, i.e. the molecular ion.',
          '<strong>2.</strong> The second thing to apply is the <strong>nitrogen rule</strong>. If the mass is odd then there is an odd number (1, 3, 5…) of nitrogen atoms present.',
          '<strong>3.</strong> Thirdly, evaluate whether <strong>Cl, Br or I</strong> are present by considering <strong>isotopic analysis</strong>.',
          '<strong>4.</strong> Fourthly, <strong>fragmentation</strong> may indicate functionality or some structural features. The most important are the loss of <strong>1</strong> (in –COOH, CHO, N–H and less intensely OH), <strong>15</strong> (most likely CH₃ loss), <strong>17</strong> (OH loss, typically COOH but can be alcohol) and <strong>18</strong> (alcohol). Be aware that the absence of a fragment does not tell you anything, as there are often complex reasons why a particular fragment will not form. <strong>Fragmentation information should be viewed as less important than IR or NMR information.</strong>',
          '<strong>5.</strong> Lastly, you may <strong>revisit the MS data in light of information provided by NMR or IR</strong>.',
        ]},
      ],
    },

    /* ============================================ 6 SOLVING STRUCTURES */
    {
      id: 'solving', num: '6', title: 'Solving structures: bringing it all together',
      intro: 'Combined, these data sets enable the identification of many compounds, and this problem-solving process is the focus of this topic’s assessment.',
      blocks: [
        { t: 'key', title: 'What each technique contributes', items: [
          '<strong>Mass spectroscopy</strong> tells the reader the <strong>molar mass and some of the atoms present</strong>, and indicates possible structures.',
          '<strong>IR</strong> indicates the <strong>functional groups present</strong> (OH, NH or C=O).',
          '<strong>NMR</strong> gives information about the <strong>arrangement of the molecule’s structure</strong>, as well as some of the functionality.',
        ]},
        { t: 'key', title: 'Drawing information together', items: [
          'The strategy for a problem depends on the individual problem. The most important thing to do, with any problem in chemistry, is to <strong>read the question fully</strong>. Sometimes part of the formula or other information is provided in addition to spectral data. One common example is that the <strong>empirical formula</strong> is provided, which you use with the mass spectrum to evaluate the molecular formula. Typically, questions will provide a <strong>selection of potential structures</strong>.',
          'When you start to analyse multiple spectra, <strong>start by taking the most robust and easily interpreted information from each spectrum</strong>.',
          'From <strong>MS</strong>: the first thing to take away is the <strong>molecular mass</strong> (from the molecular ion), and whether it indicates the presence of nitrogen (odd mass → 1 or 3 or 5… nitrogens; even mass → 0 or 2 or 4…).',
          'From <strong>¹³C NMR</strong>: the first thing to take away is the <strong>number of chemical environments</strong>, and if any of these are carbonyl carbons and/or alkene carbons.',
          'From <strong>IR</strong>: you should be able to make the main judgments regarding the <strong>presence of C=O</strong> and the <strong>presence or absence of OH/NH</strong> signals. From here you should have significantly reduced the possibilities, and your further analysis should be <strong>directed</strong>. Based on what is needed to differentiate the possible structures.',
          '<strong>Lastly,</strong> once you have established facts about the molecule (has a C=O, has an OH, has at least 5 carbons, etc.) you can <strong>subtract the mass of these parts from the molar mass and find out what is left</strong>. That way you can evaluate what remaining possibilities there are.',
        ]},

        { t: 'example', tag: 'Worked example', title: 'A straight forward example', problem: 'Six candidate structures are given, along with a ¹³C NMR spectrum, an IR spectrum, a mass spectrum and a zoomed view of the highest m/z region. Which structure produces all of these spectra?', steps: [
          'Starting with the <strong>¹³C NMR</strong> there are <strong>three signals</strong>, none of them have double bonds or are carbonyls. This eliminates 1, 5 and 6 as possibilities.',
          'The <strong>IR</strong> also tells us there are <strong>no carbonyls</strong>, but also tells us there are <strong>no OH’s or NH’s</strong>. This confirms 1 and 6 is not a possibility and further adds 3 to the list of not appropriate.',
          'The <strong>mass spectrum</strong> has a molecule ion <strong>150 and 152 in near equal heights</strong>. This tells us there is a <strong>Br atom</strong> present, and as the mass is even, there are an <strong>even number of nitrogens</strong> present.',
        ], answer: 'Only molecule 2 could produce all of the spectra given. Notice the shape of the argument: each spectrum is used to strike out candidates, and the answer is whatever survives all three.' },

        { t: 'example', tag: 'Full worked example', title: 'A full example: a full description', problem: 'An IR, a mass spectrum (with a zoomed molecular-ion region) and a ¹³C NMR are given. Deduce the structure. NOTE: the workbook flags that this analysis goes well beyond what can be expected in an assessment. It is included to show the level of detail a careful, systematic approach can reach.', steps: [
          'From the <strong>mass spectrum</strong>: the molar mass is <strong>102</strong>, and therefore there is an even number (0 or 2 or 4) of nitrogens.',
          'From the <strong>IR</strong>: there are <strong>no NH or OH</strong> bonds, but there is <strong>at least one carbonyl</strong>.',
          'The <strong>¹³C NMR</strong> indicates there are <strong>five environments</strong>, and therefore at least five carbon atoms, with one of them being a carbonyl and the rest saturated (or in a triple bond).',
          'The <strong>position</strong> of the carbonyl indicates it is <em>not</em> an aldehyde or ketone, so it is in a carboxylic acid, acyl chloride, ester or amide. Combining this with the IR (no N–H) gives: <strong>an ester, an acyl chloride or a tertiary amide</strong>.',
          'More detail from the mass spectrum: <strong>no chlorines, bromines or iodines</strong> (no isotope peaks, and the mass is less than 127), so it is <strong>not an acyl chloride</strong>.',
          'We know there is a C=O and 4 other carbons, totalling mass 76. So the rest of the molecule has mass <strong>102 − 76 = 26</strong>. Since 26 is smaller than two nitrogens (28), the nitrogen rule tells us there are <strong>no nitrogens</strong>, so it is not an amide either. <strong>The molecule is an ester.</strong>',
          'The remaining mass = <strong>26 − 16 = 10</strong>, and only one atom fits this mass: <strong>10 hydrogen atoms</strong>. So the molecular formula is <strong>C₅H₁₀O₂</strong>.',
          'DBE = ½(5 × 2 + 2 − 10) = <strong>1</strong>, which is due to the C=O, so there are no cyclic features or other double or triple bonds.',
          'Now use the ¹³C in detail: <strong>δ 60</strong> is the C–O on the ester; <strong>δ 28</strong> is most likely CH/CH₂; and the remaining peaks at <strong>δ 9 and 14</strong> (both below 20) are CH₃’s not bonded to an electronegative element or carbonyl.',
          'Examining all nine possible five-carbon esters: numbers <strong>2, 4, 6 and 9</strong> have fewer than five chemical environments. Numbers <strong>1, 5 and 8</strong> only have one CH₃ not bonded to an O or C=O.',
          'The remaining two are harder to differentiate, but the tables say <strong>0–15 ppm is a CH₃ bonded to a CH₂</strong>. In structure 3, one of the CH₃’s is bonded to a CH and would therefore have a chemical shift above 15 ppm.',
        ], answer: 'The structure is number 7: ethyl propanoate, C₅H₁₀O₂.' },

        { t: 'note', title: 'Extra for experts: double bond equivalents (DBE)', html: '<strong>Students note: there will be no questions related to this content, and it is not required for the basic understanding expected in NCEA.</strong><br><br><strong>Double bond equivalents</strong> (DBEs, also known as degrees of unsaturation) are a measure of how unsaturated a molecule is. Each double bond (including carbonyls) or ring is <strong>1 DBE</strong>, and each triple bond is <strong>2 DBEs</strong>. This can be calculated from the structure directly, or from the formula:<br><br><span class="math" data-tex="\\mathrm{DBE} = \\tfrac{1}{2}\\left(2n_4 + n_3 + 2 - n_1\\right)">DBE = ½(2n₄ + n₃ + 2 − n₁)</span><br><br>where <strong>n₄</strong> = number of 4-bond atoms (e.g. C and Si), <strong>n₃</strong> = number of 3-bond atoms (e.g. N and P), and <strong>n₁</strong> = number of single-bond atoms (e.g. H, Cl, F, Br, I).<br><br><strong>Example:</strong> C₆H₁₄O₂ has DBE = ½(12 + 0 + 2 − 14) = <strong>0</strong>, a saturated molecule. It does not have a carboxylic acid group, an ester, an aldehyde, a ketone, an alkene or a ring. We can also conclude it must have <strong>two alcohol groups</strong> (for compounds used in year 13).<br><br><strong>Example:</strong> C₆H₁₂O has DBE = ½(12 + 0 + 2 − 12) = <strong>1</strong>, one degree of unsaturation. As the molecule has one O, we can conclude it has either an aldehyde, a ketone, an alkene with an alcohol, or a ring with an alcohol.<br><br>The tally of DBEs should be kept in mind as spectral information is examined. Each carbonyl is 1 DBE, and so is each alkene. At some point the molecular formula will be determined and the total DBE count can be calculated. Any DBEs unaccounted for could indicate a <strong>ring</strong> being present, or <strong>multiple symmetrically arranged unsaturated groups</strong>, and this would be further indicated in the ¹³C NMR.' },

        { t: 'note', title: 'How the internal is marked', html: 'Straight from the workbook’s sample assessment. The tasks give you a set of IR, ¹³C NMR and MS spectra relating to a single compound, and <strong>these compounds contain one functional group</strong>.<br><br>• <strong>Achieved</strong>, one piece of information from each spectra is correctly identified.<br>• <strong>Merit</strong>, two spectra are correctly interpreted <em>and linked to possible structures</em>.<br>• <strong>Excellence</strong>. The correct structure is identified <strong>with full justification linked to the integration of information provided by all three spectra</strong>.<br><br>Read those three lines carefully, because they tell you exactly how to write. Achieved is a list of observations. Merit connects observations to candidate structures. <strong>Excellence requires you to say why the structure you picked fits every spectrum, and, in the sample assessment’s own words, “why each of the other structures do not fit the spectra provided”.</strong>' },
        { t: 'tip', title: 'The sentence pattern that earns Excellence', html: 'Every claim should name its evidence. Compare:<br><br>❌ “It is an ester.”<br>✅ “The IR shows a strong C=O at 1740 cm⁻¹ with <strong>no</strong> broad absorption at 3000–3500, so there is a carbonyl but no O–H or N–H. The ¹³C shows that carbonyl at δ 172, which is in the <strong>160–185</strong> band rather than 180–220, so it is an acid, acyl chloride, amide or ester rather than a ketone or aldehyde. Combining the two, the absence of N–H rules out a primary or secondary amide and the absence of O–H rules out the acid, so it is an ester.”<br><br>Then do the same in reverse for each rejected structure. That is what “integrating” means in the criteria.' },
      ],
    },

    /* ============================================ 7 PRACTICE */
    {
      id: 'practice', num: '7', title: 'Identify the compound: practice bank',
      intro: 'The workbook’s NCEA-type question and sample assessment tasks. Each gives you spectra and a set of six candidate structures. The format you will meet in the internal. Work them as written: evidence from each spectrum, then a justification of your chosen molecule.',
      blocks: [
        { t: 'example', tag: 'NCEA-type exam question', title: 'Question One', problem: 'Use the following spectra (mass spectrum, infrared and carbon-13 NMR) to evaluate the identity of the molecule from the six possibilities given. Your answer should include: evidence of the molecule’s identity from each spectrum, and a justification of your chosen molecule.', steps: [
          'The six possibilities are: (a) 2-methylpropanamide · (b) 2-methylpropanoic acid · (c) ethyl ethanoate · (d) N-ethylethanamide · (e) N-ethyl-N-methylmethanamide · (f) 3-methylbutan-2-one.',
          'Work the mass spectrum first: what is the molecular ion, and is it odd or even?',
          'Then the IR: is there a C=O? Is there a broad 3000–3500 absorption, and if so, is it one band or two?',
          'Then the ¹³C: how many environments, and which region is the carbonyl in: 180–220 or 160–185?',
        ], answer: 'Use the “student NMR table” ranges above. The workbook directs you to that table for this question. Note that several of these six share a molecular formula, so the mass spectrum alone cannot separate them. The discrimination has to come from IR and ¹³C.' },
        { t: 'example', tag: 'Sample assessment · Task A', title: 'Identify the compound (M = 88)', problem: 'A set of IR, ¹³C NMR and MS spectra for a single compound containing ONE functional group. Note: the highest significant peak is at m/z = 88, and it is not visible on the printed spectrum. The ¹³C shows three signals.', steps: [
          '<strong>1.</strong> Discuss the information each of the spectra provides about the nature of the molecule.',
          '<strong>2.</strong> Circle the structure that best fits: (i) N-isopropylmethanamide · (ii) isopropyl methanoate · (iii) ethyl ethanoate · (iv) butanoic acid · (v) 2-methylpropanoic acid · (vi) N,N-dimethylethanamide.',
          '<strong>3.</strong> Justify the structure you have chosen, and why each of the other structures does not fit the spectra provided.',
        ], answer: 'Three ¹³C environments is the key constraint. Count the environments in each of the six candidates before doing anything else, and see how many survive. Then use the IR to decide between what is left. Remember: 88 is an even mass, so an even number of nitrogens.' },
        { t: 'example', tag: 'Sample assessment · Task B', title: 'Identify the compound (M ≈ 100)', problem: 'A second set of IR, ¹³C NMR and MS spectra for a single compound containing one functional group. The ¹³C shows a signal in the 160–170 region plus three lower signals.', steps: [
          '<strong>1.</strong> Discuss the information each of the spectra provides about the nature of the molecule.',
          '<strong>2.</strong> Circle the structure that best fits: (i) N-methylbutanamide · (ii) 3-methylbutanoic acid · (iii) methyl butanoate · (iv) 3-methylbutanamide · (v) N,N-dimethylpropanamide · (vi) 2-methylbutanamide.',
          '<strong>3.</strong> Justify the structure you have chosen, and why each of the other structures does not fit the spectra provided.',
        ], answer: 'A carbonyl in the 160–185 band immediately rules out any ketone or aldehyde. From there, the IR decides between acid (broad O–H), amide (one or two N–H bands) and ester (neither), and the number of ¹³C environments picks the specific isomer.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, Chemistry L3 (91388) internal exemplars', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91388', note: 'Internal assessment resources, exemplars & clarifications', verify: true },
    { label: 'NZQA, 91391 papers (spectroscopy in the external)', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91391&view=exams', note: 'Structure-determination questions combined with organic', verify: true },
    { label: 'No Brain Too Small: Structure determination', url: 'https://www.nobraintoosmall.co.nz/html/senior_chemistry/NCEA3_chemistry.html', note: 'MS/IR/NMR combined questions by topic', verified: true },
    { label: 'New Zealand Science Learning Hub', url: 'https://www.sciencelearn.org.nz', note: 'Recommended in the workbook: background reading on spectroscopy', verified: true },
  ],

  quiz: [
    /* ---- IR ---- */
    { type: 'mc', q: 'An IR spectrum shows a broad absorption at 3300 cm⁻¹ and NO absorption between 1600 and 1800 cm⁻¹. The compound could be:', choices: ['A ketone', 'An alcohol or an amine', 'A carboxylic acid', 'An ester'], answer: 1, explanation: 'The broad 3000–3500 absorption means O–H or N–H; the absence of anything at 1600–1800 means no C=O. That combination fits butan-1-ol or 1-aminobutane in the workbook’s series. A ketone and an ester would show a C=O; a carboxylic acid would show both.' },
    { type: 'mc', q: 'A very broad IR absorption from 2500–3300 cm⁻¹ that overlaps the C–H region, together with a strong peak at 1710 cm⁻¹, indicates:', choices: ['An alcohol', 'An amine', 'A carboxylic acid', 'An alkene'], answer: 2, explanation: 'The data sheet lists the very broad 2500–3300 O–H (overlapping C–H) specifically for carboxylic acids, and their C=O at 1705–1720. An alcohol’s O–H sits higher and narrower at 3200–3550.' },
    { type: 'mc', q: 'An IR spectrum shows TWO N–H bands, at 3200 and 3400 cm⁻¹, plus a C=O at 1650 cm⁻¹. This is characteristic of:', choices: ['A primary amine', 'A secondary amine', 'An amide', 'An acid chloride'], answer: 2, explanation: 'This is butanamide in the workbook’s series. The data sheet notes that amide N–H appears as 2 peaks, and the amide C=O is listed at 1630–1695: noticeably lower than a ketone or ester.' },
    { type: 'mc', q: 'Which C=O would you expect at the HIGHEST wavenumber?', choices: ['A saturated ketone', 'An ester', 'An acid chloride', 'An amide'], answer: 2, explanation: 'The data sheet ranges: acid chlorides 1785–1815, esters 1735–1750, saturated ketones 1710–1720, amides 1630–1695. Acid chlorides are the highest by a clear margin.' },
    { type: 'mc', q: 'Why does methane give an extremely weak IR spectrum?', choices: ['It has no C–H bonds', 'It is too small to absorb IR', 'It has no overall dipole, and IR absorption requires a change in dipole', 'Its bonds are too strong to vibrate'], answer: 2, explanation: 'IR absorption involves a change in dipole, so totally symmetrical molecules absorb very weakly. The same effect is why the data sheet lists C=C intensity as “variable”, symmetry reduces it.' },
    { type: 'sa', q: 'What is the advantage of an ATR module over a traditional IR setup?', accept: ['less sample', 'faster', 'faster and less sample', '100 times less sample', 'much faster and requires around 100 times less sample'], answer: 'It is much faster to use and requires around 100 times less sample', explanation: 'ATR (attenuated total reflectance) uses a mounted diamond to reflect the IR off the surface of the sample by total internal reflection, rather than passing a beam through a prepared sample in a chamber.' },

    /* ---- 13C NMR ---- */
    { type: 'mc', q: 'How many chemical environments does propane have?', choices: ['One', 'Two', 'Three', 'Four'], answer: 1, explanation: 'Carbons 1 and 3 are each bonded to 3 H and a CH₂CH₃, the same sequence of bonds, so they share one environment. Carbon 2 (2 H and 2 CH₃) is the second. Propane has three carbons but only two environments, and therefore two peaks.' },
    { type: 'mc', q: 'How many chemical environments does 1-chloropropane have?', choices: ['One', 'Two', 'Three', 'Four'], answer: 2, explanation: 'C1 has 3 H and a CH₂CH₂Cl; C2 has 2 H, a CH₃ and a CH₂Cl; C3 has 2 H, a Cl and a CH₂CH₃. No two are the same, so all three are different environments. Adding the chlorine destroyed the symmetry propane had.' },
    { type: 'mc', q: 'A ¹³C peak at δ 205 ppm most likely indicates:', choices: ['A C–C bond', 'A C=C', 'A ketone or aldehyde C=O', 'A C–O of an alcohol'], answer: 2, explanation: 'The three major divisions put anything above 150 in the carbonyl region, and 180–220 specifically indicates a ketone or aldehyde. Carboxylic acids, esters, amides and acyl chlorides sit lower, at 160–185.' },
    { type: 'mc', q: 'Why do esters and amides show their carbonyl at a LOWER δ than ketones?', choices: ['They have fewer carbons', 'The attached atom has lone pairs, which donate electron density and shield the carbonyl carbon', 'Their C=O bond is weaker', 'They are more electronegative overall'], answer: 1, explanation: 'When another atom with lone pairs is attached to the carbonyl carbon, the carbonyl draws electrons to it, making that carbon more shielded and reducing its chemical shift: 160–185 rather than 180–220.' },
    { type: 'mc', q: 'A ¹³C signal at δ 12 ppm is almost always:', choices: ['A CH₃ bonded to a CH₂', 'A C–O', 'A carbon next to a carbonyl', 'An alkene carbon'], answer: 0, explanation: 'The very low region 0–15 ppm is almost always a CH₃ bonded to a CH₂, one of the most distinguished and reliable signals in the whole spectrum.' },
    { type: 'mc', q: 'You count the peaks in a ¹³C spectrum. What does that number give you?', choices: ['The exact number of carbons', 'The minimum number of carbons', 'The number of hydrogens', 'The molar mass'], answer: 1, explanation: 'Chemically equivalent carbons appear as a single peak, so the count is a MINIMUM. Propane gives two peaks for three carbons; cis-hex-3-ene gives three for six.' },
    { type: 'mc', q: 'A ¹³C spectrum shows only ONE signal in the C=C region. You can conclude:', choices: ['There is only one carbon in the double bond', 'The molecule is completely symmetric around the double bond', 'The double bond is actually a triple bond', 'The peak is a solvent peak'], answer: 1, explanation: 'A double bond always involves at least 2 carbons, so a single C=C signal means both are in the same environment. The molecule is symmetric about the double bond. The consequence is that every peak then has at least 2 carbons in its environment.' },
    { type: 'mc', q: 'One peak in a ¹³C spectrum is twice as tall as the others. What does that tell you?', choices: ['That environment contains twice as many carbons', 'That carbon is more deshielded', 'Nothing usable', 'It is the molecular ion'], answer: 2, explanation: 'Peak height in ¹³C NMR does not necessarily give any usable information, each peak is treated as one environment regardless of height. Many factors affect intensity and they are not easily interpreted.' },
    { type: 'mc', q: 'A ¹³C spectrum run in CDCl₃ shows a three-peak signal at 77.0 ppm. You should:', choices: ['Count it as one carbon environment', 'Count it as three carbon environments', 'Ignore it', 'Treat it as a C–O'], answer: 2, explanation: 'That is the deuterated chloroform solvent peak. Ignore it. Counting it would give you the wrong number of carbon environments and therefore the wrong minimum carbon count.' },
    { type: 'sa', q: 'Why are ¹³C chemical shifts reported in ppm rather than Hz?', accept: ['consistent between machines', 'so they are the same on any machine', 'machine independent', 'independent of the machine', 'so shifts are consistent regardless of the machine used'], answer: 'So the shifts are consistent regardless of which machine was used', explanation: 'The raw spectrum is in Hz relative to TMS, but each machine runs at a different frequency (e.g. 300 vs 600 MHz). Dividing by the machine’s resonance frequency removes that dependence, and since the shift is thousands of Hz against hundreds of millions, the answer comes out in parts per million.' },

    /* ---- MS ---- */
    { type: 'mc', q: 'A mass spectrum shows a molecular ion at m/z 150 and a peak at 152 of near equal height. This indicates:', choices: ['Two chlorine atoms', 'One bromine atom', 'One chlorine atom', 'A nitrogen atom'], answer: 1, explanation: 'Bromine’s two common isotopes, 79 and 81, occur in an approximate 1:1 ratio, giving M and M+2 of near equal height. Chlorine (35 and 37) would give an M+2 peak about 1/3 the size of the main peak. This is exactly the reasoning used in the workbook’s straightforward example, where 150/152 identified the bromine-containing structure.' },
    { type: 'mc', q: 'An M+2 peak is about one third the height of the molecular ion. This indicates:', choices: ['Bromine', 'Chlorine', 'Iodine', 'Nitrogen'], answer: 1, explanation: 'Chlorine has isotopes 35 and 37 in a 3:1 ratio, so the M+2 peak is 1/3 the size of the main peak.' },
    { type: 'mc', q: 'For butane, m/z 58 is the molecular ion but m/z 43 is the tallest peak. What is 43 called?', choices: ['The molecular ion', 'The base peak', 'The isotope peak', 'The parent peak'], answer: 1, explanation: 'The largest peak, whether a fragment or the molecular ion, is the base peak, and is assigned a relative intensity of 100. This is exactly why you must not assume the tallest peak gives you the molar mass.' },
    { type: 'sa', q: 'A molecule has an odd molecular ion mass (M⁺ = 59). What does the nitrogen rule tell you?', accept: ['odd number of nitrogens', 'it contains nitrogen', 'nitrogen', 'an odd number of nitrogen atoms', 'contains an odd number of nitrogens'], answer: 'It contains an odd number of nitrogen atoms', explanation: 'A molecular ion has an odd numbered mass if and only if it has an odd number of nitrogen atoms present. CH₃CH₂CH₂NH₂ is the workbook’s example at M = 59.' },
    { type: 'mc', q: 'A molecular ion has an EVEN mass. What can you conclude about nitrogen?', choices: ['There is definitely no nitrogen', 'There is definitely nitrogen', 'There are 0, 2, 4… nitrogens, so you cannot be certain either way', 'There is exactly one nitrogen'], answer: 2, explanation: 'This is why question 2b in the workbook asks you to explain the uncertainty. An even mass is consistent with no nitrogen AND with two nitrogens, so on its own it settles nothing.' },
    { type: 'mc', q: 'An amine containing at least one carbon has a molecular ion of 60. How many nitrogen atoms does it have?', choices: ['0', '1', '2', '3'], answer: 2, explanation: '60 is even, so there must be an even number of nitrogens. Since it is an amine it must contain at least one, so the only possibility is two.' },
    { type: 'mc', q: 'Every carbon-containing peak has a small companion peak one mass unit higher. Why?', choices: ['Hydrogen isotopes', 'Carbon is naturally 1.1% ¹³C', 'Loss of an electron', 'Instrument noise'], answer: 1, explanation: 'That companion peak is no more than one tenth the size of the main peak and can be freely ignored at this level, but confusing it with the molecular ion is a common assessment mistake.' },
    { type: 'mc', q: 'A base peak at m/z 56 from a molecular ion of 74 represents a loss of 18. This is typical of:', choices: ['A carboxylic acid', 'An alcohol', 'A ketone', 'An amine'], answer: 1, explanation: 'A loss of 18 is a loss of H₂O, indicating an –OH. This is butan-1-ol in the workbook, whose molecular ion at 74 is very weak while the base peak at 56 comes from losing water: behaviour described as typical for alcohols.' },
    { type: 'mc', q: 'Ethanoic acid shows NO loss of 1, even though that loss is typical of carboxylic acids. What does this tell you?', choices: ['It is not really a carboxylic acid', 'The absence of a fragmentation does not mean the functional group is absent', 'The spectrum was recorded incorrectly', 'It must be an ester'], answer: 1, explanation: 'This is the key limitation of fragmentation evidence, and it is in direct contrast to IR and NMR, where an absent signal DOES let you conclude something. It is also why fragmentation should be viewed as less important than IR or NMR, and never used as the primary justification.' },
    { type: 'mc', q: 'What should you assume about the ionisation method unless told otherwise?', choices: ['ESI, with the molecule mostly intact', 'EI, with high degrees of fragmentation', 'That no ionisation occurred', 'HRMS'], answer: 1, explanation: 'The workbook is explicit: unless otherwise informed, assume the traditional EI (electron ionisation) method with high degrees of fragmentation. ESI is the modern alternative and delivers the molecule mostly intact.' },
    { type: 'mc', q: 'The molecular ion does not appear in a spectrum at all. What do you do?', choices: ['Take the highest visible peak as the molecular ion', 'Add 1 to the base peak', 'Nothing. Examiners will tell you it is missing or give you the value', 'Calculate it from the fragments'], answer: 2, explanation: 'Fragmentation using EI can be significant enough to remove the molecular ion entirely. It is not possible to work this out from analysis of the spectrum, so examiners will either inform you or provide the value.' },
    { type: 'sa', q: 'What is the FIRST and most important thing to take away from a mass spectrum?', accept: ['molar mass', 'the molar mass', 'molecular ion', 'the molecular ion', 'molecular mass', 'the molar mass of the molecule'], answer: 'The molar mass of the molecule: i.e. the molecular ion', explanation: 'Then, in order: the nitrogen rule; whether Cl, Br or I are present by isotopic analysis; fragmentation; and finally a revisit of the MS data in light of what the NMR and IR told you.' },

    /* ---- integration ---- */
    { type: 'mc', q: 'Which technique tells you which FUNCTIONAL GROUPS are present?', choices: ['Mass spectrometry', 'Infrared', '¹³C NMR', 'All three equally'], answer: 1, explanation: 'The workbook’s one-line summary: MS gives the molar mass and some of the atoms present; IR indicates the functional groups (OH, NH or C=O); NMR gives the arrangement of the structure plus some functionality.' },
    { type: 'mc', q: 'A compound has molar mass 102, no NH or OH in the IR, at least one carbonyl, and five ¹³C environments with the carbonyl in the 160–185 band. What class is it?', choices: ['A ketone', 'An aldehyde', 'An ester, acyl chloride or tertiary amide', 'An alcohol'], answer: 2, explanation: 'The carbonyl sitting at 160–185 rather than 180–220 rules out ketone and aldehyde. No N–H then rules out primary and secondary amides, leaving an ester, an acyl chloride or a tertiary amide. This is the opening of the workbook’s full worked example, which ends at ethyl propanoate.' },
    { type: 'sa', q: 'What is needed for EXCELLENCE in this standard?', accept: ['justify by integrating', 'justifying the structure by integrating spectroscopic data', 'integrate', 'integration', 'justify the structure by integrating the data'], answer: 'Justifying the structure by integrating the spectroscopic data', explanation: 'Achieved identifies discrete aspects; Merit determines the structure; Excellence justifies it by integration. In the sample assessment’s wording, Excellence also requires saying why each of the OTHER structures does not fit.' },
    { type: 'sa', q: 'Once you know the molecule has a C=O, an OH and at least five carbons, what arithmetic step narrows it down?', accept: ['subtract', 'subtract from the molar mass', 'subtract the mass of those parts from the molar mass', 'take away the known masses', 'subtract known parts from the molar mass'], answer: 'Subtract the mass of those established parts from the molar mass and see what is left', explanation: 'The remainder tells you exactly how much of the molecule is unaccounted for. In the full worked example, 102 − 76 = 26, and 26 being less than two nitrogens (28) is what eliminated nitrogen entirely.' },
  ],
};

/* ============================================================================
   AS 91525, Modern Physics (Internal, 3 credits), "3.5"Photons · photoelectric effect · atomic spectra · nuclei
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for, UNLESS the same content is examined
     elsewhere. Modern physics is not covered by 91523 (waves), 91524 (mechanics) or
     91526 (electricity), so it is internal-only in this programme.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: [],

  title: 'Modern Physics',
  tags: ['Photons', 'Photoelectric', 'Spectra', 'Nuclei'],
  intro: 'Quantum and nuclear ideas: light as photons, the photoelectric effect, atomic energy levels and spectra, and mass–energy in the nucleus.',

  flashcards: [
    { q: 'Write the photon energy equation in both forms', a: 'E = hf = hc/λ', explain: 'h = 6.63×10⁻³⁴ J s. Energy is proportional to FREQUENCY, not intensity: the key to the photoelectric effect.' },
    { q: 'What is the threshold frequency f₀?', a: 'The minimum frequency that can eject an electron: W = hf₀', explain: 'Below f₀ NOTHING is emitted no matter how bright the light: the fact that killed the wave model.' },
    { q: 'Increasing intensity (same frequency) changes what?', a: 'The NUMBER of electrons emitted, not their maximum kinetic energy', explain: 'More photons per second = more electrons, but each photon still carries the same energy hf.' },
    { q: 'Three observations the wave model could NOT explain', a: 'The threshold frequency, instantaneous emission, and max KE depending on frequency not intensity', explain: 'A wave model predicts energy builds gradually, so a delay and an intensity dependence, neither is observed.' },
    { q: 'What is the stopping voltage?', a: 'The p.d. that just stops the fastest photoelectrons: eV_s = E_k(max)', explain: 'It gives you a direct experimental measure of the maximum kinetic energy.' },
    { q: 'Why do atoms give LINE spectra rather than continuous ones?', a: 'Electron energy levels are discrete, so only specific transition energies (ΔE = hf) are possible', explain: 'Each element has a unique set of levels, so its spectrum is a fingerprint.' },
    { q: 'Why do BOTH fission and fusion release energy?', a: 'Because in each case the products are more tightly bound (higher binding energy per nucleon) than the reactants', explain: 'Iron-56 sits at the peak: fusion releases energy below it, fission above it.' },
    { q: 'Write the radioactive decay equation in terms of half-life', a: 'N = N₀(½)^(t/t½)', explain: 'The activity halves every half-life, regardless of how much you started with.' },
    { q: 'Alpha, beta and gamma: what changes?', a: 'α: A−4, Z−2. β⁻: Z+1, A same. γ: no change to A or Z, just energy released', explain: 'A = mass number, Z = atomic number. Balance both sides of a decay equation.' },
    { q: 'Why is radioactive decay described as random?', a: 'Any individual nucleus has a fixed probability of decaying per unit time; you cannot say which one will go next', explain: 'The smooth exponential curve only emerges because you are averaging over huge numbers of nuclei: a genuine link to Poisson statistics.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: what intensity changes vs what frequency changes in the photoelectric effect', a: 'Increasing <strong>intensity</strong> increases the NUMBER of photoelectrons but not their maximum kinetic energy. Increasing <strong>frequency</strong> increases the maximum kinetic energy of each electron.', explain: 'This is the observation classical wave theory cannot explain, and it is why the photon model was needed. Each electron absorbs ONE photon, so its energy depends only on that photon\'s frequency; brighter light simply means more photons and hence more electrons. Below the threshold frequency, no intensity whatsoever produces emission.' },
    { q: 'TELL THEM APART: emission spectrum vs absorption spectrum', a: '<strong>Emission</strong>: bright coloured lines on a dark background, produced when excited electrons fall to lower levels. <strong>Absorption</strong>: dark lines on a continuous spectrum, produced when electrons absorb specific photons and jump up.', explain: 'The lines appear at exactly the SAME wavelengths for a given element, because the energy level differences are identical either way. That is why the dark Fraunhofer lines in sunlight identify elements in the Sun\'s atmosphere.' },
    { q: 'TELL THEM APART: nuclear fission vs fusion', a: '<strong>Fission</strong> splits a heavy nucleus into lighter fragments. <strong>Fusion</strong> joins light nuclei into a heavier one. Both release energy because both move products TOWARD iron-56.', explain: 'Iron-56 sits at the peak of the binding-energy-per-nucleon curve, so it is the most stable nucleus. Anything heavier releases energy by splitting; anything lighter releases energy by joining. Knowing the curve lets you predict which process applies to any given nucleus.' },
    { q: 'TELL THEM APART: mass defect vs binding energy', a: '<strong>Mass defect</strong> is the difference between the mass of a nucleus and the sum of its separate nucleons. <strong>Binding energy</strong> is the energy equivalent of that defect, E = Δmc².', explain: 'A nucleus weighs LESS than its parts because energy was released when it formed, that missing mass IS the binding energy. It is also the energy you would have to supply to pull the nucleus completely apart, which is why higher binding energy per nucleon means a more stable nucleus.' },

    /* ---- reasoning depth ---- */
    { q: 'Why did the photoelectric effect require a particle model of light?', a: 'Because emission depends on a THRESHOLD FREQUENCY and is instantaneous, neither of which wave theory predicts. Waves should allow any frequency to work given enough time and intensity.', explain: 'The photon model resolves it: light arrives in discrete quanta of energy E = hf, and one electron absorbs one photon. If that single photon carries less than the work function, nothing happens no matter how many arrive. This one experiment is the foundation of wave–particle duality.' },
    { q: 'State the photoelectric equation and define each term', a: 'E_k(max) = hf − φ, where hf is the photon energy, φ is the work function (the minimum energy to free an electron from the surface), and E_k(max) is the maximum kinetic energy of the emitted electron.', explain: 'Plotting E_k(max) against f gives a straight line whose GRADIENT is Planck\'s constant and whose x-intercept is the threshold frequency f₀ = φ/h. Exams frequently give you a graph and ask you to extract h and φ from it. Recognise the structure and it becomes a straightforward line-of-best-fit question.' },
    { q: 'Why are atomic energy levels discrete rather than continuous?', a: 'Because an electron in an atom behaves as a standing wave, and only whole numbers of wavelengths fit around the orbit, so only specific energies are allowed.', explain: 'This is why each element produces a unique line spectrum: the allowed energy differences are a fingerprint of that atom. A photon is emitted or absorbed only when its energy exactly matches a gap, ΔE = hf, which is what makes spectra sharp lines rather than continuous bands.' },
    { q: 'How do you calculate the wavelength of a photon emitted in an energy level transition?', a: 'Find ΔE between the levels, then use ΔE = hc/λ, so λ = hc/ΔE.', explain: 'Two traps: energy levels are usually tabulated in electronvolts, so convert to joules (×1.602×10⁻¹⁹) before substituting; and use the MAGNITUDE of ΔE, since a negative energy change simply indicates emission rather than a negative wavelength. A larger energy gap gives a shorter wavelength.' },
    { q: 'Why does fusion require extremely high temperatures?', a: 'Because both nuclei are positively charged and must overcome strong electrostatic repulsion to get close enough for the short-range strong nuclear force to bind them.', explain: 'High temperature means high kinetic energy, which lets nuclei approach despite the Coulomb barrier. This is why fusion happens naturally in stellar cores and is so difficult to sustain on Earth. You must confine an extremely hot plasma long enough for fusion to release more energy than the confinement consumes.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Modern physics deals in very small numbers and specific constants. Each symbol below appears on this page.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in modern physics', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'h <span class="xs">(Planck constant)</span>', def: '6.63 × 10⁻³⁴ J s. Links a photon’s energy to its frequency: E = hf.' },
          { term: 'f and λ', def: '<strong>Frequency</strong> (Hz) and <strong>wavelength</strong> (m) of the photon. Related by c = fλ, so E = hf = hc/λ.' },
          { term: 'φ <span class="xs">(phi: work function)</span>', def: 'The <strong>minimum energy</strong> needed to free an electron from a metal’s surface. A property of the METAL, not of the light.' },
          { term: 'E<sub>k(max)</sub>', def: 'The <strong>maximum kinetic energy</strong> of an emitted photoelectron: E<sub>k(max)</sub> = hf − φ.' },
          { term: 'eV <span class="xs">(electronvolt)</span>', def: 'An energy unit: the energy gained by one electron accelerated through 1 volt. <strong>1 eV = 1.602 × 10⁻¹⁹ J</strong>.', note: 'Energy levels are usually tabulated in eV, convert to joules before using E = hf.' },
          { term: 'Δm <span class="xs">(mass defect)</span>', def: 'The difference between a nucleus’s mass and the sum of its separate nucleons. Its energy equivalent is the binding energy, E = Δmc².' },
          { term: 't<sub>½</sub> <span class="xs">(half-life)</span>', def: 'The time for half the radioactive nuclei in a sample to decay.' },
          { term: 'Superscript before an element <span class="xs">(²³⁵U)</span>', def: 'The <strong>mass number</strong>, protons + neutrons, naming a specific isotope. Same convention as ¹³C in chemistry.' },
        ]},
        { t: 'tip', title: 'Converting eV to joules', html: 'Multiply by 1.602 × 10⁻¹⁹. Forgetting this is the most common error in photoelectric calculations. The answer comes out about 10¹⁹ times too big.' },
      ],
    },
    {
      id: 'photons', num: '1', title: 'Photons & the photoelectric effect',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Photon energy', eq: 'E = h f = h c / λ', tex: 'E=hf=\\frac{hc}{\\lambda}', note: 'h = 6.63×10⁻³⁴ J s. Light comes in quanta (photons).' },
          { name: 'Photoelectric equation', eq: 'h f = W + E<sub>k(max)</sub>', note: 'W = work function (minimum energy to release an electron).' },
          { name: 'Threshold frequency', eq: 'W = h f₀', note: 'Below f₀ no electrons are emitted, however bright the light.' },
          { name: 'Stopping voltage', eq: 'e V<sub>s</sub> = E<sub>k(max)</sub>', note: 'The p.d. that just stops the fastest photoelectrons.' },
        ]},
        { t: 'key', title: 'Why it needed photons', items: [
          'Emission depends on <strong>frequency</strong>, not intensity. Below f₀, nothing happens.',
          'Emission is <strong>instant</strong> above f₀, a wave model predicts a delay while energy builds up.',
          'Increasing intensity increases the <em>number</em> of electrons, not their maximum energy.',
          'These facts only make sense if light delivers energy in discrete photons (E = hf).',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Max kinetic energy', problem: 'Light of λ = 400 nm hits a metal with work function W = 2.0 eV. Find E_k(max) in eV. (hc = 1240 eV·nm)', steps: [
          'Photon energy: E = hc/λ = 1240/400 = 3.1 eV.',
          'E_k(max) = E − W = 3.1 − 2.0 = 1.1 eV.',
        ], answer: 'E_k(max) = 1.1 eV.' },
      ],
    },
    {
      id: 'spectra', num: '2', title: 'Atomic spectra & energy levels',
      blocks: [
        { t: 'p', html: `Electrons occupy discrete <strong>energy levels</strong>. A photon is emitted (or absorbed) when an electron drops (or jumps) between levels, with energy exactly equal to the gap.` },
        { t: 'formulas', items: [
          { name: 'Transition energy', eq: 'ΔE = E<sub>high</sub> − E<sub>low</sub> = h f', note: 'Gives a line spectrum: specific wavelengths only.' },
        ]},
        { t: 'key', title: 'Emission vs absorption', items: [
          '<strong>Emission:</strong> electron drops a level → photon emitted → bright line.',
          '<strong>Absorption:</strong> photon absorbed → electron jumps up → dark line in a continuous spectrum.',
          'Line spectra are a “fingerprint” unique to each element.',
        ]},
      ],
    },
    {
      id: 'nuclei', num: '3', title: 'Nuclei & mass–energy',
      blocks: [
        { t: 'connects', title: 'Related in other subjects', intro: 'Radioactive decay is one of the few places where physics and probability genuinely meet:', items: [
          { to: '#/topic/stat-91586', label: 'Statistics: Probability distributions (91586)',
            why: 'Radioactive decay is a RANDOM process: any individual nucleus has a fixed probability of decaying per unit time, and we cannot say which one will go next. Counts of decays in a fixed interval follow a Poisson distribution. The same model you use in Statistics for events at a constant average rate. The smooth exponential half-life curve only appears because you are averaging over enormous numbers of nuclei.' },
        ]},
        { t: 'formulas', items: [
          { name: 'Mass–energy equivalence', eq: 'E = m c²', note: 'c = 3.0×10⁸ m s⁻¹. A mass defect Δm releases energy Δm·c².' },
          { name: 'Binding energy', eq: 'E<sub>b</sub> = Δm c²', note: 'Energy to separate a nucleus into nucleons; from the mass defect.' },
          { name: 'Radioactive decay / half-life', eq: 'N = N₀ (½)^(t / t½)', tex: 'N=N_0\\left(\\tfrac12\\right)^{t/t_{1/2}}', note: 't½ = half-life; activity falls by half each half-life.' },
        ]},
        { t: 'key', title: 'Decay types', items: [
          '<strong>Alpha (α):</strong> emits a He nucleus (²⁄₄He); mass −4, charge −2.',
          '<strong>Beta (β⁻):</strong> a neutron → proton + electron; charge +1, mass ≈ same.',
          '<strong>Gamma (γ):</strong> high-energy photon; no change to Z or A, just energy released.',
          'Fusion (light nuclei join) and fission (heavy nuclei split) both release energy because the products are more tightly bound.',
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA, Physics L3 (91525) assessment resources', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91525', note: 'Internal assessment resources & exemplars', verify: true },
    { label: 'No Brain Too Small: Physics (Modern/Atomic)', url: 'https://www.nobraintoosmall.co.nz/html/senior_physics/NCEA3_physics.html', note: 'Photoelectric, spectra & nuclear questions', verified: true },
  ],

  quiz: [
    { type: 'mc', q: 'In the photoelectric effect, increasing the light intensity (same frequency) increases:', choices: ['The maximum KE of electrons', 'The number of electrons emitted', 'The threshold frequency', 'The work function'], answer: 1, explanation: 'Intensity = more photons per second → more electrons. Max KE depends only on frequency (E = hf − W).' },
    { type: 'sa', q: 'A photon has energy 3.1 eV; the work function is 2.0 eV. What is the maximum KE of the emitted electron (eV)?', accept: ['1.1'], answer: '1.1 eV', explanation: 'E_k(max) = hf − W = 3.1 − 2.0 = 1.1 eV.' },
    { type: 'mc', q: 'A line emission spectrum is produced when electrons:', choices: ['Are ejected from the metal', 'Drop from higher to lower energy levels', 'Move at constant speed', 'Are absorbed by the nucleus'], answer: 1, explanation: 'Electrons dropping between discrete energy levels emit photons of specific energies ΔE = hf, giving bright lines.' },

    { type: 'mc', q: 'Light below the threshold frequency shines on a metal with very high intensity. The result is:', choices: ['Electrons are emitted slowly', 'Many low-energy electrons are emitted', 'No electrons are emitted at all', 'Electrons are emitted after a delay'], answer: 2, explanation: 'Each electron absorbs a single photon. If that photon carries less than the work function, no emission occurs regardless of how many photons arrive. This threshold behaviour is precisely what wave theory could not explain and what the photon model does.' },
    { type: 'mc', q: 'A graph of maximum photoelectron kinetic energy against frequency has gradient equal to:', choices: ['The work function', 'Planck\'s constant', 'The threshold frequency', 'The speed of light'], answer: 1, explanation: 'From E_k = hf − φ, the equation is a straight line with gradient h and y-intercept −φ. The x-intercept gives the threshold frequency f₀ = φ/h, so a single graph yields all three quantities.' },
    { type: 'mc', q: 'Dark lines appear in the Sun\'s continuous spectrum at exactly the wavelengths that sodium emits in the lab. This shows that:', choices: ['The Sun contains no sodium', 'Sodium in the Sun\'s atmosphere absorbed those specific photons', 'Sodium emits only in the lab', 'The spectrum is faulty'], answer: 1, explanation: 'Absorption and emission occur at identical wavelengths because they involve the same energy level gaps. Cooler sodium in the Sun\'s outer atmosphere absorbs exactly those photons from the continuous spectrum beneath, leaving dark Fraunhofer lines, which is how stellar composition is determined.' },
    { type: 'mc', q: 'Both fission of uranium and fusion of hydrogen release energy because:', choices: ['Both split nuclei', 'Both produce nuclei with higher binding energy per nucleon, moving toward iron-56', 'Both create mass', 'Both require high temperature'], answer: 1, explanation: 'Iron-56 sits at the peak of the binding energy per nucleon curve. Heavy nuclei release energy by splitting toward it; light nuclei release energy by joining toward it. Reading that curve tells you which process is energetically favourable for any nucleus.' },
    { type: 'mc', q: 'A nucleus has less mass than the sum of its individual nucleons. This mass difference:', choices: ['Is a measurement error', 'Is the mass defect, equivalent to the binding energy via E = Δmc²', 'Means nucleons are compressed', 'Only occurs in unstable nuclei'], answer: 1, explanation: 'Energy was released when the nucleus formed, and that energy came from mass. Converting the defect with E = Δmc² gives the binding energy. The same energy you would have to supply to separate the nucleus completely.' },
    { type: 'sa', q: 'In the photoelectric equation, what does φ represent?', accept: ['work function', 'the work function'], answer: 'the work function', explanation: 'The minimum energy needed to remove an electron from that metal\'s surface. It is a property of the METAL, not of the light, which is why different metals have different threshold frequencies.' },
  ],
};

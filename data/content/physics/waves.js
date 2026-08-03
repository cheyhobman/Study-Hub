/* ============================================================================
   AS 91523 — Wave Systems (External, 4 credits) — "3.3"
   Superposition · standing waves · resonance · beats · Doppler · diffraction ·
   refraction · polarisation · the EM spectrum
   ========================================================================== */
export default {
  title: 'Wave Systems',
  tags: ['Interference', 'Standing waves', 'Doppler', 'Diffraction', 'Refraction'],
  intro: 'How waves add, reflect, bend and interfere. The maths is mostly a handful of formulas — the marks come from choosing the right one and reasoning about path differences, harmonics and relative motion.',

  flashcards: [
    { q: 'Write the wave equation', a: 'v = fλ', explain: 'speed = frequency × wavelength.' },
    { q: 'State the path-difference condition for constructive interference', a: 'nλ (a whole number of wavelengths)', explain: 'Destructive interference is (n + ½)λ.' },
    { q: 'State the distance between adjacent nodes in a standing wave, in terms of λ', a: '½λ', explain: 'Same spacing for adjacent antinodes.' },
    { q: 'Write the formula for beat frequency', a: '|f₁ − f₂|', explain: 'The number of loudness maxima heard per second.' },
    { q: 'Predict the change in observed frequency when a source approaches a stationary observer', a: 'higher observed frequency', explain: "Waves bunch up: f' = f·v/(v − v_s)." },
    { q: 'Write Snell’s law', a: 'n₁ sin θ₁ = n₂ sin θ₂', explain: 'Light bends toward the normal entering a denser medium.' },
    { q: 'State the condition for the critical angle, and write the formula', a: 'sin θc = n₂/n₁ (with n₁ > n₂)', explain: 'Beyond θc you get total internal reflection.' },
    { q: 'Polarisation is evidence that light is…', a: 'a transverse wave', explain: 'Longitudinal waves (like sound) cannot be polarised.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: constructive vs destructive interference conditions', a: '<strong>Constructive</strong>: path difference = nλ (a whole number of wavelengths). <strong>Destructive</strong>: path difference = (n + ½)λ.', explain: 'Waves arriving in phase reinforce; half a wavelength out of phase they cancel. Everything in two-source interference and thin-film problems reduces to computing the path difference and asking which condition it satisfies. Note the extra subtlety in reflection problems: a phase reversal on reflection off a denser medium swaps the two conditions over.' },
    { q: '⚖️ TELL THEM APART: standing wave nodes vs antinodes', a: '<strong>Node</strong> — a point of permanently ZERO displacement (destructive interference). <strong>Antinode</strong> — a point of MAXIMUM displacement.', explain: 'Adjacent nodes are λ/2 apart, and a node and its neighbouring antinode are λ/4 apart — those two spacings solve most harmonic problems. A closed end must be a node (the medium cannot move there); an open end must be an antinode.' },
    { q: '⚖️ TELL THEM APART: open pipe vs closed pipe harmonics', a: '<strong>Open at both ends</strong>: supports ALL harmonics, f₁ = v/2L. <strong>Closed at one end</strong>: supports only ODD harmonics, f₁ = v/4L.', explain: 'The reason is the boundary conditions: a closed pipe needs a node at the closed end and an antinode at the open end, so only quarter-wavelength odd multiples fit. This is why a closed pipe sounds an octave lower than an open pipe of the same length, and why its timbre differs — it is missing all the even overtones.' },
    { q: '⚖️ TELL THEM APART: Doppler effect for a moving SOURCE vs a moving OBSERVER', a: 'A moving <strong>source</strong> physically compresses or stretches the wavefronts, changing the wavelength. A moving <strong>observer</strong> encounters wavefronts at a different rate, changing the observed frequency without altering the wavelength in the medium.', explain: 'That is why the two formulas differ rather than being symmetric. Get the sign right by reasoning physically first: approaching always raises the observed frequency, receding always lowers it. Check your answer against that before trusting the algebra.' },
    { q: '⚖️ TELL THEM APART: beats vs interference in space', a: '<strong>Beats</strong> are interference in TIME between two slightly different frequencies, heard as a periodic loud–soft pulsing at f_beat = |f₁ − f₂|. Spatial interference gives a fixed pattern of loud and quiet POSITIONS.', explain: 'Beats are the standard tuning method: as two notes approach the same pitch, the beat frequency falls to zero. Note the beat frequency is the absolute DIFFERENCE, so 440 Hz against 444 Hz gives 4 beats per second regardless of which is higher.' },

    /* ---- reasoning depth ---- */
    { q: 'Why does a wave change direction when it enters a different medium?', a: 'Because its SPEED changes while its frequency stays the same, so the wavelength must change — and if it arrives at an angle, one side of the wavefront slows before the other, pivoting the wave.', explain: 'Frequency is fixed by the source and cannot change at a boundary, which is the fact students most often get wrong. Since v = fλ, a speed change forces a wavelength change. Slowing down bends the ray toward the normal; speeding up bends it away.' },
    { q: 'What causes total internal reflection, and what two conditions are required?', a: 'It occurs when light travelling from a denser to a less dense medium strikes the boundary at an angle greater than the critical angle. Both conditions are needed: going from high to low refractive index, AND exceeding the critical angle.', explain: 'From Snell\'s law, sin C = n₂/n₁. Beyond that angle there is no possible refracted ray, so all the light reflects. This is what makes optical fibres work — light bounces along the core with essentially no loss to the cladding.' },
    { q: 'Why does a narrower slit produce MORE diffraction?', a: 'Because diffraction depends on the ratio λ/w. Making the slit width w comparable to or smaller than the wavelength increases that ratio, spreading the wave more.', explain: 'This is why you can hear around a corner but not see around it: audible sound has wavelengths of order metres, comparable to a doorway, while visible light is under a micrometre and so barely spreads. Whenever a question asks about "more" or "less" diffraction, compare λ with the aperture size.' },
    { q: 'Derive why adjacent nodes are half a wavelength apart', a: 'A standing wave forms from two identical waves travelling in opposite directions. Points where they are permanently out of phase occur every half wavelength along the medium.', explain: 'This gives you the practical measurement method: measure the distance between several nodes and divide, rather than trying to measure one λ directly — averaging over several node spacings substantially reduces the percentage uncertainty, which is worth stating in a practical write-up.' },
    { q: 'How does resonance transfer energy so effectively?', a: 'When a driving frequency matches the system\'s natural frequency, each push adds energy in phase with the existing motion, so amplitude builds up cumulatively.', explain: 'The amplitude is limited only by damping — which is why lightly damped systems can reach destructive amplitudes. It also explains why an air column of the right length amplifies one particular tuning fork dramatically while ignoring others: only the matching frequency is reinforced.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Wave physics uses Greek letters for most of its quantities. Here is what each labels.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in waves', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'λ <span class="xs">(lambda)</span>', def: '<strong>Wavelength</strong> — the distance between two matching points on consecutive waves, in metres.' },
          { term: 'f', def: '<strong>Frequency</strong> — cycles per second, in hertz (Hz). f = 1/T.' },
          { term: 'T', def: '<strong>Period</strong> — seconds for one complete cycle. T = 1/f.' },
          { term: 'v', def: '<strong>Wave speed</strong>, in m s⁻¹. v = fλ.', note: 'Speed is set by the MEDIUM. Frequency is set by the source and never changes at a boundary.' },
          { term: 'n <span class="xs">(refractive index)</span>', def: 'How much a medium slows light: n = c/v. Larger n = slower = optically denser.', note: 'In harmonics, n means something else entirely — the harmonic number. Read the context.' },
          { term: 'θ <span class="xs">(theta)</span>', def: 'An <strong>angle</strong>, always measured from the NORMAL (the perpendicular), never from the surface.' },
          { term: 'θ<sub>c</sub>', def: 'The <strong>critical angle</strong> — beyond it, total internal reflection occurs. Only when going from dense to less dense.' },
          { term: 'Path difference', def: 'How much further one wave travelled than the other. <strong>nλ</strong> → constructive; <strong>(n + ½)λ</strong> → destructive.' },
          { term: 'Node / antinode', def: '<strong>Node</strong> = permanently zero displacement. <strong>Antinode</strong> = maximum displacement. Adjacent nodes are λ/2 apart.' },
        ]},
        { t: 'tip', title: 'What changes at a boundary', html: 'Frequency NEVER changes — it is fixed by the source. Speed changes because the medium changed, and wavelength follows from v = fλ.' },
      ],
    },
    {
      id: 'basics', num: '1', title: 'Wave basics & superposition',
      video: 'NCEA Level 3 physics wave systems interference standing waves',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Wave equation', eq: 'v = f λ', tex: 'v=f\\lambda', note: 'v = speed (m s⁻¹), f = frequency (Hz), λ = wavelength (m).' },
          { name: 'Period', eq: 'T = 1 / f', tex: 'T=\\frac{1}{f}' },
        ]},
        { t: 'p', html: `<strong>Superposition:</strong> when waves meet, displacements add. <strong>Constructive</strong> interference where they’re in phase (crest meets crest); <strong>destructive</strong> where out of phase (crest meets trough).` },
        { t: 'key', title: 'Path difference conditions', items: [
          '<strong>Constructive:</strong> path difference = <strong>n λ</strong> (whole number of wavelengths).',
          '<strong>Destructive:</strong> path difference = <strong>(n + ½) λ</strong>.',
          'Two sources must be <strong>coherent</strong> (constant phase relationship, same frequency) to give a stable interference pattern.',
        ]},
        { t: 'formulas', title: 'Two-source / double-slit interference', items: [
          { name: 'Bright fringes (maxima)', eq: 'd sin θ = n λ', note: 'd = slit separation, θ = angle to the fringe, n = order (0,1,2…).' },
          { name: 'Fringe spacing (small angles)', eq: 'x = λ L / d', tex: 'x=\\frac{\\lambda L}{d}', note: 'x = fringe separation on a screen distance L away.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Double-slit wavelength', problem: 'Slits 0.20 mm apart; the 3rd-order maximum is at θ = 0.90°. Find λ.', steps: [
          'd sin θ = n λ  →  λ = d sin θ / n.',
          'λ = (0.20×10⁻³ × sin0.90°) / 3 = (0.20×10⁻³ × 0.0157) / 3.',
          'λ = 1.05×10⁻⁶ m ≈ 1.0×10⁻⁶ m.',
        ], answer: 'λ ≈ 1.0 µm (infra-red-ish — check the source!).' },
      ],
    },
    {
      id: 'standing-waves', num: '2', title: 'Standing waves & resonance',
      blocks: [
        { t: 'p', html: `A <strong>standing wave</strong> forms when a wave interferes with its reflection: fixed <strong>nodes</strong> (zero displacement) and <strong>antinodes</strong> (maximum) that don’t travel. Resonance occurs at the natural frequencies (harmonics).` },
        { t: 'formulas', title: 'Strings & pipes', items: [
          { name: 'String / pipe open both ends', eq: 'f<sub>n</sub> = n v / 2L', tex: 'f_n=\\frac{nv}{2L}', note: 'n = 1,2,3… Fundamental at n=1. Both ends antinode (pipe) or node (string).' },
          { name: 'Pipe closed one end', eq: 'f<sub>n</sub> = n v / 4L', tex: 'f_n=\\frac{nv}{4L}', note: 'Only odd harmonics (n = 1,3,5…). Node at closed end, antinode at open end.' },
        ]},
        { t: 'key', title: 'Counting harmonics', items: [
          'Fundamental (1st harmonic): the simplest fit — string = one loop (½λ), open pipe = ½λ, closed pipe = ¼λ.',
          'Distance between adjacent nodes (or antinodes) = <strong>½ λ</strong>.',
          'Closed pipes are missing the even harmonics — a classic exam distinction.',
        ]},
        { t: 'p', html: `<strong>Beats:</strong> two slightly different frequencies produce a slow pulsing in loudness.` },
        { t: 'formulas', items: [
          { name: 'Beat frequency', eq: 'f<sub>beat</sub> = | f₁ − f₂ |', note: 'Number of loudness maxima per second.' },
        ]},
      ],
    },
    {
      id: 'doppler', num: '3', title: 'Doppler effect',
      blocks: [
        { t: 'p', html: `The observed frequency changes when source and observer move relative to each other: <strong>higher</strong> when approaching, <strong>lower</strong> when receding.` },
        { t: 'formulas', items: [
          { name: 'Doppler (general)', eq: "f' = f × (v ± v<sub>o</sub>) / (v ∓ v<sub>s</sub>)", note: 'v = speed of sound. Top signs = approaching. v_o = observer speed, v_s = source speed.' },
        ]},
        { t: 'key', title: 'Getting the signs right', items: [
          'Approaching (getting closer) ⟹ f′ is <strong>higher</strong> — pick signs to make the fraction bigger.',
          'Receding ⟹ f′ is <strong>lower</strong> — signs that make the fraction smaller.',
          'Observer term is on top; source term on the bottom.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Passing ambulance', problem: 'A siren (f = 800 Hz) approaches a stationary observer at v_s = 30 m s⁻¹. Speed of sound = 340 m s⁻¹. Find f′.', steps: [
          "Observer stationary (v_o = 0), source approaching → f' = f · v/(v − v_s).",
          "f' = 800 × 340 / (340 − 30) = 800 × 340/310.",
          "f' = 877 Hz.",
        ], answer: "f' ≈ 877 Hz (higher, as expected while approaching)." },
      ],
    },
    {
      id: 'diffraction-refraction', num: '4', title: 'Diffraction & refraction',
      blocks: [
        { t: 'formulas', title: 'Diffraction grating', items: [
          { name: 'Grating equation', eq: 'd sin θ = n λ', note: 'd = 1/(lines per metre). Sharper, brighter maxima than double slit.' },
        ]},
        { t: 'formulas', title: 'Refraction — Snell’s law', items: [
          { name: 'Snell’s law', eq: 'n₁ sin θ₁ = n₂ sin θ₂', note: 'n = refractive index. Light bends toward the normal entering a denser medium.' },
          { name: 'Refractive index', eq: 'n = c / v', tex: 'n=\\frac{c}{v}', note: 'c = speed of light in vacuum; v = speed in the medium.' },
          { name: 'Critical angle', eq: 'sin θ<sub>c</sub> = n₂ / n₁', tex: '\\sin\\theta_c=\\frac{n_2}{n_1}', note: 'Beyond θ_c: total internal reflection (n₁ > n₂).' },
        ]},
        { t: 'p', html: `<strong>Polarisation</strong> restricts wave oscillations to one plane — evidence that light is a <em>transverse</em> wave (longitudinal waves like sound can’t be polarised). Crossed polarisers block all light.` },
        { t: 'note', title: 'EM spectrum (long → short λ)', html: 'radio → microwave → infra-red → visible (red→violet) → ultraviolet → X-ray → gamma. All travel at c in a vacuum; higher frequency = higher energy (E = hf).' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Physics L3 (91523) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91523&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'No Brain Too Small — Physics (Waves)', url: 'https://www.nobraintoosmall.co.nz/html/senior_physics/NCEA3_physics.html', note: 'Wave questions collated by topic with answers', verified: true },
  ],

  quiz: [
    { type: 'mc', q: 'For constructive interference, the path difference between two coherent sources must be:', choices: ['(n + ½)λ', 'nλ', 'λ/4', 'Any value'], answer: 1, explanation: 'Whole-number wavelengths (nλ) arrive in phase → constructive. Half-integer wavelengths give destructive.' },
    { type: 'mc', q: 'A pipe closed at one end produces which harmonics?', choices: ['All harmonics', 'Only even harmonics', 'Only odd harmonics', 'No harmonics'], answer: 2, explanation: 'A closed pipe (node at closed end, antinode at open end) supports only odd harmonics: f_n = nv/4L, n = 1,3,5…' },
    { type: 'sa', q: 'A 512 Hz and a 516 Hz tuning fork are sounded together. What beat frequency is heard (Hz)?', accept: ['4'], answer: '4 Hz', explanation: 'f_beat = |f₁ − f₂| = |516 − 512| = 4 Hz.' },
    { type: 'mc', q: 'As a sound source moves toward a stationary observer, the observed frequency:', choices: ['Decreases', 'Increases', 'Stays the same', 'Becomes zero'], answer: 1, explanation: 'Approaching source → waves bunch up → higher observed frequency (Doppler effect).' },
    { type: 'mc', q: 'Light can be polarised. This shows light is:', choices: ['A longitudinal wave', 'A transverse wave', 'A sound wave', 'Not a wave'], answer: 1, explanation: 'Only transverse waves can be polarised (oscillations perpendicular to travel). Longitudinal waves cannot.' },

    { type: 'mc', q: 'Two speakers emit identical sound waves. At a point 1.5 wavelengths from one and 2.0 wavelengths from the other, a listener hears:', choices: ['A loud sound (constructive)', 'A quiet sound (destructive)', 'Nothing at all', 'A beat'], answer: 1, explanation: 'The path difference is 0.5λ, which fits the destructive condition (n + ½)λ with n = 0. The waves arrive exactly out of phase and cancel. Constructive interference needs a whole number of wavelengths.' },
    { type: 'mc', q: 'A pipe closed at one end has fundamental frequency 100 Hz. The next frequency it can produce is:', choices: ['200 Hz', '300 Hz', '150 Hz', '400 Hz'], answer: 1, explanation: 'A closed pipe supports only ODD harmonics, so after f₁ = 100 Hz comes the third harmonic at 300 Hz — the second harmonic cannot exist because it would require an antinode at the closed end. An open pipe would give 200 Hz next.' },
    { type: 'mc', q: 'Light passes from glass into air and bends AWAY from the normal. If the angle of incidence is increased past the critical angle:', choices: ['It bends further away', 'Total internal reflection occurs — no light escapes', 'It travels along the normal', 'It splits into colours'], answer: 1, explanation: 'Beyond the critical angle there is no mathematically possible refracted ray, so all light reflects back into the glass. This requires travelling from denser to less dense — total internal reflection can never happen going from air into glass.' },
    { type: 'mc', q: 'A 440 Hz tuning fork sounded with a slightly mistuned string produces 3 beats per second. The string\'s frequency is:', choices: ['443 Hz only', '437 Hz only', 'Either 437 or 443 Hz', '3 Hz'], answer: 2, explanation: 'Beat frequency is the absolute difference |f₁ − f₂|, so it cannot tell you which note is higher. To resolve the ambiguity, slightly change one frequency: if the beats slow, you moved toward the other note.' },
    { type: 'mc', q: 'You can hear around a corner but not see around it because:', choices: ['Sound travels faster', 'Sound wavelengths are comparable to the doorway width, so they diffract strongly', 'Light is absorbed by walls', 'Sound is louder'], answer: 1, explanation: 'Diffraction depends on λ relative to the aperture. Audible sound has wavelengths of order metres — similar to a doorway — so it spreads substantially. Visible light is under a micrometre, so the ratio is tiny and it travels essentially straight.' },
    { type: 'mc', q: 'A wave enters a medium where it travels more slowly. Which quantity is UNCHANGED?', choices: ['Wavelength', 'Speed', 'Frequency', 'Direction'], answer: 2, explanation: 'Frequency is set by the source and cannot change at a boundary. Since v = fλ, a reduced speed means a proportionally reduced wavelength. This is the single most common misconception in refraction questions.' },
    { type: 'sa', q: 'What is the distance between adjacent NODES in a standing wave, in terms of λ?', accept: ['0.5', 'half', 'lambda/2', 'l/2', '0.5 lambda', 'half a wavelength', 'λ/2'], answer: 'λ/2', explanation: 'A node and its neighbouring antinode are λ/4 apart. Measure across several node spacings and divide, rather than measuring one — averaging reduces the percentage uncertainty considerably.' },
  ],
};

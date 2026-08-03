/* ============================================================================
   AS 91524 — Mechanical Systems (External, 6 credits) — "3.4"
   Circular motion · rotational dynamics · SHM (+ derivations) · gravitation &
   orbital mechanics (+ the T² = 4π²R³/G(m₁+m₂) derivation)
   ========================================================================== */
export default {
  title: 'Mechanical Systems',
  tags: ['Circular motion', 'Rotation', 'SHM', 'Gravitation', 'Derivations'],
  intro: 'The biggest physics external (6 credits). Circular and rotational motion, simple harmonic motion, and gravitation/orbits — with the “show that” derivations examiners love. Learn the derivations, not just the results.',

  flashcards: [
    { q: 'Write the formula for centripetal force', a: 'F = mv²/r = mω²r', explain: 'The net inward force — provided by tension, gravity, friction, etc.' },
    { q: 'State the defining relation of simple harmonic motion', a: 'a = −ω²x', explain: 'Acceleration ∝ displacement, directed back toward equilibrium.' },
    { q: 'Write the formula for the period of a mass on a spring', a: 'T = 2π√(m/k)', explain: 'Independent of amplitude.' },
    { q: 'Write the formula for the period of a simple pendulum', a: 'T = 2π√(L/g)', explain: 'Small angles only; independent of the bob’s mass.' },
    { q: 'State the principle of conservation of angular momentum', a: 'I₁ω₁ = I₂ω₂ (no external torque)', explain: 'Skater pulls arms in → I decreases → ω increases.' },
    { q: 'Write Kepler’s third law as derived from circular orbital motion', a: 'T² = 4π²r³/GM', explain: 'From setting gravity equal to the centripetal force.' },
    { q: 'Write the formula for maximum speed in SHM', a: 'v_max = ωA', explain: 'Reached at equilibrium; generally v = ±ω√(A² − x²).' },
    { q: 'Write Newton’s law of universal gravitation', a: 'F = Gm₁m₂/r²', explain: 'G = 6.67×10⁻¹¹ N m² kg⁻².' },
    { q: 'Write the formula for torque', a: 'τ = Fr = Iα', explain: 'The rotational analogue of F = ma.' },
    { q: 'Write the formula for the orbital speed of a satellite', a: 'v = √(GM/r)', explain: 'Gravity provides the centripetal force.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: centripetal force vs "centrifugal force"', a: 'Centripetal force is the REAL net force acting toward the centre of a circular path. "Centrifugal force" is not a real force — it is the sensation of your own inertia in a rotating frame.', explain: 'Always identify which real force is PROVIDING the centripetal force: tension for a ball on a string, friction for a car cornering, gravity for an orbit, the normal force component on a banked track. Writing "centripetal force" as an extra arrow on a free-body diagram is a classic error — it IS the net force, not an additional one.' },
    { q: '⚖️ TELL THEM APART: momentum vs kinetic energy in a collision', a: 'Momentum (p = mv) is conserved in ALL collisions. Kinetic energy is conserved only in ELASTIC collisions.', explain: 'That difference is the entire basis of collision problems. Momentum is a vector, so direction and signs matter; kinetic energy is a scalar and depends on v². In an inelastic collision the "lost" kinetic energy becomes heat, sound and deformation — it is not lost from the universe, just from the mechanical account.' },
    { q: '⚖️ TELL THEM APART: rotational inertia vs mass', a: 'Mass measures resistance to linear acceleration. <strong>Rotational inertia</strong> (I) measures resistance to angular acceleration and depends on both the mass AND how far that mass sits from the axis.', explain: 'This is why an ice skater spins faster when they pull their arms in: mass is unchanged, but moving it closer to the axis lowers I, and since angular momentum L = Iω is conserved, ω must rise. Same mass, different I, different behaviour.' },
    { q: '⚖️ TELL THEM APART: SHM period dependence — pendulum vs mass-spring', a: 'Pendulum: T = 2π√(L/g) — depends on length and gravity, NOT on mass. Mass-spring: T = 2π√(m/k) — depends on mass and spring constant, NOT on gravity.', explain: 'Exams test this by asking what happens on the Moon: a pendulum swings more slowly (smaller g), while a mass-spring oscillator is completely unaffected. Amplitude changes neither period, provided the oscillation stays simple harmonic.' },

    /* ---- reasoning depth ---- */
    { q: 'What are the two defining conditions for simple harmonic motion?', a: 'The restoring force is proportional to the displacement from equilibrium, and it always acts TOWARD equilibrium: F = −kx.', explain: 'The minus sign carries the second condition. Because a = F/m = −(k/m)x, acceleration is maximum at maximum displacement (where velocity is zero) and zero at equilibrium (where velocity is greatest). Sketching those phase relationships is worth easy marks and prevents sign errors later.' },
    { q: 'Why is total energy constant in SHM, and how does it move between forms?', a: 'With no damping, energy shuttles between kinetic and potential: all potential at maximum displacement, all kinetic at equilibrium, with the sum constant throughout.', explain: 'Because energy goes as x² and v², the energy graph oscillates at TWICE the frequency of the displacement graph — a detail worth knowing. Damping removes mechanical energy to heat, shrinking amplitude while leaving the period essentially unchanged for light damping.' },
    { q: 'Explain why a satellite in a stable circular orbit is accelerating despite constant speed', a: 'Because velocity is a vector: its direction changes continuously, so there is an acceleration directed toward the centre even though the magnitude of velocity is unchanged.', explain: 'Gravity provides that centripetal acceleration, which is why the satellite falls continuously toward Earth without ever getting closer — it is in free fall on a curved path. This also explains apparent weightlessness: astronaut and station accelerate together, so there is no contact force between them.' },
    { q: 'Why does angular momentum conservation explain a skater\'s spin-up?', a: 'With negligible external torque, L = Iω is constant. Pulling the arms in reduces rotational inertia I, so angular velocity ω must increase to keep the product constant.', explain: 'The energy is not conserved here — the skater does work pulling their arms inward against the rotation, which is exactly where the extra kinetic energy comes from. Being able to say which quantity is conserved and which is not is the Excellence-level distinction.' },
    { q: 'How do you decide whether a collision is elastic, inelastic or perfectly inelastic?', a: 'Compare total kinetic energy before and after. Equal → elastic. Reduced → inelastic. Objects stick together and move as one → perfectly inelastic (maximum KE loss consistent with momentum conservation).', explain: 'Always apply momentum conservation FIRST to find the unknown velocity, then compute kinetic energies to classify. Trying to assume elasticity before checking is the most common route to a wrong answer.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Physics uses Greek letters as standard variable names. Each is just a label — but you have to know which quantity it labels.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in mechanics', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'ω <span class="xs">(omega)</span>', def: '<strong>Angular velocity</strong> — how fast something rotates, in radians per second. ω = 2π/T = 2πf.', note: 'Not to be confused with w for weight. Angular quantities use Greek letters; linear ones use Roman.' },
          { term: 'θ <span class="xs">(theta)</span>', def: '<strong>Angular displacement</strong> — an angle, in radians.' },
          { term: 'α <span class="xs">(alpha)</span>', def: '<strong>Angular acceleration</strong> — the rate of change of ω, in rad s⁻².' },
          { term: 'τ <span class="xs">(tau)</span>', def: '<strong>Torque</strong> — the rotational equivalent of force. τ = Fr = Iα.' },
          { term: 'I <span class="xs">(capital I)</span>', def: '<strong>Rotational inertia</strong> (moment of inertia) — resistance to angular acceleration. Depends on mass AND how far that mass sits from the axis.', note: 'In electricity the same letter means current. Context tells you which.' },
          { term: 'L', def: '<strong>Angular momentum</strong>, L = Iω. Conserved when there is no external torque.' },
          { term: 'T <span class="xs">(period)</span>', def: 'The <strong>time for one complete cycle</strong>, in seconds. T = 1/f.', note: 'Also used for tension and for temperature elsewhere — read the context.' },
          { term: 'f <span class="xs">(frequency)</span>', def: 'Cycles per second, in hertz (Hz). f = 1/T.' },
          { term: 'A <span class="xs">(amplitude)</span>', def: 'The maximum displacement from equilibrium in an oscillation.' },
          { term: 'rad s⁻¹', def: 'Radians per second. The ⁻¹ means “per”, so this is “radians per second”.' },
        ]},
        { t: 'tip', title: 'Linear vs rotational', html: 'Every linear quantity has a rotational twin: x→θ, v→ω, a→α, m→I, F→τ, p→L. The equations have identical shapes, so learning one set gives you the other.' },
      ],
    },
    {
      id: 'circular', num: '1', title: 'Circular motion',
      video: 'NCEA Level 3 physics circular motion SHM gravitation derivations',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Angular velocity', eq: 'ω = 2π / T = 2π f   ·   v = r ω', tex: '\\omega=\\frac{2\\pi}{T}=2\\pi f\\qquad v=r\\omega', note: 'ω in rad s⁻¹; v is the tangential (linear) speed.' },
          { name: 'Centripetal acceleration', eq: 'a<sub>c</sub> = v² / r = ω² r', tex: 'a_c=\\frac{v^2}{r}=\\omega^2 r', note: 'Directed toward the centre.' },
          { name: 'Centripetal force', eq: 'F<sub>c</sub> = m v² / r = m ω² r', tex: 'F_c=\\frac{mv^2}{r}=m\\omega^2 r', note: 'The net inward force — provided by tension, gravity, friction, etc.' },
        ]},
        { t: 'key', title: 'Key idea', items: [
          'Centripetal force is a <em>net</em> force, not a new kind of force — always identify what physically provides it.',
          'Speed is constant in uniform circular motion, but velocity changes (direction), so there IS acceleration.',
          'At the top of a vertical circle, minimum speed is when gravity alone supplies F_c: v<sub>min</sub> = √(gr).',
        ]},
      ],
    },
    {
      id: 'rotation', num: '2', title: 'Rotational dynamics',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Torque', eq: 'τ = F r (perpendicular)  ·  τ = I α', note: 'The rotational analogue of F = ma. α = angular acceleration.' },
          { name: 'Rotational kinematics', eq: 'ω = ω₀ + α t  ·  θ = ω₀t + ½αt²  ·  ω² = ω₀² + 2αθ', note: 'Same shape as linear SUVAT.' },
          { name: 'Angular momentum', eq: 'L = I ω', note: 'Conserved when no external torque acts.' },
          { name: 'Rotational KE', eq: 'E<sub>k(rot)</sub> = ½ I ω²' },
        ]},
        { t: 'key', title: 'Conservation of angular momentum', items: [
          'With no external torque, <strong>I₁ω₁ = I₂ω₂</strong>.',
          'Ice skater pulls arms in → I decreases → ω increases (spins faster). Classic exam scenario.',
          'A rolling object shares energy between translation (½mv²) and rotation (½Iω²).',
        ]},
      ],
    },
    {
      id: 'shm', num: '3', title: 'Simple harmonic motion (SHM)',
      intro: 'SHM is motion where the restoring force (and so acceleration) is proportional to displacement and directed back toward equilibrium: a = −ω²x.',
      blocks: [
        { t: 'connects', title: '🔗 Related in other subjects', intro: 'SHM is genuinely a calculus problem wearing a physics costume:', items: [
          { to: '#/topic/calc-91578', label: 'Calculus — Differentiation methods (91578)',
            why: 'a = −ω²x is a statement about DERIVATIVES: acceleration is the second derivative of displacement, so SHM is really the differential equation d²x/dt² = −ω²x. When you differentiate x = A cos(ωt) twice using the chain rule, you get −ω²A cos(ωt) = −ω²x — which is exactly why cosine describes SHM. The chain rule you practise in Calculus is the tool that proves the Physics.' },
          { to: '#/topic/calc-91579', label: 'Calculus — Integration methods (91579)',
            why: 'Going the other way, integrating acceleration gives velocity and integrating again gives displacement. That is also how the energy result E = ½kA² is derived — by integrating the restoring force F = −kx over displacement (work done = ∫F dx).' },
        ]},
        { t: 'formulas', items: [
          { name: 'Defining relation', eq: 'a = −ω² x', note: 'The negative sign = restoring (opposes displacement).' },
          { name: 'Displacement / velocity', eq: 'x = A cos(ωt)  ·  v = ±ω√(A² − x²)  ·  v<sub>max</sub> = ωA', note: 'A = amplitude. v is max at equilibrium, zero at the extremes.' },
          { name: 'Spring period', eq: 'T = 2π √(m / k)', tex: 'T=2\\pi\\sqrt{\\frac{m}{k}}', note: 'k = spring constant. Independent of amplitude.' },
          { name: 'Simple pendulum period', eq: 'T = 2π √(L / g)', tex: 'T=2\\pi\\sqrt{\\frac{L}{g}}', note: 'Small angles only. Independent of mass.' },
          { name: 'Energy in SHM', eq: 'E<sub>total</sub> = ½ k A² = ½mv² + ½kx²', note: 'Energy swaps between kinetic and potential; total is constant.' },
        ]},
        { t: 'example', tag: 'Derivation', title: 'Show that a mass on a spring gives T = 2π√(m/k)', problem: 'Derive the period of a mass m on a spring of constant k.', steps: [
          'Restoring force (Hooke): F = −kx.',
          'Newton’s 2nd law: ma = −kx  ⟹  a = −(k/m) x.',
          'Compare with SHM a = −ω²x  ⟹  ω² = k/m, so ω = √(k/m).',
          'T = 2π/ω = 2π√(m/k).  ∎',
        ], answer: 'T = 2π√(m/k) — note it’s independent of amplitude.' },
        { t: 'example', tag: 'Derivation', title: 'Show that a simple pendulum gives T = 2π√(L/g)', problem: 'Derive the period of a pendulum of length L for small swings.', steps: [
          'Restoring force along the arc: F = −mg sinθ. For small θ, sinθ ≈ θ = x/L.',
          'So F ≈ −mg(x/L). Newton: ma = −(mg/L)x ⟹ a = −(g/L)x.',
          'Compare a = −ω²x ⟹ ω² = g/L.',
          'T = 2π/ω = 2π√(L/g).  ∎',
        ], answer: 'T = 2π√(L/g) — independent of the bob’s mass; only valid for small angles.' },
        { t: 'example', tag: 'Derivation', title: 'Bifilar suspension (torsional SHM)', problem: 'A uniform bar (moment of inertia I, mass m) hangs from two vertical threads length L, separation d. Show the torsional period.', steps: [
          'Twist the bar by small angle θ about the vertical axis. Each thread tilts by φ, where the attachment moves (d/2)θ = Lφ ⟹ φ = dθ/2L.',
          'Each thread tension ≈ mg/2; its horizontal restoring component ≈ (mg/2)φ, acting at radius d/2.',
          'Restoring torque (two threads): τ = −2 · (mg/2)φ · (d/2) = −(mgd²/4L) θ.',
          'Iα = τ ⟹ ω² = mgd² / (4LI), so T = 2π√(4LI / (mgd²)) = (4π/d)√(LI/(mg)).  ∎',
        ], answer: 'T = (4π/d)√(LI/(mg)). Used to measure I (or g): T ∝ √L and T ∝ 1/d.' },
      ],
    },
    {
      id: 'gravitation', num: '4', title: 'Gravitation & orbital mechanics',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Newton’s law of gravitation', eq: 'F = G m₁ m₂ / r²', tex: 'F=\\frac{Gm_1m_2}{r^2}', note: 'G = 6.67×10⁻¹¹ N m² kg⁻². Attractive, along the line joining centres.' },
          { name: 'Gravitational field strength', eq: 'g = G M / r²', tex: 'g=\\frac{GM}{r^2}', note: 'Acceleration due to gravity at distance r from mass M.' },
          { name: 'Orbital speed', eq: 'v = √(G M / r)', tex: 'v=\\sqrt{\\frac{GM}{r}}', note: 'For a circular orbit — gravity provides the centripetal force.' },
          { name: 'Kepler’s 3rd (period)', eq: 'T² = 4π² r³ / G(m₁ + m₂)', tex: 'T^2=\\frac{4\\pi^2 r^3}{G(m_1+m_2)}', note: 'For m₂ ≪ M this reduces to T² = 4π²r³/GM.' },
        ]},
        { t: 'example', tag: 'Derivation', title: 'Show that T² = 4π²R³ / G(m₁ + m₂)', problem: 'A body orbits in a circle of radius R. Derive its period from gravity = centripetal force.', steps: [
          'Gravity provides the centripetal force: G m₁ m₂ / R² = m₂ · (4π²R / T²).',
          '(using centripetal a = ω²R = (2π/T)²R = 4π²R/T²).',
          'Cancel m₂ and rearrange: G m₁ / R² = 4π²R / T².',
          'T² = 4π²R³ / (G m₁).  For two comparable masses (relative to the centre of mass) this generalises to  T² = 4π²R³ / G(m₁ + m₂).  ∎',
        ], answer: 'T² = 4π²R³ / G(m₁ + m₂). This is Kepler’s third law from Newtonian gravity.' },
        { t: 'example', tag: 'Worked example', title: 'Geostationary orbit radius', problem: 'Find the orbital radius for a satellite with T = 24 h around Earth (M = 6.0×10²⁴ kg).', steps: [
          'T = 24 h = 86 400 s. Use T² = 4π²R³/GM ⟹ R³ = GMT²/4π².',
          'R³ = (6.67×10⁻¹¹ × 6.0×10²⁴ × 86400²) / (4π²).',
          'R³ = (6.67×10⁻¹¹ × 6.0×10²⁴ × 7.46×10⁹) / 39.5 ≈ 7.57×10²².',
          'R = (7.57×10²²)^(1/3) ≈ 4.23×10⁷ m.',
        ], answer: 'R ≈ 4.2×10⁷ m (about 42 000 km from Earth’s centre).' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Physics L3 (91524) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91524&view=exams', note: 'Official exams + schedules (lots of “show that” questions)', verify: true },
    { label: 'No Brain Too Small — Physics (Mechanics/SHM)', url: 'https://www.nobraintoosmall.co.nz/html/senior_physics/NCEA3_physics.html', note: 'Circular motion, rotation, SHM & gravity by topic', verified: true },
  ],

  quiz: [
    { type: 'mc', q: 'For SHM, the acceleration is:', choices: ['Constant', 'Proportional to displacement and toward equilibrium', 'Proportional to displacement and away from equilibrium', 'Zero'], answer: 1, explanation: 'SHM is defined by a = −ω²x: acceleration ∝ displacement, directed back toward equilibrium (the minus sign).' },
    { type: 'mc', q: 'An ice skater pulls her arms in while spinning. Her angular velocity:', choices: ['Decreases', 'Increases', 'Stays the same', 'Becomes zero'], answer: 1, explanation: 'Angular momentum L = Iω is conserved (no external torque). Reducing I increases ω — she spins faster.' },
    { type: 'sa', q: 'A pendulum has period 2.0 s. If its length is quadrupled, what is the new period (s)? (T ∝ √L)', accept: ['4', '4.0'], answer: '4.0 s', explanation: 'T ∝ √L, so ×4 length → ×2 period → 2.0 s becomes 4.0 s.' },
    { type: 'mc', q: 'In deriving T² = 4π²R³/GM, gravity is set equal to:', choices: ['The weight mg', 'The centripetal force mω²R', 'The normal force', 'Zero'], answer: 1, explanation: 'Gravitational force supplies the centripetal force: GMm/R² = mω²R = m·4π²R/T², which rearranges to Kepler’s third law.' },
    { type: 'mc', q: 'The centripetal force on a car rounding a flat bend is provided by:', choices: ['Gravity', 'The engine', 'Friction between tyres and road', 'Air resistance'], answer: 2, explanation: 'On a flat road, static friction between tyres and road supplies the inward (centripetal) force.' },

    { type: 'mc', q: 'A car corners at constant speed on a flat road. The centripetal force is provided by:', choices: ['The engine', 'Friction between tyres and road, acting toward the centre', 'Centrifugal force outward', 'The normal force'], answer: 1, explanation: 'Something real must supply the inward force, and on a flat road that is sideways friction. When friction is insufficient the car cannot turn tightly enough and slides outward — which is exactly why a wet road reduces the maximum safe cornering speed.' },
    { type: 'mc', q: 'Two trolleys collide and stick together. Which statement is correct?', choices: ['Both momentum and kinetic energy are conserved', 'Momentum is conserved; kinetic energy is not', 'Kinetic energy is conserved; momentum is not', 'Neither is conserved'], answer: 1, explanation: 'Momentum is conserved in every collision with no external force. Sticking together makes it perfectly inelastic, so the maximum possible kinetic energy consistent with momentum conservation is converted to heat, sound and deformation.' },
    { type: 'mc', q: 'A pendulum clock accurate on Earth is taken to the Moon, where g is smaller. It will:', choices: ['Run fast, because the period decreases', 'Run slow, because T = 2π√(L/g) increases as g decreases', 'Keep the same time, because mass is unchanged', 'Stop oscillating'], answer: 1, explanation: 'A smaller g gives a longer period, so each swing takes more time and the clock loses time. Note that a MASS-SPRING oscillator would be unaffected, since T = 2π√(m/k) contains no g at all.' },
    { type: 'mc', q: 'In SHM, acceleration is at a maximum when the object is:', choices: ['At the equilibrium position', 'At maximum displacement', 'Moving fastest', 'Halfway to the amplitude'], answer: 1, explanation: 'Since a = −(k/m)x, acceleration is proportional to displacement. At maximum displacement the restoring force is greatest and velocity is momentarily zero; at equilibrium the force is zero and velocity is greatest. These are exactly out of phase.' },
    { type: 'mc', q: 'A skater pulls their arms in while spinning and speeds up. During this:', choices: ['Angular momentum increases', 'Angular momentum is conserved and rotational kinetic energy increases', 'Both angular momentum and kinetic energy are conserved', 'Rotational inertia increases'], answer: 1, explanation: 'With no external torque, L = Iω stays constant, so reducing I raises ω. Kinetic energy (½Iω²) INCREASES because the skater does work pulling their arms in against the rotation — conservation of angular momentum does not imply conservation of energy.' },
    { type: 'sa', q: 'What quantity is conserved in ALL collisions, elastic or not?', accept: ['momentum', 'linear momentum', 'p'], answer: 'momentum', explanation: 'Kinetic energy is only conserved in elastic collisions. Solve using momentum first — it is a vector, so assign signs by direction before you substitute.' },
  ],
};

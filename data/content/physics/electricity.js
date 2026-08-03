/* ============================================================================
   AS 91526 — Electrical Systems (External, 6 credits) — "3.6"
   DC circuits · capacitors (combinations, charging, energy) · inductors ·
   AC theory (RMS, reactance, impedance, resonance)
   ========================================================================== */
export default {
  title: 'Electrical Systems',
  tags: ['DC circuits', 'Capacitors', 'Inductors', 'AC', 'Reactance'],
  intro: 'DC and AC circuits with capacitors and inductors. Watch the combination rules (they’re opposite for capacitors vs resistors), the exponential charging behaviour, and the AC reactance/RMS relationships.',

  flashcards: [
    { q: 'Capacitors in parallel combine how?', a: 'They ADD: C = C₁ + C₂ + …', explain: 'Opposite to the resistor rule.' },
    { q: 'Capacitors in series combine how?', a: '1/C = 1/C₁ + 1/C₂ + … (smaller total)', explain: 'Like resistors in parallel.' },
    { q: 'Write the formula for the energy stored in a capacitor', a: 'E = ½CV² = ½QV', explain: 'Three equivalent forms (also Q²/2C).' },
    { q: 'Write the formula for the RC time constant', a: 'τ = RC', explain: '~63% charged (or fallen to 37%) after one time constant.' },
    { q: 'Write the formula for capacitive reactance', a: 'Xc = 1/(2πfC)', explain: 'Falls as frequency rises — capacitors pass high frequencies.' },
    { q: 'Write the formula for inductive reactance', a: 'XL = 2πfL', explain: 'Rises with frequency — inductors block high frequencies.' },
    { q: 'Write the formula relating RMS voltage to peak voltage', a: 'Vrms = Vpeak/√2', explain: 'NZ mains is 230 V rms ≈ 325 V peak.' },
    { q: 'Write the formula for the resonant frequency of an RLC circuit', a: 'f₀ = 1/(2π√(LC))', explain: 'XL = Xc, impedance is minimum (just R), current peaks.' },
    { q: '“ELI the ICE man” means…', a: 'In an inductor E leads I; in a capacitor I leads E', explain: 'The 90° phase relationships in AC.' },
    { q: 'Write the formula for the EMF induced in an inductor', a: 'ε = −L(ΔI/Δt)', explain: 'Opposes the change in current (Lenz’s law).' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: EMF vs terminal voltage', a: '<strong>EMF</strong> (ε) is the total energy per coulomb the source supplies. <strong>Terminal voltage</strong> is what actually appears across the terminals: V = ε − Ir, reduced by the drop across internal resistance.', explain: 'They are only equal when no current flows (an open circuit), which is why a voltmeter across an unloaded battery reads the EMF. Terminal voltage falls as current rises — that is why headlights dim when you start a car: the huge starter current makes Ir large.' },
    { q: '⚖️ TELL THEM APART: series vs parallel behaviour', a: '<strong>Series</strong>: same CURRENT everywhere, voltages add, resistances add. <strong>Parallel</strong>: same VOLTAGE across each branch, currents add, reciprocals of resistance add.', explain: 'Get in the habit of asking "what is shared here?" — that single question decides which rules apply. Note that adding a resistor in parallel always DECREASES total resistance, because you have added another path for current, which feels counterintuitive until you think of it as widening the road.' },
    { q: '⚖️ TELL THEM APART: capacitive vs inductive reactance', a: '<strong>X_C = 1/(2πfC)</strong> — falls as frequency rises, so a capacitor blocks DC and passes high frequencies. <strong>X_L = 2πfL</strong> — rises with frequency, so an inductor passes DC and blocks high frequencies.', explain: 'They behave oppositely, which is exactly why they are combined to make filters and tuned circuits. In an LC circuit, resonance occurs where X_C = X_L, and solving that equality gives the resonant frequency — a standard exam derivation.' },
    { q: '⚖️ TELL THEM APART: what leads and what lags in AC circuits', a: 'In a <strong>capacitor</strong>, current LEADS voltage by 90°. In an <strong>inductor</strong>, current LAGS voltage by 90°. In a pure resistor they are in phase.', explain: 'The mnemonic is CIVIL: in a Capacitor, I leads V; V leads I in an inductor (L). The physical reason is that a capacitor must have current flow before charge (and hence voltage) accumulates, while an inductor opposes any change in current, so current lags behind the applied voltage.' },

    /* ---- reasoning depth ---- */
    { q: 'Why does adding a resistor in PARALLEL decrease total resistance?', a: 'Because it provides an additional path for current, so more total current flows for the same voltage — and R = V/I means a larger current at fixed voltage is a smaller resistance.', explain: 'The road analogy makes it intuitive: adding a second lane lets more traffic through for the same pressure. Use it as a sanity check — the total parallel resistance is always LESS than the smallest individual resistor, so if your answer is bigger, you have inverted something.' },
    { q: 'Explain what happens to a capacitor during charging', a: 'Current is greatest at the instant of connection and decays exponentially, while the voltage across the capacitor rises exponentially toward the supply voltage. After one time constant τ = RC, it reaches about 63% of the final voltage.', explain: 'The current falls because the growing capacitor voltage increasingly opposes the supply, reducing the net driving voltage. After about 5τ the capacitor is effectively fully charged. Recognising that the current graph and voltage graph are mirror images of each other prevents a lot of sketching errors.' },
    { q: 'Why does an inductor oppose CHANGES in current rather than current itself?', a: 'Because a changing current changes the magnetic flux through the coil, which by Faraday\'s law induces an EMF, and by Lenz\'s law that EMF opposes the change producing it.', explain: 'Hence a steady DC current flows freely once established — no change means no induced EMF. But switching an inductive circuit off produces a very rapid change in current and so a large back-EMF, which is why sparks appear at switch contacts and why protective diodes are used across relay coils.' },
    { q: 'What is the physical meaning of the time constant τ = RC?', a: 'The time for the capacitor voltage to reach about 63% of its final value when charging, or fall to about 37% when discharging.', explain: 'A larger R slows the charging because it limits the current; a larger C slows it because more charge is needed to reach the same voltage. Since τ has units of seconds, checking that ohms × farads gives seconds is a quick way to confirm you have the formula the right way up.' },
    { q: 'How do you find the resonant frequency of an LC circuit, and why does it matter?', a: 'Set X_L = X_C, giving 2πfL = 1/(2πfC), so f = 1/(2π√(LC)). At resonance the impedance is minimum (in a series circuit) and current is maximum.', explain: 'This is how radio tuning works: adjusting C changes the resonant frequency so the circuit responds strongly to one station and weakly to all others. It is the electrical analogue of mechanical resonance in your waves standard — the same idea in a different domain.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Electricity reuses several letters for different quantities, so context matters. Each symbol below is used on this page.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in electricity', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'V, I, R', def: '<strong>V</strong> = voltage (volts), <strong>I</strong> = current (amps), <strong>R</strong> = resistance (ohms, Ω). V = IR.', note: 'I is also used for rotational inertia in mechanics — different topic, different meaning.' },
          { term: 'Q', def: '<strong>Charge</strong>, in coulombs (C). For a capacitor, Q = CV.' },
          { term: 'C', def: '<strong>Capacitance</strong>, in farads (F). Also the symbol for the coulomb — read the context.' },
          { term: 'L', def: '<strong>Inductance</strong>, in henries (H).' },
          { term: 'ε <span class="xs">(epsilon)</span>', def: '<strong>EMF</strong> — the total energy per coulomb a source supplies. Different from terminal voltage, which is ε − Ir.' },
          { term: 'τ <span class="xs">(tau)</span>', def: 'The <strong>time constant</strong>, τ = RC. Time to reach ~63% of the final voltage when charging.', note: 'τ also means torque in mechanics.' },
          { term: 'X<sub>C</sub> and X<sub>L</sub>', def: '<strong>Reactance</strong> — AC resistance of a capacitor and an inductor, in ohms. X<sub>C</sub> falls with frequency; X<sub>L</sub> rises.' },
          { term: 'Z', def: '<strong>Impedance</strong> — total AC opposition, combining R, X<sub>C</sub> and X<sub>L</sub>.' },
          { term: 'rms <span class="xs">(root mean square)</span>', def: 'The <strong>effective</strong> AC value — the DC value that would deliver the same power. V<sub>rms</sub> = V<sub>peak</sub>/√2.', note: 'NZ mains is 230 V rms, so its peak is about 325 V.' },
          { term: 'Ω <span class="xs">(omega, capital)</span>', def: 'The <strong>ohm</strong>, unit of resistance. Lower-case ω is angular frequency — a different quantity.' },
        ]},
        { t: 'tip', title: 'Same letter, different meaning', html: 'I = current here but rotational inertia in mechanics; C = capacitance or coulombs; τ = time constant here but torque in mechanics. Always read the topic first.' },
      ],
    },
    {
      id: 'dc', num: '1', title: 'DC circuits',
      video: 'NCEA Level 3 physics capacitors AC circuits reactance',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Ohm’s law & power', eq: 'V = I R   ·   P = V I = I² R = V² / R', tex: 'V=IR\\qquad P=VI=I^2R=\\frac{V^2}{R}', note: 'The three power forms — pick the one matching your known quantities.' },
          { name: 'Resistors in series', eq: 'R<sub>T</sub> = R₁ + R₂ + …', note: 'Same current through each; voltages add.' },
          { name: 'Resistors in parallel', eq: '1 / R<sub>T</sub> = 1/R₁ + 1/R₂ + …', tex: '\\frac{1}{R_T}=\\frac{1}{R_1}+\\frac{1}{R_2}+\\cdots', note: 'Same voltage across each; currents add.' },
        ]},
      ],
    },
    {
      id: 'capacitors', num: '2', title: 'Capacitors',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Capacitance', eq: 'C = Q / V', tex: 'C=\\frac{Q}{V}', note: 'Farads (F). Charge stored per volt.' },
          { name: 'Energy stored', eq: 'E = ½ C V² = ½ Q V = Q² / 2C', tex: 'E=\\tfrac12 CV^2=\\tfrac12 QV=\\frac{Q^2}{2C}', note: 'Three equivalent forms.' },
          { name: 'Capacitors in parallel', eq: 'C<sub>T</sub> = C₁ + C₂ + …', note: '⚠ Opposite to resistors — parallel capacitors ADD.' },
          { name: 'Capacitors in series', eq: '1 / C<sub>T</sub> = 1/C₁ + 1/C₂ + …', tex: '\\frac{1}{C_T}=\\frac{1}{C_1}+\\frac{1}{C_2}+\\cdots', note: '⚠ Series capacitors combine like parallel resistors.' },
        ]},
        { t: 'mistake', title: 'The combination trap', html: 'Capacitor rules are the <strong>reverse</strong> of resistor rules. Parallel capacitors <em>add</em>; series capacitors give a <em>smaller</em> total. Mixing these up is the most common exam error here.' },
        { t: 'example', tag: 'Worked example', title: 'Combined capacitor network', problem: 'A 3.0 µF and 6.0 µF capacitor in series, then that combination in parallel with a 2.0 µF. Find total C.', steps: [
          'Series pair: 1/C = 1/3 + 1/6 = 1/2 ⟹ C = 2.0 µF.',
          'Now in parallel with 2.0 µF: C_T = 2.0 + 2.0 = 4.0 µF.',
        ], answer: 'C_total = 4.0 µF.' },
      ],
    },
    {
      id: 'rc', num: '3', title: 'Charging & discharging (RC)',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Time constant', eq: 'τ = R C', note: 'Time to reach 63% of final charge (charging) or fall to 37% (discharging).' },
          { name: 'Discharging', eq: 'Q = Q₀ e^(−t/RC)   ·   I = I₀ e^(−t/RC)', tex: 'Q=Q_0e^{-t/RC}\\qquad I=I_0e^{-t/RC}', note: 'Exponential decay of charge, current and voltage.' },
          { name: 'Charging', eq: 'Q = Q₀ (1 − e^(−t/RC))', tex: 'Q=Q_0\\left(1-e^{-t/RC}\\right)', note: 'Approaches the final charge asymptotically.' },
        ]},
        { t: 'key', title: 'Reading exponential graphs', items: [
          'After 1 time constant τ: charged to ~63%, or discharged to ~37% of start.',
          'After ~5τ the capacitor is essentially fully charged/discharged.',
          'Larger R or C ⟹ slower charging (bigger τ).',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Time constant', problem: 'A 100 µF capacitor discharges through a 47 kΩ resistor. Find τ and the charge after 10 s if Q₀ = 5.0 mC.', steps: [
          'τ = RC = 47×10³ × 100×10⁻⁶ = 4.7 s.',
          'Q = Q₀ e^(−t/τ) = 5.0×10⁻³ × e^(−10/4.7).',
          'Q = 5.0×10⁻³ × e^(−2.13) = 5.0×10⁻³ × 0.119 = 5.9×10⁻⁴ C.',
        ], answer: 'τ = 4.7 s; Q ≈ 0.59 mC after 10 s.' },
      ],
    },
    {
      id: 'inductors-ac', num: '4', title: 'Inductors & AC theory',
      blocks: [
        { t: 'formulas', title: 'Inductors', items: [
          { name: 'Induced EMF', eq: 'ε = −L (ΔI / Δt)', tex: '\\varepsilon=-L\\frac{\\Delta I}{\\Delta t}', note: 'Opposes the change in current (Lenz’s law). L = inductance (H).' },
          { name: 'Energy stored', eq: 'E = ½ L I²' },
        ]},
        { t: 'formulas', title: 'AC — RMS & peak', items: [
          { name: 'RMS values', eq: 'V<sub>rms</sub> = V<sub>peak</sub> / √2   ·   I<sub>rms</sub> = I<sub>peak</sub> / √2', tex: 'V_{\\mathrm{rms}}=\\frac{V_{\\text{peak}}}{\\sqrt2}\\qquad I_{\\mathrm{rms}}=\\frac{I_{\\text{peak}}}{\\sqrt2}', note: 'RMS is the “effective” DC-equivalent value. NZ mains 230 V is RMS (≈ 325 V peak).' },
          { name: 'AC power', eq: 'P = I<sub>rms</sub> V<sub>rms</sub>' },
        ]},
        { t: 'formulas', title: 'Reactance & impedance', items: [
          { name: 'Capacitive reactance', eq: 'X<sub>C</sub> = 1 / (2π f C)', tex: 'X_C=\\frac{1}{2\\pi fC}', note: 'Falls as frequency rises — capacitors “pass” high frequencies.' },
          { name: 'Inductive reactance', eq: 'X<sub>L</sub> = 2π f L', note: 'Rises with frequency — inductors “block” high frequencies.' },
          { name: 'Impedance (RLC series)', eq: 'Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²)   ·   V = I Z', tex: 'Z=\\sqrt{R^2+\\left(X_L-X_C\\right)^2}\\qquad V=IZ', note: 'Combines resistance and reactance.' },
          { name: 'Resonance', eq: 'f₀ = 1 / (2π √(LC))', tex: 'f_0=\\frac{1}{2\\pi\\sqrt{LC}}', note: 'X_L = X_C, impedance is minimum (just R), current is maximum.' },
        ]},
        { t: 'key', title: 'Phase relationships', items: [
          'In a capacitor, current <strong>leads</strong> voltage by 90° (“ICE”).',
          'In an inductor, current <strong>lags</strong> voltage by 90° (“ELI”).',
          'Mnemonic: <strong>ELI the ICE man</strong> — E leads I in an inductor (L); I leads E in a capacitor (C).',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Capacitive reactance', problem: 'Find the reactance of a 2.2 µF capacitor at 50 Hz, and the RMS current if 230 V RMS is across it.', steps: [
          'X_C = 1/(2πfC) = 1/(2π × 50 × 2.2×10⁻⁶) = 1/(6.91×10⁻⁴) = 1447 Ω.',
          'I_rms = V_rms / X_C = 230 / 1447 = 0.159 A.',
        ], answer: 'X_C ≈ 1.4 kΩ; I_rms ≈ 0.16 A.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Physics L3 (91526) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91526&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'No Brain Too Small — Physics (Electricity)', url: 'https://www.nobraintoosmall.co.nz/html/senior_physics/NCEA3_physics.html', note: 'DC, capacitors and AC questions by topic', verified: true },
  ],

  quiz: [
    { type: 'mc', q: 'Two 4 µF capacitors are connected in parallel. The total capacitance is:', choices: ['2 µF', '8 µF', '4 µF', '16 µF'], answer: 1, explanation: 'Capacitors in parallel add: 4 + 4 = 8 µF (opposite to the resistor rule).' },
    { type: 'sa', q: 'A 220 µF capacitor charges through a 10 kΩ resistor. What is the time constant in seconds?', accept: ['2.2', '2'], answer: '2.2 s', explanation: 'τ = RC = 10×10³ × 220×10⁻⁶ = 2.2 s.' },
    { type: 'mc', q: 'As frequency increases, the reactance of a capacitor:', choices: ['Increases', 'Decreases', 'Stays constant', 'Becomes infinite'], answer: 1, explanation: 'X_C = 1/(2πfC): higher frequency → lower reactance. Capacitors pass high frequencies more easily.' },
    { type: 'sa', q: 'NZ mains is 230 V RMS. What is the peak voltage (V, to 3sf)? (V_peak = √2 × V_rms)', accept: ['325', '325.3', '326'], answer: '≈ 325 V', explanation: 'V_peak = √2 × 230 = 325 V.' },
    { type: 'mc', q: 'In a purely inductive AC circuit, the current:', choices: ['Leads the voltage by 90°', 'Lags the voltage by 90°', 'Is in phase with voltage', 'Is zero'], answer: 1, explanation: '“ELI” — in an inductor (L), voltage (E) leads current (I), i.e. current lags voltage by 90°.' },

    { type: 'mc', q: 'A battery of EMF 12 V and internal resistance 0.5 Ω supplies 4 A. The terminal voltage is:', choices: ['12 V', '10 V', '14 V', '2 V'], answer: 1, explanation: 'V = ε − Ir = 12 − (4 × 0.5) = 10 V. The 2 V lost inside the battery is dissipated across its internal resistance. Terminal voltage only equals EMF when no current flows.' },
    { type: 'mc', q: 'Two 10 Ω resistors are connected in parallel. The total resistance is:', choices: ['20 Ω', '10 Ω', '5 Ω', '0.2 Ω'], answer: 2, explanation: '1/R = 1/10 + 1/10 = 2/10, so R = 5 Ω. Sanity check: total parallel resistance is always smaller than the smallest branch, because you have added an extra path for current.' },
    { type: 'mc', q: 'A capacitor is connected to a DC supply through a resistor. At the instant of connection:', choices: ['Current is zero and rises', 'Current is maximum and decays exponentially', 'Current stays constant', 'No current ever flows'], answer: 1, explanation: 'With no charge on the capacitor there is no opposing voltage, so the full supply drives the current. As charge builds, the capacitor voltage opposes the supply and the current decays exponentially — the mirror image of the rising voltage curve.' },
    { type: 'mc', q: 'As frequency increases, a capacitor\'s reactance:', choices: ['Increases', 'Decreases, since X_C = 1/(2πfC)', 'Stays constant', 'Becomes zero immediately'], answer: 1, explanation: 'Reactance is inversely proportional to frequency, so capacitors block DC (infinite reactance at f = 0) and pass high frequencies. Inductors do exactly the opposite, which is why the two are combined to build filters.' },
    { type: 'mc', q: 'In a purely capacitive AC circuit, the phase relationship is:', choices: ['Current lags voltage by 90°', 'Current leads voltage by 90°', 'They are in phase', 'Current leads by 180°'], answer: 1, explanation: 'CIVIL: in a Capacitor, I leads V. Physically, current must flow first to deposit charge before any voltage can appear across the plates — so the current peak precedes the voltage peak by a quarter cycle.' },
    { type: 'sa', q: 'What fraction (as a percentage) of final voltage does a charging capacitor reach after one time constant?', accept: ['63', '63%', '0.63', '63 percent', '62', '62%'], answer: '≈63%', explanation: 'After τ = RC the voltage reaches (1 − 1/e) ≈ 63% of its final value; discharging leaves about 37%. After roughly 5τ the capacitor is effectively fully charged.' },
  ],
};

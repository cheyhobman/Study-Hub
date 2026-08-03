/* ============================================================================
   Physics, condensed formula & quick-reference sheet (printable)
   Mirrors the official NCEA L3 Physics resource/formula sheet groupings.
   ========================================================================== */
export default {
  intro: 'The formulas you get (and don’t get) on the day, grouped by topic. Print for a clean revision sheet.',
  groups: [
    {
      title: 'Circular & rotational motion',
      items: [
        { name: 'Angular', eq: 'ω = 2π/T = 2πf ; v = rω', tex: '\\omega=\\frac{2\\pi}{T}=2\\pi f\\qquad v=r\\omega' },
        { name: 'Centripetal', eq: 'a = v²/r = ω²r ; F = mv²/r = mω²r', tex: 'a=\\frac{v^2}{r}=\\omega^2 r\\qquad F=\\frac{mv^2}{r}=m\\omega^2 r' },
        { name: 'Torque & rotation', eq: 'τ = Fr = Iα ; L = Iω ; E<sub>k</sub> = ½Iω²', tex: '\\tau=Fr=I\\alpha\\qquad L=I\\omega\\qquad E_k=\\tfrac12 I\\omega^2' },
        { name: 'Rotational kinematics', eq: 'ω = ω₀ + αt ; ω² = ω₀² + 2αθ', tex: '\\omega=\\omega_0+\\alpha t\\qquad \\omega^2=\\omega_0^2+2\\alpha\\theta' },
      ],
    },
    {
      title: 'Simple harmonic motion',
      items: [
        { name: 'Defining', eq: 'a = −ω²y', tex: 'a=-\\omega^2 y' },
        { name: 'Motion', eq: 'y = A cos ωt ; v = ±ω√(A²−y²) ; v<sub>max</sub> = ωA', tex: 'y=A\\cos\\omega t\\qquad v=\\pm\\omega\\sqrt{A^2-y^2}\\qquad v_{max}=\\omega A' },
        { name: 'Periods', eq: 'spring T = 2π√(m/k) ; pendulum T = 2π√(L/g)', tex: 'T_{spring}=2\\pi\\sqrt{\\frac{m}{k}}\\qquad T_{pend}=2\\pi\\sqrt{\\frac{L}{g}}' },
        { name: 'Energy', eq: 'E = ½kA² = ½mv² + ½ky²', tex: 'E=\\tfrac12 kA^2=\\tfrac12 mv^2+\\tfrac12 ky^2' },
      ],
    },
    {
      title: 'Gravitation & orbits',
      items: [
        { name: 'Force / field', eq: 'F = Gm₁m₂/r² ; g = GM/r²', tex: 'F=\\frac{Gm_1m_2}{r^2}\\qquad g=\\frac{GM}{r^2}' },
        { name: 'Orbit', eq: 'v = √(GM/r) ; T² = 4π²r³/G(m₁+m₂)', tex: 'v=\\sqrt{\\frac{GM}{r}}\\qquad T^2=\\frac{4\\pi^2r^3}{G(m_1+m_2)}' },
        { name: 'G', eq: '6.67×10⁻¹¹ N m² kg⁻²' },
      ],
    },
    {
      title: 'Waves',
      items: [
        { name: 'Wave', eq: 'v = fλ ; T = 1/f', tex: 'v=f\\lambda\\qquad T=\\frac{1}{f}' },
        { name: 'Interference / grating', eq: 'd sinθ = nλ ; x = λL/d', tex: 'd\\sin\\theta=n\\lambda\\qquad x=\\frac{\\lambda L}{d}' },
        { name: 'Standing waves', eq: 'open f = nv/2L ; closed f = nv/4L (odd n)', tex: 'f_{open}=\\frac{nv}{2L}\\qquad f_{closed}=\\frac{nv}{4L}\\ (n\\ \\text{odd})' },
        { name: 'Beats / Doppler', eq: "f_beat = |f₁−f₂| ; f' = f(v±v_o)/(v∓v_s)" },
        { name: 'Refraction', eq: 'n₁sinθ₁ = n₂sinθ₂ ; sinθ_c = n₂/n₁ ; n = c/v', tex: 'n_1\\sin\\theta_1=n_2\\sin\\theta_2\\qquad \\sin\\theta_c=\\frac{n_2}{n_1}\\qquad n=\\frac{c}{v}' },
      ],
    },
    {
      title: 'DC & capacitors',
      items: [
        { name: 'Ohm / power', eq: 'V = IR ; P = VI = I²R = V²/R', tex: 'V=IR\\qquad P=VI=I^2R=\\frac{V^2}{R}' },
        { name: 'Capacitor', eq: 'C = Q/V ; E = ½CV² = ½QV', tex: 'C=\\frac{Q}{V}\\qquad E=\\tfrac12 CV^2=\\tfrac12 QV' },
        { name: 'Combinations', eq: 'parallel C add ; series 1/C add (opposite to R!)', tex: '\\text{parallel: }C_T=\\textstyle\\sum C_i\\qquad\\text{series: }\\frac{1}{C_T}=\\sum\\frac{1}{C_i}' },
        { name: 'Charging', eq: 'τ = RC ; Q = Q₀e^(−t/RC) ; charge Q = Q₀(1−e^(−t/RC))', tex: '\\tau=RC\\qquad Q=Q_0e^{-t/RC}\\qquad Q=Q_0\\left(1-e^{-t/RC}\\right)' },
      ],
    },
    {
      title: 'AC & inductors',
      items: [
        { name: 'Inductor', eq: 'ε = −L(ΔI/Δt) ; E = ½LI²', tex: '\\varepsilon=-L\\frac{\\Delta I}{\\Delta t}\\qquad E=\\tfrac12 LI^2' },
        { name: 'RMS', eq: 'V_rms = V_peak/√2 ; I_rms = I_peak/√2', tex: 'V_{rms}=\\frac{V_{peak}}{\\sqrt2}\\qquad I_{rms}=\\frac{I_{peak}}{\\sqrt2}' },
        { name: 'Reactance', eq: 'X_C = 1/(2πfC) ; X_L = 2πfL', tex: 'X_C=\\frac{1}{2\\pi fC}\\qquad X_L=2\\pi fL' },
        { name: 'Impedance / resonance', eq: 'Z = √(R²+(X_L−X_C)²) ; f₀ = 1/(2π√(LC))', tex: 'Z=\\sqrt{R^2+(X_L-X_C)^2}\\qquad f_0=\\frac{1}{2\\pi\\sqrt{LC}}' },
        { name: 'Phase', eq: 'ELI the ICE man (I lags E in L; I leads E in C)' },
      ],
    },
    {
      title: 'Modern physics',
      items: [
        { name: 'Photon', eq: 'E = hf = hc/λ (h = 6.63×10⁻³⁴ J s)', tex: 'E=hf=\\frac{hc}{\\lambda}\\quad(h=6.63\\times10^{-34}\\,\\mathrm{J\\,s})' },
        { name: 'Photoelectric', eq: 'hf = W + E_k(max) ; eV_s = E_k(max)' },
        { name: 'Nuclear', eq: 'E = mc² ; N = N₀(½)^(t/t½)', tex: 'E=mc^2\\qquad N=N_0\\left(\\tfrac12\\right)^{t/t_{1/2}}' },
      ],
    },
  ],
};

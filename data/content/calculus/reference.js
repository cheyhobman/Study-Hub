/* ============================================================================
   Calculus — condensed formula & quick-reference sheet (printable)
   ========================================================================== */
export default {
  intro: 'Rules, standard derivatives and integrals, and the complex-number toolkit, condensed for revision.',
  groups: [
    {
      title: 'Complex numbers (91577)',
      items: [
        { name: 'Basics', eq: 'i² = −1 ; z = a+bi ; z̄ = a−bi ; |z| = √(a²+b²)' },
        { name: 'Polar', eq: 'z = r cis θ ; r = |z| ; tan θ = b/a (mind the quadrant)', tex: 'z=r\\,\\mathrm{cis}\\,\\theta\\qquad r=|z|\\qquad \\tan\\theta=\\frac{b}{a}' },
        { name: 'Multiply / divide', eq: 'moduli ×÷ ; arguments +−' },
        { name: 'De Moivre', eq: '(r cis θ)ⁿ = rⁿ cis(nθ)' },
        { name: 'nth roots', eq: 'r^(1/n) cis((θ+2πk)/n), k = 0…n−1', tex: 'z^{1/n}=r^{1/n}\\,\\mathrm{cis}\\!\\left(\\frac{\\theta+2\\pi k}{n}\\right),\\ k=0,\\dots,n-1' },
      ],
    },
    {
      title: 'Differentiation rules (91578)',
      items: [
        { name: 'Power', eq: 'd/dx xⁿ = n x^(n−1)', tex: '\\frac{d}{dx}x^n=nx^{n-1}' },
        { name: 'Chain', eq: "d/dx f(g(x)) = f′(g) · g′" },
        { name: 'Product', eq: '(uv)′ = u′v + uv′' },
        { name: 'Quotient', eq: '(u/v)′ = (u′v − uv′)/v²', tex: '\\left(\\frac{u}{v}\\right)^{\\prime}=\\frac{u^{\\prime}v-uv^{\\prime}}{v^2}' },
      ],
    },
    {
      title: 'Standard derivatives',
      items: [
        { name: 'Trig', eq: 'sin→cos ; cos→−sin ; tan→sec²x' },
        { name: 'Exp / log', eq: 'e^(kx)→k e^(kx) ; ln x → 1/x ; ln f → f′/f', tex: '\\frac{d}{dx}e^{kx}=ke^{kx}\\qquad \\frac{d}{dx}\\ln x=\\frac{1}{x}\\qquad \\frac{d}{dx}\\ln f=\\frac{f^{\\prime}}{f}' },
        { name: 'Turning points', eq: "y′ = 0 ; y″<0 max, y″>0 min" },
      ],
    },
    {
      title: 'Integration (91579)',
      items: [
        { name: 'Power', eq: '∫ xⁿ dx = x^(n+1)/(n+1) + c (n≠−1)', tex: '\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+c\\quad(n\\neq-1)' },
        { name: 'Reciprocal / exp', eq: '∫ 1/x dx = ln|x|+c ; ∫ e^(kx)dx = (1/k)e^(kx)+c', tex: '\\int\\frac{1}{x}\\,dx=\\ln|x|+c\\qquad \\int e^{kx}dx=\\frac{1}{k}e^{kx}+c' },
        { name: 'Trig', eq: '∫ sin = −cos ; ∫ cos = sin ; ∫ sec² = tan' },
        { name: 'Area', eq: 'A = ∫ₐᵇ y dx ; between: ∫(y_top − y_bottom) dx' },
        { name: 'Volume of revolution', eq: 'V = π ∫ₐᵇ y² dx (about x-axis)' },
        { name: 'Separable DE', eq: 'separate variables, integrate both sides, +c' },
      ],
    },
  ],
};

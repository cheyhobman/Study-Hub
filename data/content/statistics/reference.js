/* ============================================================================
   Statistics, condensed formula & quick-reference sheet (printable)
   ========================================================================== */
export default {
  intro: 'Key rules and distributions for the three externals, condensed for revision.',
  groups: [
    {
      title: 'Evaluating reports (91584)',
      items: [
        { name: 'Margin of error (95%)', eq: 'MoE ≈ 1/√n ; CI = estimate ± MoE', tex: '\\mathrm{MoE}\\approx\\frac{1}{\\sqrt n}\\qquad \\mathrm{CI}=\\text{estimate}\\pm\\mathrm{MoE}' },
        { name: 'Error types', eq: 'sampling (↓ with n) vs non-sampling (bias, not fixed by n)' },
        { name: 'Causation', eq: 'needs a randomised experiment; beware lurking variables' },
      ],
    },
    {
      title: 'Probability (91585)',
      items: [
        { name: 'Complement', eq: 'P(not A) = 1 − P(A)' },
        { name: 'Addition', eq: 'P(A∪B) = P(A) + P(B) − P(A∩B)' },
        { name: 'Multiplication (indep.)', eq: 'P(A∩B) = P(A)P(B)' },
        { name: 'Conditional', eq: 'P(A|B) = P(A∩B)/P(B)', tex: 'P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}' },
        { name: 'Independence', eq: 'P(A|B) = P(A)' },
      ],
    },
    {
      title: 'Distributions (91586)',
      items: [
        { name: 'Binomial', eq: 'P(X=r)=ⁿCᵣpʳ(1−p)^(n−r) ; mean np ; var np(1−p)' },
        { name: 'Poisson', eq: 'P(X=r)=e^(−λ)λʳ/r! ; mean = var = λ', tex: 'P(X=r)=\\frac{e^{-\\lambda}\\lambda^r}{r!}\\qquad \\mu=\\sigma^2=\\lambda' },
        { name: 'Normal', eq: 'z = (x−μ)/σ ; 68–95–99.7 rule', tex: 'z=\\frac{x-\\mu}{\\sigma}' },
      ],
    },
  ],
};

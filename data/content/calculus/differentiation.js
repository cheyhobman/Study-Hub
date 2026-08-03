/* ============================================================================
   AS 91578, Differentiation methods (External, 6 credits), "3.6"Rules · trig/exp/ln · implicit · related rates · optimisation · applications
   ========================================================================== */
export default {
  title: 'Differentiation methods',
  tags: ['Chain rule', 'Product/quotient', 'Implicit', 'Optimisation'],
  intro: 'Finding rates of change. Master the four rules and the standard derivatives, then apply them: implicit differentiation, related rates, optimisation, and analysing curves (tangents, turning points, concavity).',

  flashcards: [
    { q: 'State the chain rule', a: "d/dx f(g(x)) = f′(g(x)) · g′(x)", explain: 'Differentiate the outside, keep the inside, × derivative of the inside.' },
    { q: 'State the product rule', a: "(uv)′ = u′v + uv′", explain: '' },
    { q: 'State the quotient rule', a: "(u/v)′ = (u′v − uv′)/v²", explain: '“Low d-high minus high d-low, over low squared.”' },
    { q: 'Differentiate: sin x', a: 'cos x', explain: 'And d/dx cos x = −sin x; d/dx tan x = sec²x.' },
    { q: 'Differentiate: e^(kx)', a: 'k e^(kx)', explain: 'The k comes from the chain rule.' },
    { q: 'Differentiate: ln(f(x))', a: "f′(x)/f(x)", explain: 'Derivative of the inside over the inside.' },
    { q: 'A turning point is a maximum when…', a: 'd²y/dx² < 0 (concave down)', explain: 'At a turning point dy/dx = 0 first.' },
    { q: 'Implicit differentiation of x² + y² = 25 gives…', a: 'dy/dx = −x/y', explain: '2x + 2y·y′ = 0.' },
    { q: 'List the steps of the related-rates method', a: 'relate the variables, differentiate with respect to t, then substitute', explain: 'The chain rule links the two rates.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: when to use the product rule vs the chain rule', a: '<strong>Product rule</strong> when two functions are MULTIPLIED: x²sin x. <strong>Chain rule</strong> when one function is INSIDE another: sin(x²).', explain: 'Read the structure before differentiating: ask "is this A times B, or is this A of B?"Composite functions have brackets around an inner expression. Many questions need both. Differentiating x²sin(3x) needs the product rule at the top level, with the chain rule applied to sin(3x) inside it.' },
    { q: 'TELL THEM APART: stationary point vs point of inflection', a: 'A <strong>stationary point</strong> has f′(x) = 0. A <strong>point of inflection</strong> is where CONCAVITY changes, requiring f″(x) = 0 AND a sign change in f″.', explain: 'They are independent: a stationary point of inflection has both f′ = 0 and f″ = 0 (like y = x³ at the origin), but most inflections are not stationary at all. The critical trap is that f″(x) = 0 alone is NOT sufficient. Y = x⁴ has f″(0) = 0 yet no inflection there, because f″ never changes sign.' },
    { q: 'TELL THEM APART: the second derivative test and when it fails', a: 'f″ > 0 at a stationary point → minimum; f″ < 0 → maximum. If f″ = 0 the test is INCONCLUSIVE and you must check the sign of f′ either side.', explain: 'Students commonly conclude "f″ = 0 therefore inflection", which is wrong. y = x⁴ at x = 0 has f′ = 0 and f″ = 0 but is a genuine minimum. When the second derivative test fails, fall back to a sign table for f′, that method always works.' },
    { q: 'TELL THEM APART: average rate of change vs instantaneous rate of change', a: '<strong>Average</strong> rate over an interval is the gradient of the CHORD, (f(b) − f(a))/(b − a). <strong>Instantaneous</strong> rate at a point is the gradient of the TANGENT, f′(x).', explain: 'This is the whole conceptual foundation of the derivative: the tangent gradient is the limit of the chord gradient as the interval shrinks to zero. Exam wording matters: "the rate at t = 3" means the derivative, while "the rate between t = 2 and t = 5" means the chord.' },

    /* ---- reasoning depth ---- */
    { q: 'Set out the full method for an optimisation problem', a: '1. Write the quantity to be optimised as a formula. 2. Use a constraint to eliminate one variable, leaving a function of ONE variable. 3. Differentiate and set equal to zero. 4. Verify max or min with f″ or a sign table. 5. Answer the question actually asked, with units.', explain: 'Steps 2 and 5 lose the most marks. Students differentiate an expression in two variables, which cannot work, or they find x and stop without computing the area or cost that was asked for. Also check the domain. A negative length is not a valid solution even if the algebra offers it.' },
    { q: 'What does implicit differentiation actually do, and when do you need it?', a: 'It differentiates both sides with respect to x while treating y as a function of x, so every y term gains a factor of dy/dx by the chain rule. Use it when you cannot easily solve for y.', explain: 'For x² + y² = 25 you get 2x + 2y(dy/dx) = 0, hence dy/dx = −x/y. Note the answer legitimately contains both x and y. That is expected for an implicit curve, not an error. Then collect all dy/dx terms on one side and factorise.' },
    { q: 'Explain the relationship between displacement, velocity and acceleration', a: 'Velocity is the derivative of displacement; acceleration is the derivative of velocity (the second derivative of displacement). Integrating reverses each step.', explain: 'Read the signs physically: negative velocity means moving backwards, and acceleration opposite in sign to velocity means slowing down. An object is momentarily at rest when v = 0, which is exactly the condition for a stationary point on the displacement graph: the same mathematics under a different name.' },
    { q: 'Why does the chain rule work. What is it really saying?', a: 'That rates of change multiply through a composition: if y depends on u and u depends on x, then dy/dx = (dy/du)(du/dx).', explain: 'The intuition is gearing: if y changes 3× as fast as u, and u changes 2× as fast as x, then y changes 6× as fast as x. Seeing it as multiplying rates makes related-rates problems much more natural. Those are just the chain rule applied with respect to time.' },
    { q: 'How do you find the equation of a tangent, and of a normal?', a: 'Tangent: gradient m = f′(a), then y − f(a) = m(x − a). Normal: same point, gradient −1/m (perpendicular).', explain: 'The most frequent error is substituting x = a into f′ but then using f′(a) as the y-coordinate instead of f(a). Keep them separate: f(a) gives the point, f′(a) gives the gradient. If f′(a) = 0 the tangent is horizontal and the normal is vertical (x = a).' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Calculus writes the same idea several ways. Recognising each form is half the battle.',
      blocks: [
        { t: 'definitions', title: '📖 Notation used in differentiation', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'dy/dx', def: 'The <strong>derivative</strong> of y with respect to x: the rate at which y changes as x changes. Read as “dee y by dee x”.', note: 'It is a single symbol, not a fraction you can split (though it behaves like one in substitution).' },
          { term: 'f′(x) <span class="xs">(f-prime)</span>', def: 'The same thing in function notation. f′(x) is the derivative of f(x).' },
          { term: 'f″(x) or d²y/dx²', def: 'The <strong>second derivative</strong>, the derivative of the derivative. Tells you concavity, and whether a stationary point is a max or min.' },
          { term: 'd/dx <span class="xs">(as an operator)</span>', def: 'An <strong>instruction</strong>: “differentiate what follows with respect to x”. d/dx (sin x) means “differentiate sin x”.' },
          { term: 'Δ vs d', def: 'Capital <strong>Δ</strong> means a finite change (Δy/Δx is the gradient of a chord). Lower-case <strong>d</strong> means an infinitesimal one: the limit as the interval shrinks to zero.', note: 'That limit is exactly what turns a chord gradient into a tangent gradient.' },
          { term: 'Stationary point', def: 'Where <strong>f′(x) = 0</strong>. The tangent is horizontal. Could be a maximum, a minimum, or a stationary point of inflection.' },
          { term: 'Point of inflection', def: 'Where <strong>concavity changes</strong>. Requires f″(x) = 0 AND a sign change in f″.', note: 'f″ = 0 alone is not enough. Y = x⁴ has f″(0) = 0 but no inflection.' },
          { term: '∝', def: '“Proportional to”.' },
        ]},
        { t: 'tip', title: 'Leibniz vs Lagrange', html: 'dy/dx (Leibniz) and f′(x) (Lagrange) mean exactly the same thing. Leibniz is clearer about WHICH variable you differentiate with respect to, which is why related-rates and implicit problems use it.' },
      ],
    },
    {
      id: 'rules', num: '1', title: 'The rules & standard derivatives',
      video: 'NCEA Level 3 calculus differentiation chain product quotient rule',
      blocks: [
        { t: 'formulas', title: 'Differentiation rules', items: [
          { name: 'Power rule', eq: 'd/dx (xⁿ) = n x^(n−1)', tex: '\\frac{d}{dx}\\left(x^n\\right)=nx^{n-1}' },
          { name: 'Chain rule', eq: 'd/dx f(g(x)) = f′(g(x)) · g′(x)', tex: "\\frac{d}{dx}f\\bigl(g(x)\\bigr)=f'\\bigl(g(x)\\bigr)\\cdot g'(x)", note: 'Differentiate the outside, keep the inside, times the derivative of the inside.' },
          { name: 'Product rule', eq: '(uv)′ = u′v + uv′' },
          { name: 'Quotient rule', eq: '(u/v)′ = (u′v − uv′) / v²', tex: "\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}", note: '“Low d-high minus high d-low, over low squared.”' },
        ]},
        { t: 'formulas', title: 'Standard derivatives', items: [
          { name: 'Trig', eq: 'd/dx sin x = cos x ;  d/dx cos x = −sin x ;  d/dx tan x = sec²x', tex: '\\frac{d}{dx}\\sin x=\\cos x\\quad\\frac{d}{dx}\\cos x=-\\sin x\\quad\\frac{d}{dx}\\tan x=\\sec^2 x' },
          { name: 'Exponential', eq: 'd/dx e^x = e^x ;  d/dx e^(kx) = k e^(kx)', tex: '\\frac{d}{dx}e^{x}=e^{x}\\qquad\\frac{d}{dx}e^{kx}=ke^{kx}' },
          { name: 'Logarithm', eq: 'd/dx ln x = 1/x ;  d/dx ln(f(x)) = f′(x)/f(x)', tex: "\\frac{d}{dx}\\ln x=\\frac{1}{x}\\qquad\\frac{d}{dx}\\ln f(x)=\\frac{f'(x)}{f(x)}" },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Chain + product together', problem: 'Differentiate y = x² e^(3x).', steps: [
          'Product rule with u = x², v = e^(3x).',
          'u′ = 2x. v′ = 3e^(3x) (chain rule on e^(3x)).',
          'y′ = u′v + uv′ = 2x·e^(3x) + x²·3e^(3x).',
          '= e^(3x)(2x + 3x²) = x e^(3x)(2 + 3x).',
        ], answer: 'dy/dx = x e^(3x)(3x + 2).' },
      ],
    },
    {
      id: 'implicit', num: '2', title: 'Implicit differentiation',
      blocks: [
        { t: 'p', html: `When y isn’t isolated (e.g. x² + y² = 25), differentiate <strong>both sides with respect to x</strong>, treating y as a function of x, every y term picks up a dy/dx (chain rule).` },
        { t: 'example', tag: 'Worked example', title: 'Circle', problem: 'Find dy/dx for x² + y² = 25.', steps: [
          'Differentiate term by term: 2x + 2y·(dy/dx) = 0.',
          'Solve: 2y (dy/dx) = −2x.',
          'dy/dx = −x/y.',
        ], answer: 'dy/dx = −x/y (the tangent to a circle is perpendicular to the radius).' },
      ],
    },
    {
      id: 'related-rates', num: '3', title: 'Related rates',
      blocks: [
        { t: 'connects', title: 'Related in other subjects', intro: 'Where you already use these derivatives without calling them that:', items: [
          { to: '#/topic/phys-91524', label: 'Physics: Mechanical Systems (91524)',
            why: 'Velocity is the derivative of displacement and acceleration is the derivative of velocity. Every kinematics problem is differentiation. Simple harmonic motion is literally the differential equation d²x/dt² = −ω²x, and differentiating x = A cos(ωt) twice with the chain rule is what proves the SHM result you quote in Physics.' },
        ]},
        { t: 'p', html: `Two quantities change with time; link them with an equation, then differentiate with respect to <strong>t</strong> (chain rule) to relate their rates.` },
        { t: 'key', title: 'Method', items: [
          'Write the equation relating the variables (e.g. V and r).',
          'Differentiate both sides with respect to t.',
          'Substitute the known values and the known rate; solve for the unknown rate.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Expanding balloon', problem: 'A sphere’s volume grows at 100 cm³ s⁻¹. How fast is the radius growing when r = 5 cm? (V = ⁴⁄₃πr³)', steps: [
          'dV/dt = 4πr² · (dr/dt)  (differentiate V wrt t).',
          '100 = 4π(5²)(dr/dt) = 100π (dr/dt).',
          'dr/dt = 100 / (100π) = 1/π.',
        ], answer: 'dr/dt = 1/π ≈ 0.318 cm s⁻¹.' },
      ],
    },
    {
      id: 'optimisation', num: '4', title: 'Optimisation & curve features',
      blocks: [
        { t: 'key', title: 'Finding maxima / minima', items: [
          'Turning points where <strong>dy/dx = 0</strong>.',
          'Second-derivative test: d²y/dx² &lt; 0 ⟹ maximum; &gt; 0 ⟹ minimum.',
          'Increasing where dy/dx &gt; 0; decreasing where dy/dx &lt; 0.',
          'Points of inflection where d²y/dx² = 0 and concavity changes.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Optimisation', problem: 'A farmer has 40 m of fence for a rectangular pen against a wall (only 3 sides fenced). Maximise the area.', steps: [
          'Let width = x (two sides) and length = y (one side): 2x + y = 40 ⟹ y = 40 − 2x.',
          'Area A = xy = x(40 − 2x) = 40x − 2x².',
          'dA/dx = 40 − 4x = 0 ⟹ x = 10. (d²A/dx² = −4 &lt; 0 ⟹ maximum.)',
          'y = 40 − 20 = 20. A = 10 × 20 = 200.',
        ], answer: 'Maximum area 200 m² (10 m × 20 m).' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, Calculus L3 (91578) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91578&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA, Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars for 91578', verify: true },
  ],

  quiz: [
    { type: 'sa', q: 'Differentiate y = sin(3x). (write dy/dx)', accept: ['3cos(3x)', '3cos3x', '3 cos(3x)'], answer: '3cos(3x)', explanation: 'Chain rule: derivative of sin is cos, times the derivative of the inside (3).' },
    { type: 'mc', q: 'For x² + y² = 25, dy/dx equals:', choices: ['x/y', '−x/y', '−y/x', '2x + 2y'], answer: 1, explanation: 'Implicit: 2x + 2y·y′ = 0 ⟹ y′ = −x/y.' },
    { type: 'mc', q: 'A turning point is a maximum when:', choices: ['dy/dx > 0', 'd²y/dx² > 0', 'd²y/dx² < 0', 'dy/dx = 1'], answer: 2, explanation: 'At a turning point dy/dx = 0; a negative second derivative (concave down) means it is a maximum.' },
    { type: 'sa', q: 'Differentiate y = ln(x²+1). (write dy/dx)', accept: ['2x/(x^2+1)', '2x/(x²+1)', '(2x)/(x^2+1)'], answer: '2x/(x²+1)', explanation: 'd/dx ln(f) = f′/f = 2x/(x²+1).' },

    { type: 'mc', q: 'To differentiate y = sin(x²), you need:', choices: ['The product rule', 'The chain rule', 'The quotient rule', 'No rule: it is sin(2x)'], answer: 1, explanation: 'This is a composite function: x² is INSIDE sine. So dy/dx = cos(x²) × 2x = 2x cos(x²). Compare with x²sin x, which is a product and needs the product rule. Read the structure before choosing a rule.' },
    { type: 'mc', q: 'At a stationary point, f″(x) = 0. You can conclude:', choices: ['It is a point of inflection', 'It is a maximum', 'Nothing yet. The test is inconclusive, so check the sign of f′ either side', 'It is a minimum'], answer: 2, explanation: 'f″ = 0 is necessary but not sufficient for an inflection. y = x⁴ at x = 0 has f′ = 0 and f″ = 0 yet is a genuine minimum, because f″ never changes SIGN. When the second derivative test fails, a sign table for f′ always resolves it.' },
    { type: 'mc', q: 'For x² + y² = 25, dy/dx equals:', choices: ['−x/y', '2x + 2y', '−y/x', 'x/y'], answer: 0, explanation: 'Differentiating implicitly: 2x + 2y(dy/dx) = 0, so dy/dx = −2x/2y = −x/y. Containing both x and y is correct and expected for an implicitly defined curve. It is not an unfinished answer.' },
    { type: 'mc', q: 'A particle has v(t) = t² − 4t + 3. It is momentarily at rest when:', choices: ['t = 2 only', 't = 1 and t = 3', 't = 0', 'Never'], answer: 1, explanation: 'At rest means v = 0: t² − 4t + 3 = (t−1)(t−3) = 0, giving t = 1 and t = 3. Note that t = 2 is where ACCELERATION is zero (the minimum of v), a distinction exams deliberately test.' },
    { type: 'mc', q: 'A rectangle has perimeter 20 m. To maximise its area you should first:', choices: ['Differentiate A = xy directly', 'Use the perimeter to write y in terms of x, giving A as a function of one variable', 'Set x = y immediately', 'Integrate the perimeter'], answer: 1, explanation: 'You cannot differentiate a function of two independent variables. The constraint 2x + 2y = 20 gives y = 10 − x, so A = x(10 − x): now a single-variable function ready to differentiate. Eliminating a variable via the constraint is the step that makes optimisation work.' },
    { type: 'sa', q: 'The normal to a curve at a point where the tangent gradient is 2 has gradient ______.', accept: ['-0.5', '-1/2', '−0.5', '−1/2', '-.5'], answer: '−1/2', explanation: 'The normal is perpendicular to the tangent, so its gradient is −1/m. Perpendicular gradients multiply to −1, which is a quick way to check your answer.' },
  ],
};

/* ============================================================================
   AS 91579 — Integration methods (External, 6 credits) — "3.7"
   Standard integrals · substitution · areas · volumes of revolution · DEs
   ========================================================================== */
export default {
  title: 'Integration methods',
  tags: ['Substitution', 'Areas', 'Volumes', 'Differential equations'],
  intro: 'The reverse of differentiation. Learn the standard integrals and substitution, then apply integration to areas under and between curves, volumes of revolution, and solving differential equations.',

  flashcards: [
    { q: 'Integrate: ∫ xⁿ dx', a: 'x^(n+1)/(n+1) + c  (n ≠ −1)', explain: 'Never forget the + c on indefinite integrals.' },
    { q: 'Integrate: ∫ 1/x dx', a: 'ln|x| + c', explain: 'The n = −1 exception to the power rule.' },
    { q: 'Integrate: ∫ e^(kx) dx', a: '(1/k) e^(kx) + c', explain: 'Divide by the coefficient of x.' },
    { q: 'Write the formula for a volume of revolution about the x-axis', a: 'V = π ∫ₐᵇ y² dx', explain: 'Each slice is a disc of area πy².' },
    { q: 'State the substitution to use for ∫ 2x(x²+1)⁵ dx, and why', a: 'u = x² + 1, because du = 2x dx — and that 2x factor is already present in the integrand, so the whole integral collapses to ∫u⁵ du.', explain: 'Then du = 2x dx, matching the rest of the integrand.' },
    { q: 'Integrate: ∫ sin x dx', a: '−cos x + c', explain: 'And ∫ cos x dx = sin x + c.' },
    { q: 'List the steps for solving a separable differential equation', a: 'separate the variables, integrate both sides, add + c', explain: 'Use the initial condition to find c.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: definite vs indefinite integral', a: 'An <strong>indefinite</strong> integral is a FAMILY of functions and needs "+ c". A <strong>definite</strong> integral has limits, evaluates to a NUMBER, and needs no constant because the c terms cancel on subtraction.', explain: 'Forgetting +c on an indefinite integral is the most commonly dropped easy mark in the whole standard. And when a definite integral is part of a larger problem, remember the answer is a number — you cannot then differentiate it or treat it as a function of x.' },
    { q: '⚖️ TELL THEM APART: the value of an integral vs the AREA between curve and axis', a: 'A definite integral counts area BELOW the x-axis as negative. Total geometric area requires splitting at every x-intercept and adding the absolute values.', explain: 'This catches people out constantly. ∫ from 0 to 2π of sin x dx = 0, because the positive and negative halves cancel exactly — yet the actual area enclosed is 4. If a question says "area", find the roots first and integrate each region separately.' },
    { q: '⚖️ TELL THEM APART: area under a curve vs area BETWEEN two curves', a: 'Under one curve: ∫f(x)dx. Between two: ∫(upper − lower)dx over the interval where they intersect.', explain: 'Find the intersection points first — they are your limits. Determine which function is on top by testing a value inside the interval, not by assuming. If the curves cross within the region, split the integral at the crossing and swap which one is "upper".' },
    { q: '⚖️ TELL THEM APART: integrating to find displacement vs distance travelled', a: 'Integrating velocity gives DISPLACEMENT (net change, signed). DISTANCE travelled requires splitting where v = 0 and summing the absolute values of each piece.', explain: 'The same signed-area issue in a physical context. A particle that goes forward 5 m then back 5 m has displacement 0 but has travelled 10 m. Whenever a question says "total distance", find where v changes sign before integrating.' },

    /* ---- reasoning depth ---- */
    { q: 'State the Fundamental Theorem of Calculus and why it matters', a: 'If F′(x) = f(x), then ∫ from a to b of f(x)dx = F(b) − F(a). It links differentiation and integration as inverse operations.', explain: 'This is why you can compute an area — fundamentally a limit of infinitely many rectangles — by evaluating an antiderivative at two points. Without it, every definite integral would require a limiting sum. It is the reason the whole subject hangs together.' },
    { q: 'How do you choose the substitution in an integration by substitution problem?', a: 'Look for a composite function and let u be the INNER function. Check that its derivative (up to a constant factor) also appears in the integrand.', explain: 'The signature is f(g(x))·g′(x). For ∫2x·cos(x²)dx, let u = x² since du = 2x dx is present. Remember to convert the LIMITS to u-values in a definite integral, or convert fully back to x before substituting the original limits — mixing the two is a classic error.' },
    { q: 'Why must you add +c, and what does it represent geometrically?', a: 'Because differentiating any constant gives zero, so infinitely many functions share the same derivative. Geometrically, +c represents the whole family of vertically translated curves.', explain: 'A boundary condition — a known point on the curve — pins down which member of the family you want. In physics contexts c is usually the initial displacement or initial velocity, which is why "the particle starts at the origin" is given: it tells you c = 0.' },
    { q: 'How do you find the area between two curves when they cross inside the region?', a: 'Find all intersection points, split the interval at each one, determine which curve is upper in each subinterval, and sum the separate integrals.', explain: 'If you integrate (f − g) straight across a crossing, the regions where g is on top contribute negatively and partially cancel the rest, giving an answer smaller than the true area. Sketching first — even roughly — reliably prevents this.' },
    { q: 'What does the integral of a rate of change give you?', a: 'The total accumulated change in the original quantity over that interval.', explain: 'This is the interpretation exams ask for in context. Integrating a flow rate in litres per minute over 10 minutes gives litres; integrating acceleration gives change in velocity. When asked "what does this integral represent?", name the quantity AND its units — the units follow from multiplying the y-axis units by the x-axis units.' },
  
    /* ---- merged from the former u-substitution study guide ---- */

    { q: 'u-substitution is which rule run backwards?', a: 'The chain rule', explain: 'Differentiating f(g(x)) gives f′(g(x))·g′(x). So integrating something of that shape undoes it: setting u = g(x) turns ∫f′(g(x))g′(x)dx into ∫f′(u)du.' },
    { q: 'What must be true for u-substitution to work?', a: 'The derivative of your chosen u must appear in the integrand (up to a constant)', explain: 'You need g′(x)dx present so you can swap it for du. A constant multiple is fine (x dx = ½du); a missing variable is not.' },
    { q: 'For ∫2x(x²+1)⁵dx, what is u?', a: 'u = x² + 1', explain: 'It’s the inner (nested) function, and du = 2x dx is exactly the other factor sitting in the integrand.' },
    { q: 'State the substitution for ∫(2x+3)/(x²+3x)dx and the standard result it produces.', a: 'The denominator: u = x² + 3x', explain: 'du = (2x+3)dx is the numerator, so it collapses to ∫(1/u)du = ln|u| + c.' },
    { q: 'With a DEFINITE integral, what extra step does substitution require?', a: 'Change the limits to u-values (or back-substitute before evaluating)', explain: 'The original limits are x-values. Substitute each into u = g(x): e.g. for u = x²+1 with x from 0→2, the u-limits become 1→5.' },
    { q: 'After substituting, a stray x remains. What now?', a: 'Rearrange the substitution to express x in terms of u', explain: 'e.g. for ∫x√(x−2)dx with u = x−2, write x = u+2, giving ∫(u+2)√u du. A u-integral must contain no x at all.' },
    { q: 'Why does ∫cos(3x+1)dx = ⅓sin(3x+1) + c?', a: 'u = 3x+1 gives du = 3dx, so dx = ⅓du — the ⅓ comes from the substitution', explain: 'This is the underlying reason for the “divide by the coefficient of x” shortcut for linear inner functions.' },
    { q: 'Explain how to verify an indefinite integral is correct, using only differentiation.', a: 'Differentiate your answer — it must return the original integrand exactly.', explain: 'Takes five seconds and catches lost constants, missing chain-rule factors, and sign errors.' },
    { q: 'State the two steps most often omitted when evaluating a DEFINITE integral by substitution.', a: 'Converting the limits to u-values, and (if you keep the original limits instead) back-substituting to return the antiderivative to x before evaluating.', explain: 'Also: losing the +c on indefinite integrals, and substituting when g′(x)dx isn’t actually present.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: when substitution works vs when it does not', a: 'Substitution works when the integrand has the form f(g(x))·g′(x) — an inner function whose derivative is also present (up to a constant). If the derivative is not there, substitution alone will not help.', explain: 'Test it before committing: pick u = inner function, compute du, and check whether the remaining x-material matches. For ∫x·e^(x²)dx it works (du = 2x dx, and x is present). For ∫e^(x²)dx it fails — there is no x factor, and that integral has no elementary antiderivative at all.' },
    { q: '⚖️ TELL THEM APART: converting limits vs converting back to x', a: 'Two valid routes for a definite integral: (a) convert the LIMITS to u-values and finish in u, or (b) integrate in u, substitute back to x, then use the original x-limits. Never mix them.', explain: 'Using x-limits on a u-expression is the single most common error in this topic and is heavily penalised. Route (a) is usually faster and less error-prone; if you take it, write the new limits down explicitly so the marker can see you converted them.' },

    /* ---- reasoning depth ---- */
    { q: 'Why does the du "cancel" the dx — what is really happening?', a: 'Substitution is the chain rule run backwards. If u = g(x) then du = g′(x)dx, so replacing g′(x)dx by du is exact bookkeeping, not an approximation.', explain: 'Understanding it as the reverse chain rule tells you what to look for: the derivative of your chosen inner function must be present as a factor. It also explains why you may absorb constant factors freely — if du = 2x dx but you only have x dx, then x dx = ½du, and constants pull outside the integral harmlessly.' },
    { q: 'How do you handle a substitution where the extra x terms do not vanish?', a: 'Rearrange your substitution to express the leftover x in terms of u, and substitute that too, so the integral is entirely in u.', explain: 'For ∫x√(x+1)dx with u = x + 1, du = dx but an x remains. Since x = u − 1, the integral becomes ∫(u−1)√u du = ∫(u^{3/2} − u^{1/2})du, which is straightforward. Never leave a stray x — an integral in mixed variables cannot be evaluated.' },
    { q: 'What substitution handles ∫tan x dx, and what is the result?', a: 'Write tan x = sin x / cos x and let u = cos x, so du = −sin x dx. The integral becomes −∫du/u = −ln|cos x| + c, equivalently ln|sec x| + c.', explain: 'The general pattern is ∫f′(x)/f(x) dx = ln|f(x)| + c — whenever the numerator is the derivative of the denominator, the answer is a logarithm. Recognising that shape saves you from attempting far harder methods, and the absolute value inside the log matters because the argument can be negative.' },
    { q: 'Why keep the absolute value in ln|u| when integrating 1/u?', a: 'Because the logarithm is only defined for positive arguments, but 1/u is perfectly integrable for negative u — the absolute value covers both branches.', explain: 'Dropping it gives an answer that is undefined over part of the domain, and markers do check. In a definite integral, if the limits keep u strictly positive you may drop the bars, but stating that reasoning is safer than silently omitting them.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Every part of an integral sign carries information. Here is what each piece means.',
      blocks: [
        { t: 'definitions', title: '📖 Notation used in integration', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: '∫', def: 'The <strong>integral sign</strong> — an elongated S, for “sum”. Integration is fundamentally adding up infinitely many infinitesimal pieces.' },
          { term: 'dx <span class="xs">(at the end)</span>', def: 'Says <strong>which variable</strong> you are integrating with respect to, and marks the end of the integrand. Never optional.' },
          { term: '∫ₐᵇ <span class="xs">(limits)</span>', def: 'A <strong>definite</strong> integral, evaluated from a to b. The result is a NUMBER.' },
          { term: '∫ with no limits', def: 'An <strong>indefinite</strong> integral. The result is a FAMILY of functions, so it needs “+ c”.' },
          { term: '+ c', def: 'The <strong>constant of integration</strong>. Differentiating any constant gives zero, so infinitely many functions share the same derivative.', note: 'A boundary condition (a known point) picks out which one you want.' },
          { term: 'F(x) vs f(x)', def: 'Capital <strong>F</strong> conventionally denotes the antiderivative of lower-case <strong>f</strong>. So F′(x) = f(x).' },
          { term: '[F(x)]ₐᵇ', def: 'Notation for “evaluate F at b, then subtract F at a”. Equals F(b) − F(a).' },
          { term: 'u <span class="xs">(in substitution)</span>', def: 'A temporary variable standing for an inner function, chosen so the integral simplifies. du = u′(x) dx.' },
          { term: '|x| <span class="xs">(absolute value)</span>', def: 'Needed in ∫(1/x)dx = ln|x| + c because logarithms are undefined for negative arguments, but 1/x is perfectly integrable there.' },
        ]},
        { t: 'tip', title: 'Definite vs indefinite', html: 'Limits present → a number, no “+ c”. No limits → a function family, “+ c” required. Forgetting +c is the most commonly dropped easy mark in this standard.' },
      ],
    },
    {
      id: 'standard', num: '1', title: 'Standard integrals',
      video: 'NCEA Level 3 calculus integration methods substitution',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Power rule', eq: '∫ xⁿ dx = x^(n+1)/(n+1) + c   (n ≠ −1)', tex: '\\int x^{n}\\,dx=\\frac{x^{n+1}}{n+1}+c\\qquad(n\\neq-1)', note: 'Never forget the + c for indefinite integrals!' },
          { name: 'Reciprocal', eq: '∫ 1/x dx = ln|x| + c', tex: '\\int \\frac{1}{x}\\,dx=\\ln|x|+c' },
          { name: 'Exponential', eq: '∫ e^(kx) dx = (1/k) e^(kx) + c', tex: '\\int e^{kx}\\,dx=\\frac{1}{k}e^{kx}+c' },
          { name: 'Trig', eq: '∫ sin x dx = −cos x + c ;  ∫ cos x dx = sin x + c ;  ∫ sec²x dx = tan x + c', tex: '\\int\\sin x\\,dx=-\\cos x+c\\quad\\int\\cos x\\,dx=\\sin x+c\\quad\\int\\sec^2x\\,dx=\\tan x+c' },
          { name: 'Linear inside (reverse chain)', eq: '∫ f(ax+b) dx = (1/a) F(ax+b) + c', tex: '\\int f(ax+b)\\,dx=\\frac{1}{a}F(ax+b)+c', note: 'e.g. ∫ (2x+1)⁵ dx = (2x+1)⁶ / 12 + c.' },
        ]},
      ],
    },
    {
      id: 'substitution', num: '2', title: 'Integration by substitution',
      blocks: [
        { t: 'p', html: `When the integrand contains a function <em>and</em> (a multiple of) its derivative, substitute u = inner function. Replace dx using du = u′ dx.` },
        { t: 'example', tag: 'Worked example', title: 'Substitution', problem: 'Find ∫ 2x(x² + 1)⁵ dx.', steps: [
          'Let u = x² + 1 ⟹ du = 2x dx. The 2x dx is exactly du.',
          '∫ u⁵ du = u⁶/6 + c.',
          'Substitute back: (x² + 1)⁶ / 6 + c.',
        ], answer: '(x² + 1)⁶ / 6 + c.' },
      ],
    },
    {
      id: 'areas', num: '3', title: 'Areas under & between curves',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Area under a curve', eq: 'A = ∫ₐᵇ y dx', tex: 'A=\\int_a^b y\\,dx', note: 'Between the curve and the x-axis from x=a to x=b.' },
          { name: 'Area between two curves', eq: 'A = ∫ₐᵇ (y_top − y_bottom) dx', tex: 'A=\\int_a^b\\left(y_{\\text{top}}-y_{\\text{bottom}}\\right)dx', note: 'Upper curve minus lower curve. Find intersection points for the limits.' },
        ]},
        { t: 'warn', title: 'Areas below the axis', html: 'A definite integral counts area below the x-axis as negative. For a true geometric area that crosses the axis, split at the roots and add the absolute values.' },
        { t: 'example', tag: 'Worked example', title: 'Definite integral', problem: 'Evaluate ∫₀² (3x² + 2) dx.', steps: [
          'Antiderivative: x³ + 2x.',
          'Evaluate at limits: [x³ + 2x]₀² = (8 + 4) − (0) = 12.',
        ], answer: 'The area is 12 square units.' },
      ],
    },
    {
      id: 'volumes', num: '4', title: 'Volumes of revolution',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Rotation about the x-axis', eq: 'V = π ∫ₐᵇ y² dx', tex: 'V=\\pi\\int_a^b y^2\\,dx', note: 'Each cross-section is a disc of radius y, area πy².' },
          { name: 'Rotation about the y-axis', eq: 'V = π ∫ x² dy', tex: 'V=\\pi\\int x^2\\,dy', note: 'Express x in terms of y and integrate over y-limits.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Volume of revolution', problem: 'The region under y = √x from x = 0 to 4 is rotated about the x-axis. Find the volume.', steps: [
          'V = π ∫₀⁴ y² dx = π ∫₀⁴ (√x)² dx = π ∫₀⁴ x dx.',
          '= π [x²/2]₀⁴ = π (16/2 − 0) = 8π.',
        ], answer: 'V = 8π ≈ 25.1 cubic units.' },
      ],
    },
    {
      id: 'des', num: '5', title: 'Differential equations',
      blocks: [
        { t: 'p', html: `A differential equation relates a function to its derivative. <strong>Separable</strong> ones (dy/dx = f(x)g(y)) are solved by separating variables and integrating both sides.` },
        { t: 'example', tag: 'Worked example', title: 'Separable DE', problem: 'Solve dy/dx = 6x², given y = 5 when x = 0.', steps: [
          'Integrate both sides: y = ∫ 6x² dx = 2x³ + c.',
          'Use the initial condition y(0) = 5: 5 = 2(0) + c ⟹ c = 5.',
        ], answer: 'y = 2x³ + 5.' },
        { t: 'tip', title: 'Rates in context', html: 'Growth/decay problems often give dy/dt = ky, whose solution is y = A e^(kt). Exponential growth (k>0) or decay (k<0) — link back to the physical situation.' },
      ],
    },
  

    /* ------------------------------------------------------------------ 1 */
    {
      id: 'usub-why', num: '6', title: 'u-Substitution — what it is for (first principles)',
      video: 'u substitution integration explained from first principles',
      blocks: [
        { t: 'p', html: `You already know how to integrate simple things like <span class="mono">∫x³ dx</span>. But what about <span class="mono">∫2x(x²+1)⁵ dx</span>? Expanding <span class="mono">(x²+1)⁵</span> would be brutal. u-substitution is the escape hatch.` },
        { t: 'p', html: `<strong>The core idea:</strong> u-substitution is the <strong>chain rule run backwards</strong>. Recall differentiating a composite function:` },
        { t: 'formulas', items: [
          { name: 'Chain rule (differentiating)', eq: 'd/dx [ f(g(x)) ] = f′(g(x)) · g′(x)', tex: "\\frac{d}{dx}\\bigl[f(g(x))\\bigr]=f'\\bigl(g(x)\\bigr)\\cdot g'(x)", note: 'Derivative of the outside × derivative of the inside.' },
        ]},
        { t: 'p', html: `So <em>if</em> an integrand looks like <span class="mono">f′(g(x)) · g′(x)</span> — that is, <strong>some inner function AND its own derivative multiplied alongside</strong> — then integrating it just undoes the chain rule:` },
        { t: 'formulas', items: [
          { name: 'Substitution rule (integrating)', eq: '∫ f′(g(x)) · g′(x) dx = f(g(x)) + c', tex: "\\int f'\\bigl(g(x)\\bigr)\\cdot g'(x)\\,dx=f\\bigl(g(x)\\bigr)+c", note: 'Setting u = g(x) turns this into the much friendlier ∫ f′(u) du.' },
        ]},
        { t: 'key', title: 'The mechanics: why "du" works', items: [
          'Let <strong>u = g(x)</strong> (the messy inner function).',
          'Differentiate it: <strong>du/dx = g′(x)</strong>.',
          'Rearrange informally to <strong>du = g′(x) dx</strong>. This is the swap that lets you replace the <em>whole</em> <span class="mono">g′(x) dx</span> chunk with a single <span class="mono">du</span>.',
          'Now the integral is entirely in terms of u — integrate normally, then <strong>substitute x back in</strong> at the end.',
        ]},
        { t: 'tip', title: 'The one-line summary', html: 'Substitute the inside as <strong>u</strong>, swap <span class="mono">g′(x)dx</span> for <span class="mono">du</span>, integrate the easy thing, then put x back.' },
      ],
    },

    /* ------------------------------------------------------------------ 2 */
    {
      id: 'usub-choosing-u', num: '7', title: 'How to choose u',
      intro: 'This is where most marks are won or lost. The right u makes the integral collapse; the wrong u makes it worse.',
      blocks: [
        { t: 'key', title: 'The choosing-u checklist (try in this order)', items: [
          '<strong>1. Look for a "nest".</strong> Something inside brackets, under a root, in an exponent, or inside sin/cos/ln. That inner thing is your first candidate for u.',
          '<strong>2. Check its derivative appears elsewhere</strong> in the integrand (up to a constant multiple). If yes — you have a winner.',
          '<strong>3. Prefer the inside of the "hardest" part.</strong> For <span class="mono">(x²+1)⁵</span>, pick u = x²+1, not u = x⁵.',
          '<strong>4. For fractions,</strong> try u = the denominator (especially if the numerator resembles its derivative → gives ln|u|).',
          '<strong>5. Constants don’t matter.</strong> If du = 2x dx but you only have <span class="mono">x dx</span>, that’s fine: <span class="mono">x dx = ½ du</span>. You can always fix a constant — but you can <em>never</em> fix a missing variable.',
        ]},
        { t: 'table', caption: 'Pattern-spotting: common setups', headers: ['Integral looks like', 'Choose u =', 'Because'], rows: [
          ['∫ 2x(x²+1)⁵ dx', 'x² + 1', 'du = 2x dx — exactly the other factor'],
          ['∫ x·e^(x²) dx', 'x²', 'du = 2x dx, and we have x dx = ½du'],
          ['∫ cos(3x+1) dx', '3x + 1', 'du = 3 dx, so dx = ⅓du'],
          ['∫ (2x+3)/(x²+3x) dx', 'x² + 3x', 'numerator IS the derivative → ln|u|'],
          ['∫ sin⁴x · cos x dx', 'sin x', 'du = cos x dx — the cos is there for you'],
          ['∫ x√(x²−4) dx', 'x² − 4', 'du = 2x dx; the x outside pairs up'],
          ['∫ (ln x)²/x dx', 'ln x', 'du = (1/x)dx — the 1/x is present'],
        ]},
        { t: 'warn', title: 'The golden test', html: 'After substituting, your integral must contain <strong>no x’s at all</strong> — only u and du. If a stray x survives, your choice of u was wrong (or you need to also rearrange u to express that x in terms of u).' },
      ],
    },

    /* ------------------------------------------------------------------ 3 */
    {
      id: 'usub-worked-basic', num: '8', title: 'Worked examples — building up',
      intro: 'Follow every step. The layout matters: examiners award method marks for clearly stating u and du.',
      blocks: [
        { t: 'example', tag: 'Level 1 — the classic', title: '∫ 2x(x² + 1)⁵ dx', problem: 'Find ∫ 2x(x² + 1)⁵ dx.', steps: [
          '<strong>Choose u.</strong> The nest is x²+1, so let <span class="mono">u = x² + 1</span>.',
          '<strong>Find du.</strong> <span class="mono">du/dx = 2x</span>, so <span class="mono">du = 2x dx</span>.',
          '<strong>Substitute.</strong> The integrand is (x²+1)⁵ · (2x dx) = u⁵ du. So the integral becomes <span class="mono">∫ u⁵ du</span>.',
          '<strong>Integrate.</strong> <span class="mono">∫u⁵ du = u⁶/6 + c</span>.',
          '<strong>Substitute back.</strong> Replace u with x²+1.',
        ], answer: '(x² + 1)⁶ / 6 + c' },

        { t: 'example', tag: 'Level 2 — fixing a constant', title: '∫ x·e^(x²) dx', problem: 'Find ∫ x e^(x²) dx.', steps: [
          'Let <span class="mono">u = x²</span> (the exponent is the nest).',
          '<span class="mono">du = 2x dx</span>. But we only have <span class="mono">x dx</span> — so rearrange: <span class="mono">x dx = ½ du</span>.',
          'Substitute: <span class="mono">∫ e^u · ½ du = ½ ∫ e^u du</span>.',
          '<span class="mono">= ½ e^u + c</span>.',
          'Back-substitute u = x².',
        ], answer: '½ e^(x²) + c' },

        { t: 'example', tag: 'Level 2 — linear inside', title: '∫ cos(3x + 1) dx', problem: 'Find ∫ cos(3x + 1) dx.', steps: [
          'Let <span class="mono">u = 3x + 1</span>.',
          '<span class="mono">du = 3 dx</span> ⟹ <span class="mono">dx = ⅓ du</span>.',
          '<span class="mono">∫ cos u · ⅓ du = ⅓ ∫ cos u du = ⅓ sin u + c</span>.',
          'Back-substitute.',
        ], answer: '⅓ sin(3x + 1) + c  —  (this is the “divide by the coefficient” shortcut, and this is WHY it works)' },

        { t: 'example', tag: 'Level 3 — producing a logarithm', title: '∫ (2x + 3)/(x² + 3x) dx', problem: 'Find ∫ (2x + 3)/(x² + 3x) dx.', steps: [
          'For a fraction, try the denominator: <span class="mono">u = x² + 3x</span>.',
          '<span class="mono">du = (2x + 3) dx</span> — the numerator is <em>exactly</em> du. Perfect.',
          '<span class="mono">∫ (1/u) du = ln|u| + c</span>.',
          'Back-substitute.',
        ], answer: 'ln|x² + 3x| + c' },

        { t: 'example', tag: 'Level 3 — trig power', title: '∫ sin⁴x · cos x dx', problem: 'Find ∫ sin⁴x cos x dx.', steps: [
          'Let <span class="mono">u = sin x</span> (it’s raised to a power; and its derivative cos x is sitting right there).',
          '<span class="mono">du = cos x dx</span>.',
          '<span class="mono">∫ u⁴ du = u⁵/5 + c</span>.',
          'Back-substitute.',
        ], answer: 'sin⁵x / 5 + c' },

        { t: 'example', tag: 'Level 4 — the stubborn extra x', title: '∫ x√(x − 2) dx', problem: 'Find ∫ x√(x − 2) dx. (Here du does NOT clear all the x’s — you must rearrange.)', steps: [
          'Let <span class="mono">u = x − 2</span>, so <span class="mono">du = dx</span>.',
          'Substituting gives <span class="mono">∫ x·√u du</span> — but there’s still an x! Not allowed.',
          '<strong>Fix:</strong> rearrange the substitution to express x in terms of u: <span class="mono">x = u + 2</span>.',
          'Now: <span class="mono">∫ (u + 2)·u^(1/2) du = ∫ (u^(3/2) + 2u^(1/2)) du</span>.',
          'Integrate: <span class="mono">= (2/5)u^(5/2) + (4/3)u^(3/2) + c</span>.',
          'Back-substitute u = x − 2.',
        ], answer: '(2/5)(x−2)^(5/2) + (4/3)(x−2)^(3/2) + c' },
      ],
    },

    /* ------------------------------------------------------------------ 4 */
    {
      id: 'usub-definite', num: '9', title: 'Definite integrals — you MUST change the limits',
      intro: 'This is the single biggest trap in the exam. If you substitute u, the limits are no longer x-values.',
      blocks: [
        { t: 'mistake', title: 'The trap', html: 'The limits on <span class="mono">∫₀² …dx</span> mean <strong>x = 0 to x = 2</strong>. Once you switch to u, those numbers are meaningless — you must convert them into <strong>u-values</strong> using your substitution, or convert back to x before evaluating.' },
        { t: 'key', title: 'Two valid methods (pick one and be consistent)', items: [
          '<strong>Method A — change the limits (recommended).</strong> Substitute each x-limit into u = g(x) to get new u-limits. Then evaluate entirely in u. <em>No back-substitution needed.</em>',
          '<strong>Method B — back-substitute first.</strong> Ignore limits, find the antiderivative in x, then apply the original x-limits.',
          'Method A is faster and less error-prone. Method B is safer if you find limit-swapping confusing.',
        ]},
        { t: 'example', tag: 'Worked — Method A', title: '∫₀² 2x(x² + 1)³ dx', problem: 'Evaluate ∫₀² 2x(x² + 1)³ dx, changing the limits.', steps: [
          'Let <span class="mono">u = x² + 1</span>, <span class="mono">du = 2x dx</span>.',
          '<strong>Change the limits:</strong> when x = 0, u = 0² + 1 = <strong>1</strong>. When x = 2, u = 2² + 1 = <strong>5</strong>.',
          'The integral becomes <span class="mono">∫₁⁵ u³ du</span> — note the limits are now 1 and 5, not 0 and 2.',
          'Integrate: <span class="mono">[u⁴/4]₁⁵</span>.',
          'Evaluate: <span class="mono">5⁴/4 − 1⁴/4 = 625/4 − 1/4 = 624/4</span>.',
        ], answer: '156' },
        { t: 'example', tag: 'Worked — same problem, Method B', title: 'Same integral, back-substituting instead', problem: 'Evaluate ∫₀² 2x(x² + 1)³ dx without changing limits.', steps: [
          'Find the indefinite integral first: <span class="mono">∫2x(x²+1)³dx = (x²+1)⁴/4 + c</span>.',
          'Now apply the ORIGINAL x-limits: <span class="mono">[(x²+1)⁴/4]₀²</span>.',
          '<span class="mono">= (5)⁴/4 − (1)⁴/4 = 625/4 − 1/4</span>.',
        ], answer: '156 — same answer, as it must be. Both methods are valid; never mix them.' },
        { t: 'example', tag: 'Level 4 — definite with a constant fix', title: '∫₀^(√π) x·sin(x²) dx', problem: 'Evaluate ∫₀^(√π) x sin(x²) dx.', steps: [
          'Let <span class="mono">u = x²</span>, <span class="mono">du = 2x dx</span> ⟹ <span class="mono">x dx = ½du</span>.',
          'Change limits: x = 0 → u = 0. x = √π → u = (√π)² = <strong>π</strong>.',
          '<span class="mono">= ½ ∫₀^π sin u du = ½ [−cos u]₀^π</span>.',
          '<span class="mono">= ½ (−cos π − (−cos 0)) = ½ (−(−1) + 1) = ½(2)</span>.',
        ], answer: '1' },
      ],
    },

    /* ------------------------------------------------------------------ 5 */
    {
      id: 'usub-mistakes', num: '10', title: 'Common mistakes (and how to avoid them)',
      blocks: [
        { t: 'mistake', title: '1. Forgetting to change the limits', html: 'Writing <span class="mono">∫₀² u³ du</span> when the u-limits should be 1 to 5. <strong>Fix:</strong> the moment you write your new integral, immediately recompute both limits from u = g(x). Write them down before integrating.' },
        { t: 'mistake', title: '2. Forgetting du (treating dx as du)', html: 'Writing <span class="mono">∫(x²+1)⁵ dx → ∫u⁵ du</span> when there was no 2x present. That’s wrong — you cannot substitute unless <span class="mono">g′(x)dx</span> is actually there. <strong>Fix:</strong> always write the line “du = … dx” explicitly and check it against the integrand.' },
        { t: 'mistake', title: '3. Choosing a poor u', html: 'Picking u = x⁵ for <span class="mono">∫2x(x²+1)⁵dx</span> leaves you worse off. <strong>Fix:</strong> choose the <em>inside</em> of the composite, then verify its derivative is present.' },
        { t: 'mistake', title: '4. Leaving a stray x in a u-integral', html: 'e.g. ending up with <span class="mono">∫x√u du</span>. <strong>Fix:</strong> rearrange your substitution to write x in terms of u (see Level 4 example above), or choose a different u.' },
        { t: 'mistake', title: '5. Forgetting to back-substitute', html: 'Leaving your final indefinite answer as <span class="mono">u⁶/6 + c</span>. The answer must be in terms of x. <strong>Fix:</strong> for indefinite integrals, the last line is always “replace u with …”.' },
        { t: 'mistake', title: '6. Losing the + c', html: 'Every indefinite integral needs <span class="mono">+ c</span>. Free marks lost. (Definite integrals don’t need it — the c cancels.)' },
        { t: 'tip', title: 'Self-check in 5 seconds', html: 'Differentiate your answer. If you don’t get back the original integrand, something’s wrong. This is the fastest way to catch errors in the exam.' },
      ],
    },

    /* ------------------------------------------------------------------ 6 */
    {
      id: 'usub-practice', num: '11', title: 'Practice questions with full solutions',
      intro: 'Cover the solution, attempt it properly on paper, then reveal. They increase in difficulty.',
      blocks: [
        { t: 'reveals', title: 'Set A — indefinite integrals', items: [
          { q: '① ∫ 3x²(x³ + 4)⁷ dx', a: 'Let u = x³+4, du = 3x² dx. → ∫u⁷du = u⁸/8 + c.<br><strong>= (x³ + 4)⁸ / 8 + c</strong>' },
          { q: '② ∫ e^(5x) dx', a: 'Let u = 5x, du = 5dx ⟹ dx = ⅕du. → ⅕∫e^u du = ⅕e^u + c.<br><strong>= ⅕ e^(5x) + c</strong>' },
          { q: '③ ∫ x/(x² + 7) dx', a: 'Let u = x²+7, du = 2x dx ⟹ x dx = ½du. → ½∫(1/u)du = ½ln|u| + c.<br><strong>= ½ ln(x² + 7) + c</strong>  (no modulus needed since x²+7 > 0)' },
          { q: '④ ∫ cos x · e^(sin x) dx', a: 'Let u = sin x, du = cos x dx. → ∫e^u du = e^u + c.<br><strong>= e^(sin x) + c</strong>' },
          { q: '⑤ ∫ (ln x)³ / x dx', a: 'Let u = ln x, du = (1/x)dx. → ∫u³du = u⁴/4 + c.<br><strong>= (ln x)⁴ / 4 + c</strong>' },
          { q: '⑥ ∫ x²√(x³ − 1) dx', a: 'Let u = x³−1, du = 3x²dx ⟹ x²dx = ⅓du. → ⅓∫u^(1/2)du = ⅓·(2/3)u^(3/2) + c.<br><strong>= (2/9)(x³ − 1)^(3/2) + c</strong>' },
        ]},
        { t: 'reveals', title: 'Set B — definite integrals (change your limits!)', items: [
          { q: '⑦ ∫₀¹ 2x(x² + 3)⁴ dx', a: 'u = x²+3, du = 2x dx. Limits: x=0→u=3; x=1→u=4.<br>∫₃⁴u⁴du = [u⁵/5]₃⁴ = (1024 − 243)/5 = 781/5.<br><strong>= 156.2</strong>' },
          { q: '⑧ ∫₁^e (ln x)/x dx', a: 'u = ln x, du = (1/x)dx. Limits: x=1→u=ln1=0; x=e→u=ln e=1.<br>∫₀¹u du = [u²/2]₀¹ = ½ − 0.<br><strong>= ½</strong>' },
          { q: '⑨ ∫₀² x·e^(x²) dx', a: 'u = x², x dx = ½du. Limits: x=0→u=0; x=2→u=4.<br>½∫₀⁴e^u du = ½[e^u]₀⁴ = ½(e⁴ − 1).<br><strong>= ½(e⁴ − 1) ≈ 26.8</strong>' },
          { q: '⑩ ∫₀^(π/2) sin²x · cos x dx', a: 'u = sin x, du = cos x dx. Limits: x=0→u=0; x=π/2→u=sin(π/2)=1.<br>∫₀¹u²du = [u³/3]₀¹ = ⅓.<br><strong>= ⅓</strong>' },
        ]},
        { t: 'reveals', title: 'Set C — harder / rearrangement needed', items: [
          { q: '⑪ ∫ x(x + 5)⁴ dx', a: 'u = x+5 ⟹ x = u−5, du = dx.<br>∫(u−5)u⁴du = ∫(u⁵ − 5u⁴)du = u⁶/6 − u⁵ + c.<br><strong>= (x+5)⁶/6 − (x+5)⁵ + c</strong>' },
          { q: '⑫ ∫ (2x + 1)/(x² + x + 4) dx', a: 'u = x²+x+4, du = (2x+1)dx — exactly the numerator.<br>∫(1/u)du = ln|u| + c.<br><strong>= ln|x² + x + 4| + c</strong>' },
          { q: '⑬ ∫₀¹ x/√(x + 3) dx', a: 'u = x+3 ⟹ x = u−3, du = dx. Limits: x=0→u=3; x=1→u=4.<br>∫₃⁴ (u−3)/√u du = ∫₃⁴(u^(1/2) − 3u^(−1/2))du = [(2/3)u^(3/2) − 6u^(1/2)]₃⁴.<br>At 4: (2/3)(8) − 6(2) = 16/3 − 12. At 3: (2/3)(3√3) − 6√3 = 2√3 − 6√3 = −4√3.<br><strong>= (16/3 − 12) + 4√3 ≈ 0.261</strong>' },
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA — Calculus L3 (91579) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91579&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA — Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars for 91579', verify: true },
  ],

  quiz: [
    { type: 'sa', q: 'Evaluate ∫₀² (3x² + 2) dx (a number).', accept: ['12'], answer: '12', explanation: 'Antiderivative x³ + 2x; [x³+2x]₀² = (8+4) − 0 = 12.' },
    { type: 'mc', q: 'The volume when y = f(x) is rotated about the x-axis (a to b) is:', choices: ['∫ y dx', 'π ∫ y dx', 'π ∫ y² dx', '2π ∫ y dx'], answer: 2, explanation: 'Disc method: each slice is a disc of area πy², so V = π ∫ₐᵇ y² dx.' },
    { type: 'sa', q: 'Find ∫ e^(2x) dx (include the constant as +c).', accept: ['0.5e^(2x)+c', '(1/2)e^(2x)+c', 'e^(2x)/2+c', '0.5e^2x+c'], answer: '½e^(2x) + c', explanation: '∫ e^(kx) dx = (1/k)e^(kx) + c, so with k=2 it is ½e^(2x) + c.' },
    { type: 'mc', q: 'For the substitution ∫ 2x(x²+1)⁵ dx, the best choice of u is:', choices: ['u = 2x', 'u = x²+1', 'u = x⁵', 'u = (x²+1)⁵'], answer: 1, explanation: 'u = x²+1 gives du = 2x dx, which matches the rest of the integrand exactly.' },

    { type: 'mc', q: 'The value of ∫ from 0 to 2π of sin x dx is 0. The AREA enclosed between the curve and the axis is:', choices: ['0', '2', '4', '2π'], answer: 2, explanation: 'The integral is zero because the area below the axis (π to 2π) is counted as negative and cancels the area above. For geometric area, split at x = π: each half has area 2, giving a total of 4. Always split at the roots when a question says "area".' },
    { type: 'mc', q: 'For ∫2x·cos(x²)dx, the appropriate substitution is:', choices: ['u = cos x', 'u = x²', 'u = 2x', 'u = x'], answer: 1, explanation: 'x² is the inner function of the composite, and its derivative 2x is already present as a factor. With u = x², du = 2x dx, the integral becomes ∫cos u du = sin u + c = sin(x²) + c.' },
    { type: 'mc', q: 'A particle moves with v(t) = t − 2 from t = 0 to t = 4. The DISTANCE travelled is:', choices: ['0', '4', '2', '8'], answer: 1, explanation: 'Velocity changes sign at t = 2, so split there. From 0 to 2 the displacement is −2; from 2 to 4 it is +2. Net displacement is 0, but distance is |−2| + |2| = 4. Never integrate straight through a sign change when distance is asked for.' },
    { type: 'mc', q: 'Why does an indefinite integral require "+ c"?', choices: ['By convention', 'Because differentiating any constant gives zero, so infinitely many functions share that derivative', 'To make the units work', 'Only for trigonometric integrals'], answer: 1, explanation: 'The antiderivative is a whole family of vertically shifted curves. A boundary condition — such as a known initial value — selects the particular member you need, which is why physics problems always supply a starting position or velocity.' },
    { type: 'mc', q: 'A tap fills a tank at a rate r(t) litres per minute. ∫ from 0 to 10 of r(t)dt represents:', choices: ['The rate at t = 10', 'The total litres added in the first 10 minutes', 'The average rate', 'The tank capacity'], answer: 1, explanation: 'Integrating a rate of change gives the total accumulated change. The units confirm it: (litres per minute) × (minutes) = litres. Stating the quantity and its units is what earns the interpretation mark.' },
    { type: 'sa', q: 'When computing a definite integral by substitution, what must you do to the limits?', accept: ['change them to u', 'convert them', 'change them', 'convert to u values', 'change limits to u', 'substitute them'], answer: 'convert them to the corresponding u-values', explanation: 'Alternatively, integrate fully and convert back to x before applying the original limits. What you must never do is use x-limits with a u-expression — a very common and heavily penalised slip.' },
  
    /* ---- merged from the former u-substitution study guide ---- */

    { type: 'mc', q: 'For ∫ x·e^(x²) dx, the best substitution is:', choices: ['u = x', 'u = x²', 'u = e^x', 'u = e^(x²)'], answer: 1, explain: '', explanation: 'u = x² gives du = 2x dx, so x dx = ½du — the x outside is exactly what you need.' },
    { type: 'mc', q: 'Evaluating ∫₀² 2x(x²+1)³ dx with u = x²+1, the new limits are:', choices: ['0 to 2', '1 to 5', '0 to 5', '1 to 4'], answer: 1, explanation: 'Substitute the x-limits into u = x²+1: x=0 → u=1, and x=2 → u=5.' },
    { type: 'sa', q: 'Find ∫ 2x(x²+1)⁵ dx (write in the form (x^2+1)^6/6+c, no spaces)', accept: ['(x^2+1)^6/6+c', '(x²+1)⁶/6+c', '(x^2+1)^6/6 + c'], answer: '(x²+1)⁶/6 + c', explanation: 'u = x²+1, du = 2x dx → ∫u⁵du = u⁶/6 + c.' },
    { type: 'mc', q: 'After substituting, your integral is ∫ x√u du. This means:', choices: ['You are finished', 'Your u was wrong or you must write x in terms of u', 'You should ignore the x', 'You must change the limits'], answer: 1, explanation: 'A u-integral must contain no x. Either rearrange (e.g. x = u+2) or choose a different u.' },
    { type: 'sa', q: 'Evaluate ∫₁^e (ln x)/x dx (give a fraction or decimal)', accept: ['1/2', '0.5', '½'], answer: '½', explanation: 'u = ln x, du = dx/x. Limits become 0→1. ∫₀¹u du = [u²/2]₀¹ = ½.' },
    { type: 'mc', q: '∫ (2x+1)/(x²+x+4) dx equals:', choices: ['ln|x²+x+4| + c', '(x²+x+4)²/2 + c', '2ln|2x+1| + c', '1/(x²+x+4) + c'], answer: 0, explanation: 'The numerator is exactly the derivative of the denominator, so it becomes ∫(1/u)du = ln|u| + c.' },

    { type: 'mc', q: 'Which integral CANNOT be solved by substitution alone?', choices: ['∫x·e^(x²)dx', '∫e^(x²)dx', '∫2x·cos(x²)dx', '∫sin x·cos x dx'], answer: 1, explanation: 'Substitution needs f(g(x))·g′(x). For e^(x²) the derivative of the inner function, 2x, is nowhere present — and in fact this integral has no elementary antiderivative at all. The others all have the required factor.' },
    { type: 'mc', q: 'For ∫x√(x+1)dx with u = x + 1, the leftover x should be handled by:', choices: ['Ignoring it', 'Writing x = u − 1 and substituting', 'Differentiating it', 'Splitting the integral'], answer: 1, explanation: 'Every x must be eliminated. Since u = x + 1 gives x = u − 1, the integral becomes ∫(u−1)√u du = ∫(u^{3/2} − u^{1/2})du. An integral left in mixed variables cannot be evaluated.' },
    { type: 'mc', q: 'In a definite integral solved by substitution, a common serious error is:', choices: ['Using +c', 'Applying the original x-limits to an expression in u', 'Choosing u as the inner function', 'Simplifying too early'], answer: 1, explanation: 'You must either convert the limits to u-values, or convert the antiderivative back to x before using the x-limits. Mixing the two gives a wrong numerical answer and is one of the most heavily penalised slips in the standard.' },
    { type: 'mc', q: '∫tan x dx equals:', choices: ['sec²x + c', '−ln|cos x| + c', 'ln|sin x| + c', 'sec x tan x + c'], answer: 1, explanation: 'Write tan x = sin x/cos x and let u = cos x, giving du = −sin x dx and −∫du/u = −ln|cos x| + c. This follows the general pattern ∫f′/f dx = ln|f| + c, which is worth recognising on sight.' },
    { type: 'sa', q: 'If u = 3x² + 1, what is du in terms of dx?', accept: ['6x dx', '6xdx', '6x', 'du=6xdx', 'du = 6x dx'], answer: 'du = 6x dx', explanation: 'Then look for an x factor in the integrand to absorb. If you only have x dx, note that x dx = du/6 — constant factors pull outside the integral without difficulty.' },
  ],
};

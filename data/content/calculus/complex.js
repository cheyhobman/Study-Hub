/* ============================================================================
   AS 91577 — Complex numbers (External, 5 credits) — "3.5"
   Arithmetic · Argand diagram · polar form · De Moivre · roots · equations
   ========================================================================== */
export default {
  title: 'Complex numbers',
  tags: ['Argand', 'Polar form', 'De Moivre', 'Roots'],
  intro: 'Numbers of the form z = a + bi where i² = −1. You’ll do arithmetic, plot on the Argand plane, convert to polar (mod-arg) form, apply De Moivre’s theorem for powers and roots, and solve polynomial equations with complex solutions.',

  flashcards: [
    { q: 'i² = ?', a: '−1', explain: 'i = √(−1), so i² = −1.' },
    { q: 'Write the formula for the modulus of z = a + bi', a: '|z| = √(a² + b²)', explain: 'The distance from the origin on the Argand plane.' },
    { q: 'State the rule for multiplying two complex numbers in polar form', a: 'multiply the moduli, ADD the arguments', explain: 'r₁cisθ₁ × r₂cisθ₂ = r₁r₂ cis(θ₁+θ₂).' },
    { q: 'State the rule for dividing two complex numbers in polar form', a: 'divide the moduli, SUBTRACT the arguments', explain: '(r₁cisθ₁)/(r₂cisθ₂) = (r₁/r₂) cis(θ₁−θ₂).' },
    { q: 'How many nth roots does a non-zero complex number have?', a: 'Exactly n, equally spaced by 2π/n', explain: 'They lie on a circle of radius r^(1/n).' },
    { q: 'State the conjugate of a + bi, and what z × z̄ gives', a: 'The conjugate is a − bi. Multiplying gives z × z̄ = a² + b², which is REAL (and equals |z|²).', explain: 'z·z̄ = a² + b², a real number — used to divide.' },
    { q: 'If 2 + 3i is a root of a real-coefficient polynomial…', a: '2 − 3i is also a root', explain: 'Complex roots come in conjugate pairs.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: modulus vs argument', a: '<strong>Modulus</strong> |z| = √(a² + b²) — the DISTANCE from the origin. <strong>Argument</strong> arg(z) — the ANGLE from the positive real axis.', explain: 'Together they are the polar form of the point. The modulus is always positive; the argument needs care over quadrants, since a calculator\'s arctan only returns values in (−90°, 90°). Always sketch the point on an Argand diagram before quoting an argument.' },
    { q: '⚖️ TELL THEM APART: rectangular form vs polar form — when to use each', a: '<strong>Rectangular</strong> (a + bi) is best for ADDING and SUBTRACTING. <strong>Polar</strong> (r cis θ) is best for MULTIPLYING, DIVIDING and taking POWERS or ROOTS.', explain: 'In polar form multiplication just multiplies moduli and adds arguments, which is why De Moivre\'s theorem makes powers trivial. Trying to expand (1 + i)¹⁰ by binomial expansion is a great deal of work; in polar form it takes two lines.' },
    { q: '⚖️ TELL THEM APART: a conjugate and what it is FOR', a: 'The conjugate of a + bi is a − bi — reflect in the real axis. Its purpose is that z × z̄ = a² + b², a REAL number.', explain: 'That is exactly why you multiply numerator and denominator by the conjugate of the denominator when dividing: it clears i from the bottom, the complex analogue of rationalising a surd. Also remember that for polynomials with real coefficients, complex roots always occur in conjugate pairs.' },

    /* ---- reasoning depth ---- */
    { q: 'State De Moivre\'s theorem and explain why it works', a: '(r cis θ)ⁿ = rⁿ cis(nθ). It works because multiplying complex numbers multiplies the moduli and adds the arguments, so raising to the nth power multiplies the modulus n times and adds the argument n times.', explain: 'Seeing it as repeated multiplication rather than a formula to memorise makes the roots case natural too: to find nth roots you take the nth root of the modulus and DIVIDE the argument by n, then add 2πk/n to reach all n roots.' },
    { q: 'How do you find all n of the nth roots of a complex number?', a: 'Write it in polar form, take the nth root of the modulus, and use arguments (θ + 2πk)/n for k = 0, 1, …, n−1.', explain: 'The 2πk term is essential — without it you find only one root. Geometrically all n roots lie equally spaced around a circle of radius ⁿ√r, separated by 2π/n radians. Sketching that circle is a fast way to check you have found the right number of roots in the right places.' },
    { q: 'Why do complex roots of real polynomials come in conjugate pairs?', a: 'Because taking the conjugate of the whole equation leaves the real coefficients unchanged, so if z is a root then z̄ must satisfy the equation too.', explain: 'The practical consequence is worth marks: a real cubic must have at least one real root, since three roots cannot pair up completely. And if you are told 2 + 3i is a root of a real polynomial, you immediately have 2 − 3i as well, giving a real quadratic factor.' },
    { q: 'What does multiplying by i do geometrically, and why?', a: 'It rotates the point 90° anticlockwise about the origin, because i has modulus 1 and argument 90° — multiplying adds arguments and multiplies moduli.', explain: 'This makes i⁴ = 1 obvious: four 90° rotations return you to the start. Treating complex multiplication as rotation-and-scaling turns many Argand-diagram questions into geometry rather than algebra.' },
    { q: 'How do you divide complex numbers in rectangular form?', a: 'Multiply numerator and denominator by the CONJUGATE of the denominator, which makes the denominator real, then separate into real and imaginary parts.', explain: 'It is the direct analogue of rationalising a surd denominator. In polar form division is far easier — divide the moduli and subtract the arguments — so if the numbers are already polar, do not convert back.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Complex-number notation is compact and each part carries meaning. Here is every symbol used on this page.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used with complex numbers', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'i', def: 'The <strong>imaginary unit</strong>, defined by i² = −1. It is not an approximation — it is a definition.' },
          { term: 'z', def: 'The conventional letter for a <strong>complex number</strong>: z = a + bi, where a is the real part and b the imaginary part.' },
          { term: 'z̄ <span class="xs">(z with a bar — the conjugate)</span>', def: 'The <strong>conjugate</strong>: flip the sign of the imaginary part. If z = a + bi then z̄ = a − bi.', note: 'z × z̄ = a² + b², which is REAL — that is why you multiply by the conjugate to divide.' },
          { term: '|z| <span class="xs">(modulus)</span>', def: 'The <strong>distance from the origin</strong> on an Argand diagram: |z| = √(a² + b²). Always positive.', note: 'The same bars mean absolute value for a real number — it is the same idea, distance from zero.' },
          { term: 'arg(z) <span class="xs">(argument)</span>', def: 'The <strong>angle</strong> from the positive real axis to the point, measured anticlockwise.', note: 'A calculator’s arctan only returns −90° to 90°, so always sketch the point to get the right quadrant.' },
          { term: 'cis θ', def: 'Shorthand for <strong>cos θ + i sin θ</strong>. So z = r cis θ is the polar form, with r = |z|.' },
          { term: 'r', def: 'The <strong>modulus</strong> when written in polar form — the same thing as |z|.' },
          { term: 'Argand diagram', def: 'A graph with the <strong>real part on the x-axis</strong> and the <strong>imaginary part on the y-axis</strong>. Complex numbers become points.' },
        ]},
        { t: 'tip', title: 'Why polar form exists', html: 'Multiplying in polar form multiplies the moduli and ADDS the arguments. That is why De Moivre’s theorem makes powers and roots easy, and why multiplying by i is a 90° rotation.' },
      ],
    },
    {
      id: 'arithmetic', num: '1', title: 'Arithmetic & the conjugate',
      video: 'NCEA Level 3 calculus complex numbers polar form De Moivre',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Definition', eq: 'i² = −1 ;  z = a + bi', note: 'a = real part Re(z), b = imaginary part Im(z).' },
          { name: 'Conjugate', eq: 'z = a + bi  ⟹  z̄ = a − bi', note: 'z·z̄ = a² + b² (a real number).' },
          { name: 'Modulus', eq: '|z| = √(a² + b²)', note: 'Distance from the origin on the Argand plane.' },
          { name: 'Division (multiply by conjugate)', eq: '(a+bi)/(c+di) = (a+bi)(c−di) / (c²+d²)', tex: '\\frac{a+bi}{c+di}=\\frac{(a+bi)(c-di)}{c^2+d^2}', note: 'Multiply top and bottom by the conjugate of the denominator.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Dividing complex numbers', problem: 'Simplify (3 + 2i) / (1 − i).', steps: [
          'Multiply top and bottom by the conjugate (1 + i):',
          '= (3 + 2i)(1 + i) / [(1 − i)(1 + i)] = (3 + 3i + 2i + 2i²) / (1 + 1).',
          '= (3 + 5i − 2) / 2 = (1 + 5i)/2.',
        ], answer: '½ + (5/2)i.' },
      ],
    },
    {
      id: 'polar', num: '2', title: 'Argand diagram & polar form',
      blocks: [
        { t: 'p', html: `Plot z = a + bi as the point (a, b). Its distance from the origin is the modulus r = |z|, and the angle from the positive real axis is the argument θ = arg(z).` },
        { t: 'formulas', items: [
          { name: 'Polar (mod-arg) form', eq: 'z = r(cos θ + i sin θ) = r cis θ', note: 'r = √(a²+b²), and tan θ = b/a (check the quadrant!).' },
          { name: 'Multiply in polar', eq: 'r₁cisθ₁ × r₂cisθ₂ = r₁r₂ cis(θ₁+θ₂)', note: 'Multiply moduli, ADD arguments.' },
          { name: 'Divide in polar', eq: '(r₁cisθ₁)/(r₂cisθ₂) = (r₁/r₂) cis(θ₁−θ₂)', tex: '\\frac{r_1\\operatorname{cis}\\theta_1}{r_2\\operatorname{cis}\\theta_2}=\\frac{r_1}{r_2}\\operatorname{cis}(\\theta_1-\\theta_2)', note: 'Divide moduli, SUBTRACT arguments.' },
        ]},
        { t: 'key', title: 'Getting the argument right', items: [
          'Always sketch z on the Argand plane first to see which quadrant it’s in.',
          'tan θ = b/a gives a reference angle; adjust for the quadrant (add/subtract π).',
          'By convention, arg(z) is given in −π < θ ≤ π (principal argument).',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Convert to polar form', problem: 'Write z = −1 + i in polar form.', steps: [
          'r = √((−1)² + 1²) = √2.',
          'z is in the 2nd quadrant (real −, imaginary +).',
          'Reference angle: tan⁻¹(1/1) = π/4, so θ = π − π/4 = 3π/4.',
        ], answer: 'z = √2 cis(3π/4).' },
      ],
    },
    {
      id: 'de-moivre', num: '3', title: 'De Moivre’s theorem & powers',
      blocks: [
        { t: 'formulas', items: [
          { name: 'De Moivre’s theorem', eq: '(r cis θ)ⁿ = rⁿ cis(nθ)', note: 'Raise the modulus to the power n; multiply the argument by n.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'A power via De Moivre', problem: 'Find (1 + i)⁸.', steps: [
          'Polar: r = √2, θ = π/4, so 1 + i = √2 cis(π/4).',
          '(1+i)⁸ = (√2)⁸ cis(8 × π/4) = 2⁴ cis(2π).',
          '= 16 cis(2π) = 16(cos2π + i sin2π) = 16(1 + 0).',
        ], answer: '(1 + i)⁸ = 16.' },
      ],
    },
    {
      id: 'roots', num: '4', title: 'Roots of complex numbers & equations',
      blocks: [
        { t: 'formulas', items: [
          { name: 'The n nth-roots', eq: 'z^(1/n) = r^(1/n) cis( (θ + 2πk)/n ),  k = 0,1,…,n−1', tex: 'z^{1/n}=r^{1/n}\\operatorname{cis}\\!\\left(\\frac{\\theta+2\\pi k}{n}\\right),\\quad k=0,1,\\dots,n-1', note: 'There are exactly n roots, equally spaced by 2π/n around a circle of radius r^(1/n).' },
        ]},
        { t: 'key', title: 'Roots & polynomial equations', items: [
          'The n nth-roots are equally spaced around a circle — sketch them on an Argand diagram.',
          'A polynomial with real coefficients has complex roots in <strong>conjugate pairs</strong>: if a+bi is a root, so is a−bi.',
          'Use this to factorise: (z − (a+bi))(z − (a−bi)) = z² − 2az + (a²+b²), a real quadratic factor.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Cube roots of 8', problem: 'Find all cube roots of 8.', steps: [
          '8 = 8 cis(0). Roots: 8^(1/3) cis((0 + 2πk)/3) = 2 cis(2πk/3), k = 0,1,2.',
          'k=0: 2 cis 0 = 2.',
          'k=1: 2 cis(2π/3) = 2(−½ + i√3/2) = −1 + i√3.',
          'k=2: 2 cis(4π/3) = −1 − i√3.',
        ], answer: 'z = 2,  −1 + i√3,  −1 − i√3 (equally spaced 120° apart).' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Calculus L3 (91577) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91577&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA — Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars for 91577', verify: true },
  ],

  quiz: [
    { type: 'sa', q: 'What is i² ? (write the number)', accept: ['-1', '−1'], answer: '−1', explanation: 'By definition, i = √(−1), so i² = −1.' },
    { type: 'mc', q: 'To multiply two complex numbers in polar form you:', choices: ['Add moduli, add arguments', 'Multiply moduli, add arguments', 'Multiply moduli, multiply arguments', 'Add moduli, subtract arguments'], answer: 1, explanation: 'r₁cisθ₁ × r₂cisθ₂ = r₁r₂ cis(θ₁+θ₂): multiply the moduli and add the arguments.' },
    { type: 'sa', q: 'What is the modulus of z = 3 + 4i?', accept: ['5'], answer: '5', explanation: '|z| = √(3² + 4²) = √25 = 5.' },
    { type: 'mc', q: 'How many distinct 4th roots does a non-zero complex number have?', choices: ['1', '2', '4', 'Infinitely many'], answer: 2, explanation: 'A non-zero complex number has exactly n nth-roots — here 4 — equally spaced around a circle.' },
    { type: 'mc', q: 'If 2 + 3i is a root of a polynomial with real coefficients, another root must be:', choices: ['2 − 3i', '−2 + 3i', '3 + 2i', '2 + 3i again'], answer: 0, explanation: 'Complex roots of real polynomials occur in conjugate pairs, so 2 − 3i is also a root.' },

    { type: 'mc', q: 'To evaluate (1 + i)¹⁰ most efficiently, you should:', choices: ['Expand using the binomial theorem', 'Convert to polar form and apply De Moivre\'s theorem', 'Multiply out step by step', 'Use the conjugate'], answer: 1, explanation: '1 + i has modulus √2 and argument π/4, so the tenth power is (√2)¹⁰ cis(10π/4) = 32 cis(5π/2) = 32 cis(π/2) = 32i. Polar form turns a lengthy expansion into two lines — that is exactly what De Moivre is for.' },
    { type: 'mc', q: 'A real polynomial has 3 − 2i as a root. Which must ALSO be a root?', choices: ['−3 + 2i', '3 + 2i', '2 − 3i', '−3 − 2i'], answer: 1, explanation: 'For real coefficients, complex roots occur in conjugate pairs, so 3 + 2i is also a root. Together they give the real quadratic factor x² − 6x + 13, which is usually the next step in such a question.' },
    { type: 'mc', q: 'The cube roots of a complex number lie on an Argand diagram:', choices: ['On a straight line', 'Equally spaced around a circle, 120° apart', 'All at the origin', 'On the real axis'], answer: 1, explanation: 'All n roots share the modulus ⁿ√r and their arguments differ by 2π/n — here 120°. Sketching the circle is a quick check that you have found all three roots and spaced them correctly.' },
    { type: 'mc', q: 'Multiplying a complex number by i corresponds geometrically to:', choices: ['Reflection in the real axis', 'A 90° anticlockwise rotation about the origin', 'Doubling the modulus', 'A 180° rotation'], answer: 1, explanation: 'i has modulus 1 (so no scaling) and argument 90° (so a quarter-turn). This makes i² = −1 geometrically obvious — two 90° rotations give a 180° rotation, which negates the number.' },
    { type: 'sa', q: 'What do you multiply numerator and denominator by, in order to divide complex numbers in rectangular form?', accept: ['the conjugate', 'conjugate', 'the conjugate of the denominator', 'complex conjugate'], answer: 'the conjugate of the denominator', explanation: 'Because z × z̄ = a² + b² is real, this clears i from the denominator — the complex analogue of rationalising a surd.' },
  ],
};

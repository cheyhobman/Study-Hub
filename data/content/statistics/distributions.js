/* ============================================================================
   AS 91586 — Apply probability distributions (External, 4 credits) — "3.14"
   Discrete (uniform, binomial, Poisson) · continuous (normal) · model choice
   ========================================================================== */
export default {
  title: 'Apply probability distributions',
  tags: ['Normal', 'Binomial', 'Poisson', 'Model choice'],
  intro: 'Model random situations with the right distribution: binomial, Poisson and uniform (discrete) and the normal distribution (continuous). Calculate probabilities, means and standard deviations, and justify your choice of model.',

  flashcards: [
    { q: 'Write the mean and variance of a binomial distribution', a: 'mean = np, variance = np(1−p)', explain: 'n trials, probability p of success.' },
    { q: 'Write the mean and variance of a Poisson distribution', a: 'both equal λ', explain: 'A distinctive property — mean = variance.' },
    { q: 'Write the formula for standardising a value to a z-score', a: 'z = (x − μ)/σ', explain: 'How many standard deviations x is from the mean.' },
    { q: 'State the 68–95–99.7 rule', a: '≈68% within 1σ, ≈95% within 2σ, ≈99.7% within 3σ', explain: 'For a normal distribution.' },
    { q: 'When is a Poisson model appropriate?', a: 'Events occurring at a constant average rate in a fixed interval', explain: 'e.g. calls per hour.' },
    { q: 'When is a binomial model appropriate?', a: 'A fixed number of independent trials, two outcomes, constant probability', explain: '' },
    { q: 'Write the binomial probability formula', a: 'P(X=r) = ⁿCᵣ pʳ (1−p)^(n−r)', explain: 'r successes in n trials.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: binomial vs Poisson vs normal — which model fits?', a: '<strong>Binomial</strong>: fixed number of independent trials, two outcomes, constant p. <strong>Poisson</strong>: counts of events in a fixed interval of time/space, with a known mean rate and no fixed upper limit. <strong>Normal</strong>: a continuous measurement clustering symmetrically about a mean.', explain: 'Justifying the choice is worth as many marks as the calculation. Ask: am I counting successes out of a fixed n (binomial), counting occurrences with no natural maximum (Poisson), or measuring something continuous (normal)? "Number of faulty items in a box of 20" is binomial; "number of calls per hour" is Poisson; "height" is normal.' },
    { q: '⚖️ TELL THEM APART: discrete vs continuous distributions and the effect on probability', a: 'For a <strong>discrete</strong> distribution P(X = 3) is a genuine non-zero probability. For a <strong>continuous</strong> one P(X = 3) = 0 — only intervals have probability.', explain: 'This is why P(X ≤ 3) and P(X < 3) DIFFER for a binomial or Poisson but are IDENTICAL for a normal distribution. Getting that wrong is one of the most common calculation errors; read whether the boundary value is included whenever the distribution is discrete.' },
    { q: '⚖️ TELL THEM APART: the mean vs the standard deviation on a normal curve', a: 'The <strong>mean</strong> locates the centre; the <strong>standard deviation</strong> controls the spread. Changing μ slides the curve; changing σ makes it taller and narrower or shorter and wider.', explain: 'The 68–95–99.7 rule anchors σ physically: about 68% of values lie within 1σ of the mean, 95% within 2σ, 99.7% within 3σ. Sketching the curve and shading the region before calculating prevents most "wrong tail" errors.' },
    { q: '⚖️ TELL THEM APART: a z-score and what it is for', a: 'z = (x − μ)/σ — the number of standard deviations a value sits above or below the mean. It converts any normal distribution to the standard one.', explain: 'That standardisation is what makes values from different distributions comparable: a z of +2 is equally unusual whether it came from exam marks or from heights. A negative z simply means below the mean, and by symmetry P(Z < −a) = P(Z > a).' },

    /* ---- reasoning depth ---- */
    { q: 'What four conditions must hold for a binomial model to be valid?', a: 'A fixed number of trials n; each trial has exactly two outcomes; trials are INDEPENDENT; the probability of success p is constant across trials.', explain: 'Exams usually test the last two. Sampling without replacement from a small population breaks independence and changes p, so binomial would be inappropriate — though it is an acceptable approximation when the sample is a small fraction (under about 10%) of the population. Say which condition is in doubt and why.' },
    { q: 'When is a normal approximation to the binomial reasonable?', a: 'When both np and n(1−p) exceed about 5 — that is, when n is large enough and p is not too close to 0 or 1 for the distribution to be roughly symmetric.', explain: 'With small n or extreme p the binomial is strongly skewed and a symmetric normal curve fits badly. If you use the approximation, mention the continuity correction: P(X ≤ 10) discrete becomes P(X < 10.5) continuous, because you are replacing bars with a smooth curve.' },
    { q: 'Why does the shape of a distribution matter when choosing a summary measure?', a: 'Because the mean is pulled toward a long tail, so for SKEWED data the median is a better measure of centre and the IQR a better measure of spread.', explain: 'Income data is the standard example: a few very high earners drag the mean well above what a typical person earns, while the median is unaffected. Whenever a question mentions outliers or skew, justify median and IQR rather than defaulting to mean and standard deviation.' },
    { q: 'How do you decide which tail to calculate, and how do you check the answer?', a: 'Sketch the curve, mark the mean, mark the value, and shade the region the question describes. Then sanity-check: a shaded region smaller than half the curve must give a probability below 0.5.', explain: 'That single check catches most errors. If you compute 0.87 for a region that is clearly a small tail, you have found the complement — subtract from 1. Sketching takes ten seconds and is by far the highest-value habit in this topic.' },
    { q: 'What is an inverse normal problem, and how does it differ?', a: 'You are given a probability and must find the VALUE of x that produces it — working backwards from area to boundary, rather than from boundary to area.', explain: 'Typical wording: "the top 10% of students receive a scholarship — what mark is required?" Find the z with 0.90 below it (z ≈ 1.28), then rearrange z = (x − μ)/σ to x = μ + zσ. Recognising the reversed direction from the wording is the key step.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Statistics distinguishes carefully between what is true of a POPULATION and what you measured in a SAMPLE, and uses different symbols for each.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols used in probability distributions', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'μ <span class="xs">(mu)</span>', def: 'The <strong>population mean</strong> — the true average of the whole population, usually unknown.', note: 'The sample mean is written x̄ ("x-bar"). Greek = population, Roman = sample.' },
          { term: 'σ <span class="xs">(sigma, lower case)</span>', def: 'The <strong>population standard deviation</strong>. σ² is the variance.', note: 'The sample standard deviation is written s.' },
          { term: 'Σ <span class="xs">(sigma, capital)</span>', def: 'A completely different meaning: <strong>“the sum of”</strong>. Σx means add up all the x values.', note: 'Same Greek letter, two unrelated uses — capital is an instruction to add, lower case is a quantity.' },
          { term: 'λ <span class="xs">(lambda)</span>', def: 'The <strong>mean rate</strong> of a Poisson distribution — the average number of events per interval. For Poisson, mean = variance = λ.' },
          { term: 'z <span class="xs">(z-score)</span>', def: 'How many standard deviations a value sits above (+) or below (−) the mean: z = (x − μ)/σ.', note: 'Standardising lets you compare values from completely different distributions.' },
          { term: 'n and p', def: '<strong>n</strong> = number of trials, <strong>p</strong> = probability of success on one trial. Together they define a binomial distribution.' },
          { term: 'P(X = r)', def: '“The probability that the random variable X takes the value r.” Capital X is the variable; lower-case r is a particular value.' },
          { term: 'X ~ B(n, p)', def: 'Read as “X is distributed binomially with n trials and probability p”. The tilde ~ means “is distributed as”.', note: 'Similarly X ~ N(μ, σ²) means X follows a normal distribution, and X ~ Po(λ) a Poisson one.' },
        ]},
        { t: 'tip', title: 'Greek vs Roman', html: 'A useful rule across all of statistics: <strong>Greek letters describe the population</strong> (μ, σ, λ — usually unknown), <strong>Roman letters describe your sample</strong> (x̄, s, p̂ — what you actually measured).' },
      ],
    },
    {
      id: 'discrete', num: '1', title: 'Discrete distributions',
      video: 'NCEA Level 3 statistics probability distributions normal binomial Poisson',
      blocks: [
        { t: 'table', caption: 'Which distribution?', headers: ['Distribution', 'Use when…', 'Mean', 'Variance'], rows: [
          ['Uniform', 'all outcomes equally likely', '(a+b)/2', '—'],
          ['Binomial', 'fixed n trials, two outcomes, constant p, independent', 'np', 'np(1−p)'],
          ['Poisson', 'events at a constant average rate λ in a fixed interval', 'λ', 'λ'],
        ]},
        { t: 'formulas', items: [
          { name: 'Binomial probability', eq: 'P(X = r) = ⁿCᵣ pʳ (1−p)^(n−r)', tex: 'P(X=r)=\\binom{n}{r}p^{r}(1-p)^{n-r}', note: 'n trials, r successes, probability p each.' },
          { name: 'Poisson probability', eq: 'P(X = r) = e^(−λ) λʳ / r!', tex: 'P(X=r)=\\frac{e^{-\\lambda}\\lambda^{r}}{r!}', note: 'λ = mean number of events in the interval.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Binomial', problem: 'A fair coin is tossed 5 times. P(exactly 3 heads)?', steps: [
          'n = 5, p = 0.5, r = 3. P = ⁵C₃ (0.5)³(0.5)² .',
          '⁵C₃ = 10, and (0.5)⁵ = 1/32.',
          'P = 10 × 1/32 = 10/32 = 0.3125.',
        ], answer: 'P(3 heads) = 0.3125.' },
      ],
    },
    {
      id: 'normal', num: '2', title: 'The normal distribution',
      blocks: [
        { t: 'p', html: `A continuous, symmetric bell curve described by its mean μ and standard deviation σ. Probabilities are areas under the curve.` },
        { t: 'formulas', items: [
          { name: 'Standardising (z-score)', eq: 'z = (x − μ) / σ', tex: 'z=\\frac{x-\\mu}{\\sigma}', note: 'How many standard deviations x is from the mean. Then use the standard normal (or calculator).' },
        ]},
        { t: 'key', title: 'The 68–95–99.7 rule', items: [
          '≈ 68% of data within 1σ of the mean.',
          '≈ 95% within 2σ.',
          '≈ 99.7% within 3σ.',
          'Use z-scores + calculator/tables for exact probabilities; use inverse-normal to go from a probability back to an x-value.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Normal probability', problem: 'Heights are normal with μ = 170 cm, σ = 8 cm. What fraction are taller than 186 cm?', steps: [
          'z = (186 − 170)/8 = 16/8 = 2.',
          '186 cm is exactly 2σ above the mean.',
          'By the 95% rule, ~2.5% lie above +2σ.',
        ], answer: '≈ 2.5% are taller than 186 cm.' },
      ],
    },
    {
      id: 'choosing', num: '3', title: 'Choosing & justifying a model',
      blocks: [
        { t: 'connects', title: '🔗 Related in other subjects', intro: 'A real Poisson process you already study:', items: [
          { to: '#/topic/phys-91525', label: 'Physics — Modern Physics (91525)',
            why: 'Radioactive decay counts are the textbook Poisson process — random events at a constant average rate. If you have ever seen a Geiger counter’s irregular clicking, that irregularity IS the Poisson distribution. It also shows why the conditions matter: decays are independent, and the rate is constant only while the half-life is long compared with your counting window.' },
        ]},
        { t: 'key', title: 'Justify the fit', items: [
          '<strong>Binomial:</strong> fixed number of independent trials, two outcomes, constant probability.',
          '<strong>Poisson:</strong> events occurring randomly at a constant average rate; count in a fixed interval.',
          '<strong>Normal:</strong> continuous measurement, roughly symmetric and bell-shaped.',
          'State the conditions and check they’re reasonable — then comment on how well the model fits (limitations).',
        ]},
        { t: 'tip', title: 'Poisson from binomial', html: 'When n is large and p is small, a binomial is well-approximated by a Poisson with λ = np.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Statistics L3 (91586) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91586&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA — Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'You count phone calls arriving at a help desk at a constant average rate per hour. The best model is:', choices: ['Binomial', 'Poisson', 'Uniform', 'Normal'], answer: 1, explanation: 'Events at a constant average rate in a fixed interval → Poisson (mean = variance = λ).' },
    { type: 'sa', q: 'A fair coin is tossed 5 times. P(exactly 3 heads)? (decimal, 4 dp)', accept: ['0.3125', '0.313', '10/32'], answer: '0.3125', explanation: '⁵C₃ (0.5)⁵ = 10/32 = 0.3125.' },
    { type: 'mc', q: 'For the normal distribution, about what percentage of data lies within 2 standard deviations of the mean?', choices: ['68%', '95%', '99.7%', '50%'], answer: 1, explanation: 'The 68–95–99.7 rule: ≈ 95% within 2σ.' },
    { type: 'sa', q: 'For a binomial with n = 20, p = 0.3, what is the mean (np)?', accept: ['6'], answer: '6', explanation: 'Mean of a binomial = np = 20 × 0.3 = 6.' },

    { type: 'mc', q: 'The number of emails arriving per hour, with no fixed maximum, is best modelled by:', choices: ['Binomial', 'Poisson', 'Normal', 'Uniform'], answer: 1, explanation: 'Counts of events occurring in a fixed interval, with a known mean rate and no natural upper limit, is the Poisson signature. Binomial would need a fixed number of trials, which "per hour" does not provide.' },
    { type: 'mc', q: 'For a normal distribution, P(X ≤ 3) compared with P(X < 3) is:', choices: ['Larger', 'Smaller', 'Identical, because P(X = 3) = 0 for a continuous distribution', 'Undefined'], answer: 2, explanation: 'Continuous distributions assign zero probability to any single exact value, so including or excluding the endpoint changes nothing. For a DISCRETE distribution such as binomial or Poisson the two genuinely differ — a very common source of error.' },
    { type: 'mc', q: 'Sampling 30 items without replacement from a batch of 50 makes a binomial model questionable because:', choices: ['n is too large', 'The trials are not independent and p changes between draws', 'The outcomes are continuous', 'p is too small'], answer: 1, explanation: 'Removing items changes the composition of what remains, so p shifts and trials are dependent. The binomial approximation is acceptable when the sample is under about 10% of the population — 30 out of 50 is far beyond that.' },
    { type: 'mc', q: 'Household income data is strongly right-skewed. The best measures of centre and spread are:', choices: ['Mean and standard deviation', 'Median and IQR, because they resist the influence of the long tail', 'Mode and range', 'Mean and range'], answer: 1, explanation: 'A few very high incomes pull the mean upward so it no longer represents a typical household, while the median is unaffected. Justifying the choice by referring to the skew is what earns the mark, not merely naming the measures.' },
    { type: 'mc', q: 'The top 5% of a normally distributed set of marks qualify for a prize. Finding the cutoff mark is:', choices: ['A standard normal probability problem', 'An inverse normal problem — given the area, find the value', 'A binomial problem', 'Impossible without the raw data'], answer: 1, explanation: 'You are working backwards from a probability to a boundary value. Find z with 0.95 below it (≈1.645), then x = μ + zσ. Recognising the reversed direction from the wording is the key skill being tested.' },
    { type: 'sa', q: 'Approximately what percentage of normally distributed values lie within 2 standard deviations of the mean?', accept: ['95', '95%', '95 percent'], answer: '≈95%', explanation: 'The 68–95–99.7 rule: about 68% within 1σ, 95% within 2σ and 99.7% within 3σ. It is the fastest way to sanity-check any normal probability you calculate.' },
  ],
};

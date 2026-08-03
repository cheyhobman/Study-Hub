/* ============================================================================
   AS 91585 — Apply probability concepts (External, 4 credits) — "3.13"
   Probability rules · conditional · independence · trees & tables · risk
   ========================================================================== */
export default {
  title: 'Apply probability concepts',
  tags: ['Conditional', 'Independence', 'Trees', 'Risk'],
  intro: 'Working with probabilities: the addition and multiplication rules, conditional probability, independence, two-way tables and tree diagrams, and interpreting risk.',

  flashcards: [
    { q: 'Write the addition rule for P(A or B)', a: 'P(A) + P(B) − P(A and B)', explain: 'Subtract the overlap so it isn’t double-counted.' },
    { q: 'Write the multiplication rule for independent events', a: 'P(A and B) = P(A) × P(B)', explain: 'Only valid when A and B are independent.' },
    { q: 'Write the formula for conditional probability P(A|B)', a: 'P(A | B) = P(A and B) / P(B)', explain: 'The probability of A given B has happened.' },
    { q: 'A and B are independent if…', a: 'P(A | B) = P(A)', explain: 'Knowing B doesn’t change the probability of A.' },
    { q: 'Using a tree diagram', a: 'Multiply ALONG branches (AND); add BETWEEN paths (OR)', explain: 'Branch probabilities at each split sum to 1.' },
    { q: 'Write the formula for P(not A)', a: '1 − P(A)', explain: 'The complement.' },
    { q: 'Mutually exclusive events…', a: 'cannot both occur, so P(A and B) = 0', explain: 'Different from independent — mutually exclusive events are NOT independent.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: mutually exclusive vs independent', a: '<strong>Mutually exclusive</strong>: they cannot both happen, P(A and B) = 0. <strong>Independent</strong>: one happening does not change the probability of the other, P(A and B) = P(A)×P(B).', explain: 'These are almost opposites and are constantly confused. Two mutually exclusive events with non-zero probabilities are necessarily DEPENDENT — because if A happens, the probability of B drops to zero, which is a very large change. Check which property a question is describing before choosing a formula.' },
    { q: '⚖️ TELL THEM APART: P(A and B) vs P(A or B) vs P(A given B)', a: '<strong>And</strong> — both occur (multiply). <strong>Or</strong> — at least one occurs, P(A) + P(B) − P(A and B). <strong>Given</strong> — conditional, P(A and B)/P(B), which RESTRICTS the sample space to B.', explain: 'Subtracting P(A and B) in the "or" rule prevents double-counting the overlap. For "given", the key insight is that the denominator changes: you are no longer asking about everyone, only about those in B — which is why a two-way table makes conditional probability so much easier.' },
    { q: '⚖️ TELL THEM APART: risk vs relative risk', a: '<strong>Risk</strong> (absolute) is the probability of the outcome in one group. <strong>Relative risk</strong> is the ratio of risks between two groups.', explain: 'A relative risk of 2 sounds alarming but may be trivial in absolute terms — going from 1 in a million to 2 in a million doubles the relative risk while changing almost nothing practically. Media reports routinely quote relative risk alone, and spotting that omission is a strong evaluation point.' },
    { q: '⚖️ TELL THEM APART: correlation vs causation, and what would establish causation', a: 'Correlation means two variables move together. Causation requires a plausible mechanism, correct time ordering, dose–response, and control of confounders — ideally through a randomised experiment.', explain: 'A confounder is a third variable driving both. The classic: ice cream sales correlate with drownings, both driven by hot weather. In an evaluation, name a specific plausible confounder rather than saying "correlation is not causation" generically — the specific example is what earns the mark.' },

    /* ---- reasoning depth ---- */
    { q: 'Why is a two-way table so effective for conditional probability?', a: 'Because conditioning simply means restricting attention to one row or column, so P(A|B) is read directly as the cell count divided by that row or column total.', explain: 'It also makes the asymmetry visible: P(A|B) and P(B|A) use different denominators and are generally different numbers. Confusing them is the base-rate fallacy — the reason a highly accurate test for a rare disease still produces mostly false positives.' },
    { q: 'Explain why a very accurate test for a rare condition still gives many false positives', a: 'Because the number of true positives is limited by how rare the condition is, while false positives are drawn from the very large healthy majority — so they can easily outnumber true positives.', explain: 'With 1% prevalence and 95% accuracy in 10,000 people: about 95 true positives but roughly 495 false positives, so a positive result is right only about 16% of the time. This is P(disease|positive) versus P(positive|disease) — build the two-way table and it becomes obvious.' },
    { q: 'What is the difference between theoretical, experimental and model-based probability?', a: '<strong>Theoretical</strong> comes from symmetry or known structure (a fair die). <strong>Experimental</strong> comes from observed long-run relative frequency. <strong>Model-based</strong> comes from fitting a distribution to the situation.', explain: 'Exams ask you to justify which is appropriate. If the situation has no assumable symmetry — say, whether a drawing pin lands point-up — theoretical probability is unavailable and you must gather data. Discrepancy between theoretical and experimental values is itself worth discussing as evidence about the assumptions.' },
    { q: 'When can you multiply probabilities directly, and what if you cannot?', a: 'Only when the events are INDEPENDENT. If they are dependent, use P(A and B) = P(A) × P(B|A).', explain: 'Sampling without replacement makes events dependent — drawing two aces from a deck is (4/52)×(3/51), not (4/52)². Deciding whether replacement occurs is usually the first thing to establish in a probability question.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Probability notation is compact and easy to misread. Each symbol below changes the meaning of a statement completely.',
      blocks: [
        { t: 'definitions', title: '📖 Probability notation', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'P(A)', def: '“The probability that event A happens.” Always between 0 and 1.' },
          { term: 'P(A and B) <span class="xs">(∩, intersection)</span>', def: 'Both A and B happen. Multiply — but only <strong>directly</strong> if the events are independent.' },
          { term: 'P(A or B) <span class="xs">(∪, union)</span>', def: 'At least one happens. P(A) + P(B) − P(A and B). The subtraction stops the overlap being counted twice.' },
          { term: 'P(A | B) <span class="xs">(the vertical bar)</span>', def: '“The probability of A <strong>GIVEN THAT</strong> B has happened.” The bar restricts you to the cases where B is true.', note: 'P(A|B) and P(B|A) are different numbers with different denominators. Swapping them is the base-rate fallacy.' },
          { term: 'P(A′) or P(not A)', def: 'The <strong>complement</strong> — A does not happen. P(not A) = 1 − P(A).' },
          { term: 'Mutually exclusive', def: 'Cannot both happen: P(A and B) = 0.', note: 'Not the same as independent — in fact mutually exclusive events with non-zero probability are always DEPENDENT.' },
          { term: 'Independent', def: 'One happening does not change the probability of the other: P(A and B) = P(A) × P(B).' },
          { term: 'Relative risk', def: 'The RATIO of risk in one group to another. Says nothing about the ABSOLUTE size of either risk.', note: 'A doubled relative risk on a 1-in-a-million baseline is still nearly nothing.' },
        ]},
        { t: 'tip', title: 'The bar is the one to watch', html: 'P(A|B) reads left-to-right as “A given B”. The thing AFTER the bar is what you already know; the thing BEFORE it is what you are asking about.' },
      ],
    },
    {
      id: 'rules', num: '1', title: 'The probability rules',
      video: 'NCEA Level 3 statistics probability conditional independence trees',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Range', eq: '0 ≤ P(A) ≤ 1 ;  P(not A) = 1 − P(A)' },
          { name: 'Addition rule', eq: 'P(A or B) = P(A) + P(B) − P(A and B)', note: 'Subtract the overlap. Mutually exclusive ⟹ P(A and B) = 0.' },
          { name: 'Multiplication (independent)', eq: 'P(A and B) = P(A) × P(B)', note: 'Only when A and B are independent.' },
          { name: 'Conditional probability', eq: 'P(A | B) = P(A and B) / P(B)', tex: 'P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}', note: 'Probability of A given B has occurred.' },
        ]},
      ],
    },
    {
      id: 'independence', num: '2', title: 'Independence & conditional',
      blocks: [
        { t: 'key', title: 'Testing independence', items: [
          'A and B are <strong>independent</strong> if P(A | B) = P(A) — knowing B doesn’t change A.',
          'Equivalently, independent ⟺ P(A and B) = P(A) × P(B).',
          '<strong>Mutually exclusive</strong> (can’t both happen) is different — those events are NOT independent.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Conditional from a two-way table', problem: 'Of 200 people: 120 own a car; of those, 90 also own a bike. Find P(bike | car).', steps: [
          'P(bike and car) uses the 90 who own both.',
          'P(bike | car) = (owns both) / (owns car) = 90/120.',
          '= 0.75.',
        ], answer: 'P(bike | car) = 0.75.' },
      ],
    },
    {
      id: 'trees', num: '3', title: 'Tree diagrams & risk',
      blocks: [
        { t: 'key', title: 'Using trees', items: [
          'Multiply <em>along</em> branches (AND); add <em>between</em> branch-paths (OR).',
          'Branch probabilities at each split sum to 1.',
          'Great for “without replacement” problems — the second-stage probabilities change.',
        ]},
        { t: 'formulas', title: 'Risk & relative risk', items: [
          { name: 'Absolute risk', eq: 'P(event) in a group', note: 'e.g. 3 in 100 = 0.03.' },
          { name: 'Relative risk', eq: 'RR = risk(group A) / risk(group B)', tex: '\\mathrm{RR}=\\frac{\\text{risk (group A)}}{\\text{risk (group B)}}', note: 'RR = 2 means twice the risk — but check the absolute numbers too.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Without replacement', problem: 'A bag has 5 red and 3 blue. Two are drawn without replacement. P(both red)?', steps: [
          'First red: 5/8. After removing one red, 4 red of 7 remain.',
          'Second red: 4/7.',
          'P(both red) = 5/8 × 4/7 = 20/56 = 5/14.',
        ], answer: 'P(both red) = 5/14 ≈ 0.357.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Statistics L3 (91585) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91585&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA — Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'P(A or B) equals:', choices: ['P(A) + P(B)', 'P(A) × P(B)', 'P(A) + P(B) − P(A and B)', 'P(A) − P(B)'], answer: 2, explanation: 'The addition rule subtracts the overlap so it isn’t double-counted: P(A∪B) = P(A) + P(B) − P(A∩B).' },
    { type: 'sa', q: 'A bag has 5 red, 3 blue. Two drawn without replacement. P(both red) as a fraction?', accept: ['5/14', '20/56', '10/28'], answer: '5/14', explanation: '5/8 × 4/7 = 20/56 = 5/14.' },
    { type: 'mc', q: 'Events A and B are independent if:', choices: ['They cannot both occur', 'P(A|B) = P(A)', 'P(A) + P(B) = 1', 'They are mutually exclusive'], answer: 1, explanation: 'Independence means B doesn’t affect A: P(A|B) = P(A), equivalently P(A and B) = P(A)P(B).' },
    { type: 'sa', q: 'P(A)=0.6, P(B)=0.5, P(A and B)=0.3. Find P(A or B).', accept: ['0.8'], answer: '0.8', explanation: '0.6 + 0.5 − 0.3 = 0.8.' },

    { type: 'mc', q: 'Two events are mutually exclusive with P(A) = 0.3 and P(B) = 0.4. They are:', choices: ['Independent', 'Dependent, because if A occurs the probability of B becomes 0', 'Both independent and mutually exclusive', 'Impossible'], answer: 1, explanation: 'Mutually exclusive events with non-zero probabilities are necessarily dependent: A occurring changes P(B) from 0.4 to 0. Students often treat the two terms as similar when they are close to opposites.' },
    { type: 'mc', q: 'Two cards are drawn from a deck WITHOUT replacement. P(both aces) is:', choices: ['(4/52)²', '(4/52) × (3/51)', '4/52 + 3/51', '(4/52) × (4/51)'], answer: 1, explanation: 'Without replacement the events are dependent, so use P(A) × P(B|A). After removing one ace, 3 aces remain among 51 cards. Establishing whether replacement occurs should be your first step in any such question.' },
    { type: 'mc', q: 'A disease affects 1% of people. A test is 95% accurate. Someone tests positive. The probability they have the disease is approximately:', choices: ['95%', '99%', '16%', '50%'], answer: 2, explanation: 'In 10,000 people: 100 have it, so ~95 true positives; 9,900 do not, so ~495 false positives. P(disease|positive) = 95/590 ≈ 16%. The rarity of the condition dominates the test accuracy — this is the base-rate fallacy, and a two-way table makes it clear.' },
    { type: 'mc', q: 'A study reports that a food doubles your relative risk of a disease. The absolute risk goes from 2 in a million to 4 in a million. The best evaluation is:', choices: ['This is a serious health risk', 'The relative risk is dramatic but the absolute risk remains negligible — reporting only the ratio is misleading', 'The study must be wrong', 'Relative risk is always the better measure'], answer: 1, explanation: 'Relative risk without absolute risk is one of the most common ways statistics mislead in media reporting. Identifying that omission — and quoting the actual absolute figures — is exactly the critical evaluation this standard rewards.' },
    { type: 'mc', q: 'Ice cream sales correlate strongly with drowning deaths. The most likely explanation is:', choices: ['Ice cream causes drowning', 'Drowning causes ice cream sales', 'A confounding variable — hot weather increases both', 'The correlation is a calculation error'], answer: 2, explanation: 'A third variable drives both, producing correlation with no causal link between them. When evaluating, name the specific plausible confounder rather than just asserting "correlation is not causation" — the specific mechanism is what earns the mark.' },
    { type: 'sa', q: 'Which formula gives P(A or B) when A and B can both occur?', accept: ['p(a)+p(b)-p(a and b)', 'pa+pb-paandb', 'p(a) + p(b) - p(a and b)', 'add them and subtract the overlap', 'p(a)+p(b)-p(a∩b)'], answer: 'P(A) + P(B) − P(A and B)', explanation: 'Subtracting the intersection prevents double-counting the overlap. When A and B are mutually exclusive that term is zero, which is why the simpler rule works only in that special case.' },
  ],
};

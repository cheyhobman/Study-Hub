/* ============================================================================
   AS 91584, Evaluate statistically based reports (External, 4 credits), "3.12"Sampling · margin of error · surveys · causation vs correlation · study types
   ========================================================================== */
export default {
  title: 'Evaluate statistically based reports',
  tags: ['Sampling', 'Margin of error', 'Causation', 'Survey design'],
  intro: 'A reading-and-reasoning external: you critique media/research reports. The sampling, the margin of error, survey design, and whether the conclusions (especially causal ones) are actually justified.',

  flashcards: [
    { q: 'Increasing the sample size reduces which error?', a: 'Sampling error only', explain: 'Non-sampling error (bias from method) is NOT fixed by a bigger sample.' },
    { q: 'Write the rough formula for a 95% margin of error', a: 'MoE ≈ 1/√n', explain: 'For a proportion, gives roughly the ±% on the estimate.' },
    { q: 'To halve the margin of error you need…', a: '4× the sample size', explain: 'Because MoE ∝ 1/√n: diminishing returns.' },
    { q: 'Which study design can support a causal claim?', a: 'A randomised controlled experiment', explain: 'Observational studies show association only.' },
    { q: 'Explain how to challenge a claim that a correlation proves causation', a: 'Name a specific plausible lurking (confounding) variable in context', explain: 'Better than the generic phrase; also consider reverse causation & chance.' },
    { q: 'Self-selected / convenience samples are…', a: 'usually biased and unrepresentative', explain: 'e.g. online polls, phone-ins.' },
    { q: 'What does stratified sampling improve?', a: 'Representativeness (proportional groups)', explain: 'Split into strata and sample each proportionally.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: a population, a sampling frame and a sample', a: '<strong>Population</strong>. Everyone you want to draw conclusions about. <strong>Sampling frame</strong>, the list you actually sampled FROM. <strong>Sample</strong>, those you got data from.', explain: 'Bias creeps in at each gap. A phone survey about voting intentions has a frame of phone owners, missing anyone without a listed number; then non-response shrinks it further. Naming the specific gap, and who it excludes, is far stronger than saying "the sample was biased".' },
    { q: 'TELL THEM APART: an observational study vs an experiment', a: 'An <strong>experiment</strong> assigns treatments (ideally randomly), so it CAN establish causation. An <strong>observational study</strong> only records what happens, so confounders remain possible and causal claims are unsafe.', explain: 'This is the first thing to identify when evaluating a media report. If the study merely observed that coffee drinkers live longer, no headline claiming coffee CAUSES longevity is justified. Coffee drinkers may differ systematically in income, exercise or smoking.' },
    { q: 'TELL THEM APART: non-response bias vs self-selection bias', a: '<strong>Non-response</strong>: people chosen for the sample did not reply, and non-responders may differ systematically. <strong>Self-selection</strong>: people chose themselves in, so those with strong opinions are over-represented.', explain: 'Online polls and talkback surveys are the classic self-selection cases, and they can be badly unrepresentative no matter how many respond. Identifying WHICH type is present, and in which direction it likely skews the result, is the evaluation marks.' },
    { q: 'TELL THEM APART: statistical significance vs practical importance', a: 'A result can be statistically detectable yet far too small to matter in practice, particularly with very large samples.', explain: 'With a big enough sample almost any tiny difference becomes detectable. Always ask about the SIZE of the effect and whether it would change any real decision. A drug that lowers blood pressure by 0.4 mmHg may be statistically solid and clinically irrelevant.' },

    /* ---- evaluation depth ---- */
    { q: 'What questions should you ask of any statistical report you are evaluating?', a: 'Who conducted and funded it? Who exactly was sampled, and how? What was the sample size and response rate? Is it observational or experimental? Are absolute figures given, or only percentages and ratios? What comparison group was used?', explain: 'Work through these systematically rather than looking for one flaw. The strongest evaluations identify the most CONSEQUENTIAL problem and explain its likely direction: "this would overstate the effect because…", rather than listing every minor imperfection equally.' },
    { q: 'Why is a missing comparison group such a serious flaw?', a: 'Because without it you cannot tell whether the outcome is due to the treatment or would have happened anyway.', explain: '"80% of patients improved after taking the remedy" is meaningless if 80% recover unaided. This is also why placebo controls exist, people improve for many reasons, including natural recovery and expectation. Spotting an absent control group is one of the highest-value observations available.' },
    { q: 'How should you evaluate a graph in a media report?', a: 'Check whether the vertical axis starts at zero, whether the scale is uniform, whether areas or volumes are used to represent one-dimensional quantities, and whether the time window was selected to favour a conclusion.', explain: 'A truncated y-axis exaggerates small differences dramatically: the most common visual distortion in news graphics. Using a picture whose AREA scales with the value overstates the change too, because doubling both dimensions quadruples the visual impression.' },
    { q: 'What does a low response rate do to a survey, and why is sample size no defence?', a: 'It introduces non-response bias: responders may differ systematically from non-responders, so the sample no longer represents the population regardless of how many replied.', explain: 'A 5% response rate from 100,000 people is worse than a 90% response rate from 1,000, because the first is dominated by whoever felt motivated enough to answer. Precision without representativeness produces a confidently wrong answer.' },
    { q: 'Why should you be cautious about percentages given without base numbers?', a: 'Because a percentage conceals the sample size, and small samples produce dramatic-sounding percentages from tiny counts.', explain: '"Deaths rose 100%" may mean 1 death became 2. Always ask for the raw counts, and if a report gives only relative change, note that omission explicitly. It is the same issue as relative versus absolute risk, and markers reward spotting it.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'This standard is about reading other people’s statistics critically. These are the terms you need to use precisely.',
      blocks: [
        { t: 'definitions', title: '📖 Terms used when evaluating reports', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'Population vs sampling frame vs sample', def: '<strong>Population</strong> = everyone you want conclusions about. <strong>Sampling frame</strong> = the list you actually sampled from. <strong>Sample</strong> = who you got data from.', note: 'Bias creeps in at each gap. Naming WHICH gap is where the marks are.' },
          { term: 'Bias', def: 'A systematic tendency for an estimate to be wrong in a particular <strong>direction</strong>.', note: 'Bias shifts the whole interval; it does not widen it. So a bigger biased sample is more CONFIDENTLY wrong.' },
          { term: 'Non-response bias', def: 'Those who did not reply differ systematically from those who did.' },
          { term: 'Self-selection bias', def: 'People chose to take part, so those with strong opinions are over-represented. Online polls are the classic case.' },
          { term: 'Confounding variable', def: 'A third variable that influences both of the variables you are comparing, creating a correlation with no direct causal link.', note: 'Ice cream sales and drownings: both driven by hot weather.' },
          { term: 'Observational study vs experiment', def: 'An <strong>experiment</strong> assigns treatments (ideally randomly) and CAN support causation. An <strong>observational</strong> study only records what happens and cannot.' },
          { term: 'Margin of error', def: 'How far the estimate might reasonably be from the true value. Roughly 1/√n for a proportion.', note: 'Depends on sample SIZE, not on population size. A national poll needs no more people than a city one.' },
          { term: 'Relative vs absolute risk', def: '<strong>Relative</strong> = the ratio between groups. <strong>Absolute</strong> = the actual probability.', note: '“Doubles your risk” means nothing until you know the baseline. 1 in a million to 2 in a million is a doubling.' },
          { term: 'Statistical significance', def: 'A result unlikely to be due to chance alone. <strong>Not</strong> the same as being large enough to matter.', note: 'With a big enough sample, almost any tiny difference becomes detectable.' },
        ]},
        { t: 'tip', title: 'The first question to ask', html: 'Was this an experiment or an observational study? Only an experiment can support a causal claim, and most media reports describe observational studies while using causal language.' },
      ],
    },
    {
      id: 'sampling', num: '1', title: 'Sampling & error',
      video: 'NCEA Level 3 statistics evaluating statistical reports margin of error',
      blocks: [
        { t: 'key', title: 'Sampling methods', items: [
          '<strong>Simple random</strong>, everyone equally likely; the gold standard.',
          '<strong>Stratified</strong>, split into groups (strata), sample each proportionally; improves representativeness.',
          '<strong>Cluster / systematic</strong>. Practical but can introduce bias.',
          '<strong>Self-selected / convenience</strong>, cheap but usually biased and unrepresentative.',
        ]},
        { t: 'key', title: 'Two kinds of error', items: [
          '<strong>Sampling error:</strong> natural variation because we only measured a sample: shrinks as sample size grows.',
          '<strong>Non-sampling error:</strong> bias from method, poor questions, non-response, measurement error, is <em>not</em> fixed by a bigger sample.',
          'A bigger sample reduces sampling error only; it can’t rescue a biased method.',
        ]},
      ],
    },
    {
      id: 'moe', num: '2', title: 'Margin of error',
      blocks: [
        { t: 'formulas', items: [
          { name: 'Rough margin of error (95%)', eq: 'MoE ≈ 1 / √n', tex: '\\text{MoE}\\approx\\frac{1}{\\sqrt{n}}', note: 'n = sample size. For a proportion, gives roughly the ±% on the estimate.' },
          { name: 'Confidence interval', eq: 'estimate ± MoE', note: 'A 95% CI: we’re 95% confident the true value lies in this range.' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'Interpreting a poll', problem: 'A poll of n = 1000 finds 52% support. Give the approximate margin of error and interpret.', steps: [
          'MoE ≈ 1/√1000 = 1/31.6 ≈ 0.032 = 3.2%.',
          'So the 95% CI is 52% ± 3.2% = 48.8% to 55.2%.',
          'Because the interval includes 50%, the poll does NOT provide strong evidence that support is actually above half.',
        ], answer: '≈ ±3.2%; the “majority support” claim is not justified: the interval spans 50%.' },
        { t: 'tip', title: 'Bigger sample, smaller MoE', html: 'MoE ∝ 1/√n, so to halve the margin of error you need 4× the sample size. Diminishing returns.' },
      ],
    },
    {
      id: 'surveys-studies', num: '3', title: 'Survey design & study types',
      blocks: [
        { t: 'key', title: 'What to criticise in a survey', items: [
          '<strong>Leading / loaded questions</strong> that push a response.',
          '<strong>Non-response bias</strong>. Those who don’t reply may differ systematically.',
          '<strong>Self-selection</strong>. Online polls, phone-ins are not representative.',
          '<strong>Recall / social-desirability bias</strong> in the answers themselves.',
        ]},
        { t: 'key', title: 'Observational vs experimental', items: [
          '<strong>Observational study:</strong> just measures: can show association but <em>not</em> causation (lurking variables).',
          '<strong>Experiment:</strong> researcher assigns treatments (ideally randomised, controlled): can support causation.',
          'Only a well-designed randomised experiment justifies a causal claim.',
        ]},
      ],
    },
    {
      id: 'causation', num: '4', title: 'Causation vs correlation',
      blocks: [
        { t: 'p', html: `The classic trap: a report finds two things move together and claims one <em>causes</em> the other. Association is not causation.` },
        { t: 'key', title: 'Alternative explanations to raise', items: [
          '<strong>Lurking (confounding) variable</strong>, a third factor drives both (e.g. ice-cream sales & drownings ← hot weather).',
          '<strong>Reverse causation</strong>. B might cause A instead.',
          '<strong>Coincidence / chance</strong>, especially with small samples or many comparisons.',
          'Causation needs a controlled experiment, a plausible mechanism, and consistency.',
        ]},
        { t: 'mistake', title: 'Don’t just say “correlation isn’t causation”', html: 'For Merit/Excellence, name a <em>specific</em> plausible lurking variable or alternative explanation for the context, rather than the generic phrase.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, Statistics L3 (91584) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91584&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA, Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'Increasing the sample size reduces:', choices: ['Non-sampling error', 'Sampling error', 'Leading questions', 'Confounding'], answer: 1, explanation: 'A larger sample reduces sampling (random) error only. Bias from method (non-sampling error) is unaffected.' },
    { type: 'sa', q: 'A survey has n = 400. Estimate the margin of error as a percentage (use 1/√n).', accept: ['5', '5%', '0.05'], answer: '≈ 5%', explanation: 'MoE ≈ 1/√400 = 1/20 = 0.05 = 5%.' },
    { type: 'mc', q: 'A report finds coffee drinkers live longer and concludes coffee causes longevity. The best criticism is:', choices: ['The sample was too large', 'A lurking variable (e.g. wealth/lifestyle) may explain both', 'Coffee is a liquid', 'Correlation guarantees causation'], answer: 1, explanation: 'This is observational, so a confounding variable (like income or overall lifestyle) could drive both: causation isn’t justified.' },
    { type: 'mc', q: 'Which study design can best support a causal claim?', choices: ['An online self-selected poll', 'An observational survey', 'A randomised controlled experiment', 'A convenience sample'], answer: 2, explanation: 'Randomised controlled experiments control for confounders, so they can support causation.' },

    { type: 'mc', q: 'An online poll on a news site finds 78% oppose a policy. The most serious problem is:', choices: ['The sample is too small', 'Self-selection bias: respondents chose themselves, so strong opinions are over-represented', 'The percentage is too precise', 'Online polls are always accurate'], answer: 1, explanation: 'People with strong feelings are far more likely to click through and vote, so the result reflects the motivated minority rather than the population. No increase in the number of respondents fixes this, because the selection mechanism itself is biased.' },
    { type: 'mc', q: 'A study observes that people who eat breakfast weigh less, and the headline claims breakfast causes weight loss. The flaw is:', choices: ['The sample was too small', 'It is observational, so confounders such as overall lifestyle could explain the association', 'Weight cannot be measured accurately', 'Percentages were not given'], answer: 1, explanation: 'Only a randomised experiment can support a causal claim. Breakfast eaters may also exercise more, smoke less or have higher incomes. Any of which could drive the association. Naming a specific plausible confounder is what earns the mark.' },
    { type: 'mc', q: 'A bar graph shows sales "soaring", but the y-axis runs from 98 to 102. This is:', choices: ['Good practice for showing detail', 'A truncated axis that visually exaggerates a small difference', 'Impossible', 'Required for large numbers'], answer: 1, explanation: 'Starting the axis away from zero magnifies tiny variations into dramatic-looking changes. It is the most common visual distortion in media graphics, and identifying it, plus stating that the real change is about 4%, is a strong evaluation point.' },
    { type: 'mc', q: '"80% of users reported improvement after using our remedy."The key missing element is:', choices: ['The exact number of users', 'A comparison group showing what happens without the remedy', 'The price', 'The duration of the study'], answer: 1, explanation: 'Without a control group you cannot tell whether the remedy did anything: many conditions improve on their own. This is exactly why placebo-controlled trials exist, and an absent comparison group is among the most consequential flaws you can identify.' },
    { type: 'mc', q: 'A survey mails 100,000 forms and receives 4,000 back. Compared with a survey of 800 with a 90% response rate, it is:', choices: ['Better, because the sample is larger', 'Probably worse, because a 4% response rate risks severe non-response bias', 'Equally reliable', 'Better if weighted'], answer: 1, explanation: 'Representativeness matters more than raw size. A 4% response rate means the result is dominated by whoever was motivated to reply, who may differ systematically from everyone else. A large biased sample is simply precisely wrong.' },
    { type: 'sa', q: 'What type of study design is required before a causal claim can be justified?', accept: ['experiment', 'randomised experiment', 'an experiment', 'randomized experiment', 'randomised controlled trial', 'rct', 'experimental'], answer: 'a randomised experiment', explanation: 'Random assignment to treatment groups balances confounders, known and unknown, across the groups, so a difference in outcome can be attributed to the treatment. Observational studies can only establish association.' },
  ],
};

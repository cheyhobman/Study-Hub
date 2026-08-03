/* ============================================================================
   AS 91582 — Use statistical methods to make a formal inference (Internal, 4 cr)
   "3.10"  — bootstrapping · confidence intervals · making a justified call
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for — UNLESS the same content is examined
     elsewhere. Sampling variability, confidence intervals and 'can I make the call?'
     reasoning are exactly what the 91584 report-evaluation exam tests.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['stat-91584'],

  title: 'Use statistical methods to make a formal inference',
  tags: ['Bootstrap', 'Confidence interval', 'Inference', 'PPDAC'],
  intro: 'The internal where you take two samples, build a <strong>bootstrap confidence interval</strong> for the difference between their medians, and make a <em>formal inference</em> back to the populations. The marks are in the reasoning, not the button-pressing — you have to say what the interval means and how confident you can be.',

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'Inference is careful about the difference between the population and your sample, and the notation encodes that difference.',
      blocks: [
        { t: 'definitions', title: '📖 Notation used in formal inference', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'μ <span class="xs">(mu)</span>', def: 'The <strong>population</strong> mean — the true value you are trying to estimate. Almost always unknown.' },
          { term: 'x̄ <span class="xs">(x-bar)</span>', def: 'The <strong>sample</strong> mean — what you actually calculated from your data.', note: 'Greek = population (unknown), Roman = sample (measured). That convention runs through all of statistics.' },
          { term: 'σ and s', def: '<strong>σ</strong> (sigma) = population standard deviation; <strong>s</strong> = sample standard deviation.' },
          { term: 'n', def: 'The <strong>sample size</strong> — how many observations you collected.' },
          { term: 'Confidence interval', def: 'A range of plausible values for the population parameter, e.g. “between 5 g and 21 g”.', note: '“95% confidence” describes the long-run reliability of the METHOD, not the probability that this one interval is right.' },
          { term: 'Bootstrap', def: 'Resampling <strong>with replacement</strong> from your own sample, many times, to see how much the statistic varies.', note: 'Each resample must be the SAME SIZE as the original, because sampling variability depends on n.' },
          { term: 'Sampling variability', def: 'The natural variation between different random samples from the same population. It is what a confidence interval measures.', note: 'Different from measurement error and from bias — an interval accounts for this and nothing else.' },
          { term: 'Point estimate', def: 'A single best-guess value (e.g. the sample median), as opposed to an interval.' },
        ]},
        { t: 'tip', title: 'The wording that earns the marks', html: 'Your conclusion must be about the POPULATION, name the parameter, and give a direction: “I am confident the median weight of ALL apples from orchard A is greater than…”. A statement about the sample alone earns nothing.' },
      ],
    },
    {
      id: 'the-task', num: '1', title: 'What this standard actually asks',
      intro: 'One sentence: “Is there a real difference between these two groups in the population, or could this just be sampling variation?”',
      blocks: [
        { t: 'key', title: 'The shape of the whole report', items: [
          '<strong>Problem</strong> — pose a comparison question about two <em>populations</em>, using a measurement variable.',
          '<strong>Plan / Data</strong> — describe the sampling: how the samples were taken, sample sizes, and any issues.',
          '<strong>Analysis</strong> — plot both samples, describe them, then bootstrap to get a confidence interval for the <em>difference between medians</em>.',
          '<strong>Conclusion</strong> — make the formal inference, justify it from the interval, and discuss limitations.',
        ]},
        { t: 'tip', title: 'The single most important wording rule', html: 'Your question and your conclusion must both be about the <strong>population</strong>, not the sample. Write “I want to find out if <em>the median height of all Year 13 boys</em> is greater than…”, never “if the median height of my sample is greater”. Sample-level questions cannot earn the standard.' },
      ],
    },

    {
      id: 'bootstrapping', num: '2', title: 'Bootstrapping — what it is and why it works',
      video: 'NCEA Level 3 statistics bootstrapping confidence interval explained',
      blocks: [
        { t: 'p', html: `You only have <em>one</em> sample from each population, but you need to know how much the difference between medians would <strong>vary</strong> if you took the samples again. Bootstrapping simulates that.` },
        { t: 'key', title: 'The bootstrap procedure', items: [
          'Take your original sample of size n. <strong>Resample n values from it, WITH replacement</strong> — so some values appear twice, some not at all. That is one bootstrap sample.',
          'Do this for both groups, and calculate the <strong>difference between the two medians</strong>.',
          'Repeat this whole process ~1000 times, recording the difference each time.',
          'You now have a <strong>bootstrap distribution</strong> of the difference between medians.',
          'Chop off the bottom 5% and top 5% — the middle 90% is your <strong>90% confidence interval</strong>.',
        ]},
        { t: 'note', title: 'Why "with replacement" matters', html: 'Resampling <em>without</em> replacement would just give you your original sample back every time, with zero variation. Sampling with replacement is what lets the bootstrap sample differ from the original — and that variation is a stand-in for the sampling variation you would get from re-sampling the real population.' },
        { t: 'mistake', title: 'The conceptual trap', html: 'Bootstrapping does <strong>not</strong> tell you about the accuracy of the original sampling. If your sample was biased (say, only volunteers), the bootstrap faithfully reproduces that bias. It quantifies <em>sampling variation</em>, not <em>sampling quality</em>.' },
      ],
    },

    {
      id: 'interpreting', num: '3', title: 'Reading the confidence interval — the make-or-break bit',
      blocks: [
        { t: 'key', title: 'The three cases', items: [
          '<strong>Interval entirely above zero</strong> (e.g. 2.1 to 8.4) — you can call it: group A’s median is greater than group B’s <em>back in the populations</em>.',
          '<strong>Interval entirely below zero</strong> (e.g. −9.2 to −1.5) — the reverse call.',
          '<strong>Interval contains zero</strong> (e.g. −1.3 to 4.8) — you <strong>cannot</strong> make the call. Zero is a plausible difference, so the data are consistent with no difference at all.',
        ]},
        { t: 'example', tag: 'Worked wording', title: 'Making the call when the interval excludes zero', problem: 'Bootstrap 90% CI for (median height of boys − median height of girls) = 4.2 cm to 11.6 cm.', steps: [
          'State the interval: “I am 90% confident that the difference between the median height of all Year 13 boys and all Year 13 girls is between 4.2 cm and 11.6 cm.”',
          'Note that the whole interval is above zero.',
          '<strong>Make the formal inference:</strong> “Because the entire interval lies above zero, I can make the call that the median height of all Year 13 boys is greater than that of all Year 13 girls.”',
          'Add the practical size: “The difference is somewhere between about 4 and 12 cm — a difference large enough to be noticeable in practice.”',
        ], answer: 'Interval excludes zero ⟹ make the call, and say by roughly how much.' },
        { t: 'example', tag: 'Worked wording', title: 'When the interval INCLUDES zero', problem: 'Bootstrap 90% CI for the difference between medians = −1.3 to 4.8 marks.', steps: [
          '“I am 90% confident the difference between the population medians lies between −1.3 and 4.8 marks.”',
          '“Because this interval <strong>contains zero</strong>, a difference of zero is plausible.”',
          '<strong>Inference:</strong> “I cannot make the call that one population median is greater than the other.”',
          '⚠️ Do NOT write “there is no difference” — that overstates it. The correct wording is that you <em>cannot make the call</em>.',
        ], answer: 'Interval includes zero ⟹ no call. “Cannot make the call”, not “no difference”.' },
        { t: 'mistake', title: 'What “90% confident” does NOT mean', html: 'It does <strong>not</strong> mean there is a 90% chance the true difference is in this interval. It means: if you repeated the whole sampling-and-bootstrapping process many times, about 90% of the intervals you built would capture the true population difference. Examiners notice the difference in wording.' },
      ],
    },

    {
      id: 'excellence', num: '4', title: 'Getting to Excellence',
      blocks: [
        { t: 'key', title: 'What lifts this report', items: [
          '<strong>Describe the samples properly first</strong> — shape, centre, spread, unusual features, and always <em>in context</em> with units.',
          '<strong>Compare the two distributions</strong>, not just the medians: overlap, spread, skew, outliers. A big overlap is worth commenting on.',
          '<strong>Explain the bootstrap</strong> in your own words rather than describing button clicks.',
          '<strong>Justify the call</strong> explicitly from the interval’s position relative to zero.',
          '<strong>Discuss sampling limitations</strong> — how the sample was taken, whether it is representative, and what that means for how far you can generalise.',
          '<strong>Comment on practical significance</strong>: a statistically detectable difference can still be too small to matter in the real world. Saying so is a strong Excellence move.',
        ]},
        { t: 'tip', title: 'Sample size and interval width', html: 'Larger samples give <strong>narrower</strong> intervals (less sampling variation), which makes a call more likely. If your interval is very wide and straddles zero, note that a larger sample might have resolved it — that is good evaluative writing.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Statistics L3 (91582) assessment resources', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91582', note: 'Internal assessment resources, exemplars & conditions', verify: true },
    { label: 'NZQA — Mathematics & Statistics subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/', note: 'Assessment specifications, clarifications and exemplars', verify: true },
  ],

  flashcards: [
    { q: 'What does bootstrapping simulate?', a: 'The sampling variation you would get if you re-took the samples many times', explain: 'You only have one sample, so you resample from it (with replacement) ~1000 times to see how much the statistic bounces around.' },
    { q: 'Why must bootstrap resampling be WITH replacement?', a: 'Without replacement you would just get the original sample back every time, with no variation', explain: 'Replacement lets some values repeat and others drop out, which is what creates the variation the method depends on.' },
    { q: 'Bootstrap 90% CI for the difference in medians is 4.2 to 11.6. What do you conclude?', a: 'Make the call — the interval is entirely above zero, so the first population median is greater', explain: 'Zero is not a plausible difference, so the difference is real at the population level.' },
    { q: 'The CI is −1.3 to 4.8. What is the correct conclusion?', a: '“I cannot make the call” — the interval contains zero', explain: 'Never write “there is no difference”. Zero being plausible is not proof of no difference.' },
    { q: 'What does “90% confident” actually mean?', a: 'If the whole process were repeated many times, about 90% of the intervals built would capture the true population difference', explain: 'It is NOT “a 90% chance the true value is in this interval” — the true value is fixed; the interval is what varies.' },
    { q: 'Effect of a larger sample on the confidence interval?', a: 'It gets narrower', explain: 'Less sampling variation, so a call is more likely to be possible.' },
    { q: 'Does bootstrapping fix a biased sample?', a: 'No — it reproduces whatever bias is in the original sample', explain: 'It measures sampling VARIATION, not sampling QUALITY. Bias must be addressed in the sampling design and discussed as a limitation.' },
    { q: 'Your inference question must be about the ______, not the sample.', a: 'population', explain: 'e.g. “the median height of ALL Year 13 boys”. Sample-level questions cannot earn the standard.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: population parameter vs sample statistic', a: 'A <strong>parameter</strong> describes the whole population (μ, the true median) and is usually unknown. A <strong>statistic</strong> is calculated from your sample (x̄, the sample median) and varies from sample to sample.', explain: 'The entire point of inference is using the second to make a claim about the first. This is why your conclusion must be worded about the POPULATION — "I am confident the median weight of ALL kiwifruit from this orchard is greater…" — not about the samples you happened to draw.' },
    { q: '⚖️ TELL THEM APART: a confidence interval vs a bootstrap confidence interval', a: 'Both estimate a plausible range for a population parameter. A <strong>bootstrap</strong> interval is built by resampling WITH REPLACEMENT from your own sample many times and taking the middle 95% of the resulting statistics.', explain: 'Bootstrapping is used precisely because it makes no assumption of normality — it lets the data describe its own sampling variability. Resampling with replacement is essential: without it every resample would be identical to the original sample and you would learn nothing about variability.' },
    { q: '⚖️ TELL THEM APART: "the intervals overlap" vs "there is no difference"', a: 'Overlapping intervals mean you CANNOT make a call — the data are consistent with no difference. They do NOT prove the groups are the same.', explain: 'The correct wording is "I cannot be confident there is a difference", never "there is no difference". Absence of evidence is not evidence of absence, and a larger sample might well resolve it. Markers look specifically for this distinction.' },
    { q: '⚖️ TELL THEM APART: sampling variability vs measurement error', a: '<strong>Sampling variability</strong> is the natural variation between different random samples from the same population. <strong>Measurement error</strong> is inaccuracy in recording each value.', explain: 'A confidence interval accounts for sampling variability only. It cannot rescue you from a biased sampling method or a mis-calibrated instrument — those shift the whole interval, so you can end up confidently wrong. Say so when evaluating your process.' },
    { q: '⚖️ TELL THEM APART: what increasing the sample size does and does not do', a: 'A larger sample NARROWS the confidence interval, making your estimate more precise. It does NOT fix bias.', explain: 'A bigger biased sample is simply a more precisely wrong answer. If a question describes a convenience sample or a poor sampling frame, "take a larger sample" is the wrong improvement — the fix is a better sampling METHOD.' },

    /* ---- reasoning depth ---- */
    { q: 'What does "95% confidence" actually mean?', a: 'That if you repeated the whole sampling process many times and built an interval each time, about 95% of those intervals would contain the true population parameter.', explain: 'It is a statement about the long-run reliability of the METHOD, not a probability about this one interval. Saying "there is a 95% chance the true median is in this interval" is the classic misinterpretation — the true value is fixed; it is the interval that varies between samples.' },
    { q: 'Why must a bootstrap resample be the SAME SIZE as the original sample?', a: 'Because sampling variability depends on sample size, so to mimic the original process faithfully each resample must have n values drawn with replacement.', explain: 'A smaller resample would exaggerate variability and produce an interval that is too wide; a larger one would understate it. Sampling with replacement is what allows an n-sized resample to differ from the original at all.' },
    { q: 'How do you write a valid inferential conclusion?', a: 'Refer to the POPULATION, name the parameter and the direction, and state your confidence: "Based on this sample, I am confident that the median X of [population A] is greater than that of [population B], by somewhere between … and …".', explain: 'The three things markers check: it is about the population not the sample, it names the parameter (median, not "the fruit"), and it either commits to a direction or explicitly says you cannot make a call. Including the interval endpoints in context is what lifts it to Excellence.' },
    { q: 'Why does a bigger difference between sample medians not automatically mean a real difference?', a: 'Because what matters is the size of the difference RELATIVE to the sampling variability. A large difference with hugely variable data may still be consistent with chance.', explain: 'This is exactly what the interval for the DIFFERENCE captures: if it contains zero, chance remains a plausible explanation. Comparing the difference against the spread — rather than looking at the difference alone — is the core inferential idea of the standard.' },
    { q: 'A sample is taken only from one orchard block. State the direction the resulting bias would push the estimate, and explain why.', a: 'It would push the estimate toward whatever is typical of that block. If the block has better soil or a different cultivar, the estimated median fruit weight is systematically too high or too low for the orchard as a whole — the interval is narrow but centred in the wrong place.', explain: 'The key insight is that bias shifts the whole interval; it does not widen it. So a biased sample produces a CONFIDENT wrong answer, and a bigger sample from the same block makes it more confidently wrong. Only changing the sampling method fixes it.' },
  ],

  quiz: [
    { type: 'mc', q: 'A bootstrap 90% confidence interval for the difference between medians is −2.0 to 6.5. The correct conclusion is:', choices: ['There is no difference between the populations', 'I cannot make the call — the interval contains zero', 'The first median is greater', 'The sample was biased'], answer: 1, explanation: 'Because zero lies inside the interval, a zero difference is plausible — so you cannot make the call. That is different from proving there is no difference.' },
    { type: 'mc', q: 'Bootstrap resampling is done:', choices: ['Without replacement', 'With replacement', 'From the population directly', 'Only once'], answer: 1, explanation: 'With replacement — otherwise every resample would be identical to the original sample and there would be no variation to measure.' },
    { type: 'mc', q: 'Increasing your sample size will generally make the confidence interval:', choices: ['Wider', 'Narrower', 'Unchanged', 'Contain zero'], answer: 1, explanation: 'More data means less sampling variation, so the interval narrows and a call becomes more likely.' },
    { type: 'sa', q: 'Your inference must be made about the ______ (one word), not the sample.', accept: ['population', 'populations'], answer: 'population', explanation: 'Both the question and the conclusion must be framed at population level.' },

    { type: 'mc', q: 'Two bootstrap confidence intervals for group medians overlap substantially. The correct conclusion is:', choices: ['The groups have the same median', 'I cannot be confident there is a difference between the population medians', 'The samples were too small', 'There is definitely a difference'], answer: 1, explanation: 'Overlap means chance remains a plausible explanation — it does not demonstrate equality. The wording matters enormously: "I cannot be confident there is a difference" is correct; "there is no difference" claims far more than the data support.' },
    { type: 'mc', q: '"95% confidence" means:', choices: ['There is a 95% chance the true value lies in this interval', 'If the sampling process were repeated many times, about 95% of the intervals produced would capture the true parameter', '95% of the data lies in the interval', 'The sample is 95% accurate'], answer: 1, explanation: 'It describes the long-run reliability of the METHOD. The population parameter is a fixed number — it is the interval that changes from sample to sample, so probability statements attach to the procedure, not to this particular interval.' },
    { type: 'mc', q: 'A bootstrap resample must be:', choices: ['Smaller than the original sample', 'The same size as the original, drawn WITH replacement', 'The same size, drawn without replacement', 'Twice the original size'], answer: 1, explanation: 'Same size, because sampling variability depends on n. With replacement, because otherwise every resample would just be a reordering of the original data and would show no variability at all.' },
    { type: 'mc', q: 'A survey of 5000 people is taken entirely from one wealthy suburb. To improve it you should:', choices: ['Increase the sample to 10000', 'Change the sampling method so it covers the whole target population', 'Use a wider confidence interval', 'Bootstrap more times'], answer: 1, explanation: 'The problem is bias, not precision. A larger sample from the same unrepresentative frame just gives a narrower interval around the wrong value — more precisely wrong. Only a better sampling method fixes bias.' },
    { type: 'mc', q: 'Which conclusion is written correctly for this standard?', choices: ['"The sampled apples were heavier."', '"I am confident the median weight of all apples from orchard A is greater than that from orchard B, by between 5 g and 21 g."', '"Orchard A apples weigh 15 g more."', '"There is a 95% chance orchard A is better."'], answer: 1, explanation: 'It refers to the POPULATION not the sample, names the parameter (median weight), gives a direction, and quantifies the difference with the interval in context. The first describes only the sample; the third overstates certainty; the fourth misinterprets confidence.' },
    { type: 'sa', q: 'If the confidence interval for a DIFFERENCE contains zero, what can you conclude?', accept: ['no difference can be claimed', 'cannot claim a difference', 'not confident there is a difference', 'cannot make a call', 'no call', 'cannot be confident of a difference'], answer: 'you cannot be confident there is a difference', explanation: 'Zero being plausible means "no difference" remains consistent with your data. Note this still is not proof of equality — it is a failure to detect a difference, which a larger or better sample might yet reveal.' },
  ],
};

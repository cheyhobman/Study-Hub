/* ============================================================================
   AS 91521 — Practical Investigation (Internal, 4 credits) — "3.1"
   Designing, carrying out and analysing a physics investigation.
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for — UNLESS the same content is examined
     elsewhere. Practical method, uncertainty and linearisation are assessed ONLY by this
     internal — none of the three physics externals examine them.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: [],

  title: 'Practical Investigation',
  tags: ['Method', 'Linearising', 'Uncertainty'],
  intro: 'You design and carry out an investigation to find a relationship between two variables, then process the data — usually by linearising and taking a gradient. Excellence is about a valid method and a well-justified conclusion with uncertainty.',

  flashcards: [
    { q: 'To find g from a pendulum, what do you plot?', a: 'T² against L', explain: 'T = 2π√(L/g) ⟹ T² = (4π²/g)L, which is y = mx with gradient 4π²/g. So g = 4π²/gradient.' },
    { q: 'Why linearise data at all?', a: 'A straight line lets you extract a physical constant from the GRADIENT, and makes it easy to see whether the relationship actually holds', explain: 'Judging whether a curve fits a proposed power law by eye is unreliable; a straight line is unambiguous.' },
    { q: 'How do you estimate the uncertainty in a gradient?', a: 'Draw best-fit and worst-fit (steepest/shallowest plausible) lines through the error bars, and take half the difference', explain: 'Quote it as gradient ± uncertainty, then propagate through to your final constant.' },
    { q: 'What does an unexpected non-zero y-intercept usually indicate?', a: 'A systematic error (e.g. a zero error on an instrument, or an unaccounted constant)', explain: 'A strong evaluation names WHAT the intercept physically corresponds to.' },
    { q: 'How do you reduce the percentage uncertainty in a measurement?', a: 'Measure a larger quantity — e.g. time 20 oscillations and divide by 20', explain: 'The absolute uncertainty (reaction time ~0.2 s) is roughly fixed, so a bigger measured value makes it a smaller PERCENTAGE.' },
    { q: 'For y = kxⁿ, how do you find n experimentally?', a: 'Plot log y against log x — the gradient is n', explain: 'log y = n log x + log k. This is the standard trick when you do not know the power in advance.' },
    { q: 'Why take repeat readings?', a: 'To reduce random error and to expose anomalous results', explain: 'Average the concordant values; investigate rather than silently delete an outlier.' },
    { q: 'What must a valid conclusion do?', a: 'Answer the original question, quote the result with its uncertainty and units, and say whether it agrees with the accepted value within that uncertainty', explain: '“My value of g was 9.6 ± 0.4 m s⁻², which agrees with 9.81 within uncertainty” is a complete conclusion.' },
    { q: 'What makes a variable "controlled"?', a: 'It is deliberately held constant so it cannot affect the dependent variable', explain: 'You must say HOW you controlled it, not just list it.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: independent, dependent and controlled variables', a: '<strong>Independent</strong> — the one you deliberately change. <strong>Dependent</strong> — the one you measure in response. <strong>Controlled</strong> — everything else you deliberately hold constant.', explain: 'Naming controlled variables specifically is where marks are won: "same length of wire, same power supply voltage, same ambient temperature" beats "kept everything else the same". Your investigation is only valid if a change in the dependent variable can be attributed to the independent one alone.' },
    { q: '⚖️ TELL THEM APART: linearising a non-linear relationship', a: 'If you suspect y = kxⁿ, plot y against xⁿ and a straight line through the origin confirms it, with gradient k. If you suspect y ∝ 1/x, plot y against 1/x.', explain: 'This is the core skill of 91521. A straight line is the only graph shape the eye judges reliably, so you transform the axes until the theory predicts one. Always state WHICH quantity you plotted on each axis and what the gradient physically represents — that link is the assessed part.' },
    { q: '⚖️ TELL THEM APART: uncertainty in a single reading vs in a gradient', a: 'A single reading\'s uncertainty comes from the instrument\'s resolution (usually ± half the smallest division). A GRADIENT\'s uncertainty comes from drawing steepest and shallowest lines through the error bars and halving the difference.', explain: 'The gradient method is the one exams want in a practical report, because your final answer usually comes from a gradient rather than a single measurement. Quote it as gradient ± uncertainty with consistent units and sensible significant figures.' },
    { q: '⚖️ TELL THEM APART: a systematic error vs a random error in a graph', a: 'A <strong>systematic</strong> error shifts the whole line — typically showing as a non-zero intercept where theory predicts zero. A <strong>random</strong> error shows as scatter of points about the line.', explain: 'This makes a graph a diagnostic tool, not just a presentation. An unexpected intercept is direct evidence of a zero error or an unaccounted constant offset, and identifying it that way is a strong Excellence-level observation.' },

    /* ---- method depth ---- */
    { q: 'Why should you take a range of at least 6–8 values across a wide span?', a: 'Because a wide, well-spread range makes the trend unambiguous and the gradient far better determined; clustered points can fit many different lines within their uncertainties.', explain: 'A common weakness is taking many readings over a narrow range, which looks thorough but constrains the gradient poorly. Spread your independent variable as widely as the apparatus safely allows, and repeat each point to average out random error.' },
    { q: 'What must a good practical report say about the relationship it found?', a: 'State the mathematical form (e.g. T² ∝ L), give the gradient with its uncertainty and units, explain what the gradient physically represents, and compare with the theoretical or accepted value.', explain: 'The comparison is the Excellence step: if your gradient implies g = 9.6 ± 0.3 m s⁻², say whether the accepted 9.81 lies within your uncertainty range and, if not, identify a specific systematic error that would explain the discrepancy in the direction observed.' },
    { q: 'Why repeat readings and average, and what does it NOT fix?', a: 'Averaging reduces RANDOM error because deviations cancel over many trials. It does nothing for systematic error, which shifts every reading the same way.', explain: 'So if your evaluation says "repeat more times" as the fix for a consistent offset, it is wrong and will not gain the mark. Match each proposed improvement to the error type: repeats for random scatter, calibration or method change for systematic offsets.' },
    { q: 'How do you decide how many significant figures to quote in a final answer?', a: 'Match the precision of your least precise measurement, and quote the uncertainty to ONE significant figure, then round the value to the same decimal place.', explain: 'Writing "9.81234 ± 0.3" is self-contradictory — the uncertainty says you do not know the first decimal place reliably, so the extra digits are meaningless. Correct form is 9.8 ± 0.3 m s⁻². Markers check this consistently.' },
  ],

  sections: [
    {
      id: 'notation', num: '0', title: 'Reading the notation',
      intro: 'The practical standard has its own vocabulary for measurement and error. These are the terms the marking schedule uses.',
      blocks: [
        { t: 'definitions', title: '📖 Symbols and terms in practical work', intro: 'Cover the right column and check you can say what each one means.', items: [
          { term: 'Independent variable', def: 'The one you deliberately <strong>change</strong>. Goes on the x-axis.' },
          { term: 'Dependent variable', def: 'The one you <strong>measure</strong> in response. Goes on the y-axis.' },
          { term: 'Controlled variable', def: 'Everything you deliberately hold <strong>constant</strong> so the comparison is fair.' },
          { term: '± <span class="xs">(absolute uncertainty)</span>', def: 'The range within which the true value lies. Usually half the smallest scale division for a single reading.', note: 'A burette reading involves TWO readings, so its uncertainty doubles.' },
          { term: '% uncertainty', def: 'Absolute uncertainty ÷ measured value × 100. <strong>Add</strong> percentage uncertainties when quantities are multiplied or divided.' },
          { term: 'Gradient', def: 'The slope of a straight-line graph, rise ÷ run. Its <strong>units</strong> are y-units ÷ x-units, and it usually IS the quantity you are after.' },
          { term: 'Intercept', def: 'Where the line crosses an axis. An unexpected non-zero intercept is evidence of a <strong>systematic</strong> error.' },
          { term: 'Linearisation', def: 'Rearranging a relationship so a graph comes out straight — e.g. plotting T² against L when T ∝ √L.', note: 'A straight line is the only shape the eye judges reliably, which is why this is worth doing.' },
          { term: 'Random vs systematic', def: '<strong>Random</strong> scatters points either side of the line and IS reduced by repeating. <strong>Systematic</strong> shifts every point the same way and is NOT.' },
          { term: '∝ <span class="xs">(proportional to)</span>', def: '“Varies directly with.” y ∝ x means y = kx for some constant k.' },
        ]},
        { t: 'tip', title: 'Which error does repeating fix?', html: 'Only random error. If your evaluation proposes “repeat more times” for a systematic offset, that is wrong — the fix is calibration or a change of method.' },
      ],
    },
    {
      id: 'design', num: '1', title: 'Designing the investigation',
      blocks: [
        { t: 'key', title: 'A sound method', items: [
          'Identify the <strong>independent</strong>, <strong>dependent</strong> and <strong>controlled</strong> variables clearly.',
          'Choose a sensible range and enough values (≥ 6–8 points) with repeats.',
          'Control variables to keep the test fair; describe how.',
          'Reduce uncertainty: measure larger quantities, repeat, use appropriate instruments.',
        ]},
      ],
    },
    {
      id: 'linearising', num: '2', title: 'Linearising data',
      blocks: [
        { t: 'p', html: `Most relationships are turned into a straight line <strong>y = mx + c</strong> so the gradient gives the physics. Plot the quantity that makes it linear.` },
        { t: 'table', mono: true, caption: 'Common linearisations', headers: ['Suspected relation', 'Plot y vs x', 'Gradient gives'], rows: [
          ['T = 2π√(L/g)', 'T² vs L', '4π²/g → g'],
          ['T = 2π√(m/k)', 'T² vs m', '4π²/k → k'],
          ['v² = u² + 2as', 'v² vs s', '2a → a'],
          ['y = k/x (inverse)', 'y vs 1/x', 'k'],
        ]},
        { t: 'tip', title: 'Straight line = confirmed relationship', html: 'If plotting the linearised variables gives a straight line (through the expected intercept), that supports the relationship. Read the gradient with a best-fit line, not just two points.' },
      ],
    },
    {
      id: 'uncertainty', num: '3', title: 'Uncertainty & conclusion',
      blocks: [
        { t: 'formulas', title: 'Uncertainty rules you will actually use', items: [
          { name: 'Reading uncertainty', eq: '± half the smallest scale division (analogue) · ± the last digit (digital)', note: 'Timing by hand is dominated by reaction time, ~±0.2 s — much larger than the stopwatch resolution.' },
          { name: 'Percentage uncertainty', eq: '% = (absolute uncertainty ÷ measured value) × 100', tex: '\\%\\ \\text{uncertainty}=\\frac{\\text{absolute uncertainty}}{\\text{measured value}}\\times100' },
          { name: 'Adding / subtracting', eq: 'ADD the absolute uncertainties' },
          { name: 'Multiplying / dividing', eq: 'ADD the percentage uncertainties' },
          { name: 'Raising to a power n', eq: 'MULTIPLY the percentage uncertainty by n', note: 'So squaring a quantity doubles its % uncertainty — worth choosing what you measure carefully.' },
          { name: 'Gradient uncertainty', eq: '(steepest gradient − shallowest gradient) ÷ 2' },
        ]},
        { t: 'example', tag: 'Worked example', title: 'From gradient to g, with uncertainty', problem: 'A T² vs L graph has gradient 4.10 ± 0.15 s² m⁻¹. Find g and its uncertainty.', steps: [
          'T² = (4π²/g)L, so gradient = 4π²/g ⟹ g = 4π²/gradient.',
          'g = 4π² / 4.10 = 39.48 / 4.10 = 9.63 m s⁻².',
          '% uncertainty in gradient = (0.15/4.10) × 100 = 3.7%.',
          'g depends on gradient to the power −1, so g carries the same 3.7%: 0.037 × 9.63 = 0.36.',
          'Compare with the accepted 9.81: the difference (0.18) is smaller than the uncertainty (0.36).',
        ], answer: 'g = 9.6 ± 0.4 m s⁻², which agrees with the accepted value of 9.81 m s⁻² within experimental uncertainty.' },
        { t: 'key', title: 'For Merit / Excellence', items: [
          'Draw <strong>best-fit</strong> and <strong>worst-fit</strong> (max/min gradient) lines to estimate the uncertainty in the gradient.',
          'Quote the final result as value ± uncertainty, with sensible significant figures and units.',
          'Evaluate: largest error source, systematic vs random, and how the method could be improved.',
          'State a clear conclusion that answers the original question and references the data.',
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA — Physics L3 (91521) assessment resources', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91521', note: 'Internal assessment resources, exemplars & conditions', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'To find g from a pendulum, you should plot:', choices: ['T vs L', 'T² vs L', 'T vs L²', 'L vs T'], answer: 1, explanation: 'T = 2π√(L/g) ⟹ T² = (4π²/g)L, so T² vs L is linear with gradient 4π²/g.' },
    { type: 'mc', q: 'The best way to estimate uncertainty in a gradient is to:', choices: ['Guess', 'Use only two data points', 'Draw best-fit and worst-fit lines', 'Ignore it'], answer: 2, explanation: 'Comparing the best-fit gradient with maximum/minimum plausible (worst-fit) gradients gives the gradient uncertainty.' },

    { type: 'mc', q: 'You suspect T ∝ √L for a pendulum. To confirm it with a straight-line graph, plot:', choices: ['T against L', 'T² against L', 'T against 1/L', 'log T against L'], answer: 1, explanation: 'If T ∝ √L then T² ∝ L, so plotting T² against L gives a straight line through the origin. Squaring the axis you suspect is under a square root is the standard linearisation move.' },
    { type: 'mc', q: 'A graph that theory says should pass through the origin instead has a clear positive intercept. This most likely indicates:', choices: ['Random error', 'A systematic error such as a zero offset', 'The theory is wrong', 'Too few readings'], answer: 1, explanation: 'A consistent shift of the whole line is the signature of a systematic error — for example an instrument not zeroed. Random error would show as scatter about the line, not a displaced line.' },
    { type: 'mc', q: 'Repeating and averaging readings will reduce:', choices: ['Systematic error', 'Random error only', 'Both equally', 'Neither'], answer: 1, explanation: 'Random deviations cancel over repeats; a systematic error shifts every reading identically so averaging preserves it exactly. Proposing "more repeats" as the fix for a systematic error is a commonly penalised evaluation error.' },
    { type: 'mc', q: 'A gradient gives g = 9.6 m s⁻² with uncertainty ±0.3. The accepted value is 9.81. The correct conclusion is:', choices: ['The experiment failed', 'The accepted value lies within the uncertainty range, so the result is consistent with theory', 'g must be 9.6 here', 'The uncertainty is too small'], answer: 1, explanation: '9.6 ± 0.3 spans 9.3 to 9.9, which contains 9.81 — so the result agrees with theory within experimental uncertainty. Comparing your range with the accepted value, rather than just noting a difference, is the Excellence-level move.' },
    { type: 'sa', q: 'How many significant figures should an uncertainty normally be quoted to?', accept: ['1', 'one', '1 sf', 'one significant figure'], answer: 'one', explanation: 'Then round the measured value to the same decimal place — so 9.8 ± 0.3, never 9.81234 ± 0.3. Quoting more digits than your uncertainty justifies is self-contradictory and is routinely penalised.' },
  ],
};

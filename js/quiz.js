/* ============================================================================
   quiz.js — self-testing engine with instant feedback.
   ----------------------------------------------------------------------------
   Questions are plain data (stored per-topic in the content files):

     Multiple choice:
       { type:'mc', q:'…', choices:['…','…'], answer: 2, explanation:'…' }
       (answer = zero-based index of the correct choice)

     Short answer:
       { type:'sa', q:'…', accept:['no2','nitro'], answer:'NO₂', explanation:'…' }
       (accept = list of acceptable answers, compared case/space-insensitively)

   mountQuiz(root, { topicId, questions }) renders the whole flow and saves the
   best score to localStorage.
   ========================================================================== */

import { store } from './store.js';
import { toast, shuffle, normalise } from './ui.js';

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* Shuffle a multiple-choice question's options and re-point the answer index,
   so the correct choice isn't always in the same spot. */
function shuffleChoices(q) {
  if (q.type !== 'mc' || !Array.isArray(q.choices)) return q;
  const order = shuffle(q.choices.map((_, i) => i));
  return { ...q, choices: order.map(i => q.choices[i]), answer: order.indexOf(q.answer) };
}

/* Build a fresh, randomised run: shuffled question order + shuffled options. */
function buildDeck(questions) {
  return shuffle(questions).map(shuffleChoices);
}

export function mountQuiz(root, { topicId, questions }) {
  if (!questions || !questions.length) { root.innerHTML = ''; return; }

  let deck = buildDeck(questions);
  let i = 0;                 // current question index
  let score = 0;
  let answeredThis = false;  // guard against double-scoring

  root.innerHTML = `<div class="quiz" id="quiz-${topicId}"></div>`;
  const box = root.firstElementChild;
  render();

  function render() {
    answeredThis = false;
    const q = deck[i];
    const best = store.quizBest(topicId);
    box.innerHTML = `
      <div class="quiz-head">
        <div class="flex items-center gap-3">
          <span class="badge">Practice quiz</span>
          <span class="xs muted">shuffled each attempt</span>
          ${best ? `<span class="xs muted">· Best: ${best.score}/${best.total}</span>` : ''}
        </div>
        <span class="quiz-progress-text">Question ${i + 1} of ${deck.length}</span>
      </div>
      <div class="quiz-q"><span class="qq-num">Q${i + 1}</span>${q.q}</div>
      <div class="quiz-body"></div>
      <div class="quiz-explain" id="q-explain"></div>
      <div class="quiz-foot">
        <span class="xs muted">Score: <b id="q-score">${score}</b></span>
        <button class="btn btn-ghost btn-sm" id="q-dunno">🤷 I don't know</button>
        <button class="btn btn-primary hidden" id="q-next">Next question →</button>
      </div>`;
    q.type === 'sa' ? renderSA(q) : renderMC(q);

    /* "I don't know" reveals the answer and scores it wrong. Guessing blind on
       a multichoice inflates your average and hides the gap; admitting it does
       not. The explanation still shows, which is where the learning is. */
    box.querySelector('#q-dunno').addEventListener('click', () => {
      if (answeredThis) return;
      answeredThis = true;
      box.querySelectorAll('.quiz-choice').forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.answer) b.classList.add('correct');
      });
      const input = box.querySelector('#sa');
      if (input) { input.disabled = true; box.querySelector('#sa-check').disabled = true; }
      box.querySelector('#q-dunno').classList.add('hidden');
      finish(false, q, true);
    });
  }

  /* ---- Multiple choice ---- */
  function renderMC(q) {
    const body = box.querySelector('.quiz-body');
    body.innerHTML = `<div class="quiz-choices">${q.choices.map((c, idx) =>
      `<button class="quiz-choice" data-idx="${idx}">
        <span class="qc-key">${KEYS[idx]}</span><span>${c}</span>
      </button>`).join('')}</div>`;

    body.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answeredThis) return;
        answeredThis = true;
        const chosen = +btn.dataset.idx;
        const correct = q.answer;
        body.querySelectorAll('.quiz-choice').forEach((b, idx) => {
          b.disabled = true;
          if (idx === correct) b.classList.add('correct');
          else if (idx === chosen) b.classList.add('wrong');
        });
        finish(chosen === correct, q);
      });
    });
  }

  /* ---- Short answer ---- */
  function renderSA(q) {
    const body = box.querySelector('.quiz-body');
    body.innerHTML = `
      <div class="flex gap-3 wrap" style="align-items:stretch;">
        <input type="text" class="sa-input" id="sa" placeholder="Type your answer…" autocomplete="off" style="flex:1;min-width:200px;">
        <button class="btn btn-primary" id="sa-check">Check</button>
      </div>`;
    const input = body.querySelector('#sa');
    const check = () => {
      if (answeredThis) return;
      answeredThis = true;
      const val = normalise(input.value);
      const ok = (q.accept || []).some(a => normalise(a) === val) && val !== '';
      input.disabled = true;
      input.style.borderColor = ok ? 'var(--good)' : 'var(--bad)';
      body.querySelector('#sa-check').disabled = true;
      finish(ok, q);
    };
    body.querySelector('#sa-check').addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    input.focus();
  }

  /* ---- shared: show explanation + advance ---- */
  function finish(correct, q, dunno = false) {
    if (correct) { score++; box.querySelector('#q-score').textContent = score; }
    box.querySelector('#q-dunno')?.classList.add('hidden');
    const ex = box.querySelector('#q-explain');
    ex.innerHTML = `<b>${correct ? '✓ Correct.' : dunno ? '🤷 No worries — here it is.' : '✗ Not quite.'}</b> ${q.answer && q.type === 'sa' ? `Answer: <b>${q.answer}</b>. ` : ''}${q.explanation || ''}`;
    ex.classList.add('show');

    const next = box.querySelector('#q-next');
    next.classList.remove('hidden');
    next.textContent = i + 1 < deck.length ? 'Next question →' : 'See results →';
    next.onclick = () => {
      if (i + 1 < deck.length) { i++; render(); box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      else showResult();
    };
  }

  /* ---- final score screen ---- */
  function showResult() {
    store.saveQuiz(topicId, score, deck.length);
    const pct = Math.round((score / deck.length) * 100);
    const msg = pct === 100 ? 'Perfect — you have this nailed.'
      : pct >= 75 ? 'Strong. A couple to firm up.'
      : pct >= 50 ? 'Getting there — worth another review.'
      : 'Flag this topic and come back to it.';
    box.innerHTML = `
      <div class="quiz-result">
        <div class="qr-score">${score}<span style="color:var(--faint);font-size:0.5em;">/${deck.length}</span></div>
        <div class="qr-msg">${msg} (${pct}%)</div>
        <button class="btn btn-ghost" id="q-restart">↻ Try again</button>
      </div>`;
    box.querySelector('#q-restart').addEventListener('click', () => { deck = buildDeck(questions); i = 0; score = 0; render(); });
    if (pct === 100) toast('Quiz complete — 100%! 🎉');
  }
}

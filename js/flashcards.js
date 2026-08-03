/* ============================================================================
   flashcards.js: flip-card revision with a Leitner spaced-repetition system.
   ----------------------------------------------------------------------------
   Cards are plain data: { q, a, explain }
     q, the prompt (front)
     a, the short answer (back)
     explain, fuller reasoning, revealed by the optional "Explain this answer"
               expander so the answer side stays clean and scannable.

   LEITNER SYSTEM (simple spaced repetition)
   Each card sits in a box 1–4, stored per deck in localStorage:
       box 1 → due every session          (you got it wrong)
       box 2 → due every 2nd session
       box 3 → due every 4th session
       box 4 → due every 8th session      (you know it cold)
   Marking a card ✗ sends it straight back to box 1 (resurfaces next session);
   marking it ✓ promotes it one box. Due cards are shuffled, so order still
   varies, but weak cards come round far more often than strong ones.
   ========================================================================== */
import { shuffle } from './ui.js';
import { store } from './store.js';
import { isCardDue, nextBox, boxOf as boxOfCard } from './leitner.js';

export function mountFlashcards(root, { cards, deckId }) {
  if (!root || !cards || !cards.length) { if (root) root.innerHTML = ''; return; }

  const id = deckId || 'deck';
  const session = store.fcSession(id);          // increments once per mount
  let prog = store.fcProgress(id);              // { [i]: {box, lastSession} }

  /* A card is due if it has never been seen, or enough sessions have passed.
     The schedule itself lives in leitner.js so the revision session agrees. */
  const isDue = (i) => isCardDue(prog, session, i);

  let queue = shuffle(cards.map((_, i) => i).filter(isDue));
  let reviewingAll = false;
  if (!queue.length) { queue = shuffle(cards.map((_, i) => i)); reviewingAll = true; }

  let pos = 0;
  let flipped = false;
  let done = 0;

  render();

  function boxOf(i) { return boxOfCard(prog, i); }

  function grade(i, g) {
    prog = store.fcGrade(id, i, nextBox(boxOf(i), g), session);
    done++;
    if (pos < queue.length - 1) { pos++; flipped = false; render(); }
    else finish();
  }

  function finish() {
    const counts = [0, 0, 0, 0, 0];
    cards.forEach((_, i) => { counts[boxOf(i)]++; });
    root.innerHTML = `
      <div class="flashcards">
        <div class="fc-done">
          <div class="fcd-num">✓ ${done}</div>
          <p class="muted">cards reviewed this session.</p>
          <div class="fc-boxes">
            ${[1, 2, 3, 4].map(b => `
              <div class="fc-box"><span class="fcb-n">${counts[b]}</span>
              <span class="fcb-l">Box ${b}${b === 1 ? ' (learning)' : b === 4 ? ' (known)' : ''}</span></div>`).join('')}
          </div>
          <p class="xs muted mt-3">Cards you got wrong are in Box 1 and will come back next session. Box 4 cards won’t reappear for a while.</p>
          <div class="fc-nav center mt-3" style="justify-content:center">
            <button class="btn btn-ghost btn-sm" id="fc-again">↻ Review all cards again</button>
          </div>
        </div>
      </div>`;
    root.querySelector('#fc-again').addEventListener('click', () => {
      queue = shuffle(cards.map((_, i) => i)); pos = 0; flipped = false; done = 0; reviewingAll = true; render();
    });
  }

  function render() {
    const i = queue[pos];
    const card = cards[i];
    root.innerHTML = `
      <div class="flashcards">
        <div class="fc-head">
          <div class="flex items-center gap-3 wrap">
            <span class="badge">Flashcards</span>
            <span class="fc-count-badge">${cards.length} in deck · ${reviewingAll ? 'reviewing all' : queue.length + ' due today'}</span>
            <span class="fc-box-pill" title="Leitner box: higher means you know it better">Box ${boxOf(i)}</span>
          </div>
          <span class="fc-progress">Card ${pos + 1} of ${queue.length}</span>
        </div>

        <div class="fc-scene">
          <div class="fc-card ${flipped ? 'flipped' : ''}" id="fc-card" role="button" tabindex="0"
               aria-label="Flashcard: click to reveal the answer">
            <div class="fc-face fc-front">
              <span class="fc-tag">Question</span>
              <div class="fc-q">${card.q}</div>
              <span class="fc-flip-hint">click to reveal ⟳</span>
            </div>
            <div class="fc-face fc-back">
              <span class="fc-tag">Answer</span>
              <div>
                <div class="fc-a">${card.a}</div>
                ${card.explain ? `
                  <details class="fc-explain-toggle">
                    <summary>Explain this answer</summary>
                    <div class="fc-explain-body">${card.explain}</div>
                  </details>` : ''}
              </div>
              <span class="fc-flip-hint">click to flip back ⟳</span>
            </div>
          </div>
        </div>

        <div class="fc-controls">
          ${flipped ? `
            <div class="fc-grade">
              <button class="btn btn-ghost btn-sm fc-dunno"  id="fc-back-dunno">Didn't know</button>
              <button class="btn btn-ghost btn-sm fc-wrong"  id="fc-no">✗ Got it wrong</button>
              <button class="btn btn-ghost btn-sm fc-nearly" id="fc-nearly">◐ Nearly</button>
              <button class="btn btn-primary btn-sm"         id="fc-yes">✓ Got it right</button>
            </div>
            <span class="xs muted"><strong>Nearly</strong> = right idea, missed a detail: the card holds its box. <em>Didn't know</em> and <em>Got it wrong</em> both send it back to Box 1.</span>` : `
            <div class="fc-nav">
              <button class="btn btn-ghost btn-sm fc-dunno" id="fc-dunno">I don't know</button>
            </div>
            <span class="xs muted">Try to answer before you flip: that effort is what makes it stick.</span>`}
        </div>
      </div>`;

    const cardEl = root.querySelector('#fc-card');
    const flip = (e) => {
      // don't flip when interacting with the explain expander or the buttons
      if (e && e.target.closest('.fc-explain-toggle')) return;
      flipped = !flipped; render();
    };
    cardEl.addEventListener('click', flip);
    cardEl.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipped = !flipped; render(); }
    });

    const yes = root.querySelector('#fc-yes'),
          no = root.querySelector('#fc-no'),
          nearly = root.querySelector('#fc-nearly');
    yes && yes.addEventListener('click', (e) => { e.stopPropagation(); grade(i, 'right'); });
    no && no.addEventListener('click', (e) => { e.stopPropagation(); grade(i, 'wrong'); });
    nearly && nearly.addEventListener('click', (e) => { e.stopPropagation(); grade(i, 'nearly'); });
    /* Same scheduling outcome as "wrong", but kept as its own button: after
       seeing the answer, "I never knew this" and "I tried and missed" are
       different things to admit, even though both need the card back tomorrow. */
    const backDunno = root.querySelector('#fc-back-dunno');
    backDunno && backDunno.addEventListener('click', (e) => { e.stopPropagation(); grade(i, 'wrong'); });
    /* "I don't know" = reveal the answer AND grade it wrong, so the card drops
       to Box 1 and comes back soon. Being honest here is what makes the
       spacing algorithm work; skipping teaches it nothing. */
    const dunno = root.querySelector('#fc-dunno');
    dunno && dunno.addEventListener('click', (e) => {
      e.stopPropagation();
      flipped = true; render();
      const el = root.querySelector('.fc-scene');
      if (el) el.insertAdjacentHTML('afterbegin',
        '<p class="dunno-note">Marked as not known. This card drops to Box 1 and will come back soon.</p>');
      const no = root.querySelector('#fc-no');
      if (no) no.focus({ preventScroll: true });
    });


  }
}

/* ============================================================================
   leitner.js: the spaced-repetition schedule, in ONE place.
   ----------------------------------------------------------------------------
   Every card sits in a box 1–4. The box decides how many sessions must pass
   before the card is due again:

       box 1 → every session        (you got it wrong. Drill it)
       box 2 → every 2nd session
       box 3 → every 4th session
       box 4 → every 8th session    (you know it cold)

   Getting a card right promotes it one box; getting it wrong sends it straight
   back to box 1, so weak cards resurface far more often than strong ones.

   Both the per-topic deck (flashcards.js) and the mixed revision session
   (pages/revise.js) grade cards, and they MUST agree. If the two ever used
   different intervals the same card would be due in one place and not the
   other. Tune the schedule here and both follow.
   ========================================================================== */

export const BOX_INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 8 };   // legacy: sessions
/* Calendar days between reviews for each box. Time passing is what actually
   causes forgetting. The old scheme counted how many times you had OPENED a
   deck, so a subject you ignored for three weeks never became more due. */
export const BOX_DAYS = { 1: 1, 2: 3, 3: 7, 4: 16 };
export const MAX_BOX = 4;

const DAY = 86400000;
function today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function daysSince(iso) {
  if (!iso) return Infinity;
  const then = new Date(iso + 'T00:00');
  if (isNaN(then)) return Infinity;
  return Math.floor((today() - then) / DAY);
}

/** The box a card currently sits in (defaults to 1 for cards never seen). */
export function boxOf(progress, index) {
  return (progress[index] && progress[index].box) || 1;
}

/**
 * Is this card due?
 * Prefers CALENDAR days since it was last seen. Falls back to the old
 * session-count rule for cards graded before `lastSeen` was recorded, so
 * existing progress keeps working rather than all becoming due at once.
 */
export function isCardDue(progress, session, index) {
  const p = progress[index];
  if (!p) return true;                                  // never seen, always due
  if (p.lastSeen) return daysSince(p.lastSeen) >= BOX_DAYS[p.box || 1];
  return (session - p.lastSession) >= BOX_INTERVAL[p.box || 1];   // legacy
}

/** Whole days until this card next comes round (0 = due now). */
export function daysUntilDue(progress, index) {
  const p = progress[index];
  if (!p || !p.lastSeen) return 0;
  return Math.max(0, BOX_DAYS[p.box || 1] - daysSince(p.lastSeen));
}

/* Three grades, not two. A binary right/wrong forces you to lie in the middle:
   "I got the gist but missed a detail" is neither, and calling it WRONG throws
   away a card you nearly know while calling it RIGHT pushes it out of sight for
   a fortnight.

     'wrong'  → straight back to Box 1 (see it tomorrow)
     'nearly' → HOLD the current box, but re-date it so it comes round again on
                that box's normal interval. No progress, no punishment.
     'right'  → promote one box                                              */
export const GRADES = { wrong: 'wrong', nearly: 'nearly', right: 'right' };

/**
 * The box a card moves to after being graded.
 * @param {number} currentBox
 * @param {'wrong'|'nearly'|'right'|boolean} grade  booleans accepted for back-compat
 */
export function nextBox(currentBox, grade) {
  if (grade === true || grade === GRADES.right) return Math.min(currentBox + 1, MAX_BOX);
  if (grade === GRADES.nearly) return Math.max(1, currentBox);   // hold
  return 1;                                                      // wrong / anything else
}

/* ============================================================================
   pages/printcards.js — printable double-sided flashcards.
   ----------------------------------------------------------------------------
   THE ALIGNMENT PROBLEM
   Printing cards double-sided only works if the BACK of the sheet is laid out
   so each answer lands behind its own question after the paper is flipped.

   When a printer duplexes on the LONG edge (the default "flip on long edge"),
   the sheet turns like a book page — left/right mirrors, top/bottom does not.
   So on the back page we keep the same row order but REVERSE each row's
   columns. Card 1 sits top-left on the front, so its answer must sit
   top-RIGHT on the back.

   Front page (2 cols):        Back page (reversed per row):
     [ 1 ][ 2 ]                  [ 2 ][ 1 ]
     [ 3 ][ 4 ]                  [ 4 ][ 3 ]
     [ 5 ][ 6 ]                  [ 6 ][ 5 ]
     [ 7 ][ 8 ]                  [ 8 ][ 7 ]

   Every card is a fixed-size box on a fixed 2×4 grid, so fronts and backs are
   the same physical size and line up exactly. Cut along the guide lines.
   ========================================================================== */
import { subjectById, getSubjectContent } from '../registry.js';
import { pageHead } from './common.js';

const COLS = 2;
const ROWS = 4;
const PER_PAGE = COLS * ROWS;

/* Split a deck into pages, and mirror each row for the back sheet. */
function paginate(cards) {
  const pages = [];
  for (let i = 0; i < cards.length; i += PER_PAGE) {
    const slice = cards.slice(i, i + PER_PAGE);
    // pad the last page so the grid (and therefore the alignment) stays intact
    while (slice.length < PER_PAGE) slice.push(null);

    // back = same rows, columns reversed (long-edge duplex flip)
    const back = [];
    for (let r = 0; r < ROWS; r++) {
      const row = slice.slice(r * COLS, r * COLS + COLS);
      back.push(...row.reverse());
    }
    pages.push({ front: slice, back, startIndex: i });
  }
  return pages;
}

function cardFace(card, { side, n, subjectName }) {
  if (!card) return `<div class="pc-card pc-blank"></div>`;
  const body = side === 'front'
    ? `<div class="pc-q">${card.q}</div>`
    : `<div class="pc-a">${card.a}</div>${card.explain ? `<div class="pc-x">${card.explain}</div>` : ''}`;
  return `<div class="pc-card">
    <div class="pc-meta"><span>${subjectName}</span><span>#${n}</span></div>
    <div class="pc-body">${body}</div>
  </div>`;
}

export async function renderPrintCards(subjectId) {
  const s = subjectById[subjectId];
  if (!s) return { html: `<div class="content-inner"><div class="placeholder"><h3>Subject not found</h3></div></div>` };

  const content = await getSubjectContent(subjectId);
  const topics = (content && content.topics) || {};

  // Gather every card in the subject, tagged with its topic
  const cards = [];
  s.standards.forEach(std => {
    const t = topics[std.topicId];
    (t && t.flashcards ? t.flashcards : []).forEach(c => cards.push({ ...c, topic: std.code }));
  });

  if (!cards.length) {
    return { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">🗂</div>
      <h3>No flashcards for ${s.name} yet</h3></div></div>` };
  }

  const pages = paginate(cards);
  const sheets = pages.map((pg, pi) => `
    <section class="pc-sheet" data-side="front">
      <div class="pc-sheet-label">${s.name} · sheet ${pi + 1} · FRONT (questions) — print this side first</div>
      <div class="pc-grid">${pg.front.map((c, i) => cardFace(c, { side: 'front', n: pg.startIndex + i + 1, subjectName: c ? c.topic : '' })).join('')}</div>
    </section>
    <section class="pc-sheet" data-side="back">
      <div class="pc-sheet-label">${s.name} · sheet ${pi + 1} · BACK (answers) — columns mirrored so they align</div>
      <div class="pc-grid">${pg.back.map((c) => {
        const idx = c ? pg.front.indexOf(c) : -1;
        return cardFace(c, { side: 'back', n: idx >= 0 ? pg.startIndex + idx + 1 : '', subjectName: c ? c.topic : '' });
      }).join('')}</div>
    </section>`).join('');

  const html = `
  <div class="content-inner pc-wrap">
    <div class="no-print">
      ${pageHead({
        eyebrow: `🖨 ${s.icon} ${s.name}`,
        title: 'Print flashcards',
        lede: `${cards.length} cards, laid out ${COLS}×${ROWS} per sheet. The answer sheets are pre-mirrored so that when you print double-sided, every answer lands exactly behind its own question.`,
      })}

      <div class="callout callout-tip">
        <div class="co-icon">✓</div><div class="co-body">
          <h4>How to print these so they line up</h4>
          <p><strong>1.</strong> Hit <em>Print flashcards</em> below (or ⌘P).<br>
          <strong>2.</strong> In the print dialog choose <strong>Two-sided / Duplex → Flip on LONG edge</strong>
          (this is the usual default — it's the one that turns like a book page, not a notepad).<br>
          <strong>3.</strong> Set scale to <strong>100%</strong> and margins to <strong>Default</strong> — don't use "Fit to page", it breaks the alignment.<br>
          <strong>4.</strong> Print, then cut along the grey guide lines. Each card's answer will be on its reverse.</p>
          <p class="xs muted" style="margin-top:8px">Printing single-sided instead? The sheets still alternate front, back, front, back — just print all pages and pair them up.</p>
        </div>
      </div>

      <div class="callout callout-warn">
        <div class="co-icon">⚠</div><div class="co-body">
          <h4>If your printer flips on the SHORT edge</h4>
          <p>Some printers default to short-edge (notepad-style) flipping, which rotates the back 180°.
          If your first test sheet comes out misaligned, either switch the setting to long-edge,
          or tick the box below to re-order the backs for short-edge flipping.</p>
          <label class="flex items-center gap-3 mt-3" style="cursor:pointer">
            <input type="checkbox" id="pc-shortedge"> <span class="small">My printer flips on the short edge</span>
          </label>
        </div>
      </div>

      <div class="flex gap-3 wrap mb-5">
        <button class="btn btn-primary" id="pc-print">🖨 Print flashcards</button>
        <a class="btn btn-ghost" href="#/subject/${s.id}" data-link>← Back to ${s.name}</a>
      </div>
      <p class="print-hint mb-5">Preview below shows exactly what will print.</p>
    </div>

    <div id="pc-sheets">${sheets}</div>
  </div>`;

  return {
    html,
    onMount() {
      document.getElementById('pc-print').addEventListener('click', () => window.print());

      /* Short-edge flipping rotates the back sheet 180°, which reverses BOTH
         axes. Compensate by also reversing the row order on the back. */
      const cb = document.getElementById('pc-shortedge');
      cb.addEventListener('change', () => {
        document.querySelectorAll('.pc-sheet[data-side="back"] .pc-grid').forEach(grid => {
          const kids = [...grid.children];
          // rebuild rows in reverse order (columns are already mirrored)
          const rows = [];
          for (let r = 0; r < ROWS; r++) rows.push(kids.slice(r * COLS, r * COLS + COLS));
          grid.innerHTML = '';
          (cb.checked ? rows.reverse() : rows).forEach(row => row.forEach(el => grid.appendChild(el)));
        });
      });
    },
  };
}

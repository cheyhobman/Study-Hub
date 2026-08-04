/* ============================================================================
   search.js, wires the top-bar search box to the global index (registry.js).
   Live dropdown results, keyboard navigation ("/" to focus, ↑/↓ to move,
   Enter to open, Esc to close).
   ========================================================================== */

import { search } from './registry.js';
import { go } from './router.js';
import { qs, qsa, esc } from './ui.js';

export function initSearch() {
  const input = qs('#search-input');
  const panel = qs('#search-results');
  if (!input || !panel) return;

  let hits = [];
  let sel = -1;
  let debounce;

  function close() { panel.classList.remove('open'); sel = -1; }
  function open() { panel.classList.add('open'); }

  let indexReady = false;

  async function run() {
    const q = input.value.trim();
    if (!q) { close(); return; }

    // The first search has to load and index every content module. Show a
    // loading state rather than an empty dropdown.
    if (!indexReady) {
      panel.innerHTML = `<div class="search-empty"><span class="spinner"></span> Building search index…</div>`;
      open();
    }
    hits = await search(q, 12);
    indexReady = true;
    if (input.value.trim() !== q) return; // stale
    if (!hits.length) {
      panel.innerHTML = `<div class="search-empty">No matches for “${esc(q)}”.</div>`;
      open(); return;
    }
    panel.innerHTML = hits.map((h, i) => `
      <a class="search-hit" href="${h.url}" data-i="${i}">
        <div class="sh-title">${highlight(h.title, q)}</div>
        <div class="sh-sub">${h.isSection ? '↳ ' : ''}${esc(h.kind)}${h.sub ? ' · ' + esc(h.sub) : ''}</div>
      </a>`).join('');
    panel.insertAdjacentHTML('beforeend',
      `<div class="search-hint">↑↓ to move · ↵ to open · esc to close</div>`);
    sel = -1;
    open();
    qsa('.search-hit', panel).forEach(a => {
      a.addEventListener('click', () => setTimeout(close, 0));
    });
  }

  function highlight(text, q) {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    let out = esc(text);
    tokens.forEach(tk => {
      if (!tk) return;
      const re = new RegExp('(' + tk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  function move(dir) {
    const items = qsa('.search-hit', panel);
    if (!items.length) return;
    items.forEach(el => el.classList.remove('sel'));
    sel = (sel + dir + items.length) % items.length;
    items[sel].classList.add('sel');
    items[sel].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(run, 120); });
  input.addEventListener('focus', () => { if (input.value.trim()) run(); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') {
      const items = qsa('.search-hit', panel);
      const hit = (sel >= 0 && items[sel]) ? hits[sel] : (items[0] ? hits[0] : null);
      if (hit) { go(hit.url); input.blur(); close(); }
    } else if (e.key === 'Escape') { input.blur(); close(); }
  });

  // "/" anywhere focuses search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault(); input.focus();
    }
  });

  // click outside closes
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== input) close();
  });
}

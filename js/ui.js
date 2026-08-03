/* ============================================================================
   ui.js: rendering helpers + the "content block" renderer.
   ----------------------------------------------------------------------------
   Teaching content is authored as arrays of *blocks* (plain data). This file
   turns each block into styled HTML, so the design lives here and the content
   stays in data/content/*.js. Add a new block type by adding a `case` below.

   Block reference (the `t` field picks the type):
     { t:'p',    html }                                  paragraph(s)
     { t:'html', html }                                  raw html escape hatch
     { t:'key',  title, items:[...] }                    key-points panel
     { t:'note'|'tip'|'warn'|'mistake', title, html }    coloured callout
     { t:'table', caption, headers:[], rows:[[]], note } data table (cells = html)
     { t:'formulas', title, items:[{name, eq, note}] }   formula list
     { t:'example', tag, problem, steps:[html], answer } collapsible worked example
     { t:'reveals', title, items:[{q, a}] }              practice Q + reveal answer
     { t:'rxnmap', title, steps:[{from,arrow,to,note}] } reaction pathway rows
     { t:'figure', title, html, caption }                diagram / SVG figure
     { t:'chips', items:[...] }                           small tag chips
   ========================================================================== */

import { mathSpan, renderMathIn } from './math.js';
export { renderMathIn, mathSpan };

export const qs  = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escape untrusted text (used for search highlighting of user input). */
export function esc(s = '') {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/** Strip HTML tags -> plain text (for the search index). */
export function stripHtml(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

/* Slugify a heading into an anchor id. */
export function slug(s = '') {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* Fisher–Yates shuffle (returns a new array). Used to randomise quizzes/cards. */
export function shuffle(arr = []) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* A YouTube search URL for a topic. Always resolves to relevant videos, so it
   never goes stale the way a hard-coded video id would. */
export function ytSearch(query) {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
}

/* Build a table of the last N years of official NZQA exam papers + marking
   schedules for a 5-digit standard number, using NZQA's stable URL pattern:
     exams/{yr}/{num}-exm-{yr}.pdf   ·   schedules/{yr}/{num}-ass-{yr}.pdf   */
/* The five most recent years whose papers NZQA has actually published.
   Externals are sat Nov–Dec and the papers go up early the following year, so
   until about February the newest available set is still the year before last.
   Computed rather than hardcoded so the tables don't silently go stale. */
export function recentExamYears(n = 5, now = new Date()) {
  const latest = now.getFullYear() - (now.getMonth() >= 1 ? 1 : 2);
  return Array.from({ length: n }, (_, i) => latest - i);
}

/* Loose answer comparison for short-answer questions: case, whitespace and
   trailing punctuation are ignored. Shared by the topic quiz and the revision
   session so both accept exactly the same set of answers. */
export function normalise(s) {
  return String(s).toLowerCase().replace(/\s+/g, '').replace(/[.,;]/g, '').trim();
}

export function pastPapersTable(num, years = recentExamYears()) {
  if (!/^\d{5}$/.test(String(num))) return '';
  const base = 'https://www.nzqa.govt.nz/nqfdocs/ncea-resource';
  const rows = years.map(y => `
    <tr>
      <td class="mono">${y}</td>
      <td><a href="${base}/exams/${y}/${num}-exm-${y}.pdf" target="_blank" rel="noopener">Exam paper ${icons.ext}</a></td>
      <td><a href="${base}/schedules/${y}/${num}-ass-${y}.pdf" target="_blank" rel="noopener">Marking schedule ${icons.ext}</a></td>
      <td class="nowrap"><button class="btn btn-ghost btn-sm timed-practice"
            data-num="${num}" data-year="${y}"
            data-url="${base}/exams/${y}/${num}-exm-${y}.pdf">⏱ Timed</button></td>
    </tr>`).join('');
  return `<div class="table-wrap"><table class="data">
      <caption>Past exams &amp; marking schedules, AS ${num} (last 5 years)</caption>
      <thead><tr><th>Year</th><th>Exam paper</th><th>Marking schedule</th><th>Practice</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="xs muted" style="margin-top:6px"><strong>⏱ Timed</strong> opens the paper and starts a countdown matching the exam length. Official NZQA PDFs. If a link 404s, that year’s paper may sit under a slightly different code: browse the <a href="https://www.nzqa.govt.nz/ncea/subjects/" target="_blank" rel="noopener">NZQA subject page</a>.</p>`;
}

/* ---- Small SVG icons used across the UI ---- */
export const icons = {
  ext:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>',
  flag:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22V4"/></svg>',
  doc:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3v5h5M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>',
  play:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
};

/* ---- callout meta ---- */
const CALLOUT = {
  note:    { cls: 'callout-note',    icon: 'ℹ', label: 'Note' },
  tip:     { cls: 'callout-tip',     icon: '✓', label: 'Tip' },
  warn:    { cls: 'callout-warn',    icon: '⚠', label: 'Watch out' },
  mistake: { cls: 'callout-mistake', icon: '✕', label: 'Common mistake' },
};

/* ------------------------------------------------------------------ blocks */
export function renderBlock(b) {
  if (!b || !b.t) return '';
  switch (b.t) {
    case 'p':    return `<div class="prose">${b.html}</div>`;
    case 'html': return b.html || '';

    case 'key':
      return `<div class="keypoints">
        ${b.title ? `<h4>${b.title}</h4>` : ''}
        <ul>${(b.items || []).map(i => `<li>${i}</li>`).join('')}</ul>
      </div>`;

    case 'note': case 'tip': case 'warn': case 'mistake': {
      const c = CALLOUT[b.t];
      return `<div class="callout ${c.cls}">
        <div class="co-icon">${c.icon}</div>
        <div class="co-body">
          <h4>${b.title || c.label}</h4>
          <div>${b.html || ''}</div>
        </div>
      </div>`;
    }

    case 'table': {
      const head = b.headers ? `<thead><tr>${b.headers.map(h => `<th${/mono/.test(b.colClass || '') ? ' class="mono"' : ''}>${h}</th>`).join('')}</tr></thead>` : '';
      const body = `<tbody>${(b.rows || []).map(r =>
        `<tr>${r.map(c => `<td${b.mono ? ' class="mono"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
      return `<div class="table-wrap"><table class="data">
        ${b.caption ? `<caption>${b.caption}</caption>` : ''}${head}${body}
      </table></div>${b.note ? `<p class="xs muted" style="margin-top:6px">${b.note}</p>` : ''}`;
    }

    case 'formulas':
      return `${b.title ? `<h4 class="mb-3">${b.title}</h4>` : ''}
      <div class="formula-list">${(b.items || []).map(f => `
        <div class="formula-item">
          <div class="fi-name">${f.name}</div>
          <div class="fi-eq">${f.tex ? mathSpan(f.tex, { isTex: true, big: true }) : mathSpan(f.eq, { big: true })}</div>
          ${f.note ? `<div class="fi-note">${f.note}</div>` : ''}
        </div>`).join('')}</div>`;

    case 'example':
      return `<details class="example">
        <summary>
          <span class="ex-tag">${b.tag || 'Worked example'}</span>
          <span>${b.title || 'Show worked solution'}</span>
          <span class="ex-chev">${chev()}</span>
        </summary>
        <div class="ex-body">
          ${b.problem ? `<div class="ex-problem">${b.problem}</div>` : ''}
          <div class="ex-steps">${(b.steps || []).map(s => `<div class="ex-step"><div class="step-body">${s}</div></div>`).join('')}</div>
          ${b.answer ? `<div class="ex-answer">✓ ${b.answer}</div>` : ''}
        </div>
      </details>`;

    case 'reveals':
      return `${b.title ? `<h4 class="mb-3">${b.title}</h4>` : ''}
      <div class="reveal-list">${(b.items || []).map(it => `
        <details class="reveal">
          <summary><span class="rv-q">${it.q}</span><span class="rv-hint">Reveal</span></summary>
          <div class="rv-a">${it.a}</div>
        </details>`).join('')}</div>`;

    case 'rxnmap':
      return `${b.title ? `<h4 class="mb-3">${b.title}</h4>` : ''}
      <div class="rxn-map">${(b.steps || []).map(s => `
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:10px 0;">
          <span class="rxn-node">${s.from}</span>
          <span style="display:flex;flex-direction:column;align-items:center;min-width:120px;">
            <span class="rxn-reagent">${s.arrow || ''}</span>
            <span style="color:var(--accent);font-size:1.3rem;line-height:1;">⟶</span>
            ${s.cond ? `<span class="xs muted">${s.cond}</span>` : ''}
          </span>
          <span class="rxn-node">${s.to}</span>
          ${s.note ? `<span class="xs muted" style="flex:1;min-width:120px;">${s.note}</span>` : ''}
        </div>`).join('')}</div>`;

    case 'figure':
      return `<figure class="card" style="text-align:center;margin:var(--sp-4) 0;">
        ${b.title ? `<figcaption style="font-weight:600;margin-bottom:12px;color:var(--text-strong);text-align:left;">${b.title}</figcaption>` : ''}
        <div style="overflow-x:auto;">${b.html || ''}</div>
        ${b.caption ? `<figcaption class="xs muted" style="margin-top:12px;">${b.caption}</figcaption>` : ''}
      </figure>`;

    case 'chips':
      return `<div class="chips">${(b.items || []).map(c => `<span class="chip">${c}</span>`).join('')}</div>`;

    /* Key Definitions panel: prominent, scannable term/meaning list.
       items: [{ term, def, note? }] */
    case 'definitions':
      return `<div class="defs">
        <h4>${b.title || 'Key definitions'}</h4>
        ${b.intro ? `<p class="defs-intro">${b.intro}</p>` : ''}
        <dl class="defs-list">${(b.items || []).map(d => `
          <div class="def-item">
            <dt>${d.term}</dt>
            <dd>${d.def}${d.note ? `<span class="def-note">${d.note}</span>` : ''}</dd>
          </div>`).join('')}</dl>
      </div>`;

    /* "How this connects", explicit cross-links between standards/subjects.
       items: [{ to (href), label, why }] */
    case 'connects':
      return `<div class="connects">
        <h4>${b.title || 'How this connects'}</h4>
        ${b.intro ? `<p class="cx-intro">${b.intro}</p>` : ''}
        <div class="cx-list">${(b.items || []).map(i => `
          <a class="cx-item" href="${i.to}" ${/^#/.test(i.to) ? 'data-link' : 'target="_blank" rel="noopener"'}>
            <span class="cx-arrow">→</span>
            <span class="cx-body"><span class="cx-label">${i.label}</span>
            <span class="cx-why">${i.why}</span></span>
          </a>`).join('')}</div>
      </div>`;

    case 'video':
      return videoRow({ label: b.label || b.title, query: b.query, note: b.note });
    case 'videos':
      return `${b.title ? `<h4 class="mb-3">${b.title}</h4>` : ''}
        <div class="video-list">${(b.items || []).map(v => videoRow(v)).join('')}</div>`;

    default:
      return '';
  }
}

export function renderBlocks(blocks = []) {
  return blocks.map(renderBlock).join('\n');
}

function chev() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
}

/* A "watch on YouTube" card. Opens a YouTube search for the topic (robust: no
   dead links). `query` is the search text; `label` is what to show. */
function videoRow(v = {}) {
  const q = v.query || v.label || '';
  return `<a class="video-row" href="${ytSearch(q)}" target="_blank" rel="noopener">
    <span class="vr-play">${icons.play}</span>
    <span class="vr-main"><span class="vr-label">${v.label || 'Watch an explainer'}</span>
      <span class="vr-note">${v.note || 'Opens a YouTube search: pick a video that clicks for you'}</span></span>
    <span class="lr-ext">${icons.ext}</span>
  </a>`;
}

/* ------------------------------------------------------------------ toast */
let toastTimer;
export function toast(msg) {
  const el = qs('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ------------------------------------------------- scroll-spy for topic TOC */
export function initScrollSpy() {
  const links = qsa('.toc a');
  if (!links.length) return;
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const targets = [...map.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!targets.length) return;

  /* Scroll-position based rather than IntersectionObserver.
     ------------------------------------------------------------------
     The old version watched for a section entering a narrow band in the
     top 30% of the viewport. The LAST section could never reach that band, once the page bottoms out it simply stops moving, so "Past exams"
     never lit up no matter how far you scrolled. Computing the active
     section from scroll position sidesteps that, and lets us special-case
     the bottom of the page explicitly. */
  const LINE = 120;              // px from the top: the "you are here" line
  let raf = null;
  let current = null;

  function setActive(el) {
    if (el === current) return;  // don't thrash the DOM on every frame
    current = el;
    links.forEach(l => l.classList.toggle('active', l === el));
    if (el) el.style.setProperty('--toc-i', String(links.indexOf(el)));
  }

  function update() {
    const doc = document.documentElement;
    const scrollBottom = window.scrollY + window.innerHeight;
    const atBottom = scrollBottom >= doc.scrollHeight - 4;

    /* At the very bottom, the last section is by definition what you are
       looking at, whether or not its heading crossed the line. */
    if (atBottom) {
      setActive(map.get(targets[targets.length - 1].id));
      return;
    }

    let active = targets[0];
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= LINE) active = t;
      else break;
    }
    setActive(map.get(active.id));
  }

  /* Coalesce scroll events to one update per frame. requestAnimationFrame is
     the right tool when the page is visible, but it never fires in a hidden or
     backgrounded tab, so fall back to a short timer, which keeps the spy
     correct if the page is restored, printed, or driven headlessly. */
  const onScroll = () => {
    if (raf !== null) return;
    const run = () => { raf = null; update(); };
    raf = (typeof requestAnimationFrame === 'function' && !document.hidden)
      ? requestAnimationFrame(run)
      : setTimeout(run, 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  // Router replaces #content wholesale, so detach when these links vanish.
  const mo = new MutationObserver(() => {
    if (!document.body.contains(links[0])) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mo.disconnect();
    }
  });
  mo.observe(document.getElementById('content') || document.body, { childList: true });

  return { destroy() { window.removeEventListener('scroll', onScroll); mo.disconnect(); } };
}


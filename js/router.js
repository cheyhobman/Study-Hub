/* ============================================================================
   router.js: tiny history-based router.
   ----------------------------------------------------------------------------
   Routes are real paths, so the address bar reads studyhubnz.com/progress
   rather than studyhubnz.com/#/progress:

     /                       dashboard / home
     /flagged                flagged-for-review dashboard
     /subject/<id>           subject overview
     /topic/<topicId>        a single standard/topic
     /reference/<id>         a subject's formula / reference sheet

   ⚠️ THIS REQUIRES A HOST REWRITE. Because these are real paths, a cold load of
   /progress asks the server for a file that does not exist. Every route has to
   fall back to index.html or it 404s. vercel.json (rewrites), _redirects
   (Netlify) and 404.html (GitHub Pages) all ship with this repo for that.

   The `#` is still used for its actual purpose: an in-page anchor, as in
   /topic/chem-91388#mass-spec.

   Page renderers may return either an HTML string, or { html, onMount } where
   onMount() wires up interactivity after the HTML is inserted.
   ========================================================================== */
import { qs, qsa, renderMathIn } from './ui.js';
import { subjectIdForTopic } from './registry.js';
import { renderHome } from './pages/home.js';
import { renderSubject } from './pages/subject.js';
import { renderTopic } from './pages/topic.js';
import { renderReference } from './pages/reference.js';
import { renderFlagged } from './pages/flagged.js';
import { renderExams } from './pages/exams.js';
import { renderProgress } from './pages/progress.js';
import { renderCommandWords } from './pages/commandwords.js';
import { renderPrintCards } from './pages/printcards.js';
import { renderInternals } from './pages/internals.js';
import { renderRevise } from './pages/revise.js';
import { renderCalendar } from './pages/calendar.js';
import { renderAccount } from './pages/account.js';

let currentToken = 0; // guards against out-of-order async renders

/* Split '#/topic/chem-91388#mass-spec' into route parts + an optional in-page
   anchor. Search results link straight to a section, so the anchor has to be
   separated before it gets glued onto the topic id. */
function parse() {
  const raw = location.pathname || '/';
  return { parts: raw.split('/').filter(Boolean), anchor: location.hash.replace(/^#/, '') };
}

/** True for a URL this router should handle rather than the browser. */
function isInternal(url) {
  return url.origin === location.origin;
}

/** Navigate without a page load. Exported so pages can route programmatically. */
export function go(path, { replace = false } = {}) {
  const url = new URL(path, location.origin);
  if (url.pathname === location.pathname && url.hash === location.hash) return;
  history[replace ? 'replaceState' : 'pushState']({}, '', url);
  renderRoute();
}

async function resolve(parts) {
  if (parts.length === 0) return { view: renderHome(), navKey: 'home', subjectId: null };

  switch (parts[0]) {
    /* Four pages sit under two grouped sidebar items (see common.js
       NAV_GROUPS), so they report the GROUP's navKey, not their own. */
    case 'flagged':
      return { view: renderFlagged(), navKey: 'tools-group', subjectId: null };
    case 'exams':
      return { view: renderExams(), navKey: 'exams-group', subjectId: null };
    case 'calendar':
      return { view: renderCalendar(), navKey: 'exams-group', subjectId: null };
    case 'account':
      return { view: renderAccount(), navKey: 'account', subjectId: null };
    case 'progress':
      return { view: renderProgress(), navKey: 'progress', subjectId: null };
    case 'printcards':
      return { view: await renderPrintCards(parts[1]), navKey: parts[1], subjectId: parts[1] };
    case 'internals':
      return { view: renderInternals(parts[1] || null), navKey: 'exams-group', subjectId: null };
    case 'revise':
      return { view: renderRevise(), navKey: 'revise', subjectId: null };
    case 'command-words':
      return { view: renderCommandWords(), navKey: 'tools-group', subjectId: null };
    case 'subject':
      return { view: renderSubject(parts[1]), navKey: parts[1], subjectId: parts[1] };
    case 'reference':
      return { view: await renderReference(parts[1]), navKey: parts[1], subjectId: parts[1] };
    case 'topic': {
      const sid = subjectIdForTopic(parts[1]);
      return { view: await renderTopic(parts[1]), navKey: sid, subjectId: sid };
    }
    default:
      return {
        view: { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">🧭</div><h3>Page not found</h3><p>Back to the <a href="/" data-link>dashboard</a>.</p></div></div>` },
        navKey: null, subjectId: null,
      };
  }
}

/* A grey stand-in for the page being loaded.
   ---------------------------------------------------------------------------
   Content modules are imported lazily, so on a slow connection the OLD page sat
   there until the new one was ready and the app looked frozen. The skeleton
   claims the space immediately and roughly matches the shape of what is coming,
   so the real content does not jump when it lands.

   Shapes are per route family, because a subject page and the calendar look
   nothing alike and a generic block would move everything on arrival. */
/* ---- skeletons -------------------------------------------------------------
   A skeleton is only worth showing if it is the SHAPE of what is coming. A grey
   slab tells you nothing and still makes the content jump when it lands, so
   every one below mirrors the real component: the same cards, the same grid,
   the same table rows, the same column widths.

   They are built from real container classes (.card, .stat-row, .cal-grid)
   wherever possible, so the page is structurally correct while it loads and the
   swap to real content is close to invisible.

   Shown only after a delay (see renderRoute) so a cached page never flashes. */
const skBar = (w, h = 14, style = '') =>
  `<div class="sk" style="width:${w};height:${h}px;${style}"></div>`;

/* Measured against the real components so the first card lands in the same
   place it was drawn: .page-head is 156px + 32 margin, .section-tabs 44 + 24,
   .crumbs 24 + 16. Without this the content visibly jumped up on arrival. */
const skHead = () =>
  `<div class="sk-head">${skBar('6rem', 11)}${skBar('55%', 40)}${skBar('88%', 14)}${skBar('64%', 14)}</div>`;
const skTabs = () => `<div class="sk sk-tabs"></div>`;
const skCrumbs = () => `<div class="sk sk-crumbs"></div>`;

/* Which pages carry section tabs / breadcrumbs above the page head. */
const TABBED = new Set(['internals', 'calendar', 'exams']);
const CRUMBED = new Set(['subject', 'topic', 'reference']);

const skCard = (inner, cls = '') => `<div class="card sk-card-real ${cls}">${inner}</div>`;

const skTiles = (n = 4) =>
  `<div class="stat-row sk-stat-row">${Array.from({ length: n }, () =>
    `<div class="stat-tile sk-tile-real">${skBar('3.2rem', 30)}${skBar('80%', 11)}</div>`).join('')}</div>`;

const skRows = (n, cols) =>
  Array.from({ length: n }, () =>
    `<div class="sk-tr">${cols.map(w => `<div class="sk" style="width:${w};height:13px"></div>`).join('')}</div>`
  ).join('');

const skTable = (n, cols) =>
  `<div class="sk-table"><div class="sk-tr sk-th">${cols.map(w =>
      `<div class="sk" style="width:${w};height:10px"></div>`).join('')}</div>${skRows(n, cols)}</div>`;

const skDueList = (n = 4) =>
  `<div class="due-list sk-due">${Array.from({ length: n }, () =>
    `<div class="due-item sk-due-item">
       <span class="sk sk-dot"></span>
       <span class="sk-due-main">${skBar('70%', 13)}${skBar('45%', 10)}</span>
       <span class="sk sk-pill"></span>
     </div>`).join('')}</div>`;

function skeletonFor(parts) {
  const p = parts[0] || '';
  let body;

  if (p === 'calendar') {
    body = skCard(`${skBar('9rem', 16)}
      <div class="sk-cal-grid">${Array.from({ length: 42 },
        () => '<div class="sk sk-cell"></div>').join('')}</div>`);

  } else if (p === 'progress') {
    body = skTiles(4)
      + `<div class="sk-two">
           ${skCard(`${skBar('11rem', 18)}<div class="sk sk-donut"></div>${skBar('80%', 11)}`)}
           ${skCard(`${skBar('4rem', 18)}${skBar('100%', 38)}${skBar('90%', 11)}${skBar('60%', 30)}`)}
         </div>`
      + skCard(`${skBar('9rem', 18)}${skTable(8, ['19%', '32%', '8%', '15%', '10%'])}`);

  } else if (p === 'internals' || p === 'exams') {
    body = skTiles(4) + skCard(`${skBar('8rem', 18)}${skRows(6, ['26%', '35%', '12%', '9%'])}`);

  } else if (p === 'revise') {
    body = skCard(`${skBar('10rem', 16)}
      <div class="sk-chips">${Array.from({ length: 7 },
        () => '<div class="sk sk-chip"></div>').join('')}</div>
      ${skBar('9rem', 16, 'margin-top:22px')}
      <div class="sk-chips">${Array.from({ length: 3 },
        () => '<div class="sk sk-chip wide"></div>').join('')}</div>
      ${skBar('12rem', 40, 'margin-top:24px;border-radius:999px')}`);

  } else if (p === 'topic') {
    /* A topic page is a long article with a sticky contents rail beside it. */
    body = `<div class="sk-topic">
      <div class="sk-topic-main">
        ${Array.from({ length: 3 }, () => skCard(
          `${skBar('45%', 20)}${skBar('100%')}${skBar('97%')}${skBar('88%')}${skBar('60%')}`)).join('')}
      </div>
      <div class="sk-topic-rail">${skCard(`${skBar('60%', 12)}${skBar('90%', 11)}${skBar('80%', 11)}${skBar('85%', 11)}${skBar('70%', 11)}`)}</div>
    </div>`;

  } else if (p === 'subject') {
    body = skTiles(3)
      + `<div class="sk-grid">${Array.from({ length: 6 }, () => skCard(
          `${skBar('55%', 16)}${skBar('100%', 11)}${skBar('85%', 11)}${skBar('40%', 24)}`)).join('')}</div>`;

  } else if (p === '' || p === 'flagged') {
    /* Dashboard: hero, then What's coming, then the snapshot row. */
    body = `<div class="sk-hero">${skBar('50%', 34)}${skBar('70%', 13)}
        <div class="sk-hero-stats">${Array.from({ length: 3 },
          () => `<div>${skBar('3rem', 28)}${skBar('5rem', 10)}</div>`).join('')}</div>
        ${skBar('12rem', 42, 'border-radius:999px;margin-top:20px')}</div>`
      + skCard(`${skBar('9rem', 18)}<div class="sk-chips">${Array.from({ length: 4 },
          () => '<div class="sk sk-chip"></div>').join('')}</div>${skDueList(4)}`)
      + skCard(`${skBar('7rem', 16)}${skRows(3, ['26%', '42%', '14%'])}`);

  } else {
    body = Array.from({ length: 3 }, () => skCard(
      `${skBar('40%', 20)}${skBar('100%')}${skBar('96%')}${skBar('72%')}`)).join('');
  }

  /* A topic page carries a taller head (it holds the standard's summary card)
     and a toolbar above the article, so it gets both or the article starts
     ~190px too high and the whole page shifts on arrival. */
  const furniture = p === '' || p === 'flagged' ? ''
    : (TABBED.has(p) ? skTabs() : CRUMBED.has(p) ? skCrumbs() : '')
      + (p === 'topic' ? `<div class="sk-head sk-head-tall">${skBar('6rem', 11)}${skBar('60%', 40)}${skBar('90%', 14)}${skBar('75%', 14)}${skBar('50%', 14)}</div><div class="sk sk-toolbar"></div>`
                       : skHead());
  return `<div class="content-inner sk-wrap" aria-busy="true" aria-live="polite">
    <span class="sr-only">Loading page</span>${furniture}
    <div class="sk-body">${body}</div></div>`;
}

export async function renderRoute({ keepScroll = false } = {}) {
  const token = ++currentToken;
  const savedY = keepScroll ? window.scrollY : 0;
  const content = qs('#content');
  const { parts, anchor } = parse();

  /* Delayed on purpose. An already-imported page resolves in a few ms, and
     flashing skeletons onto it would look worse than showing nothing. Only a
     route that actually makes you wait gets one. `keepScroll` renders are
     in-place refreshes of the page you are on, so they never get a skeleton. */
  const skeletonTimer = keepScroll ? null : setTimeout(() => {
    if (token === currentToken) content.innerHTML = skeletonFor(parts);
  }, 140);

  let resolved;
  try {
    resolved = await resolve(parts);
  } catch (e) {
    console.error('Route error:', e);
    resolved = { view: { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">⚠️</div><h3>Something went wrong</h3><p class="mono xs">${e.message}</p></div></div>` }, navKey: null, subjectId: null };
  }
  if (skeletonTimer) clearTimeout(skeletonTimer);
  if (token !== currentToken) return; // a newer navigation superseded this one

  const view = resolved.view;
  const isObj = view && typeof view === 'object';
  content.innerHTML = isObj ? view.html : view;

  // per-subject accent theming
  document.body.dataset.subject = resolved.subjectId || '';

  // active nav highlight
  qsa('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.key === resolved.navKey);
  });

  if (isObj && typeof view.onMount === 'function') view.onMount();

  // Typeset any maths/chemistry the page just rendered
  renderMathIn(content);

  /* Position the page LAST.
     ------------------------------------------------------------------
     This has to run after onMount and after KaTeX typesetting, because
     both change the document height, and a scroll issued against a
     shorter document lands in the wrong place once it grows. We also
     re-assert on the next two frames, since KaTeX finishes laying out
     asynchronously and the browser can otherwise settle at the previous
     page's offset. See also scrollRestoration = 'manual' in initRouter. */
  positionPage(anchor, token, keepScroll ? savedY : null);

  // close mobile sidebar after navigating
  qs('#sidebar').classList.remove('open');
  qs('#backdrop').classList.remove('show');
}

/** Scroll to the linked section, or to the very top for a fresh page. */
function positionPage(anchor, token, restoreY = null) {
  const apply = () => {
    if (token !== currentToken) return;      // a newer navigation won
    /* A re-render of the page you are already on: put the reader back exactly
       where they were, rather than treating it as a fresh navigation. */
    if (restoreY !== null) { window.scrollTo(0, restoreY); return; }
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ block: 'start', behavior: 'auto' }); return; }
    }
    window.scrollTo(0, 0);
  };
  apply();
  requestAnimationFrame(apply);
  requestAnimationFrame(() => requestAnimationFrame(apply));
}

export function initRouter() {
  /* Stop the browser restoring the previous scroll offset on navigation. It
     fires after our own scroll and was landing new pages part-way down. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* Old #/ bookmarks and anything still linking to the deployed hash build get
     rewritten to the clean path once, in place, so they never 404 and never
     leave a stale # sitting in the address bar. */
  if (location.hash.startsWith('#/')) {
    const raw = location.hash.slice(1);
    const i = raw.indexOf('#');
    const path = i > -1 ? raw.slice(0, i) : raw;
    const anchor = i > -1 ? raw.slice(i) : '';
    history.replaceState({}, '', path + location.search + anchor);
  }

  /* One delegated listener for every internal link on the site. Anything that
     is a plain left-click on a same-origin <a> becomes a pushState instead of a
     page load; modified clicks, new tabs, downloads and external hosts are left
     entirely alone so the browser keeps doing the right thing. */
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (!isInternal(url)) return;

    /* A pure in-page anchor on the CURRENT route is the browser's job. */
    if (url.pathname === location.pathname && url.hash) {
      e.preventDefault();
      history.pushState({}, '', url);
      const el = document.getElementById(url.hash.slice(1));
      if (el) el.scrollIntoView({ block: 'start' });
      return;
    }
    e.preventDefault();
    go(url.pathname + url.search + url.hash);
  });

  window.addEventListener('popstate', () => renderRoute());
  renderRoute();
}

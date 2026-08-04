/* ============================================================================
   router.js: tiny hash-based router.
   ----------------------------------------------------------------------------
   Routes (all under the URL hash so the site works on any static host, incl.
   GitHub Pages, with no server config):

     #/                      dashboard / home
     #/flagged               flagged-for-review dashboard
     #/subject/<id>          subject overview
     #/topic/<topicId>       a single standard/topic
     #/reference/<id>        a subject's formula / reference sheet

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
  let raw = location.hash.replace(/^#/, '') || '/';
  let anchor = '';
  const i = raw.indexOf('#');
  if (i > -1) { anchor = raw.slice(i + 1); raw = raw.slice(0, i); }
  return { parts: raw.split('/').filter(Boolean), anchor };
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
        view: { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">🧭</div><h3>Page not found</h3><p>Back to the <a href="#/" data-link>dashboard</a>.</p></div></div>` },
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
function skeletonFor(parts) {
  const bar = (w, h = 14, cls = '') =>
    `<div class="sk ${cls}" style="width:${w};height:${h}px"></div>`;
  const head = bar('7rem', 11) + bar('60%', 34) + bar('85%', 13) + bar('70%', 13);

  let body;
  if (parts[0] === 'calendar') {
    body = `<div class="sk-cal">${Array.from({ length: 35 },
      () => '<div class="sk sk-cell"></div>').join('')}</div>`;
  } else if (parts[0] === 'progress') {
    body = `<div class="sk-row">${Array.from({ length: 4 },
      () => '<div class="sk sk-tile"></div>').join('')}</div>`
      + `<div class="sk-row2"><div class="sk sk-card"></div><div class="sk sk-card"></div></div>`;
  } else {
    body = Array.from({ length: 3 }, () =>
      `<div class="sk-block">${bar('40%', 20)}${bar('100%')}${bar('96%')}${bar('72%')}</div>`).join('');
  }
  return `<div class="content-inner sk-wrap" aria-busy="true" aria-live="polite">
    <span class="sr-only">Loading</span>${head}<div class="sk-body">${body}</div></div>`;
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
  /* Stop the browser restoring the previous scroll offset on hash changes. It fires after our own scroll and was landing new pages part-way down. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('hashchange', () => renderRoute());
  renderRoute();
}

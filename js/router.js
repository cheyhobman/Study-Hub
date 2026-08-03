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

export async function renderRoute({ keepScroll = false } = {}) {
  const token = ++currentToken;
  const savedY = keepScroll ? window.scrollY : 0;
  const content = qs('#content');
  const { parts, anchor } = parse();

  let resolved;
  try {
    resolved = await resolve(parts);
  } catch (e) {
    console.error('Route error:', e);
    resolved = { view: { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">⚠️</div><h3>Something went wrong</h3><p class="mono xs">${e.message}</p></div></div>` }, navKey: null, subjectId: null };
  }
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

/* ============================================================================
   app.js — entry point. Builds the sidebar nav, wires global UI (theme,
   search, mobile menu, in-page anchors), tracks the study streak, and starts
   the router.
   ========================================================================== */
import { enrolledSubjects, enrolledStandards } from './registry.js';
import { store } from './store.js';
import { profile } from '../data/profile.js';
import { qs } from './ui.js';
import { initRouter, renderRoute } from './router.js';
import { initSearch } from './search.js';

/* ------------------------------------------------- build the sidebar nav */
function buildNav() {
  // Brand strapline comes from the profile so a handed-on copy needs no HTML edit
  const sub = qs('#brand-sub');
  if (sub) sub.textContent = `${profile.level} · ${profile.year}`;

  // Dashboard section
  qs('#nav-top').innerHTML = `
    <a class="nav-item" href="#/" data-key="home">
      <span class="nav-dot" style="background:var(--phthalo-300)"></span> Dashboard
    </a>
    <a class="nav-item" href="#/revise" data-key="revise">
      <span class="nav-dot" style="background:#E5B94E"></span> Revision session
    </a>
    <a class="nav-item" href="#/internals" data-key="exams-group">
      <span class="nav-dot" style="background:#E07B39"></span> Exams &amp; deadlines
      <span class="nav-meta" id="nav-int-count"></span>
    </a>
    <a class="nav-item" href="#/progress" data-key="progress">
      <span class="nav-dot" style="background:#4FA97C"></span> Progress &amp; credits
    </a>
    <a class="nav-item" href="#/command-words" data-key="tools-group">
      <span class="nav-dot" style="background:#B4DEC8"></span> Study tools
      <span class="nav-meta" id="nav-flag-count"></span>
    </a>`;

  // Subjects section
  qs('#nav-subjects').innerHTML = enrolledSubjects.map(s => `
    <a class="nav-item" href="#/subject/${s.id}" data-key="${s.id}">
      <span class="nav-dot" style="background:${s.dot}"></span> ${s.name}
    </a>`).join('');
}

/* ------------------------------------------------- sidebar progress + counts */
function refreshSidebar() {
  /* Count only STANDARDS, so the numerator and denominator measure the same
     set. Any non-standard topic (a study guide, say) is markable as reviewed
     but is not a standard — counting those produced "27 / 26" and a 104% bar. */
  const ids = enrolledStandards.map(s => s.topicId);
  const total = ids.length;
  const done = store.reviewedCountIn(ids);
  const pct = total ? Math.min(100, (done / total) * 100) : 0;

  qs('#sp-count').textContent = `${done} / ${total}`;
  qs('#sp-bar').style.width = `${pct}%`;

  const wrap = qs('#sidebar-progress');
  if (wrap) {
    wrap.title = `A standard counts as reviewed once you tick "Mark reviewed" on its page, `
      + `or after you answer 6+ practice items on it averaging 80%+.`;
  }

  const fc = store.flaggedCount();
  const el = qs('#nav-flag-count');
  if (el) el.textContent = fc ? String(fc) : '';

  const ic = store.internals().filter(i => i.status !== 'graded').length;
  const iel = qs('#nav-int-count');
  if (iel) iel.textContent = ic ? String(ic) : '';
}

/* ------------------------------------------------- theme toggle */
function initTheme() {
  // Re-assert the stored theme once modules load, so it survives a reload even
  // if the pre-paint script in index.html was bypassed (e.g. an old cached copy).
  document.documentElement.setAttribute('data-theme', store.theme());
  qs('#theme-toggle').addEventListener('click', () => store.toggleTheme());
}

/* ------------------------------------------------- mobile menu */
function initMobileMenu() {
  const sidebar = qs('#sidebar');
  const backdrop = qs('#backdrop');
  const app = qs('.app');
  const btn = qs('#menu-toggle');
  const isMobile = () => window.matchMedia('(max-width: 780px)').matches;

  const closeDrawer = () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.setAttribute('aria-controls', 'sidebar');
  btn.setAttribute('aria-expanded', 'false');

  btn.addEventListener('click', () => {
    if (isMobile()) {
      // Mobile: slide the drawer over the content
      const open = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', open);
      backdrop.classList.toggle('show', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) sidebar.querySelector('.nav-item')?.focus();
    } else {
      // Desktop: collapse the sidebar to widen the reading column
      const collapsed = app.classList.toggle('sidebar-collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
      try { localStorage.setItem('ncea.sidebar', collapsed ? 'collapsed' : 'open'); } catch (e) {}
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  // Escape closes the mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) { closeDrawer(); btn.focus(); }
  });

  // Restore the desktop preference
  try {
    if (localStorage.getItem('ncea.sidebar') === 'collapsed' && !isMobile()) {
      app.classList.add('sidebar-collapsed');
      btn.setAttribute('aria-expanded', 'false');
    }
  } catch (e) {}

  // Leaving mobile width should clear the drawer state
  window.addEventListener('resize', () => { if (!isMobile()) closeDrawer(); });
}

/* --------------------------- in-page anchor scrolling (TOC etc.) ----------
   Hash routing owns links that start with "#/". Plain "#anchor" links (from
   the table of contents) must NOT trigger the router — intercept them and
   smooth-scroll instead. */
function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') && !href.startsWith('#/') && href.length > 1) {
      const el = document.getElementById(href.slice(1));
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });
}

/* ------------------------------------------------- boot */
function boot() {
  buildNav();
  initTheme();
  initMobileMenu();
  initAnchors();
  initSearch();

  refreshSidebar();             // NOTE: opening the site no longer ticks the
                                // streak — see store.recordStudy()
  store.on(refreshSidebar);     // keep sidebar in sync as progress changes

  initRouter();                 // renders the current route

  // If progress changes on a page that shows it (home/flagged), re-render.
  store.on(() => {
    const h = location.hash;
    if (h === '' || h === '#/' || h === '#/flagged') renderRoute();
  });
}

document.addEventListener('DOMContentLoaded', boot);

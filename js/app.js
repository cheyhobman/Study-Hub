/* ============================================================================
   app.js: entry point. Builds the sidebar nav, wires global UI (theme,
   search, mobile menu, in-page anchors), tracks the study streak, and starts
   the router.
   ========================================================================== */
import { visibleSubjects, visibleStandards } from './registry.js';
import { store } from './store.js';
import { SEED_DATES } from '../data/planner.js';
import { THEMES } from './themes.js';

import { qs } from './ui.js';
import { initRouter, renderRoute } from './router.js';
import { initAuth } from './auth/session.js';
import { initAuthUI } from './auth/ui.js';
import { initSearch } from './search.js';

/* ------------------------------------------------- build the sidebar nav */
/* Brand strapline comes from the profile, so a handed-on copy needs no HTML
   edit, and it re-paints on store change, because the profile is now editable
   in-app rather than only in data/profile.js. */
function paintBrand() {
  const sub = qs('#brand-sub');
  if (!sub) return;
  const p = store.profile();
  sub.textContent = [p.level, p.year].filter(Boolean).join(' · ');
}

function buildNav() {
  paintBrand();

  // Dashboard section
  qs('#nav-top').innerHTML = `
    <a class="nav-item" href="/" data-key="home">
      <span class="nav-dot" style="background:var(--phthalo-300)"></span> Dashboard
    </a>
    <a class="nav-item" href="/revise" data-key="revise">
      <span class="nav-dot" style="background:#E5B94E"></span> Revision session
    </a>
    <a class="nav-item" href="/internals" data-key="exams-group">
      <span class="nav-dot" style="background:#E07B39"></span> Assessments
      <span class="nav-meta" id="nav-int-count"></span>
    </a>
    <a class="nav-item" href="/progress" data-key="progress">
      <span class="nav-dot" style="background:#4FA97C"></span> Progress &amp; credits
    </a>
    <a class="nav-item" href="/account" data-key="account">
      <span class="nav-dot" style="background:#7CC49E"></span> Account
    </a>
    <a class="nav-item" href="/command-words" data-key="tools-group">
      <span class="nav-dot" style="background:#B4DEC8"></span> Study tools
      <span class="nav-meta" id="nav-flag-count"></span>
    </a>`;

  // Subjects section
  qs('#nav-subjects').innerHTML = visibleSubjects().map(s => `
    <a class="nav-item" href="/subject/${s.id}" data-key="${s.id}">
      <span class="nav-dot" style="background:${s.dot}"></span> ${s.name}
    </a>`).join('');
}

/* ------------------------------------------------- sidebar progress + counts */
function refreshSidebar() {
  /* Count only STANDARDS, so the numerator and denominator measure the same
     set. Any non-standard topic (a study guide, say) is markable as reviewed
     but is not a standard: counting those produced "27 / 26" and a 104% bar. */
  const ids = visibleStandards().map(s => s.topicId);
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

/* Which sidebar item should be lit for the route we are on. The router sets
   this on navigation; this re-applies it after any rebuild of the nav. */
export function markActiveNav() {
  const parts = (location.pathname || '/').split('/').filter(Boolean);
  const GROUP = { internals: 'exams-group', calendar: 'exams-group', exams: 'exams-group',
                  'command-words': 'tools-group', flagged: 'tools-group' };
  let key = parts.length === 0 ? 'home' : (GROUP[parts[0]] || parts[0]);
  if (parts[0] === 'subject' || parts[0] === 'reference' || parts[0] === 'printcards') key = parts[1];
  if (parts[0] === 'topic') key = null;   // the router knows the subject; leave it be
  if (key === null) return;
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.key === key));
}

/* ------------------------------------------------- theme picker */
function initTheme() {
  // Re-assert the stored theme once modules load, so it survives a reload even
  // if the pre-paint script in index.html was bypassed (e.g. an old cached copy).
  document.documentElement.setAttribute('data-theme', store.theme());

  const btn = qs('#theme-toggle');
  const menu = qs('#theme-menu');

  const paint = () => {
    const cur = store.theme();
    menu.innerHTML = THEMES.map(t => `
      <button class="theme-opt${t.id === cur ? ' on' : ''}" role="menuitemradio"
              aria-checked="${t.id === cur}" data-theme-id="${t.id}">
        <span class="tw" style="--a:${t.swatch[0]};--b:${t.swatch[1]}" aria-hidden="true"></span>
        <span class="to-text"><strong>${t.label}</strong><em>${t.hint}</em></span>
        <span class="to-tick" aria-hidden="true">${t.id === cur ? '✓' : ''}</span>
      </button>`).join('');
  };

  const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  const open = () => { paint(); menu.hidden = false; btn.setAttribute('aria-expanded', 'true');
                       menu.querySelector('.theme-opt.on')?.focus(); };

  btn.addEventListener('click', (e) => { e.stopPropagation(); menu.hidden ? open() : close(); });

  menu.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-theme-id]');
    if (!opt) return;
    store.setTheme(opt.dataset.themeId);
    paint();
    close();
    btn.focus();
  });

  // Click-away and Escape both close it; Escape returns focus to the trigger.
  document.addEventListener('click', () => { if (!menu.hidden) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { close(); btn.focus(); }
  });
  menu.addEventListener('click', (e) => e.stopPropagation());
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
   Under history routing the "#/" prefix no longer exists, so every "#..." link
   is what it looks like: an anchor on the current page. Smooth-scroll it and
   keep the router out of it. The router's own listener ignores same-path
   anchors for the same reason, so the two never fight over one click. */
function initAnchors() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') && href.length > 1) {
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
                                // streak, see store.recordStudy()
  store.on(refreshSidebar);     // keep sidebar in sync as progress changes
  store.on(paintBrand);         // …and the strapline in sync with the profile
  /* Rebuilding the subject list wipes the .active class the router set, which
     un-highlighted the sidebar item for the page you were still on. Re-assert
     it from the current route after every rebuild. */
  store.on(() => { buildNav(); markActiveNav(); });

  // Stamp known course dates onto any planner item that has none (runs once).
  store.applySeedDates(SEED_DATES);

  /* Accounts are an ENHANCEMENT. initAuthUI() paints the top-bar controls (or
     nothing, if this copy has no keys) immediately; initAuth() then restores
     any existing session and reconciles in the background. Neither is awaited,
     so a slow or unreachable backend cannot delay the site rendering. */
  initAuthUI();
  initAuth().catch(e => console.error('Auth init failed; running local-only.', e));

  initRouter();                 // renders the current route

  /* If progress changes on a page that shows it (home/flagged), re-render.
     `keepScroll` matters: this is a REFRESH of the page you are already on, not
     a navigation, so throwing the reader back to the top is a bug. The router
     only forces scroll-to-top when it is actually changing page. */
  store.on(() => {
    const p = location.pathname;
    if (p === '/' || p === '/flagged') renderRoute({ keepScroll: true });
  });
}

document.addEventListener('DOMContentLoaded', boot);

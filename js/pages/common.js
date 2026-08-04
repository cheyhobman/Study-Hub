/* ============================================================================
   pages/common.js: small render helpers shared across page views.
   ========================================================================== */
import { icons } from '../ui.js';

/** Breadcrumb trail. items = [{label, href?}]: the last item is the current page. */
export function crumbs(items) {
  return `<nav class="crumbs">${items.map((it, i) => {
    const sep = i < items.length - 1 ? '<span class="sep">/</span>' : '';
    return it.href ? `<a href="${it.href}" data-link>${it.label}</a>${sep}`
                   : `<span>${it.label}</span>${sep}`;
  }).join('')}</nav>`;
}

/** Standard credit + External/Internal badges. */
export function stdBadges(std) {
  const type = std.type === 'External' ? `<span class="badge badge-ext">External</span>`
    : std.type === 'Internal' ? `<span class="badge badge-int">Internal</span>`
    : `<span class="badge">${std.type}</span>`;
  const credits = std.credits ? `<span class="badge badge-credits">${std.credits} credits</span>` : '';
  return `${type}${credits}`;
}

/** Page header block. */
export function pageHead({ eyebrow, title, lede }) {
  return `<header class="page-head">
    ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
  </header>`;
}

/** Days from now (real clock) until an ISO datetime; negative = past. */
export function daysUntil(iso) {
  const now = new Date();
  const then = new Date(iso);
  return Math.ceil((then - now) / 86400000);
}

export function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
}

export { icons };

/* ============================================================================
   Section tabs. The nav groups two pairs of pages together so the sidebar
   stays at five items. The tabs are REAL LINKS to real routes rather than
   JS-switched panes: that keeps deep links and the back button working, and
   it means a page like My Internals can re-render itself freely without
   destroying the tab bar around it.
   ========================================================================== */
export const NAV_GROUPS = {
  exams: {
    navKey: 'exams-group',
    tabs: [
      { key: 'internals', label: '📝 My internals', href: '/internals' },
      { key: 'calendar',  label: 'Calendar',       href: '/calendar' },
      { key: 'timetable', label: '📅 Exam timetable', href: '/exams' },
    ],
  },
  tools: {
    navKey: 'tools-group',
    tabs: [
      { key: 'command-words', label: '🔤 Command words', href: '/command-words' },
      { key: 'flagged', label: '🚩 Flagged for review', href: '/flagged' },
    ],
  },
};

/** Render the tab bar for a group, marking `active` as current. */
export function sectionTabs(groupName, active) {
  const g = NAV_GROUPS[groupName];
  if (!g) return '';
  return `<div class="section-tabs" role="tablist">
    ${g.tabs.map(t => `
      <a class="section-tab${t.key === active ? ' on' : ''}" href="${t.href}" data-link
         role="tab" aria-selected="${t.key === active}">${t.label}</a>`).join('')}
  </div>`;
}

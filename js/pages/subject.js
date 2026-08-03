/* ============================================================================
   pages/subject.js: a subject's overview: all its standards, credits,
   External/Internal split, and a link to the reference sheet.
   ========================================================================== */
import { subjectById } from '../registry.js';
import { store } from '../store.js';
import { crumbs, stdBadges, pageHead } from './common.js';
import { renderBlock } from '../ui.js';

export function renderSubject(subjectId) {
  const s = subjectById[subjectId];
  if (!s) return `<div class="content-inner"><div class="placeholder"><div class="ph-icon">🤔</div><h3>Subject not found</h3><p>Head back to the <a href="#/" data-link>dashboard</a>.</p></div></div>`;

  const externals = s.standards.filter(x => x.type === 'External');
  const internals = s.standards.filter(x => x.type !== 'External');
  const extCredits = externals.reduce((n, x) => n + (x.credits || 0), 0);
  const intCredits = internals.reduce((n, x) => n + (x.credits || 0), 0);
  const reviewed = s.standards.filter(x => store.isReviewed(x.topicId)).length;

  const row = (std) => {
    const done = store.isReviewed(std.topicId);
    const flag = store.isFlagged(std.topicId);
    return `<a class="std-row" href="#/topic/${std.topicId}" data-link>
      <span class="std-code"${std.accent ? ` style="color:${std.accent};background:color-mix(in srgb, ${std.accent} 14%, transparent)"` : ''}>${std.code}</span>
      <span class="std-main">
        <span class="std-title">${std.title}${std.priority ? ' <span class="badge" style="background:var(--warn-bg);color:var(--warn)">priority</span>' : ''}</span>
        <span class="std-blurb">${std.blurb || ''}</span>
      </span>
      <span class="std-tags">
        ${done ? '<span class="badge badge-done">✓ reviewed</span>' : ''}
        ${flag ? '<span class="badge badge-flag">🚩 flagged</span>' : ''}
        ${stdBadges(std)}
      </span>
    </a>`;
  };

  return `
  <div class="content-inner">
    ${crumbs([{ label: 'Home', href: '#/' }, { label: s.name }])}
    ${pageHead({
      eyebrow: `${s.icon} ${s.level}`,
      title: s.name,
      lede: s.blurb,
    })}

    <div class="stat-row mb-5">
      <div class="stat-tile"><div class="stt-num">${s.standards.length}</div><div class="stt-label">Standards</div></div>
      <div class="stat-tile"><div class="stt-num">${extCredits + intCredits}</div><div class="stt-label">Total credits</div></div>
      <div class="stat-tile"><div class="stt-num">${externals.length}</div><div class="stt-label">Externals · ${extCredits} cr</div></div>
      <div class="stat-tile"><div class="stt-num">${reviewed}/${s.standards.length}</div><div class="stt-label">Reviewed</div></div>
    </div>

    ${s.realWorld ? `
      <div class="realworld">
        <h3>${s.realWorld.title}</h3>
        <p>${s.realWorld.html}</p>
        ${s.realWorld.video ? renderBlock({ t: 'video', label: 'Watch: ' + s.name + ' in the real world', query: s.realWorld.video, note: 'Opens a YouTube search: a good one to watch when motivation dips' }) : ''}
      </div>` : ''}

    <div class="flex items-center wrap gap-3 mb-3" style="justify-content:space-between">
      <h2>Achievement standards</h2>
      <span class="flex gap-3 wrap">
        <a class="btn btn-ghost btn-sm" href="#/reference/${s.id}" data-link>📄 Reference sheet</a>
        <a class="btn btn-ghost btn-sm" href="#/printcards/${s.id}" data-link>Print flashcards</a>
      </span>
    </div>

    ${externals.length ? `<h4 class="muted" style="margin:var(--sp-4) 0 var(--sp-3);text-transform:uppercase;letter-spacing:.05em;font-size:var(--fs-xs)">External · ${extCredits} credits</h4>
      <div class="std-list mb-5">${externals.map(row).join('')}</div>` : ''}

    ${internals.length ? `<h4 class="muted" style="margin:var(--sp-4) 0 var(--sp-3);text-transform:uppercase;letter-spacing:.05em;font-size:var(--fs-xs)">Internal · ${intCredits} credits</h4>
      <div class="std-list">${internals.map(row).join('')}</div>` : ''}

    ${(s.guides && s.guides.length) ? `
      <h4 class="muted" style="margin:var(--sp-6) 0 var(--sp-3);text-transform:uppercase;letter-spacing:.05em;font-size:var(--fs-xs)">Study guides · extra deep dives</h4>
      <div class="std-list">${s.guides.map(g => {
        const done = store.isReviewed(g.topicId);
        const flag = store.isFlagged(g.topicId);
        return `<a class="std-row" href="#/topic/${g.topicId}" data-link>
          <span class="std-code">${g.icon || '★'}</span>
          <span class="std-main">
            <span class="std-title">${g.title}</span>
            <span class="std-blurb">${g.blurb || ''}</span>
          </span>
          <span class="std-tags">
            ${done ? '<span class="badge badge-done">✓ reviewed</span>' : ''}
            ${flag ? '<span class="badge badge-flag">🚩 flagged</span>' : ''}
            <span class="badge">Guide</span>
          </span>
        </a>`; }).join('')}</div>` : ''}
  </div>`;
}

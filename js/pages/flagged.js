/* ============================================================================
   pages/flagged.js — "flagged for review" dashboard.
   Shows every topic flagged across all subjects, grouped by subject, with a
   one-click unflag. Also surfaces reviewed topics for a quick progress recap.
   ========================================================================== */
import { subjects, standardByTopicId, subjectIdForTopic, subjectById } from '../registry.js';
import { store } from '../store.js';
import { pageHead, stdBadges, sectionTabs} from './common.js';
import { toast, icons } from '../ui.js';

export function renderFlagged() {
  const flagged = store.flaggedIds();

  // group flagged topicIds by subject
  const bySubject = {};
  flagged.forEach(id => {
    const sid = subjectIdForTopic(id) || 'other';
    (bySubject[sid] = bySubject[sid] || []).push(id);
  });

  const body = flagged.length === 0
    ? `<div class="placeholder">
        <div class="ph-icon">🎯</div>
        <h3>Nothing flagged</h3>
        <p>When a topic needs more work, hit <b>Flag for review</b> on its page and it’ll show up here — your personal weak-spot list.</p>
       </div>`
    : subjects.filter(s => bySubject[s.id]).map(s => `
        <div class="mb-5">
          <h4 class="muted" style="text-transform:uppercase;letter-spacing:.05em;font-size:var(--fs-xs);margin-bottom:var(--sp-3)">
            <span style="color:${s.dot}">${s.icon}</span> ${s.name} · ${bySubject[s.id].length}
          </h4>
          <div class="std-list">
            ${bySubject[s.id].map(id => {
              const std = standardByTopicId[id];
              const title = std ? std.title : id;
              return `<div class="std-row" style="cursor:default">
                <span class="std-code">${std ? std.code : '—'}</span>
                ${store.isAutoFlagged(id) ? '<span class="auto-badge" title="Flagged automatically because your quiz average on this topic is below 50%">auto</span>' : ''}
                <a class="std-main" href="#/topic/${id}" data-link style="text-decoration:none;color:inherit">
                  <span class="std-title">${title}</span>
                  <span class="std-blurb">${std ? std.blurb : ''}</span>
                </a>
                <span class="std-tags">
                  ${std ? stdBadges(std) : ''}
                  <button class="btn btn-ghost btn-sm unflag" data-id="${id}">Unflag</button>
                </span>
              </div>`;
            }).join('')}
          </div>
        </div>`).join('');

  const reviewedCount = store.reviewedCount();
  const totalTopics = subjects.reduce((n, s) => n + s.standards.length, 0);

  const html = `
  <div class="content-inner">
    ${sectionTabs('tools', 'flagged')}
    ${pageHead({
      eyebrow: '🚩 Review dashboard',
      title: 'Flagged for review',
      lede: 'Everything you’ve marked as needing more work, in one place.',
    })}

    <div class="stat-row mb-5">
      <div class="stat-tile"><div class="stt-num">${flagged.length}</div><div class="stt-label">Flagged topics</div></div>
      <div class="stat-tile"><div class="stt-num">${reviewedCount}/${totalTopics}</div><div class="stt-label">Reviewed</div></div>
      <div class="stat-tile"><div class="stt-num">${store.streak().count}</div><div class="stt-label">Day streak</div></div>
    </div>

    ${body}
  </div>`;

  return {
    html,
    onMount() {
      document.querySelectorAll('.unflag').forEach(btn => {
        btn.addEventListener('click', () => {
          store.toggleFlagged(btn.dataset.id);
          toast('Flag removed');
          // re-render the flagged view in place
          const view = renderFlagged();
          document.getElementById('content').innerHTML = view.html;
          view.onMount();
        });
      });
    },
  };
}

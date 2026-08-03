/* ============================================================================
   pages/exams.js, the Exams timetable, with two tabs:
     • External exams      (the real NCEA exams, Nov 2026)
     • Derived grade exams (the school's Sept 2026 trial exams)
   Data comes from data/exams.js.
   ========================================================================== */
import { subjectById, myExternalExams as externalExams, myDerivedExams as derivedExams } from '../registry.js';
import { pageHead, daysUntil, sectionTabs} from './common.js';
import { store } from '../store.js';
import { esc } from '../ui.js';


function fmtFull(iso) {
  if (!iso) return { day: '–', date: 'TBC' };
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-NZ', { weekday: 'long' }),
    date: d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long' }),
    time: d.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit' }),
  };
}

function countdownCell(iso) {
  if (!iso) return '<span class="cd-in" style="color:var(--muted)">TBC</span>';
  const d = daysUntil(iso);
  if (d < 0) return '<span class="xs muted">done</span>';
  if (d === 0) return '<span class="cd-in" style="color:var(--bad)">today</span>';
  return `<span class="cd-in">${d}d</span>`;
}

function examTable(list, { colTitle, colField }) {
  const rows = list
    .slice()
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'))
    .map(e => {
      const s = subjectById[e.subject] || {};
      const f = fmtFull(e.date);
      return `<tr>
        <td class="nowrap"><span style="display:inline-flex;align-items:center;gap:8px">
          <span class="cd-dot" style="background:${s.dot || 'var(--accent)'}"></span>
          <a href="#/subject/${e.subject}" data-link style="font-weight:600;color:var(--text-strong)">${s.name || e.subject}</a>
        </span></td>
        <td class="nowrap">${f.day}<br><span class="xs muted">${f.date}${f.time ? ' · ' + f.time : ''}</span></td>
        <td class="nowrap">${e.session || ''}</td>
        <td>${e[colField] || ''}${e.note ? `<br><span class="xs muted">${e.note}</span>` : ''}</td>
        <td class="nowrap center">${countdownCell(e.date)}</td>
      </tr>`;
    }).join('');
  return `<div class="table-wrap"><table class="data">
    <thead><tr><th>Subject</th><th>Date</th><th>Session</th><th>${colTitle}</th><th class="center">Countdown</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

export function renderExams() {
  const html = `
  <div class="content-inner">
    ${sectionTabs('exams', 'timetable')}
    ${pageHead({
      eyebrow: '📅 Timetable',
      title: 'Exams',
      lede: 'Your real 2026 externals and the school’s derived-grade (trial) exams: pulled from the official timetables.',
    })}

    <div class="quiz-opts" role="tablist" style="margin-bottom:var(--sp-5)">
      <button class="btn btn-primary btn-sm exam-tab" data-tab="external" id="tab-external">External exams</button>
      <button class="btn btn-ghost btn-sm exam-tab" data-tab="derived" id="tab-derived">Derived grade (trials)</button>
    </div>

    <div id="pane-external">
      <div class="callout callout-note"><div class="co-icon">ℹ</div><div class="co-body">
        <h4>Real NCEA externals: November 2026</h4>
        <p>Each subject’s external standards are examined together in one session. Times follow NZQA’s standard 9:30&nbsp;am / 2:00&nbsp;pm sessions.</p>
      </div></div>
      ${examTable(externalExams, { colTitle: 'Standards', colField: 'standards' })}
    </div>

    <div id="pane-derived" class="hidden">
      <div class="callout callout-warn"><div class="co-icon">⚠</div><div class="co-body">
        <h4>School derived-grade / trial exams: September 2026</h4>
        <p>Year 12 &amp; 13 have study leave Wed 9 – Fri 18 Sept.</p>
      </div></div>
      ${examTable(derivedExams, { colTitle: 'Paper', colField: 'paper' })}
    </div>

    <p class="xs muted mt-5">Dates transcribed from your ${store.profile().year} ${esc(store.profile().school || 'school')} timetables. Edit them in <code>data/exams.js</code>.</p>
  </div>`;

  return {
    html,
    onMount() {
      const tabs = [...document.querySelectorAll('.exam-tab')];
      const panes = { external: document.getElementById('pane-external'), derived: document.getElementById('pane-derived') };
      tabs.forEach(btn => btn.addEventListener('click', () => {
        const t = btn.dataset.tab;
        tabs.forEach(b => { b.classList.toggle('btn-primary', b === btn); b.classList.toggle('btn-ghost', b !== btn); });
        Object.entries(panes).forEach(([k, el]) => el.classList.toggle('hidden', k !== t));
      }));
    },
  };
}

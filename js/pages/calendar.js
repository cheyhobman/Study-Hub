/* ============================================================================
   pages/calendar.js: the whole year on a month grid.
   ----------------------------------------------------------------------------
   Same three sources as the dashboard strip (js/deadlines.js): planner
   internals, derived-grade exams and the real externals. The strip answers
   "what's next"; this answers "how is it all spaced out", which is the
   question you actually need when deciding what to work on in September.

   Colour follows the site's existing language rather than inventing a new one:
     • the DOT on each entry is the SUBJECT accent (from data/subjects.js)
     • the entry's shape tells you the KIND. Internals are filled, derived
       exams are outlined, externals are solid phthalo
   so a glance shows both "which subject" and "how serious".

   Multi-day internals (a report written over three periods) draw as a bar
   across the days they span. Undated internals can't be placed, so they are
   listed underneath rather than silently dropped.
   ========================================================================== */
import { subjectMeta } from '../registry.js';
import { store } from '../store.js';
import { undatedInternals, KINDS } from '../deadlines.js';
import { myExternalExams as externalExams, myDerivedExams as derivedExams, plannerItemIsLive } from '../assessments.js';
import { esc } from '../ui.js';
import { pageHead, sectionTabs } from './common.js';
import { STATUSES, roughToDate, HOLIDAYS_2026, studyLeave } from '../../data/planner.js';
import { externalExams as allExternalExams } from '../registry.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const todayIso = () => iso(new Date());

/* ---- gather every dated item, including multi-day spans -------------------
   upcomingDeadlines() drops anything already past, which is wrong for a
   calendar. You still want to see that Chemistry 3.1 was handed in. So we
   rebuild from the same sources with no time filter. */
function allEvents() {
  const out = [];

  /* Finished internals stay on the grid as history (they are drawn muted via
     `done`), but they must never drive "what's coming", the nav badge or the
     next-up tile. That filtering lives in deadlines.js. */
  store.internals().filter(plannerItemIsLive).forEach(i => {
    const st = STATUSES[i.status] || STATUSES.notstarted;
    const base = { kind: 'internal', subject: i.subject, title: i.title,
                   code: i.code, label: i.code || i.title, status: i.status,
                   statusLabel: st.label,
                   done: i.status === 'submitted' || i.status === 'graded',
                   href: '/internals' };
    if (i.dateMode === 'exact' && i.date) out.push({ ...base, start: i.date, end: i.date });
    else if (i.dateMode === 'range' && i.startDate) {
      out.push({ ...base, start: i.startDate, end: i.endDate || i.startDate, span: true });
    } else if (i.dateMode === 'rough' && i.term) {
      // a rough period still deserves a place on the grid, marked approximate
      const d = roughToDate(i.term, i.week);
      if (d) out.push({ ...base, start: d, end: d, approx: true });
    }
  });

  /* Exams use the SHORT subject name in the cell (a whole AS list will never
     fit in a 40px box) and keep the full detail in the hover title. */
  derivedExams().forEach(e => {
    const s = subjectMeta(e.subject);
    out.push({
      kind: 'derived', subject: e.subject,
      title: `${s.name || e.subject} derived grade`, code: e.paper,
      label: s.short || s.name || e.subject,
      start: e.date.slice(0, 10), end: e.date.slice(0, 10),
      time: e.date.slice(11, 16), href: '/exams',
    });
  });

  externalExams().forEach(e => {
    const s = subjectMeta(e.subject);
    out.push({
      kind: 'external', subject: e.subject,
      title: `${s.name || e.subject} external`, code: e.standards,
      label: s.short || s.name || e.subject,
      start: e.date.slice(0, 10), end: e.date.slice(0, 10),
      time: e.date.slice(11, 16), href: '/exams',
    });
  });

  return out.sort((a, b) => a.start.localeCompare(b.start));
}

/* ---- which months to show -------------------------------------------------
   From the earliest event (or this month, whichever is sooner) to the latest,
   so the view always frames the actual academic year rather than a fixed span. */
function monthRange(events) {
  const now = new Date();
  let min = new Date(now.getFullYear(), now.getMonth(), 1);
  let max = new Date(now.getFullYear(), now.getMonth(), 1);
  events.forEach(e => {
    const s = new Date(e.start + 'T00:00');
    const t = new Date(e.end + 'T00:00');
    if (s < min) min = new Date(s.getFullYear(), s.getMonth(), 1);
    if (t > max) max = new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const months = [];
  const cur = new Date(min);
  while (cur <= max) { months.push(new Date(cur)); cur.setMonth(cur.getMonth() + 1); }
  return months;
}

/* ---- one month grid ---- */
/* Non-assessment bands drawn UNDER the events: school holidays and study
   leave. They are background context, not things you have to do, so they shade
   the cell rather than taking a row inside it. Study leave is derived from the
   real exam timetable (see data/planner.js) and marked as an estimate. */
function bands() {
  const out = HOLIDAYS_2026.map(h => ({ ...h, type: 'holiday' }));
  const sl = studyLeave(allExternalExams.map(e => e.date));
  if (sl) out.push({ ...sl, type: 'studyleave' });
  return out;
}

function bandOn(date, all) {
  return all.find(b => date >= b.start && date <= b.end) || null;
}

function monthGrid(monthDate, events, filter, allBands = []) {
  const y = monthDate.getFullYear(), m = monthDate.getMonth();
  const first = new Date(y, m, 1);
  const daysIn = new Date(y, m + 1, 0).getDate();
  // Monday-first offset
  const lead = (first.getDay() + 6) % 7;
  const today = todayIso();

  const cells = [];
  for (let i = 0; i < lead; i++) cells.push('<div class="cal-cell cal-pad"></div>');

  for (let d = 1; d <= daysIn; d++) {
    const date = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const on = events.filter(e => (filter === 'all' || e.kind === filter)
                               && date >= e.start && date <= e.end);
    const isToday = date === today;
    const isPast = date < today;
    const band = bandOn(date, allBands);
    const bandStarts = band && (date === band.start || d === 1);

    cells.push(`
      <div class="cal-cell${isToday ? ' is-today' : ''}${isPast ? ' is-past' : ''}${on.length ? ' has-events' : ''}${
        band ? ` in-band band-${band.type}` : ''}"${
        band ? ` title="${esc(band.name + (band.estimated ? ' (estimated)' : ''))}"` : ''}>
        <div class="cal-daynum">${d}</div>
        ${bandStarts ? `<div class="cal-band-label">${esc(band.name)}${band.estimated ? ' ~' : ''}</div>` : ''}
        ${on.map(e => {
          const s = subjectMeta(e.subject);
          const startsHere = date === e.start;
          const mid = e.span && !startsHere;   // every day after the first
          const tip = [e.title, e.code, e.time, e.statusLabel]
            .filter(Boolean).join(' · ') + (e.approx ? ' (approximate)' : '');
          const text = startsHere || !e.span
            ? `${e.approx ? '≈ ' : ''}${esc(e.label || e.title)}` : '&nbsp;';
          return `<a class="cal-ev k-${e.kind}${e.span ? ' is-span' : ''}${mid ? ' is-mid' : ''}${e.done ? ' is-done' : ''}"
                     href="${e.href}" data-link
                     style="--sub:${s.dot || 'var(--accent)'}"
                     title="${esc(tip)}" aria-label="${esc(tip)}">
            <span class="cal-dot" aria-hidden="true"></span>
            <span class="cal-ev-txt">${text}</span>
          </a>`;
        }).join('')}
      </div>`);
  }

  /* Events STARTING in this month, for the phone list below the grid. On a
     narrow screen a 49px cell can't hold a label, so the grid shows dots only, and a dot with no hover (touch has none) tells you nothing. The list
     carries the detail; CSS shows one or the other, never both. */
  const mKey = `${y}-${String(m + 1).padStart(2, '0')}`;
  const starting = events
    .filter(e => (filter === 'all' || e.kind === filter) && e.start.slice(0, 7) === mKey)
    .sort((a, b) => a.start.localeCompare(b.start));

  const hasAny = events.some(e => (filter === 'all' || e.kind === filter)
    && e.start.slice(0, 7) <= mKey && e.end.slice(0, 7) >= mKey);

  const list = starting.map(e => {
    const s = subjectMeta(e.subject);
    const day = Number(e.start.slice(8, 10));
    const when = e.span && e.end !== e.start
      ? `${day}–${Number(e.end.slice(8, 10))}`
      : `${e.approx ? '≈' : ''}${day}`;
    const meta = [e.code, e.time, e.statusLabel].filter(Boolean).join(' · ');
    return `<li>
      <a class="cal-li k-${e.kind}${e.done ? ' is-done' : ''}" href="${e.href}" data-link
         style="--sub:${s.dot || 'var(--accent)'}">
        <span class="cli-day">${when}</span>
        <span class="cli-body"><b>${esc(e.title)}</b>${meta ? `<span class="cli-meta">${esc(meta)}</span>` : ''}</span>
      </a></li>`;
  }).join('');

  return `
    <section class="cal-month${hasAny ? '' : ' cal-quiet'}">
      <div class="cal-grid">
        ${DOW.map(d => `<div class="cal-dow">${d}</div>`).join('')}
        ${cells.join('')}
      </div>
      ${list ? `<ul class="cal-list">${list}</ul>` : ''}
    </section>`;
}

/* Repaint the grid and the filter chips in place. Used by the type filters and
   the month navigation, both of which must not disturb scroll position. */
function repaintCalendar() {
  const v = renderCalendar();
  const holder = document.createElement('div');
  holder.innerHTML = v.html;
  const oldInner = document.querySelector('#content .content-inner');
  const newInner = holder.querySelector('.content-inner');
  if (!oldInner || !newInner) return;
  const y = window.scrollY;
  oldInner.replaceWith(newInner);
  v.onMount();
  window.scrollTo(0, y);
}

export function renderCalendar() {
  const filter = store.calFilter ? store.calFilter() : 'all';
  const events = allEvents();
  const months = monthRange(events);

  /* ONE month at a time, with prev/next. Showing the whole year at once meant
     scrolling past four grids to find the one you wanted, and on a phone that
     was most of a screen each. The viewed month is remembered between visits. */
  const todayKey = todayIso().slice(0, 7);
  const keys = months.map(d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  let cursor = store.calMonth();
  if (!keys.includes(cursor)) cursor = keys.includes(todayKey) ? todayKey : keys[0];
  const idx = keys.indexOf(cursor);
  const shown = months[idx];
  const prevKey = idx > 0 ? keys[idx - 1] : null;
  const nextKey = idx < keys.length - 1 ? keys[idx + 1] : null;
  const undated = undatedInternals();

  const counts = {
    all: events.length,
    internal: events.filter(e => e.kind === 'internal').length,
    derived: events.filter(e => e.kind === 'derived').length,
    external: events.filter(e => e.kind === 'external').length,
  };

  const chip = (key, label, n) => `
    <button class="due-chip${filter === key ? ' on' : ''}" data-cal-filter="${key}"
            aria-pressed="${filter === key}">${label}<span class="dc-n">${n}</span></button>`;

  const calBands = bands();

  const html = `
  <div class="content-inner">
    ${sectionTabs('exams', 'calendar')}
    ${pageHead({
      eyebrow: 'Deadlines',
      title: 'The year at a glance',
      lede: 'Every internal, derived-grade exam and external on one grid. The dot colour is the subject; the style tells you what kind of assessment it is.',
    })}

    <div class="cal-toolbar">
      <div class="due-chips" role="group" aria-label="Filter by type">
        ${chip('all', 'All', counts.all)}
        ${chip('internal', KINDS.internal.label, counts.internal)}
        ${chip('derived', KINDS.derived.label, counts.derived)}
        ${chip('external', KINDS.external.label, counts.external)}
      </div>
      <button class="btn btn-ghost btn-sm" id="cal-today">Jump to today</button>
      <div class="cal-legend">
        <span class="cl-key"><span class="cl-swatch k-internal"></span> internal</span>
        <span class="cl-key"><span class="cl-swatch k-derived"></span> derived</span>
        <span class="cl-key"><span class="cl-swatch k-external"></span> external</span>
        <span class="cl-key"><span class="cl-swatch cl-today"></span> today</span>
        <span class="cl-key"><span class="cl-swatch cl-holiday"></span> holidays</span>
        <span class="cl-key"><span class="cl-swatch cl-studyleave"></span> study leave (est.)</span>
      </div>
    </div>

    ${events.length
      ? `<div class="cal-nav">
           <button class="btn btn-ghost btn-sm" id="cal-prev" ${prevKey ? '' : 'disabled'}
                   aria-label="Previous month">‹</button>
           <div class="cal-nav-title">${MONTHS[shown.getMonth()]} <span class="muted">${shown.getFullYear()}</span></div>
           <button class="btn btn-ghost btn-sm" id="cal-next" ${nextKey ? '' : 'disabled'}
                   aria-label="Next month">›</button>
           ${cursor !== todayKey && keys.includes(todayKey)
             ? `<button class="btn btn-ghost btn-sm" id="cal-today">Today</button>` : ''}
         </div>
         <div class="cal-months one-month">${monthGrid(shown, events, filter, calBands)}</div>`
      : `<div class="empty-state">
           <div class="es-icon">📆</div>
           <h3>Nothing to show yet</h3>
           <p>Add your internals with dates and they'll appear here alongside the exam timetables.</p>
           <a class="btn btn-primary" href="/internals" data-link>Add internals →</a>
         </div>`}

    ${undated.length ? `
      <div class="callout callout-note mt-5">
        <div class="co-icon">ℹ</div>
        <div class="co-body">
          <h4>${undated.length} internal${undated.length === 1 ? '' : 's'} not on the calendar</h4>
          <div>${undated.map(i => `<strong>${esc(i.code || i.title)}</strong>`).join(', ')}, ${undated.length === 1 ? 'it has' : 'they have'} no date set, so ${undated.length === 1 ? 'it' : 'they'}
            can't be placed. <a href="/internals" data-link>Add ${undated.length === 1 ? 'a date' : 'dates'} →</a></div>
        </div>
      </div>` : ''}

    <p class="xs muted mt-5">A <strong>≈</strong> marks an internal placed from a rough
      “Term 3, Week 4” estimate rather than a firm date. Bars spanning several days are
      multi-day assessments.</p>
  </div>`;

  return {
    html,
    onMount() {
      /* Swap only the month grid, keeping scroll position, replacing the whole
         of #content threw the reader back to the top on every filter click. */
      document.querySelectorAll('[data-cal-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          store.setCalFilter(btn.dataset.calFilter);
          repaintCalendar();
        });
      });
      /* Deliberately NOT auto-scrolling to today: the router resets every page
         to the top (see router.js positionPage) and an automatic scroll here
         would fight it. Jumping is an explicit choice instead. */
      const go = (key) => { store.setCalMonth(key); repaintCalendar(); };
      document.getElementById('cal-prev')?.addEventListener('click', () => prevKey && go(prevKey));
      document.getElementById('cal-next')?.addEventListener('click', () => nextKey && go(nextKey));
      document.getElementById('cal-today')?.addEventListener('click', () => go(todayKey));
      /* Arrow keys page the calendar when nothing else has focus. */
      document.onkeydown = (e) => {
        if (e.target.matches('input,textarea,select')) return;
        if (e.key === 'ArrowLeft' && prevKey) go(prevKey);
        if (e.key === 'ArrowRight' && nextKey) go(nextKey);
      };
    },
  };
}

/* ============================================================================
   deadlines.js — one merged, date-ordered view of everything you have coming.
   ----------------------------------------------------------------------------
   Three separate things count as a deadline, and until now they lived in three
   different places:

     • internals — from the planner (localStorage, user-entered dates)
     • derived   — the school's derived-grade / trial exams (Sept 2026)
     • external  — the real NCEA externals (Nov 2026)

   The dashboard used to show only externals, which meant the September derived
   exams — the NEAREST assessments of the lot — never appeared anywhere on the
   home page. This module merges all three so "what's coming" means it.

   Every item is normalised to the same shape:
     { kind, subject, name, code, days, dateText, approx, span, status, href }
   ========================================================================== */
import { myExternalExams as externalExams, myDerivedExams as derivedExams, subjectById } from './registry.js';
import { store } from './store.js';
import { sortByDue, describeDate, daysUntilItem, STATUSES } from '../data/planner.js';

export const KINDS = {
  internal: { label: 'Internals', icon: '📝', noun: 'internal' },
  derived:  { label: 'Derived',   icon: '📋', noun: 'derived grade exam' },
  external: { label: 'Externals', icon: '📄', noun: 'external exam' },
};

/** Whole days from today to an ISO date (negative = past). */
function daysTo(iso) {
  if (!iso) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - today) / 86400000);
}

function fmt(iso) {
  return new Date(iso).toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
}

/**
 * Every upcoming deadline, newest-first, already normalised.
 * @param {object} opts
 *   kinds     — array of kinds to include (default: all three)
 *   graceDays — how far into the past to keep showing something (default 21)
 */
export function upcomingDeadlines({ kinds = ['internal', 'derived', 'external'], graceDays = 21 } = {}) {
  const out = [];

  if (kinds.includes('internal')) {
    sortByDue(store.internals().filter(i => i.status !== 'graded')).forEach(i => {
      const d = describeDate(i);
      const days = daysUntilItem(i);
      if (days === null) return;                    // undated — can't be ranked (see undatedInternals)
      out.push({
        kind: 'internal', subject: i.subject, name: i.title, code: i.code,
        days, dateText: d.text, approx: d.approx, span: d.span,
        status: i.status, statusLabel: (STATUSES[i.status] || {}).label,
        statusColour: (STATUSES[i.status] || {}).colour,
        href: '#/internals',
      });
    });
  }

  if (kinds.includes('derived')) {
    derivedExams.forEach(e => out.push({
      kind: 'derived', subject: e.subject,
      name: ((subjectById[e.subject] || {}).name || e.subject) + ' derived grade',
      code: e.paper, days: daysTo(e.date), dateText: fmt(e.date),
      approx: false, span: false, href: '#/exams',
    }));
  }

  if (kinds.includes('external')) {
    externalExams.forEach(e => out.push({
      kind: 'external', subject: e.subject,
      name: ((subjectById[e.subject] || {}).name || e.subject) + ' externals',
      code: e.standards, days: daysTo(e.date), dateText: fmt(e.date),
      approx: false, span: false, href: '#/exams',
    }));
  }

  return out
    .filter(x => x.days !== null && x.days >= -graceDays)
    .sort((a, b) => a.days - b.days);
}

/** Planner internals with no date yet — surfaced separately, since they can't be ranked. */
export function undatedInternals() {
  return store.internals().filter(i => i.status !== 'graded' && daysUntilItem(i) === null);
}

/** Counts per kind, for the filter chips. */
export function deadlineCounts(graceDays = 21) {
  const all = upcomingDeadlines({ graceDays });
  return {
    all: all.length,
    internal: all.filter(x => x.kind === 'internal').length,
    derived: all.filter(x => x.kind === 'derived').length,
    external: all.filter(x => x.kind === 'external').length,
  };
}

/** The pill shown on the right of a row: overdue / today / Nd / handed in. */
export function duePill(item) {
  if (item.kind === 'internal' && item.status === 'submitted') {
    return `<span class="due-pill">handed in</span>`;
  }
  if (item.days < 0)  return `<span class="due-pill overdue">${Math.abs(item.days)}d ago</span>`;
  if (item.days === 0) return `<span class="due-pill today">today</span>`;
  return `<span class="due-pill ${item.days <= 7 ? 'soon' : ''}">${item.approx ? '≈' : ''}${item.days}d</span>`;
}

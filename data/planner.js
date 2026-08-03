/* ============================================================================
   planner.js — term calendar + helpers for the internal deadline planner.
   ----------------------------------------------------------------------------
   An internal can be dated three ways:
     exact  — a single due date            ("2026-08-21")
     range  — a multi-day assessment       ("2026-09-01" → "2026-09-03")
     rough  — a term + week, when you don't have a date yet ("Term 3, Week 4")

   Rough entries still need to SORT sensibly against exact ones, so each rough
   period is converted to an approximate date from the term calendar below.
   ========================================================================== */

/* NZ state-school term start Mondays for 2026.
   ⚠️ These are typical dates — individual schools vary by a few days.
   Edit them here if Wellington College's calendar differs. */
export const TERMS_2026 = {
  1: { start: '2026-02-02', end: '2026-04-02', label: 'Term 1' },
  2: { start: '2026-04-20', end: '2026-06-26', label: 'Term 2' },
  3: { start: '2026-07-20', end: '2026-09-25', label: 'Term 3' },
  4: { start: '2026-10-12', end: '2026-12-11', label: 'Term 4' },
};

export const STATUSES = {
  notstarted: { label: 'Not started', colour: '#C25A52', order: 0 },
  inprogress: { label: 'In progress', colour: '#E07B39', order: 1 },
  submitted:  { label: 'Submitted',   colour: '#3E7FB8', order: 2 },
  graded:     { label: 'Graded',      colour: '#4FA97C', order: 3 },
};

/* Local YYYY-MM-DD. Deliberately NOT toISOString() — that converts local
   midnight to UTC, which in NZ (UTC+12/13) rolls every date back a day. */
function isoLocal(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Approximate calendar date for "Term t, Week w" (week 1 = the term's first week). */
export function roughToDate(term, week) {
  const t = TERMS_2026[term];
  if (!t) return null;
  const d = new Date(t.start + 'T00:00');
  d.setDate(d.getDate() + (Math.max(1, week || 1) - 1) * 7);
  return isoLocal(d);
}

/** The date an item should sort by, whatever mode it uses. */
export function effectiveDate(item) {
  if (!item) return null;
  if (item.dateMode === 'exact') return item.date || null;
  if (item.dateMode === 'range') return item.startDate || item.endDate || null;
  if (item.dateMode === 'rough') return roughToDate(item.term, item.week);
  return null;
}

/** Human-readable date description for an item. */
export function describeDate(item) {
  const fmt = (iso) => new Date(iso + 'T00:00')
    .toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });

  if (item.dateMode === 'exact' && item.date) return { text: fmt(item.date), approx: false, span: false };
  if (item.dateMode === 'range' && (item.startDate || item.endDate)) {
    if (item.startDate && item.endDate) {
      const days = Math.round((new Date(item.endDate + 'T00:00') - new Date(item.startDate + 'T00:00')) / 86400000) + 1;
      return { text: `${fmt(item.startDate)} → ${fmt(item.endDate)}`, approx: false, span: true, days };
    }
    return { text: fmt(item.startDate || item.endDate), approx: false, span: false };
  }
  if (item.dateMode === 'rough' && item.term) {
    const approxIso = roughToDate(item.term, item.week);
    return {
      text: `${TERMS_2026[item.term]?.label || 'Term ' + item.term}, Week ${item.week || 1}`,
      approx: true, span: false,
      hint: approxIso ? `about ${fmt(approxIso)}` : '',
    };
  }
  return { text: 'No date set', approx: true, span: false, unset: true };
}

/** Whole days from today until an item is due (negative = overdue). */
export function daysUntilItem(item) {
  const iso = effectiveDate(item);
  if (!iso) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const due = new Date(iso + 'T00:00');
  return Math.round((due - today) / 86400000);
}

/** Sort: dated items by date; undated items last. Stable and total. */
export function sortByDue(items) {
  return [...items].sort((a, b) => {
    const da = effectiveDate(a), db = effectiveDate(b);
    if (da && db) return da.localeCompare(db) || (a.title || '').localeCompare(b.title || '');
    if (da) return -1;
    if (db) return 1;
    return (a.title || '').localeCompare(b.title || '');
  });
}

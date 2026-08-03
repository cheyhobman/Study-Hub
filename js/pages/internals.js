/* ============================================================================
   pages/internals.js: "My Internals" deadline planner.
   ----------------------------------------------------------------------------
   Add/edit every outstanding internal with either an exact due date, a date
   RANGE (multi-day assessments like a Statistics report), or a rough period
   ("Term 3, Week 4") when the date isn't known yet.

   Status here feeds the Progress credit tracker:
     not started / in progress → 'todo'      (still to earn)
     submitted                 → 'pending'   (awaiting a result)
     graded                    → 'achieved'  (credits banked, with grade)
   ========================================================================== */
import { store } from '../store.js';
import { subjects, subjectMeta } from '../registry.js';
import { results } from '../../data/results.js';
import { internalsForSubject, outstandingInternals, itemFromCatalogue, plannerStatusFor, creditRecordFor } from '../internals-catalog.js';
import { pageHead, sectionTabs} from './common.js';
import { toast } from '../ui.js';
import { TERMS_2026, STATUSES, effectiveDate, describeDate, daysUntilItem, sortByDue } from '../../data/planner.js';

const uid = () => 'int_' + Math.random().toString(36).slice(2, 9);

/** Push a planner item's status through to the Progress tracker. */
function syncToProgress(item) {
  if (!item.recordKey) return;
  const row = results.find(r => `${r.group}:${r.code}` === item.recordKey);
  if (!row) return;
  store.setCreditRecord(item.recordKey, creditRecordFor(item.status, item.grade, row.credits));
}

/* The internals still outstanding on the record: used to seed the planner.
   Deliberately undated: guessing a due date would be worse than leaving it
   blank, so they sort to the bottom until you fill the real date in. */
function outstandingFromRecord() {
  return outstandingInternals().map(e => itemFromCatalogue(e));
}

/* ---- one row in the list ------------------------------------------------ */
function itemRow(item) {
  const s = subjectMeta(item.subject);
  const d = describeDate(item);
  const days = daysUntilItem(item);
  const st = STATUSES[item.status] || STATUSES.notstarted;
  const done = item.status === 'graded' || item.status === 'submitted';

  let due = '';
  if (d.unset) due = `<span class="xs muted">no date yet</span>`;
  else if (done) due = `<span class="xs muted">${d.text}</span>`;
  else if (days === null) due = '';
  else if (days < 0) due = `<span class="due-pill overdue">${Math.abs(days)}d overdue</span>`;
  else if (days === 0) due = `<span class="due-pill today">due today</span>`;
  else due = `<span class="due-pill ${days <= 7 ? 'soon' : ''}">${d.approx ? '≈' : ''}${days}d</span>`;

  return `<div class="int-row" data-id="${item.id}">
    <span class="int-dot" style="background:${s.dot || 'var(--accent)'}"></span>
    <div class="int-main">
      <div class="int-title">${item.code ? `<span class="mono xs">${item.code}</span> · ` : ''}${item.title || 'Untitled internal'}</div>
      <div class="int-meta">
        <span class="int-date">${d.span ? '' : ''}${d.text}${d.days > 1 ? ` <span class="xs muted">(${d.days} days)</span>` : ''}</span>
        ${d.approx && d.hint ? `<span class="xs muted"> · ${d.hint}</span>` : ''}
        ${item.credits ? `<span class="xs muted"> · ${item.credits} credits</span>` : ''}
        ${item.topicId ? ` · <a class="xs" href="#/topic/${item.topicId}" data-link>study →</a>` : ''}
      </div>
    </div>
    <span class="int-status" style="background:${st.colour}22;color:${st.colour};border-color:${st.colour}55">${st.label}${item.status === 'graded' && item.grade ? ` · ${item.grade}` : ''}</span>
    ${due}
    <span class="int-actions">
      <button class="btn btn-ghost btn-sm int-edit" data-id="${item.id}" aria-label="Edit ${item.title}">Edit</button>
      <button class="btn btn-ghost btn-sm int-del" data-id="${item.id}" aria-label="Delete ${item.title}">✕</button>
    </span>
  </div>`;
}

/* Options for the "which internal?" dropdown, for one subject. */
/* Subjects the student added on the Progress page, grouped so they can be
   planned and put on the calendar exactly like the six taught ones. The value
   is prefixed `x:` so pickOptions can tell them apart from a taught subject. */
function extraSubjectOptions(current) {
  const groups = [...new Set(store.extraStandards().map(r => r.group))];
  if (!groups.length) return '';
  return `<optgroup label="Your other subjects">` + groups.map(g => {
    const name = (store.extraStandards().find(r => r.group === g) || {}).subject || g;
    const v = 'x:' + g;
    return `<option value="${v}"${v === current ? ' selected' : ''}>${name} (${g})</option>`;
  }).join('') + `</optgroup>`;
}

function pickOptions(subjectId, currentKey) {
  if (!subjectId) return `<option value="">Pick a subject first</option>`;

  /* An added subject: list only its INTERNAL standards, since this page plans
     internals. Externals already come from the exam timetable. */
  if (subjectId.startsWith('x:')) {
    const g = subjectId.slice(2);
    const mine = store.extraStandards().filter(r => r.group === g && r.assess === 'Internal');
    if (!mine.length) return `<option value="">No internals in this subject</option>`;
    return `<option value="">Something else, not on my record</option>` +
      mine.map(r => {
        const key = `${r.group}:${r.code}`;
        return `<option value="${key}"${key === currentKey ? ' selected' : ''}>
          ${r.subject} ${r.code} · ${r.title} · ${r.credits} cr</option>`;
      }).join('');
  }

  const list = internalsForSubject(subjectId);
  if (!list.length) return `<option value="">No internals recorded for this subject</option>`;
  const label = { todo: '', pending: ' (submitted)', achieved: ' (already achieved)' };
  return `<option value="">Something else, not on my record</option>` +
    list.map(i => `<option value="${i.recordKey}"${i.recordKey === currentKey ? ' selected' : ''}>
      ${i.shortCode} · ${i.title} · ${i.credits} cr${label[i.status] || ''}</option>`).join('');
}

/* ---- the add/edit form -------------------------------------------------- */
function formHtml(item) {
  const it = item || { dateMode: 'exact', status: 'notstarted' };
  /* Compare as strings: option values arrive from the DOM as strings, but
     callers pass numbers for term. A strict === silently selected nothing and
     the browser fell back to the first option. */
  const opt = (v, label, cur) =>
    `<option value="${v}"${String(cur) === String(v) ? ' selected' : ''}>${label}</option>`;
  return `
  <form class="int-form card" id="int-form" novalidate>
    <h3 class="mb-3">${item ? 'Edit internal' : 'Add an internal'}</h3>

    <div class="grid grid-2">
      <label class="field"><span>Subject</span>
        <select class="sa-input" name="subject" id="int-subject">
          <option value="">Choose a subject</option>
          ${subjects.map(s => opt(s.id, s.name, it.subject)).join('')}
          ${extraSubjectOptions(it.subject)}
        </select>
      </label>
      <label class="field"><span>Which internal? <span class="xs muted">picks up the details for you</span></span>
        <select class="sa-input" name="pick" id="int-pick"${it.subject ? '' : ' disabled'}>
          ${pickOptions(it.subject, it.recordKey)}
        </select>
      </label>
    </div>

    <details class="int-manual"${it.recordKey ? '' : ' open'}>
      <summary>Details${it.recordKey ? ' <span class="xs muted">. Filled in from your record</span>' : ''}</summary>
      <div class="grid grid-2 mt-3">
        <label class="field"><span>Standard <span class="xs muted">(e.g. Chemistry 3.2)</span></span>
          <input class="sa-input" name="code" value="${it.code || ''}" placeholder="Chemistry 3.2">
        </label>
        <label class="field"><span>Credits</span>
          <input class="sa-input" type="number" name="credits" min="0" max="30" value="${it.credits || ''}">
        </label>
      </div>
      <label class="field"><span>Title <span class="req">*</span></span>
        <input class="sa-input" name="title" value="${it.title || ''}" placeholder="Spectroscopic data investigation" required>
      </label>
    </details>

    <fieldset class="field">
      <legend>When is it due?</legend>
      <div class="seg" role="radiogroup" aria-label="Date type">
        ${['exact', 'range', 'rough'].map(m => `
          <label class="seg-opt">
            <input type="radio" name="dateMode" value="${m}"${it.dateMode === m ? ' checked' : ''}>
            <span>${m === 'exact' ? 'One date' : m === 'range' ? 'Spans several days' : 'Rough period'}</span>
          </label>`).join('')}
      </div>

      <div class="dm dm-exact${it.dateMode === 'exact' ? '' : ' hidden'}">
        <label class="field"><span>Due date</span>
          <input class="sa-input" type="date" name="date" value="${it.date || ''}"></label>
      </div>

      <div class="dm dm-range${it.dateMode === 'range' ? '' : ' hidden'}">
        <div class="grid grid-2">
          <label class="field"><span>Starts</span>
            <input class="sa-input" type="date" name="startDate" value="${it.startDate || ''}"></label>
          <label class="field"><span>Ends</span>
            <input class="sa-input" type="date" name="endDate" value="${it.endDate || ''}"></label>
        </div>
        <p class="xs muted">For assessments that run across several days: e.g. a Statistics report done over three periods.</p>
      </div>

      <div class="dm dm-rough${it.dateMode === 'rough' ? '' : ' hidden'}">
        <div class="grid grid-2">
          <label class="field"><span>Term</span>
            <select class="sa-input" name="term">
              ${opt('', 'Not sure yet', it.term ? String(it.term) : '')}
              ${[1, 2, 3, 4].map(t => opt(t, TERMS_2026[t].label, it.term ? String(it.term) : '')).join('')}
            </select></label>
          <label class="field"><span>Week</span>
            <input class="sa-input" type="number" name="week" min="1" max="12" value="${it.week || 1}"></label>
        </div>
        <p class="xs muted">Used when you don't have an exact date yet. It still sorts correctly against dated items, using the term calendar in <code>data/planner.js</code>.</p>
      </div>
    </fieldset>

    <div class="grid grid-2">
      <label class="field"><span>Status</span>
        <select class="sa-input" name="status">
          ${Object.entries(STATUSES).map(([k, v]) => opt(k, v.label, it.status)).join('')}
        </select></label>
      <label class="field"><span>Grade <span class="xs muted">(once graded)</span></span>
        <select class="sa-input" name="grade">
          <option value="">N/A</option>
          ${['A', 'M', 'E', 'N'].map(g => opt(g, { A: 'Achieved', M: 'Merit', E: 'Excellence', N: 'Not achieved' }[g], it.grade)).join('')}
        </select></label>
    </div>

    <p class="int-error hidden" id="int-error" role="alert"></p>

    <div class="flex gap-3 wrap mt-3">
      <button type="submit" class="btn btn-primary">${item ? 'Save changes' : 'Add internal'}</button>
      <button type="button" class="btn btn-ghost" id="int-cancel">Cancel</button>
      <span class="xs muted" style="align-self:center">Esc to cancel · ↵ to save</span>
    </div>
    <input type="hidden" name="id" value="${it.id || ''}">
    <input type="hidden" name="recordKey" value="${it.recordKey || ''}">
    <input type="hidden" name="topicId" value="${it.topicId || ''}">
  </form>`;
}

/* ---- page --------------------------------------------------------------- */
export function renderInternals(editId = null) {
  const items = sortByDue(store.internals());
  const editing = editId ? items.find(i => i.id === editId) : null;

  const outstanding = items.filter(i => i.status !== 'graded');
  /* Only work you still have to hand in can be overdue. Something already
     submitted is waiting on a marker, not on you. */
  const overdue = outstanding.filter(i =>
    i.status !== 'submitted' && (daysUntilItem(i) ?? 99) < 0);
  const undated = outstanding.filter(i => !effectiveDate(i));

  const list = items.length
    ? `<div class="int-list">${items.map(itemRow).join('')}</div>`
    : `<div class="empty-state">
         <div class="es-icon">🗓</div>
         <h3>You haven't added any internals yet</h3>
         <p>Add each outstanding internal with a due date (or a rough term and week if you don't know it yet)
            and they'll appear here and in <strong>What's coming</strong> on your dashboard.</p>
         <div class="flex gap-3 wrap" style="justify-content:center">
           <button class="btn btn-primary" id="int-add-empty">+ Add an internal</button>
           <button class="btn btn-ghost" id="int-seed">Load my ${outstandingFromRecord().length} outstanding internals</button>
         </div>
       </div>`;

  const html = `
  <div class="content-inner">
    ${sectionTabs('exams', 'internals')}
    ${pageHead({
      eyebrow: '🗓 Deadline planner',
      title: 'My internals',
      lede: 'Every outstanding internal, sorted by what’s due next. Statuses here feed straight into your Progress tracker.',
    })}

    ${items.length ? `
      <div class="stat-row mb-5">
        <div class="stat-tile"><div class="stt-num">${outstanding.length}</div><div class="stt-label">Still outstanding</div></div>
        <div class="stat-tile"><div class="stt-num" style="color:${overdue.length ? 'var(--bad)' : 'inherit'}">${overdue.length}</div><div class="stt-label">Overdue</div></div>
        <div class="stat-tile"><div class="stt-num">${items.filter(i => i.status === 'graded').length}</div><div class="stt-label">Graded</div></div>
        <div class="stat-tile"><div class="stt-num">${outstanding.reduce((n, i) => n + (Number(i.credits) || 0), 0)}</div><div class="stt-label">Credits riding on them</div></div>
      </div>

      ${undated.length ? `
        <div class="callout callout-note mb-5">
          <div class="co-icon">ℹ</div>
          <div class="co-body">
            <h4>${undated.length} internal${undated.length === 1 ? ' has' : 's have'} no date yet</h4>
            <div>Hit <strong>Edit</strong> on ${undated.length === 1 ? 'it' : 'them'} and add the due date, or a rough
              term and week if that's all you know. Undated items sit at the bottom of this list and never
              appear in <strong>What's coming</strong> on your dashboard.</div>
          </div>
        </div>` : ''}

      <div class="flex gap-3 wrap mb-3" style="justify-content:space-between">
        <h2>All internals</h2>
        <button class="btn btn-primary btn-sm" id="int-add">+ Add internal</button>
      </div>` : ''}

    <div id="int-form-slot">${editing || editId === 'new' ? formHtml(editing) : ''}</div>

    ${list}

    ${items.length ? `<p class="xs muted mt-5">Rough periods (“Term 3, Week 4”) are converted to an approximate date so they sort against exact dates: shown with a <strong>≈</strong>. Term dates live in <code>data/planner.js</code> if your school's calendar differs.</p>` : ''}
  </div>`;

  return {
    html,
    onMount() {
      /* Keep the reader's place. Opening the form, saving an internal or
         deleting one all rebuild this page, and losing scroll each time made
         editing several internals in a row feel like the page was reloading. */
      const rerender = (edit = null) => {
        const y = window.scrollY;
        const v = renderInternals(edit);
        document.getElementById('content').innerHTML = v.html;
        v.onMount();
        // Opening the form should show the form; everything else holds position.
        if (!edit) window.scrollTo(0, y);
      };

      const openForm = (id) => { rerender(id || 'new'); setTimeout(() => document.querySelector('#int-form [name=title]')?.focus(), 30); };

      document.getElementById('int-add')?.addEventListener('click', () => openForm());
      document.getElementById('int-add-empty')?.addEventListener('click', () => openForm());

      document.getElementById('int-seed')?.addEventListener('click', () => {
        const seeded = outstandingFromRecord();
        if (!seeded.length) { toast('No outstanding internals found on your record'); return; }
        store.setInternals(seeded);
        toast(`Added ${seeded.length} internals from your record`);
        rerender();
      });

      document.querySelectorAll('.int-edit').forEach(b =>
        b.addEventListener('click', () => openForm(b.dataset.id)));

      document.querySelectorAll('.int-del').forEach(b =>
        b.addEventListener('click', () => {
          const it = store.internals().find(x => x.id === b.dataset.id);
          if (!confirm(`Delete “${it?.title || 'this internal'}”?`)) return;
          store.deleteInternal(b.dataset.id);
          toast('Internal removed');
          rerender();
        }));

      /* ---- form ---- */
      const form = document.getElementById('int-form');
      if (form) {
        /* --- subject → standard cascade ---
           Choosing a subject fills the second dropdown with that subject's
           internals; choosing one of those fills in code, title, credits and
           the hidden record/topic keys so nothing has to be typed. */
        const subjSel = document.getElementById('int-subject');
        const pickSel = document.getElementById('int-pick');
        const manual = form.querySelector('.int-manual');

        subjSel?.addEventListener('change', () => {
          pickSel.innerHTML = pickOptions(subjSel.value, '');
          pickSel.disabled = !subjSel.value;
          manual.open = true;
        });

        pickSel?.addEventListener('change', () => {
          /* Added subjects carry an `x:` prefix and come from the student's own
             extra-standards list rather than the taught catalogue. */
          let entry;
          if (subjSel.value.startsWith('x:')) {
            const r = store.extraStandards().find(x => `${x.group}:${x.code}` === pickSel.value);
            if (r) entry = { code: `${r.subject} ${r.code}`, title: r.title, credits: r.credits,
                             recordKey: `${r.group}:${r.code}`, topicId: '', status: 'todo' };
          } else {
            entry = internalsForSubject(subjSel.value).find(i => i.recordKey === pickSel.value);
          }
          if (!entry) { manual.open = true; return; }
          form.code.value = entry.code;
          form.title.value = entry.title;
          form.credits.value = entry.credits;
          form.recordKey.value = entry.recordKey;
          form.topicId.value = entry.topicId;
          // only overwrite status for a NEW item: don't clobber an edit
          if (!form.id.value) form.status.value = plannerStatusFor(entry.status);
          if (entry.grade) form.grade.value = entry.grade;
          manual.open = false;
          toast(`Filled in ${entry.code} · ${entry.credits} credits`);
        });

        /* Status away from "graded" clears the grade, so a stale result cannot
           sit next to a status that cannot have one. */
        form.status?.addEventListener('change', () => {
          if (form.status.value !== 'graded' && form.grade) form.grade.value = '';
        });

        // switch which date fields are visible
        form.querySelectorAll('[name=dateMode]').forEach(r =>
          r.addEventListener('change', () => {
            ['exact', 'range', 'rough'].forEach(m =>
              form.querySelector('.dm-' + m).classList.toggle('hidden', r.form.dateMode.value !== m));
          }));

        const cancel = () => rerender();
        document.getElementById('int-cancel').addEventListener('click', cancel);
        form.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); cancel(); } });

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const f = new FormData(form);
          const err = document.getElementById('int-error');
          const fail = (msg) => { err.textContent = msg; err.classList.remove('hidden'); };

          const title = (f.get('title') || '').trim();
          if (!title) return fail('Give the internal a title so you can recognise it.');

          const mode = f.get('dateMode');
          const item = {
            id: f.get('id') || uid(),
            subject: f.get('subject') || '',
            code: (f.get('code') || '').trim(),
            title,
            topicId: f.get('topicId') || '',
            recordKey: f.get('recordKey') || '',
            credits: Number(f.get('credits')) || 0,
            dateMode: mode,
            status: f.get('status') || 'notstarted',
            grade: f.get('grade') || '',
          };

          if (mode === 'exact') {
            item.date = f.get('date') || '';
            if (!item.date) return fail('Pick a due date, or switch to a rough period.');
          } else if (mode === 'range') {
            item.startDate = f.get('startDate') || '';
            item.endDate = f.get('endDate') || '';
            if (!item.startDate || !item.endDate) return fail('A multi-day assessment needs both a start and an end date.');
            if (item.endDate < item.startDate) return fail('The end date is before the start date.');
          } else {
            // "Not sure yet" leaves the item genuinely undated rather than
            // inventing a date that would then drive a countdown.
            const term = Number(f.get('term')) || null;
            item.term = term;
            item.week = term ? Math.min(12, Math.max(1, Number(f.get('week')) || 1)) : null;
          }
          if (item.status === 'graded' && !item.grade) return fail('Add the grade you got, or set the status back to Submitted.');

          store.saveInternal(item);
          syncToProgress(item);          // keep the credit tracker in step
          toast(f.get('id') ? 'Internal updated' : 'Internal added');
          rerender();
        });
      }
    },
  };
}

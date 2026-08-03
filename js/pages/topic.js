/* ============================================================================
   pages/topic.js — a single standard/topic page.
   Renders teaching content (sections of blocks), a sticky table of contents,
   past-paper links, and an inline practice quiz. Also hosts the review/flag
   toggles that feed the progress tracker.
   ========================================================================== */
import { getTopic } from '../registry.js';
import { store } from '../store.js';
import { renderBlocks, renderBlock, initScrollSpy, toast, slug, icons, pastPapersTable } from '../ui.js';
import { mountQuiz } from '../quiz.js';
import { mountFlashcards } from '../flashcards.js';
import { startExamTimer, examMinutesFor } from '../timer.js';
import { crumbs, stdBadges } from './common.js';
import { internalForTopic, itemFromCatalogue, creditRecordFor } from '../internals-catalog.js';
import { TERMS_2026, STATUSES, describeDate, daysUntilItem } from '../../data/planner.js';

export async function renderTopic(topicId) {
  const { std, subject, topic } = await getTopic(topicId);

  if (!std && !topic) {
    return { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">🧭</div><h3>Topic not found</h3><p>That page doesn’t exist yet. Back to the <a href="#/" data-link>dashboard</a>.</p></div></div>` };
  }

  const title = (topic && topic.title) || std.title;
  const sections = (topic && topic.sections) || [];
  const hasContent = sections.length > 0;

  /* If this standard is internally assessed, the toolbar gets a due-date
     control that writes straight into the planner, pre-filled from the record
     (credits, standard code, recordKey) so nothing has to be typed twice. */
  const cat = internalForTopic(topicId);
  const plannerItem = cat
    ? store.internals().find(i => i.recordKey === cat.recordKey || i.topicId === topicId) || null
    : null;

  const hasCards = !!(topic && topic.flashcards && topic.flashcards.length);
  const hasQuiz = !!(topic && topic.quiz && topic.quiz.length);
  // Internals have no exam papers, so only externals get the NZQA paper table.
  const paperTable = (std && std.num && std.type === 'External') ? pastPapersTable(std.num) : '';
  const hasPapers = !!(paperTable || (topic && topic.links));

  // Table of contents from section titles + practice + resources
  const toc = hasContent ? `<aside class="toc">
    <div class="toc-title">On this page</div>
    ${sections.map(sec => `<a href="#${slug(sec.id || sec.title)}">${sec.title}</a>`).join('')}
    ${hasCards ? `<a href="#flashcards">Flashcards</a>` : ''}
    ${hasQuiz ? `<a href="#practice-quiz">Practice quiz</a>` : ''}
    ${hasPapers ? `<a href="#past-papers">Past exams</a>` : ''}
  </aside>` : '';

  // Main body — each section can carry an optional `video` (string query or {label,query})
  const body = hasContent
    ? sections.map(sec => `
        <section class="section" id="${slug(sec.id || sec.title)}">
          <h2>${sec.num ? `<span class="section-num">${sec.num}</span>` : ''}${sec.title}</h2>
          ${sec.intro ? `<div class="prose mb-3">${sec.intro}</div>` : ''}
          ${sec.video ? renderBlock({ t: 'video', ...(typeof sec.video === 'string' ? { query: sec.video, label: 'Watch: ' + sec.title } : sec.video) }) : ''}
          ${renderBlocks(sec.blocks)}
        </section>`).join('')
    : placeholderBody(std, subject);

  // Flashcards
  const flashcards = hasCards
    ? `<section class="section" id="flashcards">
        <h2>🗂 Flashcards</h2>
        <p class="muted small mb-3">${topic.flashcards.length} cards · flip, then grade yourself. Cards you get <strong>wrong come back sooner</strong> (Leitner spaced repetition); tap <em>Explain this answer</em> for the full reasoning.</p>
        <div id="flashcard-mount"></div>
      </section>` : '';

  // Quiz mount point
  const quiz = hasQuiz
    ? `<section class="section" id="practice-quiz">
        <h2>✏️ Practice quiz</h2>
        <p class="muted small mb-3">${topic.quiz.length} question${topic.quiz.length === 1 ? '' : 's'} · instant feedback, shuffled each attempt. Your best score is saved on this device.</p>
        <div id="quiz-mount"></div>
      </section>` : '';

  // Past exams — auto-generated 5-year NZQA table + any curated links
  const papers = hasPapers
    ? `<section class="section" id="past-papers">
        <h2>📄 Past exams &amp; resources</h2>
        ${paperTable}
        ${(topic && topic.links) ? `<div class="linklist" style="margin-top:var(--sp-4)">${topic.links.map(linkRow).join('')}</div>` : ''}
      </section>` : '';

  /* Per-topic accent colour (currently Biology only — see css §Biology
     per-topic colour coding). Set as an inline custom property so every
     `[data-topic-accent]` rule picks it up. */
  const accent = topic && topic.accent;

  const html = `
  <div class="content-inner"${accent ? ` data-topic-accent style="--topic-accent:${accent}"` : ''}>
    ${accent ? '<div class="topic-accent-bar"></div>' : ''}
    ${crumbs([
      { label: 'Home', href: '#/' },
      { label: subject ? subject.name : 'Subject', href: subject ? `#/subject/${subject.id}` : '#/' },
      { label: std ? std.code : title },
    ])}

    <header class="page-head">
      <div class="eyebrow">${subject ? subject.icon + ' ' + subject.name : ''}${std ? ' · ' + std.code : ''}${std && std.assess ? ' · ' + std.assess : ''}</div>
      <h1>${title}</h1>
      <div class="flex items-center gap-3 wrap" style="margin-top:var(--sp-3)">
        ${std ? stdBadges(std) : ''}
        ${topic && topic.tags ? topic.tags.map(t => `<span class="chip">${t}</span>`).join('') : ''}
      </div>
      ${(topic && topic.intro) ? `<p class="lede" style="margin-top:var(--sp-4)">${topic.intro}</p>` : (std ? `<p class="lede" style="margin-top:var(--sp-4)">${std.blurb || ''}</p>` : '')}
    </header>

    <!-- review / flag toolbar -->
    <div class="topic-toolbar">
      <button class="toggle-btn ${store.isReviewed(topicId) ? 'on-review' : ''}" id="btn-review">
        ${icons.check} <span>${store.isReviewed(topicId) ? 'Reviewed' : 'Mark reviewed'}</span>
      </button>
      <button class="toggle-btn ${store.isFlagged(topicId) ? 'on-flag' : ''}" id="btn-flag">
        ${icons.flag} <span>${store.isFlagged(topicId) ? 'Flagged' : 'Flag for review'}</span>
      </button>
      ${cat ? dueButton(cat, plannerItem) : ''}
      <span class="tt-spacer"></span>
      ${subject ? `<a class="tt-jump" href="#/reference/${subject.id}" data-link>Reference sheet →</a>` : ''}
    </div>

    ${cat ? duePanel(cat, plannerItem) : ''}

    <div class="topic-layout">
      <div class="topic-body">
        ${body}
        ${flashcards}
        ${quiz}
        ${papers}
      </div>
      ${toc}
    </div>
  </div>`;

  return {
    html,
    onMount() {
      // review / flag toggles
      const reviewBtn = document.getElementById('btn-review');
      const flagBtn = document.getElementById('btn-flag');
      reviewBtn && reviewBtn.addEventListener('click', () => {
        const on = store.toggleReviewed(topicId);
        reviewBtn.classList.toggle('on-review', on);
        reviewBtn.querySelector('span').textContent = on ? 'Reviewed' : 'Mark reviewed';
        toast(on ? '✓ Marked as reviewed' : 'Removed from reviewed');
      });
      flagBtn && flagBtn.addEventListener('click', () => {
        const on = store.toggleFlagged(topicId);
        flagBtn.classList.toggle('on-flag', on);
        flagBtn.querySelector('span').textContent = on ? 'Flagged' : 'Flag for review';
        toast(on ? '🚩 Flagged for review' : 'Flag removed');
      });

      // internal due-date widget (only present on internally-assessed standards)
      if (cat) wireDuePanel(cat, plannerItem, topicId);

      // flashcards
      if (topic && topic.flashcards && topic.flashcards.length) {
        mountFlashcards(document.getElementById('flashcard-mount'), { cards: topic.flashcards, deckId: topicId });
      }

      // quiz
      if (topic && topic.quiz && topic.quiz.length) {
        mountQuiz(document.getElementById('quiz-mount'), { topicId, questions: topic.quiz });
      }

      // "Practice under exam conditions" — open the paper + start a countdown
      document.querySelectorAll('.timed-practice').forEach(btn => {
        btn.addEventListener('click', () => {
          const num = btn.dataset.num, year = btn.dataset.year;
          const mins = examMinutesFor(num);
          if (!confirm(`Start a ${mins}-minute timed practice for AS ${num} (${year})?\n\nThe paper opens in a new tab and a countdown will run here.`)) return;
          window.open(btn.dataset.url, '_blank', 'noopener');
          startExamTimer({ label: `AS ${num} · ${year} paper`, minutes: mins });
          toast(`⏱ Timer started — ${mins} minutes`);
        });
      });

      initScrollSpy();
    },
  };
}

/* ============================================================================
   Internal due-date widget — sits in the topic toolbar beside review/flag.
   ========================================================================== */

/** The toolbar button: shows the current due state at a glance. */
function dueButton(cat, item) {
  if (!item) {
    return `<button class="toggle-btn" id="btn-due" aria-expanded="false" aria-controls="due-panel">
      🗓 <span>Set due date</span></button>`;
  }
  const d = describeDate(item);
  const days = daysUntilItem(item);
  const st = STATUSES[item.status] || STATUSES.notstarted;
  let tail = d.unset ? 'no date yet' : d.text;
  if (!d.unset && days !== null && item.status !== 'graded' && item.status !== 'submitted') {
    tail += days < 0 ? ` · ${Math.abs(days)}d overdue` : days === 0 ? ' · today' : ` · ${d.approx ? '≈' : ''}${days}d`;
  }
  return `<button class="toggle-btn on-due" id="btn-due" aria-expanded="false" aria-controls="due-panel"
    style="--due-col:${st.colour}">🗓 <span>${tail}</span></button>`;
}

/** The expandable editor. Everything except the date is already known. */
function duePanel(cat, item) {
  const it = item || {};
  const mode = it.dateMode || 'exact';
  const sel = (v, cur) => (String(cur) === String(v) ? ' selected' : '');
  return `
  <div class="due-panel hidden" id="due-panel">
    <div class="dp-head">
      <div>
        <strong>${cat.code}</strong> · ${cat.credits} credits · internal
        <div class="xs muted">${cat.title}</div>
      </div>
      ${item ? `<a class="xs" href="#/internals" data-link>open planner →</a>` : `<span class="xs muted">Saving adds this to <strong>My internals</strong></span>`}
    </div>

    <div class="dp-grid">
      <label class="field"><span>When is it due?</span>
        <select class="sa-input" id="dp-mode">
          <option value="exact"${sel('exact', mode)}>One date</option>
          <option value="range"${sel('range', mode)}>Spans several days</option>
          <option value="rough"${sel('rough', mode)}>Rough period</option>
        </select>
      </label>

      <div class="dp-dates dp-exact${mode === 'exact' ? '' : ' hidden'}">
        <label class="field"><span>Due date</span>
          <input class="sa-input" type="date" id="dp-date" value="${it.date || ''}"></label>
      </div>

      <div class="dp-dates dp-range${mode === 'range' ? '' : ' hidden'}">
        <label class="field"><span>Starts</span>
          <input class="sa-input" type="date" id="dp-start" value="${it.startDate || ''}"></label>
        <label class="field"><span>Ends</span>
          <input class="sa-input" type="date" id="dp-end" value="${it.endDate || ''}"></label>
      </div>

      <div class="dp-dates dp-rough${mode === 'rough' ? '' : ' hidden'}">
        <label class="field"><span>Term</span>
          <select class="sa-input" id="dp-term">
            <option value=""${it.term ? '' : ' selected'}>Not sure yet</option>
            ${[1, 2, 3, 4].map(t => `<option value="${t}"${sel(t, it.term)}>${TERMS_2026[t].label}</option>`).join('')}
          </select></label>
        <label class="field"><span>Week</span>
          <input class="sa-input" type="number" id="dp-week" min="1" max="12" value="${it.week || 1}"></label>
      </div>

      <label class="field"><span>Status</span>
        <select class="sa-input" id="dp-status">
          ${Object.entries(STATUSES).map(([k, v]) => `<option value="${k}"${sel(k, it.status || 'notstarted')}>${v.label}</option>`).join('')}
        </select></label>

      <label class="field dp-grade${(it.status || '') === 'graded' ? '' : ' hidden'}"><span>Grade</span>
        <select class="sa-input" id="dp-gradesel">
          <option value="">—</option>
          ${['A', 'M', 'E', 'N'].map(g => `<option value="${g}"${sel(g, it.grade)}>${{ A: 'Achieved', M: 'Merit', E: 'Excellence', N: 'Not achieved' }[g]}</option>`).join('')}
        </select></label>
    </div>

    <p class="int-error hidden" id="dp-error" role="alert"></p>

    <div class="flex gap-3 wrap">
      <button class="btn btn-primary btn-sm" id="dp-save">${item ? 'Update' : 'Save to planner'}</button>
      <button class="btn btn-ghost btn-sm" id="dp-close">Cancel</button>
      ${item ? `<button class="btn btn-ghost btn-sm" id="dp-remove" style="margin-left:auto">Remove from planner</button>` : ''}
    </div>
  </div>`;
}

/** Wire the widget. Returns nothing; re-renders the route on save. */
function wireDuePanel(cat, item, topicId) {
  const btn = document.getElementById('btn-due');
  const panel = document.getElementById('due-panel');
  if (!btn || !panel) return;

  const toggle = (open) => {
    panel.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    if (open) panel.querySelector('select,input')?.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => toggle(panel.classList.contains('hidden')));
  document.getElementById('dp-close').addEventListener('click', () => toggle(false));
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); toggle(false); btn.focus(); } });

  const modeSel = document.getElementById('dp-mode');
  modeSel.addEventListener('change', () => {
    ['exact', 'range', 'rough'].forEach(m =>
      panel.querySelector('.dp-' + m).classList.toggle('hidden', modeSel.value !== m));
  });

  const statusSel = document.getElementById('dp-status');
  statusSel.addEventListener('change', () =>
    panel.querySelector('.dp-grade').classList.toggle('hidden', statusSel.value !== 'graded'));

  document.getElementById('dp-remove')?.addEventListener('click', () => {
    store.deleteInternal(item.id);
    toast('Removed from planner');
    location.reload();
  });

  document.getElementById('dp-save').addEventListener('click', () => {
    const err = document.getElementById('dp-error');
    const fail = (m) => { err.textContent = m; err.classList.remove('hidden'); };
    const mode = modeSel.value;
    const status = statusSel.value;
    const grade = document.getElementById('dp-gradesel').value;

    const base = item || itemFromCatalogue(cat);
    const next = { ...base, dateMode: mode, status, grade,
                   date: '', startDate: '', endDate: '', term: null, week: null };

    if (mode === 'exact') {
      next.date = document.getElementById('dp-date').value;
      if (!next.date) return fail('Pick a due date, or choose a rough period instead.');
    } else if (mode === 'range') {
      next.startDate = document.getElementById('dp-start').value;
      next.endDate = document.getElementById('dp-end').value;
      if (!next.startDate || !next.endDate) return fail('A multi-day assessment needs both a start and an end date.');
      if (next.endDate < next.startDate) return fail('The end date is before the start date.');
    } else {
      const t = Number(document.getElementById('dp-term').value) || null;
      next.term = t;
      next.week = t ? Math.min(12, Math.max(1, Number(document.getElementById('dp-week').value) || 1)) : null;
    }
    if (status === 'graded' && !grade) return fail('Add the grade you got, or set the status back to Submitted.');

    store.saveInternal(next);
    // keep the credit tracker in step, exactly as the planner page does
    store.setCreditRecord(next.recordKey, creditRecordFor(status, grade, cat.credits));
    toast(item ? 'Due date updated' : 'Added to My internals');
    location.reload();
  });
}

/* ---- link row for past papers ---- */
function linkRow(l) {
  const badge = l.verify
    ? `<span class="lr-verify v-check">check latest</span>`
    : (l.verified ? `<span class="lr-verify v-ok">verified</span>` : '');
  return `<a class="linkrow" href="${l.url}" target="_blank" rel="noopener">
    <span class="lr-icon">${icons.doc}</span>
    <span class="lr-main"><span class="lr-label">${l.label}</span>${l.note ? `<span class="lr-note">${l.note}</span>` : ''}</span>
    ${badge}
    <span class="lr-ext">${icons.ext}</span>
  </a>`;
}

/* ---- placeholder shown before a topic's content is written ---- */
function placeholderBody(std, subject) {
  const num = std ? std.num : '';
  return `<div class="placeholder">
    <div class="ph-icon">🚧</div>
    <h3>Teaching content coming soon</h3>
    <p>${std ? std.blurb : ''}</p>
    <div class="chips" style="justify-content:center;margin-top:var(--sp-4)">
      <span class="chip">Notes</span><span class="chip">Worked examples</span>
      <span class="chip">Common mistakes</span><span class="chip">Practice quiz</span>
    </div>
  </div>
  <section class="section" id="past-papers">
    <h2>📄 Official resources</h2>
    <div class="linklist">
      <a class="linkrow" href="https://www.nzqa.govt.nz/ncea/subjects/" target="_blank" rel="noopener">
        <span class="lr-icon">${icons.doc}</span>
        <span class="lr-main"><span class="lr-label">NZQA — NCEA subject pages</span><span class="lr-note">Assessment specs, past papers &amp; schedules${num ? ' · search ' + num : ''}</span></span>
        <span class="lr-verify v-check">check latest</span>
        <span class="lr-ext">${icons.ext}</span>
      </a>
    </div>
  </section>`;
}

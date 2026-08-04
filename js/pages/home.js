/* ============================================================================
   pages/home.js: the dashboard.
   ----------------------------------------------------------------------------
   Four blocks, in the order you actually need them:

     1. Hero: greeting, headline numbers, "start a revision session"
     2. What's coming: ONE merged timeline: internals + derived + externals,
                        filterable. This replaces what used to be two separate
                        widgets (an externals-only countdown card and a
                        "what's due next" strip) that answered the same question
                        and between them still managed to omit the September
                        derived exams entirely.
     3. Snapshot, streak, flagged, reviewed %, and weakest topics in one row
     4. Subjects, the grid
   ========================================================================== */
import { visibleSubjects, subjectById, visibleStandards } from '../registry.js';
import { store } from '../store.js';
import { esc } from '../ui.js';
import { upcomingDeadlines, undatedInternals, deadlineCounts, duePill, KINDS } from '../deadlines.js';
/* Reads the STORE, not data/profile.js, so a visitor who sets their own name
   sees it here. store.profile() falls back to the seed file. */

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

/* reviewed topics / total topics for one subject */
function subjectProgress(s) {
  const ids = s.standards.map(st => st.topicId);
  const done = ids.filter(id => store.isReviewed(id)).length;
  return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
}

/* ---- one row in the unified timeline ---- */
function deadlineRow(x) {
  const s = subjectById[x.subject] || {};
  const k = KINDS[x.kind];
  return `<a class="due-item" href="${x.href}" data-link>
    <span class="cd-dot" style="background:${s.dot || 'var(--accent)'}"></span>
    <span class="due-main">
      <span class="due-title">${x.name}</span>
      <span class="due-sub">${k.noun}${x.code ? ' · ' + x.code : ''} · ${x.span ? '' : ''}${x.dateText}</span>
    </span>
    ${x.statusLabel ? `<span class="int-status" style="background:${x.statusColour}22;color:${x.statusColour};border-color:${x.statusColour}55">${x.statusLabel}</span>` : ''}
    ${duePill(x)}
  </a>`;
}

/* ---- the merged, filterable timeline ---- */
function whatsComing() {
  const filter = store.dueFilter();
  const counts = deadlineCounts();
  const kinds = filter === 'all' ? undefined : [filter];
  const items = upcomingDeadlines(kinds ? { kinds } : {}).slice(0, 6);  // divides evenly into 1/2/3 columns
  const undated = undatedInternals();

  const chip = (key, label, n) => `
    <button class="due-chip${store.dueFilter() === key ? ' on' : ''}" data-filter="${key}"
            aria-pressed="${store.dueFilter() === key}">
      ${label}<span class="dc-n">${n}</span>
    </button>`;

  return `
  <div class="card mb-5" id="whats-coming">
    <div class="flex items-center wrap gap-3 mb-3" style="justify-content:space-between">
      <h3>What's coming</h3>
      <a class="xs" href="#/exams" data-link style="font-weight:600">exams &amp; deadlines →</a>
    </div>

    <div class="due-chips" role="group" aria-label="Filter by type">
      ${chip('all', 'All', counts.all)}
      ${chip('internal', KINDS.internal.label, counts.internal)}
      ${chip('derived', KINDS.derived.label, counts.derived)}
      ${chip('external', KINDS.external.label, counts.external)}
    </div>

    ${items.length ? `<div class="due-list">${items.map(deadlineRow).join('')}</div>` : `
      <p class="muted small">Nothing${filter === 'all' ? '' : ' of that type'} coming up.
        ${filter !== 'all' ? `<button class="linklike" data-filter="all">Show everything</button>` : ''}</p>`}

    ${undated.length ? `
      <p class="xs muted mt-3">
        ${undated.length} internal${undated.length === 1 ? '' : 's'} ${undated.length === 1 ? 'has' : 'have'} no date yet, so ${undated.length === 1 ? "it can't" : "they can't"} be ranked here: <a href="#/internals" data-link>add ${undated.length === 1 ? 'a date' : 'dates'} →</a>
      </p>` : ''}
  </div>`;
}

/* Filter chips on "What's coming".
   ---------------------------------------------------------------------------
   Swaps ONLY this card, and re-binds only this card. It used to call
   renderHome().onMount(), which rebuilt every handler on the dashboard; and
   because setDueFilter() emitted a store change, the app-level subscriber then
   re-rendered the whole route and threw the reader back to the top. Both are
   fixed: the setter is quiet, and this replaces one element. */
function wireWhatsComing() {
  const host = document.getElementById('whats-coming');
  if (!host) return;
  host.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    e.preventDefault();
    store.setDueFilter(btn.dataset.filter);
    /* Pin the scroll explicitly. The card changes height as the list filters,
       and the browser's scroll-anchoring otherwise nudges the page by ~80px. */
    const y = window.scrollY;
    const fresh = document.createElement('div');
    fresh.innerHTML = whatsComing();
    host.replaceWith(fresh.firstElementChild);
    wireWhatsComing();                 // re-bind the replacement
    window.scrollTo(0, y);
  });
}

export function renderHome() {
  const subjects = visibleSubjects();
  const allStandards = visibleStandards();
  const streak = store.streak();
  const totalTopics = subjects.reduce((n, s) => n + s.standards.length, 0);
  const totalReviewed = store.reviewedCount();
  const flagged = store.flaggedCount();

  /* Headline number is now the NEAREST assessment of any kind: which for most
     of the year is a derived exam or an internal, not the November externals. */
  const nextUp = upcomingDeadlines({ graceDays: 0 })[0];

  const externalCredits = subjects.reduce((n, s) =>
    n + s.standards.filter(st => st.type === 'External').reduce((m, st) => m + (st.credits || 0), 0), 0);

  const reviewedPct = totalTopics ? Math.round((totalReviewed / totalTopics) * 100) : 0;

  /* Weakest topics by quiz average: only topics actually attempted. */
  const weak = allStandards
    .map(std => ({ std, pct: store.quizAvgPct(std.topicId) }))
    .filter(x => x.pct !== null)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  return {
    html: `
  <div class="content-inner">
    <!-- 1 ── Hero -->
    <div class="hero mb-5">
      <h1>${greeting()}, ${esc((store.profile().name || '').trim() || 'there')} </h1>
      <p class="hero-sub">Your NCEA Level 3 command centre. Pick a subject, review a topic, keep the streak alive.</p>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hs-num">${nextUp ? nextUp.days : '–'}</div>
          <div class="hs-label">${nextUp ? `Days to ${KINDS[nextUp.kind].noun}` : 'Nothing scheduled'}</div>
        </div>
        <div class="hero-stat"><div class="hs-num">${totalReviewed}<span style="font-size:0.5em;color:var(--phthalo-200)">/${totalTopics}</span></div><div class="hs-label">Topics reviewed</div></div>
        <div class="hero-stat"><div class="hs-num">${externalCredits}</div><div class="hs-label">External credits</div></div>
      </div>

      <div class="hero-cta">
        <a class="btn btn-hero" href="#/revise" data-link>Start a revision session</a>
        <p class="xs hero-cta-sub">Mixed flashcards and questions from whichever topics you're weakest on: ${streak.count > 0 ? `keep the ${streak.count}-day streak going.` : 'ten minutes is enough to start a streak.'}</p>
      </div>
    </div>

    <!-- 2 ── What's coming (internals + derived + externals) -->
    ${whatsComing()}

    <!-- 3 ── Snapshot -->
    <div class="card mb-5 snapshot">
      <div class="snap-stats">
        <div class="snap-stat" title="A day counts once you've answered ${store.streakTarget()} items">
          <span class="snap-icon">${streak.count > 0 ? '🔥' : '🌱'}</span>
          <span class="snap-num">${streak.count}</span>
          <span class="snap-label">day streak${
            (streak.todayCount || 0) >= store.streakTarget()
              ? ' · today ✓'
              : ` · ${streak.todayCount || 0}/${store.streakTarget()} today`}</span>
        </div>
        <a class="snap-stat" href="#/flagged" data-link>
          <span class="snap-icon">🚩</span>
          <span class="snap-num">${flagged}</span>
          <span class="snap-label">flagged</span>
        </a>
        <div class="snap-stat">
          <span class="snap-icon">↗</span>
          <span class="snap-num">${reviewedPct}%</span>
          <span class="snap-label">reviewed</span>
        </div>
      </div>

      <div class="snap-focus">
        <div class="xs muted mb-2">🎯 Weakest topics</div>
        ${weak.length ? `<div class="focus-list">
          ${weak.map(({ std, pct }) => `
            <a class="focus-item" href="#/topic/${std.topicId}" data-link>
              <span class="fi-score ${pct < 50 ? 'low' : 'mid'}">${pct}%</span>
              <span class="fi-main"><span class="fi-title">${std.title}</span>
                <span class="fi-sub">${std.subjectName} · ${std.code}</span></span>
              <span class="xs muted nowrap">revise →</span>
            </a>`).join('')}
        </div>` : `<p class="muted small">Do a few practice quizzes and your weakest topics surface here automatically.</p>`}
      </div>
    </div>

    <!-- 4 ── Subjects -->
    <div class="flex items-center" style="justify-content:space-between;margin-bottom:var(--sp-4);">
      <h2>Subjects</h2>
      <span class="xs muted">${subjects.length} subjects · click to open</span>
    </div>
    <div class="grid grid-auto">
      ${subjects.map(s => {
        const p = subjectProgress(s);
        return `
        <a class="card card-link subject-tile" href="#/subject/${s.id}" data-link data-subject-accent="${s.id}">
          <span class="st-accent-bar" style="background:linear-gradient(90deg, ${s.dot}, ${s.dot})"></span>
          <div class="st-top">
            <span class="st-icon" style="background:${hexToSoft(s.dot)};color:${s.dot};border-color:${hexToSoft(s.dot, 0.4)}">${s.icon}</span>
            <div>
              <h3>${s.name}</h3>
              <div class="st-level">${s.level} · ${s.standards.length} standards</div>
            </div>
          </div>
          <p class="st-blurb">${s.blurb}</p>
          <div class="progress-row">
            <div class="progress progress-mini"><span style="width:${p.pct}%;background:${s.dot}"></span></div>
            <span class="pr-num">${p.done}/${p.total}</span>
          </div>
        </a>`;
      }).join('')}
    </div>
  </div>`,

    onMount() { wireWhatsComing(); },
  };
}

/* Turn a hex accent into a very soft tint for icon backgrounds. */
function hexToSoft(hex, alpha = 0.12) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

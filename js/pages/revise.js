/* ============================================================================
   pages/revise.js: "Revision session": one continuous mixed-practice run.
   ----------------------------------------------------------------------------
   Everything else on this site is organised by standard, which is how you
   study a topic for the first time. This page is the opposite: it deliberately
   MIXES topics and item types, because that is what makes revision stick.

   Three pieces of learning science drive the queue:

     • Retrieval practice. Every item makes you produce an answer before you
       see one. Nothing here is passive re-reading.
     • Spacing. Flashcards respect their Leitner box, so cards you keep
       getting wrong come round again and again while solid ones stay away.
     • Interleaving. Items from different topics are shuffled together rather
       than blocked by topic. It feels harder and it works better, because you
       have to decide WHICH method applies, not just apply a known one.

   Weakest topics are over-sampled: a topic you average <60% on contributes
   roughly twice as many questions as one you've aced.
   ========================================================================== */
import { visibleSubjects, subjectById, allStandards, getSubjectContent } from '../registry.js';
const subjects = () => visibleSubjects();
import { store } from '../store.js';
import { shuffle, toast, renderMathIn, normalise } from '../ui.js';
import { isCardDue, nextBox, boxOf } from '../leitner.js';
import { revisionScope } from '../revision-scope.js';
import { upcomingDeadlines } from '../deadlines.js';
import { pageHead } from './common.js';

const LENGTHS = [15, 20, 30, 40, 60];

/* What KIND of item to serve. */
const MODES = {
  mixed:     { label: 'Mixed',           hint: 'cards + questions' },
  cards:     { label: 'Flashcards only', hint: 'fast recall' },
  questions: { label: 'Questions only',  hint: 'exam-style' },
};

/* WHICH material to draw from. */
const FOCUS = {
  all:     { label: 'Everything',     hint: 'all topics in scope' },
  weak:    { label: 'Weakest topics', hint: 'lowest quiz averages' },
  flagged: { label: 'Flagged only',   hint: 'topics you flagged' },
  due:     { label: 'Due cards',      hint: 'Leitner-due only' },
};

/* ---------------------------------------------------------------- urgency ---
   How soon is this topic actually assessed? A standard sat in three weeks
   should crowd out one sat in three months, so the nearest deadline for a
   topic's subject becomes a multiplier on its sampling weight.

   Buckets rather than a smooth curve, because the exact day is often a rough
   term/week estimate and false precision would be misleading.              */
const URGENCY = [
  { within: 7,   mult: 3.0, label: 'this week' },
  { within: 21,  mult: 2.2, label: 'within 3 weeks' },
  { within: 45,  mult: 1.6, label: 'within 6 weeks' },
  { within: 90,  mult: 1.2, label: 'within 3 months' },
];

/** Map subjectId → days until that subject's nearest assessment. */
function daysBySubject() {
  const out = {};
  upcomingDeadlines({ graceDays: 0 }).forEach(d => {
    if (!d.subject) return;
    if (out[d.subject] === undefined || d.days < out[d.subject]) out[d.subject] = d.days;
  });
  return out;
}

function urgencyFor(subjectId, map) {
  const days = map[subjectId];
  if (days === undefined) return 1;
  for (const b of URGENCY) if (days <= b.within) return b.mult;
  return 1;
}

/* ---------------------------------------------------------------- queue ---- */

/** Every topic in scope, with its cards, questions and current quiz average. */
async function gatherPool(scope) {
  const ids = scope === 'mixed' ? subjects().map(s => s.id) : [scope];
  const pool = [];
  const dmap = daysBySubject();

  for (const sid of ids) {
    const content = await getSubjectContent(sid);
    if (!content || !content.topics) continue;

    for (const [topicId, topic] of Object.entries(content.topics)) {
      /* A topic that isn't a formal standard won't be in allStandards. Fall
         back to the content module's own title rather than showing a raw
         topic id in the session summary. */
      const std = allStandards.find(s => s.topicId === topicId);
      pool.push({
        topicId, subjectId: sid,
        title: (std && std.title) || topic.title || topicId,
        code: (std && std.code) || '',
        /* Finished internals drop out (or drop down). See revision-scope.js */
        scopeInfo: revisionScope(topicId, topic),
        urgency: urgencyFor(sid, dmap),
        daysToAssessment: dmap[sid],
        cards: topic.flashcards || [],
        questions: topic.quiz || [],
        avg: store.quizAvgPct(topicId),           // null = never attempted
      });
    }
  }
  return pool;
}

/* A topic's sampling weight.
   Two things raise it:
     • how weak you are on it   (never attempted, or a low quiz average)
     • how SOON it is assessed  (see urgencyFor. The nearest deadline wins)   */
function weightFor(topic) {
  let w;
  if (topic.avg === null) w = 2;         // unknown, worth probing
  else if (topic.avg < 50) w = 3;
  else if (topic.avg < 70) w = 2;
  else w = 1;
  return w * (topic.urgency || 1);
}

/**
 * Build the session queue.
 * Roughly half flashcards / half questions, drawn topic-by-topic against the
 * weights above, then interleaved so you never get a long run of one topic.
 */
async function buildQueue(scope, length, mode = 'mixed', focus = 'all') {
  const fullPool = await gatherPool(scope);
  /* Content tied ONLY to an internal you have already handed in is dropped
     entirely. There is no exam left to revise for. Anything that also feeds
     an external you still have to sit stays in (at reduced weight). */
  const skipped = fullPool.filter(t => t.scopeInfo && t.scopeInfo.scope === 'excluded');
  let pool = fullPool.filter(t => !(t.scopeInfo && t.scopeInfo.scope === 'excluded'));

  /* FOCUS narrows which topics are eligible at all. Each filter falls back to
     the unfiltered pool if it would leave nothing, so you never get an empty
     session just because (say) nothing is flagged yet. */
  if (focus === 'weak') {
    const attempted = pool.filter(t => t.avg !== null).sort((a, b) => a.avg - b.avg);
    const weak = attempted.filter(t => t.avg < 70);
    if (weak.length) pool = weak;
    else if (attempted.length) pool = attempted.slice(0, Math.max(3, Math.ceil(attempted.length / 3)));
  } else if (focus === 'flagged') {
    const f = pool.filter(t => store.isFlagged(t.topicId));
    if (f.length) pool = f;
  }
  if (!pool.length) return { items: [], pool, skipped };

  /* --- flashcards: due ones first, then any, weighted by topic --- */
  const cardItems = [];
  for (const t of pool) {
    if (!t.cards.length) continue;
    const session = store.fcPeekSession(t.topicId);   // peek: don't burn a session
    const prog = store.fcProgress(t.topicId);
    const due = t.cards.map((_, i) => i).filter(i => isCardDue(prog, session, i));
    const idxs = due.length ? due : t.cards.map((_, i) => i);
    shuffle(idxs).forEach(i => cardItems.push({
      kind: 'card', topic: t, cardIndex: i, card: t.cards[i],
      due: due.includes(i), weight: weightFor(t) + (due.includes(i) ? 1 : 0),
    }));
  }

  const qItems = [];
  for (const t of pool) {
    t.questions.forEach((q, i) => qItems.push({
      kind: 'q', topic: t, q, qIndex: i, weight: weightFor(t),
    }));
  }

  /* Weighted sample without replacement. */
  const pick = (arr, n) => {
    const bag = [...arr];
    const out = [];
    while (out.length < n && bag.length) {
      const total = bag.reduce((s, x) => s + x.weight, 0);
      let r = Math.random() * total;
      let k = 0;
      while (k < bag.length - 1 && (r -= bag[k].weight) > 0) k++;
      out.push(bag.splice(k, 1)[0]);
    }
    return out;
  };

  /* MODE decides the card/question split. 'due' focus additionally restricts
     flashcards to those the Leitner schedule actually says are due. */
  let cardPool = cardItems;
  if (focus === 'due') {
    const dueOnly = cardItems.filter(c => c.due);
    if (dueOnly.length) cardPool = dueOnly;
  }

  let chosen;
  if (mode === 'cards') {
    chosen = pick(cardPool, Math.min(cardPool.length, length));
  } else if (mode === 'questions') {
    chosen = pick(qItems, Math.min(qItems.length, length));
  } else {
    const wantQ = Math.min(qItems.length, Math.round(length * 0.45));
    const wantC = Math.min(cardPool.length, length - wantQ);
    chosen = [...pick(cardPool, wantC), ...pick(qItems, wantQ + (length - wantQ - wantC))];
  }

  /* --- interleave ---
     Round-robin across topics rather than a plain shuffle: bucket by topic,
     shuffle each bucket, then repeatedly take from whichever topic has the
     most left. That spreads a topic with six items evenly through the run
     instead of clumping it, which a shuffle alone does not reliably do. */
  const buckets = new Map();
  shuffle(chosen).forEach(it => {
    const k = it.topic.topicId;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(it);
  });

  const items = [];
  while (items.length < chosen.length) {
    const last = items.length ? items[items.length - 1].topic.topicId : null;
    // biggest remaining bucket that isn't the one we just used
    let best = null;
    for (const [k, arr] of buckets) {
      if (!arr.length || k === last) continue;
      if (!best || arr.length > buckets.get(best).length) best = k;
    }
    if (!best) {                       // only the just-used topic is left
      for (const [k, arr] of buckets) if (arr.length) { best = k; break; }
    }
    if (!best) break;
    items.push(buckets.get(best).shift());
  }
  return { items, pool, skipped };
}

/** Which topics would be skipped right now, for the setup-page note. */
async function previewScope() {
  const pool = await gatherPool('mixed');
  return { excluded: pool.filter(t => t.scopeInfo && t.scopeInfo.scope === 'excluded') };
}

/* ------------------------------------------------------------ setup page --- */

export function renderRevise() {
  const saved = store.reviseCfg();

  const html = `
  <div class="content-inner">
    ${pageHead({
      eyebrow: 'Revision session',
      title: 'Start a revision session',
      lede: 'A mixed run of flashcards and practice questions. Topics you’re weakest on come up more, and so do subjects with the nearest assessment. Internals you’ve already handed in are left out entirely.',
    })}

    <form class="card rv-setup" id="rv-setup">
      <fieldset class="field">
        <legend>What are you revising?</legend>
        <div class="rv-scope">
          <label class="rv-chip">
            <input type="radio" name="scope" value="mixed"${saved.scope === 'mixed' ? ' checked' : ''}>
            <span><strong>Everything</strong><em>all six subjects, mixed</em></span>
          </label>
          ${subjects().map(s => `
            <label class="rv-chip">
              <input type="radio" name="scope" value="${s.id}"${saved.scope === s.id ? ' checked' : ''}>
              <span><strong>${s.icon} ${s.name}</strong><em>${s.standards.length} standards</em></span>
            </label>`).join('')}
        </div>
      </fieldset>

      <fieldset class="field">
        <legend>What kind of practice?</legend>
        <div class="seg">
          ${Object.entries(MODES).map(([k, v]) => `
            <label class="seg-opt">
              <input type="radio" name="mode" value="${k}"${saved.mode === k ? ' checked' : ''}>
              <span>${v.label}<em class="xs muted"> · ${v.hint}</em></span>
            </label>`).join('')}
        </div>
      </fieldset>

      <fieldset class="field">
        <legend>Draw from</legend>
        <div class="seg">
          ${Object.entries(FOCUS).map(([k, v]) => `
            <label class="seg-opt">
              <input type="radio" name="focus" value="${k}"${saved.focus === k ? ' checked' : ''}>
              <span>${v.label}<em class="xs muted"> · ${v.hint}</em></span>
            </label>`).join('')}
        </div>
        <p class="xs muted mt-2">If a filter would leave nothing to study, the session falls back to everything in scope rather than starting empty.</p>
      </fieldset>

      <fieldset class="field">
        <legend>How long?</legend>
        <div class="seg">
          ${LENGTHS.map(n => `
            <label class="seg-opt">
              <input type="radio" name="length" value="${n}"${Number(saved.length) === n ? ' checked' : ''}>
              <span>${n}<em class="xs muted"> · ~${Math.max(1, Math.round(n * 0.75))} min</em></span>
            </label>`).join('')}
        </div>
      </fieldset>

      <div id="rv-priority" class="callout callout-note" style="margin-bottom:var(--sp-4)">
        <div class="co-icon">⏱</div>
        <div class="co-body"><h4>What gets prioritised</h4>
          <div id="rv-priority-body" class="small muted">Loading…</div></div>
      </div>

      <div class="flex gap-3 wrap mt-3">
        <button type="submit" class="btn btn-primary btn-lg">Start session →</button>
        <span class="xs muted" style="align-self:center">Flashcard grades feed your Leitner boxes; question scores feed “Focus on this”.</span>
      </div>
    </form>

    <div class="grid grid-3 mt-5">
      <div class="card"><h4 class="mb-2">Retrieval, not re-reading</h4>
        <p class="small muted">Every item makes you produce the answer first. Recognising an answer you’ve just read feels like knowing it: it isn’t.</p></div>
      <div class="card"><h4 class="mb-2">Spacing built in</h4>
        <p class="small muted">Cards you get wrong drop to Box 1 and come back next session. Cards you know sit in Box 4 and stay out of your way.</p></div>
      <div class="card"><h4 class="mb-2">Interleaved on purpose</h4>
        <p class="small muted">Topics are shuffled together so you have to work out <em>which</em> method applies: the bit exams actually test.</p></div>
    </div>
  </div>`;

  return {
    html,
    onMount() {
      /* Fill the "what gets prioritised" panel from the real deadline data. */
      (async () => {
        const el = document.getElementById('rv-priority-body');
        if (!el) return;
        const map = daysBySubject();
        const rows = subjects
          .map(s => ({ s, d: map[s.id] }))
          .filter(x => x.d !== undefined)
          .sort((a, b) => a.d - b.d)
          .slice(0, 4);
        const { excluded } = await previewScope();
        el.innerHTML =
          (rows.length
            ? '<strong>Nearest assessments</strong>. These subjects come up more often:<br>' +
              rows.map(({ s, d }) => {
                const b = URGENCY.find(u => d <= u.within);
                return `${s.icon} ${s.name}, ${d}d${b ? ` <span class="xs">(×${b.mult})</span>` : ''}`;
              }).join(' · ')
            : 'No upcoming assessments found.') +
          (excluded.length
            ? `<br><br><strong>Left out</strong> (handed in): ${excluded.map(e => e.title).join(', ')}.`
            : '');
      })();

      const form = document.getElementById('rv-setup');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const f = new FormData(form);
        const scope = f.get('scope') || 'mixed';
        const length = Number(f.get('length')) || 20;
        const mode = f.get('mode') || 'mixed';
        const focus = f.get('focus') || 'all';
        store.setReviseCfg({ scope, length, mode, focus });

        const host = document.getElementById('content');
        host.innerHTML = `<div class="content-inner"><div class="rv-loading">
          <span class="spinner"></span> Building your session…</div></div>`;

        const { items, skipped } = await buildQueue(scope, length, mode, focus);
        if (!items.length) {
          host.innerHTML = `<div class="content-inner"><div class="empty-state">
            <div class="es-icon">📭</div><h3>Nothing to revise here yet</h3>
            <p>That subject has no flashcards or questions written yet. Try <strong>Everything</strong> instead.</p>
            <button class="btn btn-primary" onclick="location.hash='#/revise'">← Back to setup</button>
          </div></div>`;
          return;
        }
        runSession(host, { items, skipped, scope, length });
      });
    },
  };
}

/* ------------------------------------------------------------- the run ---- */

function runSession(host, { items, skipped = [], scope }) {
  let pos = 0;
  let flipped = false;
  let answered = false;
  const log = [];   // { topicId, title, kind, correct }

  /* One Leitner session counter per deck touched, claimed up front so grading
     several cards from the same deck doesn't advance the schedule each time. */
  const sessions = {};
  const sessionFor = (topicId) => (sessions[topicId] ??= store.fcSession(topicId));

  host.innerHTML = `<div class="content-inner"><div class="rv-run" id="rv-run"></div></div>`;
  const box = document.getElementById('rv-run');
  render();

  function chrome(inner, item) {
    const s = subjectById[item.topic.subjectId] || {};
    const pct = Math.round((pos / items.length) * 100);
    const right = log.filter(l => l.correct === true).length;
    return `
      <div class="rv-bar">
        <div class="rv-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="rv-head">
        <div class="flex items-center gap-3 wrap">
          <span class="cd-dot" style="background:${s.dot || 'var(--accent)'}"></span>
          <span class="rv-topic">${item.topic.code ? `<span class="mono xs">${item.topic.code}</span> · ` : ''}${item.topic.title}</span>
          <span class="badge">${item.kind === 'card' ? 'Flashcard' : 'Question'}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="xs muted">${right}/${log.length} right</span>
          <span class="rv-count">${pos + 1} of ${items.length}</span>
          <button class="btn btn-ghost btn-sm" id="rv-quit">End session</button>
        </div>
      </div>
      ${inner}`;
  }

  function render() {
    answered = false;
    const item = items[pos];
    box.innerHTML = chrome(item.kind === 'card' ? cardHtml(item) : qHtml(item), item);
    box.querySelector('#rv-quit').addEventListener('click', () => finish(true));
    item.kind === 'card' ? wireCard(item) : wireQ(item);
    renderMathIn(box);
  }

  /* ---- flashcard item ---- */
  function cardHtml(item) {
    const c = item.card;
    return `
      <div class="fc-scene rv-scene">
        <div class="fc-card ${flipped ? 'flipped' : ''}" id="rv-card" role="button" tabindex="0"
             aria-label="Flashcard: press space to reveal the answer">
          <div class="fc-face fc-front">
            <span class="fc-tag">Question</span>
            <div class="fc-q">${c.q}</div>
            <span class="fc-flip-hint">space or click to reveal ⟳</span>
          </div>
          <div class="fc-face fc-back">
            <span class="fc-tag">Answer</span>
            <div>
              <div class="fc-a">${c.a}</div>
              ${c.explain ? `<details class="fc-explain-toggle"><summary>Explain this answer</summary>
                 <div class="fc-explain-body">${c.explain}</div></details>` : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="fc-controls">
        ${flipped ? `
          <div class="fc-grade">
            <button class="btn btn-ghost btn-sm fc-dunno"  id="rv-back-dunno">Didn't know</button>
            <button class="btn btn-ghost btn-sm fc-wrong"  id="rv-no">✗ Got it wrong</button>
            <button class="btn btn-ghost btn-sm fc-nearly" id="rv-nearly">◐ Nearly</button>
            <button class="btn btn-primary btn-sm"         id="rv-yes">✓ Got it right</button>
          </div>
          <span class="xs muted">1 = wrong · 2 = nearly · 3 = right</span>` : `
          <div class="fc-nav"><button class="btn btn-ghost btn-sm fc-dunno" id="rv-dunno">I don't know</button></div>
          <span class="xs muted">Answer it in your head first, then reveal: that effort is the whole point.</span>`}
      </div>`;
  }

  function wireCard(item) {
    const el = box.querySelector('#rv-card');
    const flip = (e) => { if (e && e.target.closest('.fc-explain-toggle')) return; flipped = !flipped; render(); };
    el.addEventListener('click', flip);
    const yes = box.querySelector('#rv-yes'), no = box.querySelector('#rv-no');
    yes && yes.addEventListener('click', e => { e.stopPropagation(); gradeCard(item, 'right'); });
    no && no.addEventListener('click', e => { e.stopPropagation(); gradeCard(item, 'wrong'); });
    box.querySelector('#rv-nearly')?.addEventListener('click', e => { e.stopPropagation(); gradeCard(item, 'nearly'); });
    box.querySelector('#rv-back-dunno')?.addEventListener('click', e => { e.stopPropagation(); gradeCard(item, 'wrong'); });
    /* Honest "don't know". Shows the answer, grades it wrong, moves on. */
    const dunno = box.querySelector('#rv-dunno');
    dunno && dunno.addEventListener('click', e => {
      e.stopPropagation(); flipped = true; render();
      const sc = box.querySelector('.fc-scene');
      if (sc) sc.insertAdjacentHTML('afterbegin',
        '<p class="dunno-note">Marked as not known: back to Box 1.</p>');
      box.querySelector('#rv-no')?.focus({ preventScroll: true });
    });

    box.onkeydown = null;
    document.onkeydown = (e) => {
      if (e.target.matches('input,textarea')) return;
      if (!flipped && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); flipped = true; render(); }
      else if (flipped && e.key === '1') gradeCard(item, 'wrong');
      else if (flipped && e.key === '2') gradeCard(item, 'nearly');
      else if (flipped && e.key === '3') gradeCard(item, 'right');
    };
    if (!flipped) el.focus({ preventScroll: true });
  }

  function gradeCard(item, g) {
    const tid = item.topic.topicId;
    const session = sessionFor(tid);
    const prog = store.fcProgress(tid);
    store.fcGrade(tid, item.cardIndex, nextBox(boxOf(prog, item.cardIndex), g), session);
    // 'nearly' counts as a half for the session score, neither a hit nor a miss
    log.push({ topicId: tid, title: item.topic.title, kind: 'card',
               correct: g === 'right', partial: g === 'nearly' });
    advance();
  }

  /* ---- question item ---- */
  function qHtml(item) {
    const q = item.q;
    const body = q.type === 'sa'
      ? `<div class="flex gap-3 wrap" style="align-items:stretch">
           <input type="text" class="sa-input" id="rv-sa" placeholder="Type your answer…" autocomplete="off" style="flex:1;min-width:200px">
           <button class="btn btn-primary" id="rv-check">Check</button>
         </div>`
      : `<div class="quiz-choices">${(item.shuffled || q.choices).map((c, i) =>
           `<button class="quiz-choice" data-idx="${i}"><span class="qc-key">${'ABCDEF'[i]}</span><span>${c}</span></button>`).join('')}</div>`;
    return `
      <div class="quiz rv-quiz">
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-body">${body}</div>
        <div class="quiz-explain" id="rv-explain"></div>
        <div class="quiz-foot">
          <span class="xs muted">${q.type === 'sa' ? 'Spelling and spacing are ignored' : 'Pick one'}</span>
          <button class="btn btn-ghost btn-sm" id="rv-qdunno">I don't know</button>
          <button class="btn btn-primary hidden" id="rv-next">Next →</button>
        </div>
      </div>`;
  }

  function wireQ(item) {
    const q = item.q;
    document.onkeydown = null;

    box.querySelector('#rv-qdunno')?.addEventListener('click', () => {
      if (answered) return; answered = true;
      box.querySelectorAll('.quiz-choice').forEach((b, i) => {
        b.disabled = true;
        if (i === item.answerIdx) b.classList.add('correct');
      });
      const input = box.querySelector('#rv-sa');
      if (input) { input.disabled = true; box.querySelector('#rv-check').disabled = true; }
      reveal(item, false, true);
    });

    if (q.type === 'sa') {
      const input = box.querySelector('#rv-sa');
      const check = () => {
        if (answered) return; answered = true;
        const val = normalise(input.value);
        const ok = val !== '' && (q.accept || []).some(a => normalise(a) === val);
        input.disabled = true;
        input.style.borderColor = ok ? 'var(--good)' : 'var(--bad)';
        box.querySelector('#rv-check').disabled = true;
        reveal(item, ok);
      };
      box.querySelector('#rv-check').addEventListener('click', check);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      input.focus({ preventScroll: true });
    } else {
      // shuffle the options once per item, and remember where the answer went
      if (!item.shuffled) {
        const order = shuffle(q.choices.map((_, i) => i));
        item.shuffled = order.map(i => q.choices[i]);
        item.answerIdx = order.indexOf(q.answer);
        render(); return;
      }
      box.querySelectorAll('.quiz-choice').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return; answered = true;
          const chosen = +btn.dataset.idx;
          box.querySelectorAll('.quiz-choice').forEach((b, i) => {
            b.disabled = true;
            if (i === item.answerIdx) b.classList.add('correct');
            else if (i === chosen) b.classList.add('wrong');
          });
          reveal(item, chosen === item.answerIdx);
        });
      });
    }
  }

  function reveal(item, correct, dunno = false) {
    const q = item.q;
    box.querySelector('#rv-qdunno')?.classList.add('hidden');
    const ex = box.querySelector('#rv-explain');
    ex.innerHTML = `<b>${correct ? '✓ Correct.' : dunno ? 'No worries: here it is.' : '✗ Not quite.'}</b> ` +
      `${!correct && q.type === 'sa' && q.answer ? `Answer: <b>${q.answer}</b>. ` : ''}` +
      `${q.explanation || ''} <a class="xs" href="#/topic/${item.topic.topicId}" data-link>study this topic →</a>`;
    ex.classList.add('show');
    renderMathIn(ex);
    log.push({ topicId: item.topic.topicId, title: item.topic.title, kind: 'q', correct });

    const next = box.querySelector('#rv-next');
    next.classList.remove('hidden');
    next.textContent = pos + 1 < items.length ? 'Next →' : 'Finish session →';
    next.focus({ preventScroll: true });
    next.onclick = () => advance();
    document.onkeydown = (e) => {
      if (e.target.matches('input,textarea')) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); }
    };
  }

  function advance() {
    flipped = false;
    if (pos + 1 < items.length) { pos++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else finish(false);
  }

  /* ---- summary ---- */
  function finish(early) {
    document.onkeydown = null;

    /* Record question performance per topic so "Focus on this" learns from
       this session too: but only for topics we actually asked about. */
    const byTopic = {};
    log.filter(l => l.kind === 'q').forEach(l => {
      (byTopic[l.topicId] ??= { title: l.title, right: 0, total: 0 });
      byTopic[l.topicId].total++;
      if (l.correct) byTopic[l.topicId].right++;
    });
    /* No streak call here. Every graded item already counts as it happens. FcGrade() for cards, saveQuiz() just above for questions, both via
       store.recordStudy(). A session-level call would double-count, and the
       one that used to sit here (store.touchStreak) never existed, so finish()
       threw before it could render the summary, which is why "End session"
       looked like a dead button and completing a run showed nothing. */
    Object.entries(byTopic).forEach(([tid, r]) => store.saveQuiz(tid, r.right, r.total));

    const right = log.filter(l => l.correct).length;
    const pct = log.length ? Math.round((right / log.length) * 100) : 0;
    const cards = log.filter(l => l.kind === 'card').length;
    const qs2 = log.filter(l => l.kind === 'q').length;

    /* topics ranked worst-first, from this session only */
    const perTopic = {};
    log.forEach(l => {
      (perTopic[l.topicId] ??= { title: l.title, right: 0, total: 0, id: l.topicId });
      perTopic[l.topicId].total++;
      if (l.correct) perTopic[l.topicId].right++;
    });
    const ranked = Object.values(perTopic)
      .map(t => ({ ...t, pct: Math.round((t.right / t.total) * 100) }))
      .sort((a, b) => a.pct - b.pct);
    const weak = ranked.filter(t => t.pct < 100).slice(0, 4);

    const msg = !log.length ? 'Session ended before you answered anything.'
      : pct >= 90 ? 'Excellent. That material is genuinely in there.'
      : pct >= 70 ? 'Solid session. The misses below are your next hour of work.'
      : pct >= 50 ? 'Fair, but the topics below need a proper re-read, not another quiz.'
      : 'Rough one, and that’s useful information: go back to the teaching notes for these.';

    box.innerHTML = `
      <div class="rv-summary">
        <div class="rv-ring" style="--pct:${pct}">
          <span class="rv-ring-num">${pct}<small>%</small></span>
        </div>
        <h2>${early ? 'Session ended' : 'Session complete'}</h2>
        <p class="rv-msg">${msg}</p>

        <div class="stat-row mb-5">
          <div class="stat-tile"><div class="stt-num">${log.length}</div><div class="stt-label">Items answered</div></div>
          <div class="stat-tile"><div class="stt-num">${right}</div><div class="stt-label">Got right</div></div>
          <div class="stat-tile"><div class="stt-num">${cards}</div><div class="stt-label">Flashcards</div></div>
          <div class="stat-tile"><div class="stt-num">${qs2}</div><div class="stt-label">Questions</div></div>
        </div>

        ${weak.length ? `
          <h3 class="mb-3">Where you dropped marks</h3>
          <div class="focus-list mb-5">
            ${weak.map(t => `
              <a class="focus-item" href="#/topic/${t.id}" data-link>
                <span class="fi-score ${t.pct < 50 ? 'low' : 'mid'}">${t.pct}%</span>
                <span class="fi-main"><span class="fi-title">${t.title}</span>
                  <span class="fi-sub">${t.right} of ${t.total} right this session</span></span>
                <span class="xs muted nowrap">study →</span>
              </a>`).join('')}
          </div>` : log.length ? `<p class="muted mb-5">Clean sweep: nothing dropped.</p>` : ''}

        <div class="flex gap-3 wrap" style="justify-content:center">
          <button class="btn btn-primary" id="rv-again">↻ Another session</button>
          <a class="btn btn-ghost" href="#/" data-link>Back to dashboard</a>
        </div>
        <p class="xs muted mt-3">Wrong flashcards have dropped back to Box 1 and will resurface next session.</p>
        ${skipped.length ? `<p class="xs muted mt-2">Skipped ${skipped.length} topic${skipped.length === 1 ? '' : 's'} tied to internals you've already finished:
          ${skipped.map(t => t.title).join(', ')}. <a href="#/internals" data-link>manage internals →</a></p>` : ''}
      </div>`;

    box.querySelector('#rv-again').addEventListener('click', () => { location.hash = '#/revise'; });
    if (pct === 100 && log.length >= 5) toast('Perfect session');
  }
}

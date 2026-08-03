/* ============================================================================
   pages/progress.js — credit tracker & goal dashboard.
   ----------------------------------------------------------------------------
   Seeded with Chey's REAL NZQA Record of Learning (data/results.js). Anything
   edited here is stored as an override in localStorage and wins over the seed.

   Shows:
     • the headline qualification status (L1/L2/L3 credits, literacy/numeracy)
     • a donut of Level 3 credits by grade
     • what's still to come (externals being sat) + a projected total
     • goal tracking (L3 certificate, UE, endorsements, custom)
     • an editable table of every standard on the record
   ========================================================================== */
import { store } from '../store.js';
import { pageHead } from './common.js';
import { toast } from '../ui.js';
import { results, qualification } from '../../data/results.js';

/* Credit colours — chosen so grades and statuses are instantly distinguishable.
   Excellence = gold · Merit = blue · Achieved = green · awaiting = orange ·
   still to sit = red · dropped = grey. */
const GRADE_COLOUR = { E: '#E3A72F', M: '#3E7FB8', A: '#4FA97C' };
const STATUS_COLOUR = {
  pending: '#E07B39',     // sat, result not back
  tosit:   '#C25A52',     // not sat yet (externals + internals still to do)
  /* Kept for reference only. Dropped/Not Applicable credits are no longer
     drawn anywhere — not in the ring, not in the class bars, not in either
     legend — because they earn nothing and aren't being pursued. They appear
     as text in the "what are these?" disclosure and in the standards table. */
  dropped: '#8A9A90',     // not being assessed
};
const GRADE_NAME = { E: 'Excellence', M: 'Merit', A: 'Achieved' };
/* NOTE: the status "Credits banked" deliberately avoids the word *Achieved*,
   which is also a GRADE (A/M/E). Status = do I have the credits yet;
   Grade = how well I did. */
const STATUS_LABEL = {
  achieved:    'Credits banked',
  pending:     'Sat — awaiting result',
  external:    'Sitting in Nov externals',
  todo:        'Internal still to do',
  notassessed: 'Dropped (not assessed)',
  na:          'Not applicable',
};
const STATUS_HINT = {
  achieved:    'Result is in and the credits are on your record.',
  pending:     'You have sat it; the result has not come back yet.',
  external:    'Being examined in the November externals.',
  todo:        'An internal you still have to complete this year.',
  notassessed: 'Entered at some point but never assessed — earns nothing and is not being pursued.',
  na:          'Marked Not Applicable on your record.',
};
/* Subject-group colours, used on the grouped table + subject bars. */
const GROUP_COLOUR = {
  '13CHE': '#2D8A5F', '13PHY': '#1E9686', '13MAC': '#38946B',
  '13MAS': '#5C9A57', '13BIO': '#55AE76', '13ENU': '#6E9152', 'Other': '#8A9A90',
};

/* Merge the record with any saved override. Key = group+code (stable). */
const keyOf = (r) => `${r.group}:${r.code}`;

function withOverride(r) {
  const o = store.creditRecord(keyOf(r)) || {};
  return {
    ...r,
    status: o.status || r.status,
    grade: o.grade !== undefined ? o.grade : (r.grade || ''),
    credits: o.credits != null ? o.credits : r.credits,
  };
}

/* ---- SVG donut ---------------------------------------------------------- */
function donut(segments, { size = 190, thickness = 26, centreTop, centreSub } = {}) {
  const total = segments.reduce((n, s) => n + s.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const rings = total === 0
    ? `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${thickness}"/>`
    : segments.filter(s => s.value > 0).map(s => {
        const len = (s.value / total) * c;
        const el = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none"
          stroke="${s.colour}" stroke-width="${thickness}"
          stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-offset}"
          transform="rotate(-90 ${size / 2} ${size / 2})"><title>${s.label}: ${s.value}</title></circle>`;
        offset += len; return el;
      }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="donut" role="img"
      aria-label="${segments.map(s => `${s.label} ${s.value}`).join(', ')}">
    ${rings}
    <text x="${size / 2}" y="${size / 2 - 2}" text-anchor="middle" class="dn-top">${centreTop ?? total}</text>
    <text x="${size / 2}" y="${size / 2 + 18}" text-anchor="middle" class="dn-sub">${centreSub ?? 'credits'}</text>
  </svg>`;
}
const legend = (segs) => `<div class="dn-legend">${segs.map(s => `
  <div class="dn-key"><span class="dn-dot" style="background:${s.colour}"></span>
    <span class="dn-label">${s.label}</span><span class="dn-val">${s.value}</span></div>`).join('')}</div>`;

/* ---- Goals -------------------------------------------------------------- */
const GOALS = {
  l3cert: {
    name: 'NCEA Level 3 certificate',
    desc: '60 credits at Level 3, plus 20 at Level 2 or above. You already have 115 at Level 2, so the Level 2 part is met — this tracks the 60 at Level 3.',
    compute: (rows) => ({ have: creditsWhere(rows, r => r.status === 'achieved'), need: qualification.l3Required }),
  },
  ue: {
    name: 'University Entrance',
    desc: '14 credits in each of three approved subjects, plus UE literacy (✅ you have this: Read 13 / Write 12) and numeracy (✅). Tracked below as 3 × 14 = 42 from your best three subjects.',
    compute: (rows) => {
      const byGroup = {};
      rows.filter(r => r.status === 'achieved').forEach(r => {
        byGroup[r.group] = (byGroup[r.group] || 0) + r.credits;
      });
      const best3 = Object.values(byGroup).map(v => Math.min(v, 14)).sort((a, b) => b - a).slice(0, 3);
      return { have: best3.reduce((a, b) => a + b, 0), need: 42 };
    },
  },
  excellence: {
    name: 'Excellence endorsement (Level 3)',
    desc: '50 credits at Excellence at Level 3.',
    compute: (rows) => ({ have: creditsWhere(rows, r => r.status === 'achieved' && r.grade === 'E'), need: 50 }),
  },
  merit: {
    name: 'Merit endorsement (Level 3)',
    desc: '50 credits at Merit or Excellence at Level 3.',
    compute: (rows) => ({ have: creditsWhere(rows, r => r.status === 'achieved' && (r.grade === 'M' || r.grade === 'E')), need: 50 }),
  },
  rank: {
    name: 'UoA rank score (max 320)',
    desc: 'Best 80 credits at Level 3, max 5 subjects, max 24 credits per subject. Excellence = 4 points per credit, Merit = 3, Achieved = 2. Used by Auckland and the other NZ universities for entry and scholarships.',
    compute: (rows) => ({ have: rankScore(rows).score, need: 320 }),
  },
  atar: {
    name: 'ATAR (Australian unis) — indicative',
    desc: 'NZQA calculates this for Australian universities from your <strong>best 90 Level 3 credits</strong> (max 24 per subject), ranking UE-approved subjects first and weighting <strong>externally assessed standards above internals</strong>. You need at least 60 Level 3 credits before NZQA will calculate one at all. NZQA applies annual difficulty scaling and does not predict scores in advance — so the figure below is a rough indicator only.',
    compute: (rows) => {
      const m = atarModel(rows);
      const a = atarFor(m);
      return {
        have: a === null ? 0 : a, need: 99.95,
        blocked: a === null
          ? `NZQA needs <strong>60+ Level 3 credits</strong> before it will calculate an ATAR — you currently have ${m.creditsCounted}. Passing your November externals clears that threshold.`
          : null,
      };
    },
  },
  custom: {
    name: 'Custom target',
    desc: 'Your own Level 3 credit target.',
    compute: (rows, target) => ({ have: creditsWhere(rows, r => r.status === 'achieved'), need: target || 60 }),
  },
};

const creditsWhere = (rows, fn) => rows.filter(fn).reduce((n, r) => n + r.credits, 0);

/* Break a set of rows into the six colour buckets, in display order. */
function buckets(rows) {
  return [
    { key: 'E',       label: 'Excellence',       colour: GRADE_COLOUR.E,       value: creditsWhere(rows, r => r.status === 'achieved' && r.grade === 'E') },
    { key: 'M',       label: 'Merit',            colour: GRADE_COLOUR.M,       value: creditsWhere(rows, r => r.status === 'achieved' && r.grade === 'M') },
    /* Credits banked without a recorded grade count here too. The row editor
       allows status 'achieved' with the grade left blank, so these must land
       in a bucket — otherwise they vanish from the bars and the totals stop
       matching the class credit count. */
    { key: 'A',       label: 'Achieved',         colour: GRADE_COLOUR.A,       value: creditsWhere(rows, r => r.status === 'achieved' && (r.grade === 'A' || !r.grade)) },
    { key: 'pending', label: 'Awaiting result',  colour: STATUS_COLOUR.pending, value: creditsWhere(rows, r => r.status === 'pending') },
    { key: 'tosit',   label: 'Not sat yet',      colour: STATUS_COLOUR.tosit,   value: creditsWhere(rows, r => r.status === 'external' || r.status === 'todo') },
  ];
}

/* A horizontal stacked bar showing the colour split of a set of credits. */
function stackedBar(rows) {
  const segs = buckets(rows).filter(b => b.value > 0);
  const total = segs.reduce((n, b) => n + b.value, 0);
  if (!total) return `<div class="stack-bar"><span class="stack-empty"></span></div>`;
  return `<div class="stack-bar">${segs.map(b => `
    <span class="stack-seg" style="width:${(b.value / total) * 100}%;background:${b.colour}"
          title="${b.label}: ${b.value} credits"></span>`).join('')}</div>`;
}

/* ---- NZ rank score & ATAR ------------------------------------------------
   RANK SCORE (used by NZ universities incl. Auckland):
     Take your best 80 credits at Level 3, from a maximum of 5 approved
     subjects, capped at 24 credits per subject. Weight each credit:
       Excellence = 4 · Merit = 3 · Achieved = 2 · (not achieved = 0)
     Maximum possible = 80 × 4 = 320.

   ATAR: Australian universities convert a NZ rank score to an ATAR. The exact
   conversion is published by UAC and shifts year to year, so the figure shown
   here is an INDICATIVE band only — always confirm with UAC / the university.
   ------------------------------------------------------------------------ */
const GRADE_POINTS = { E: 4, M: 3, A: 2 };
const MAX_PER_SUBJECT = 24;
const RANK_CREDITS = 80;
const MAX_SUBJECTS = 5;

/** Compute a rank score from banked results. Optionally treat every
    still-to-come standard as a given grade (for "what if" projections). */
export function rankScore(rows, assumeGrade = null) {
  // Build a per-subject list of {credits, points}
  const bySubject = {};
  rows.forEach(r => {
    let g = null;
    if (r.status === 'achieved') g = r.grade || 'A';
    else if (assumeGrade && (r.status === 'external' || r.status === 'pending' || r.status === 'todo')) g = assumeGrade;
    if (!g) return;
    // A resit can only improve: use the better of the current and assumed grade
    if (assumeGrade && r.resit) {
      const cur = GRADE_POINTS[r.grade || 'A'] || 0;
      if ((GRADE_POINTS[assumeGrade] || 0) > cur) g = assumeGrade;
    }
    (bySubject[r.group] = bySubject[r.group] || []).push({ credits: r.credits, pts: GRADE_POINTS[g] || 0 });
  });

  // Within each subject: best credits first, capped at 24
  const subjectPools = Object.values(bySubject).map(list => {
    const sorted = [...list].sort((a, b) => b.pts - a.pts);
    const pool = []; let used = 0;
    for (const it of sorted) {
      if (used >= MAX_PER_SUBJECT) break;
      const take = Math.min(it.credits, MAX_PER_SUBJECT - used);
      pool.push({ credits: take, pts: it.pts }); used += take;
    }
    return { pool, score: pool.reduce((n, x) => n + x.credits * x.pts, 0) };
  });

  // Best 5 subjects, then best 80 credits overall
  const best = subjectPools.sort((a, b) => b.score - a.score).slice(0, MAX_SUBJECTS)
    .flatMap(s => s.pool).sort((a, b) => b.pts - a.pts);
  let used = 0, score = 0;
  for (const it of best) {
    if (used >= RANK_CREDITS) break;
    const take = Math.min(it.credits, RANK_CREDITS - used);
    score += take * it.pts; used += take;
  }
  return { score, creditsCounted: used };
}

/* ---- ATAR (NZQA's calculation for Australian universities) ---------------
   VERIFIED against NZQA (nzqa.govt.nz → study with NCEA → Australia):
     • based on your BEST 90 Level 3 assessed credits
     • maximum 24 credits from any one subject
     • UE-approved subject standards rank ahead of non-approved
     • achievement standards rank ahead of unit standards
     • EXTERNALLY assessed standards typically rank higher than internally
       assessed ones for the same subject and result
     • NZQA cannot calculate an ATAR if you were assessed in fewer than
       60 credits at Level 3
     • scale runs 99.95 → 0.00 in 0.05 steps

   ⚠️ NZQA applies annual statistical scaling for relative subject difficulty
   and explicitly DOES NOT predict ATAR in advance. The number below is a
   rough indicator built from the published structure only — treat it as a
   direction of travel, never as a prediction.
   ------------------------------------------------------------------------ */
const ATAR_CREDITS = 90;
const EXTERNAL_WEIGHT = 1.15;   // externals rank higher than internals

/* Per-credit values used for the ATAR estimate.
   ---------------------------------------------------------------------------
   These are NOT the NZ rank-score points (E4/M3/A2 — see GRADE_POINTS above).
   Australian admission centres are widely reported to average the best 90
   credits using E=5, M=3.5, A=2.5, and that spread is what makes the estimate
   behave sensibly: an all-Achieved programme lands at 2.5/5 = 50% rather than
   the ~88% the old own-ceiling normalisation produced.
   NZQA does not publish its actual weightings and restates them annually, so
   this remains an approximation — hence the "indicative" labelling. */
const ATAR_GRADE_VALUE = { E: 5, M: 3.5, A: 2.5 };
const ATAR_MAX_VALUE = 5;

/* Build the weighted credit pool (24-cap per subject, best-graded first). */
function atarPool(rows, assumeGrade) {
  const bySubject = {};
  rows.forEach(r => {
    let g = null;
    if (r.status === 'achieved') g = r.grade || 'A';
    else if (assumeGrade && ['external', 'pending', 'todo'].includes(r.status)) g = assumeGrade;
    if (!g) return;
    // a resit can only improve on what is already banked
    if (assumeGrade && r.resit) {
      const cur = ATAR_GRADE_VALUE[r.grade || 'A'] || 0;
      if ((ATAR_GRADE_VALUE[assumeGrade] || 0) > cur) g = assumeGrade;
    }
    const pts = (ATAR_GRADE_VALUE[g] || 0) * (r.assess === 'External' ? EXTERNAL_WEIGHT : 1);
    (bySubject[r.group] = bySubject[r.group] || []).push({ credits: r.credits, pts });
  });

  return Object.values(bySubject).flatMap(list => {
    const sorted = [...list].sort((a, b) => b.pts - a.pts);
    const out = []; let used = 0;
    for (const it of sorted) {
      if (used >= MAX_PER_SUBJECT) break;
      const take = Math.min(it.credits, MAX_PER_SUBJECT - used);
      out.push({ credits: take, pts: it.pts }); used += take;
    }
    return out;
  }).sort((a, b) => b.pts - a.pts);
}

/* Total the best ATAR_CREDITS credits out of a pool. */
function topCredits(pool) {
  let used = 0, points = 0;
  for (const it of pool) {
    if (used >= ATAR_CREDITS) break;
    const take = Math.min(it.credits, ATAR_CREDITS - used);
    points += take * it.pts; used += take;
  }
  return { points, used };
}

export function atarModel(rows, assumeGrade = null) {
  const { points, used } = topCredits(atarPool(rows, assumeGrade));

  /* Quality = the AVERAGE VALUE PER CREDIT across the best 90, expressed as a
     fraction of the maximum (Excellence on an external).
     ------------------------------------------------------------------------
     This replaces an earlier "normalise against your own all-Excellence
     ceiling" approach, which compressed the scale badly: a programme finishing
     entirely at Achieved scored ~88% and mapped to an ATAR near 97, when
     published endorsement bands put Achieved-level results around 50–69.
     Averaging per credit is both what the published method describes and
     inherently better behaved, because a weaker grade can no longer be hidden
     by the ceiling moving down with it. */
  const maxPerCredit = ATAR_MAX_VALUE * EXTERNAL_WEIGHT;
  const quality = used ? Math.min(1, (points / used) / maxPerCredit) : 0;

  return { creditsCounted: used, points: Math.round(points), quality, eligible: used >= 60 };
}

/* Indicative quality → ATAR curve.
   ---------------------------------------------------------------------------
   `quality` is now the average per-credit value over your best 90 credits, as a
   fraction of Excellence-on-an-external. That gives natural anchor points:

     all Excellence  → 1.00     all Merit → 0.70     all Achieved → 0.50

   The mapping below is pinned to the endorsement bands Australian admission
   guidance publishes — Excellence-level ≈ 85–95+, Merit-level ≈ 70–84,
   Achieved-level ≈ 50–69 — with the very top reserved for a near-perfect
   external-heavy programme.

   STILL APPROXIMATE. NZQA scales every standard for difficulty, recalculates
   annually, and explicitly does not publish weightings or predict scores. Treat
   this as "roughly where I'm tracking", never as a prediction. */
const ATAR_CURVE = [
  [1.00, 99.60],
  [0.95, 97.00],
  [0.90, 94.00],
  [0.85, 90.00],
  [0.80, 85.00],
  [0.70, 78.00],   // ~all Merit
  [0.60, 68.00],
  [0.50, 57.00],   // ~all Achieved
  [0.40, 44.00],
  [0.30, 30.00],
  [0.00, 0.00],
];

export function atarFor(model) {
  if (!model.eligible) return null;              // under 60 L3 credits = no ATAR
  const q = model.quality;
  if (q >= 1) return 99.60;
  for (let i = 0; i < ATAR_CURVE.length - 1; i++) {
    const [hi, ah] = ATAR_CURVE[i], [lo, al] = ATAR_CURVE[i + 1];
    if (q <= hi && q > lo) {
      const v = al + ((q - lo) / (hi - lo)) * (ah - al);
      return Math.round(v / 0.05) * 0.05;        // NZQA reports ATAR in 0.05 steps
    }
  }
  return 0;
}

export function renderProgress() {
  const rows = results.map(withOverride);

  const achieved = rows.filter(r => r.status === 'achieved');
  const toSit = rows.filter(r => r.status === 'external');
  const pending = rows.filter(r => r.status === 'pending');
  const resits = rows.filter(r => r.resit);

  const got = creditsWhere(rows, r => r.status === 'achieved');

  /* Credits still to sit.
     ----------------------------------------------------------------------
     Externals not yet sat + internals submitted or still to do, PLUS the
     standards being RESAT. A resit is already 'achieved' on the record, so it
     was previously excluded — which made the figure read 91 when 17 credits of
     Calculus externals were still going to be sat in November. Those exams are
     real work still ahead, so they belong in this number. */
  const resitCredits = creditsWhere(rows, r => r.resit && r.status === 'achieved');
  const coming = creditsWhere(rows, r => ['external', 'pending', 'todo'].includes(r.status))
               + resitCredits;

  /* Projected total must NOT double-count a resit: those credits are already
     inside `got`. Resitting an external you have passed can raise the GRADE,
     but it cannot bank the same credits twice. */
  const projected = got + coming - resitCredits;

  const byGrade = {
    E: creditsWhere(rows, r => r.status === 'achieved' && r.grade === 'E'),
    M: creditsWhere(rows, r => r.status === 'achieved' && r.grade === 'M'),
    A: creditsWhere(rows, r => r.status === 'achieved' && r.grade === 'A'),
  };

  /* Dropped / Not Applicable standards are deliberately NOT a segment. They
     earn nothing and are not being pursued, so putting them in a chart of
     credits makes the ring read as more credits than exist — and contradicted
     the note underneath, which already said they're excluded from every total.
     They're still listed in the "what are these?" disclosure below the ring and
     greyed out in the standards table; they just don't take up a slice. */
  const segments = buckets(rows).filter(b => b.value > 0);

  const goal = store.goal();
  const gdef = GOALS[goal.type] || GOALS.l3cert;
  const goalResult = gdef.compute(rows, goal.target);
  const { have, need, blocked } = goalResult;
  const pct = need ? Math.min(100, Math.round((have / need) * 100)) : 0;

  /* per-group bars */
  const groups = [...new Set(rows.map(r => r.group))];
  const groupBars = groups.map(g => {
    /* Count EVERY standard in the class that can still yield credits —
       banked, awaiting a result, sitting an external, or an internal still
       to do. (Only dropped/not-applicable standards are excluded.) */
    const gr = rows.filter(r => r.group === g && !['notassessed', 'na'].includes(r.status));
    const gGot = creditsWhere(gr, r => r.status === 'achieved');
    const gPend = creditsWhere(gr, r => r.status === 'pending');
    const gToSit = creditsWhere(gr, r => r.status === 'external' || r.status === 'todo');
    const gTot = gGot + gPend + gToSit;
    return `<div class="subj-bar">
      <div class="sb-head">
        <span><span class="cd-dot" style="background:${GROUP_COLOUR[g] || 'var(--accent)'}"></span> <strong>${g}</strong></span>
        <span class="xs muted">${gGot} banked${gPend ? ` · ${gPend} awaiting` : ''}${gToSit ? ` · ${gToSit} to sit` : ''}
          <strong style="color:var(--text-strong)"> · ${gTot} total</strong></span>
      </div>
      ${stackedBar(gr)}
    </div>`;
  }).join('');

  /* editable table, grouped */
  const tableRows = groups.map(g => {
    const gr = rows.filter(r => r.group === g);
    return `<tr class="tbl-subj"><td colspan="5"><span class="cd-dot" style="background:${GROUP_COLOUR[g] || 'var(--accent)'}"></span> <strong>${g}</strong></td></tr>` +
      gr.map(r => `<tr data-key="${keyOf(r)}">
        <td class="nowrap"><span class="mono xs">${r.subject} ${r.code}</span>
          <br><span class="badge ${r.assess === 'External' ? 'badge-ext' : 'badge-int'}" style="font-size:.62rem;padding:1px 7px">${r.assess || '—'}</span>
          ${r.as ? `<br><span class="xs muted">AS ${r.as}</span>` : ''}</td>
        <td>${r.title}
          ${r.resit ? '<br><span class="badge badge-flag">🔁 re-sitting Nov 2026 to lift the grade</span>' : ''}
          ${r.topicId ? `<br><a class="xs" href="#/topic/${r.topicId}" data-link>study this →</a>` : ''}</td>
        <td><input class="cr-credits sa-input" type="number" min="0" max="30" value="${r.credits}" aria-label="Credits" style="width:62px;padding:5px 8px"></td>
        <td><select class="cr-status sa-input" aria-label="Status" style="padding:5px 8px">
          ${Object.entries(STATUS_LABEL).map(([k, v]) => `<option value="${k}"${r.status === k ? ' selected' : ''}>${v}</option>`).join('')}
        </select></td>
        <td><select class="cr-grade sa-input" aria-label="Grade" style="padding:5px 8px"${r.status !== 'achieved' ? ' disabled' : ''}>
          <option value="">—</option>
          ${['A', 'M', 'E'].map(x => `<option value="${x}"${r.grade === x ? ' selected' : ''}>${GRADE_NAME[x]}</option>`).join('')}
        </select></td>
      </tr>`).join('');
  }).join('');

  const q = qualification;

  /* Empty state: only if literally nothing is banked, pending or upcoming
     (e.g. after a full reset with an emptied record). */
  const nothingTracked = rows.every(r => ['notassessed', 'na'].includes(r.status));
  if (nothingTracked) {
    return {
      html: `<div class="content-inner">
        ${pageHead({ eyebrow: '📈 Credit tracker', title: 'Progress', lede: '' })}
        <div class="empty-state">
          <div class="es-icon">📊</div>
          <h3>No results tracked yet</h3>
          <p>Once you record a standard as banked, awaiting a result, or still to sit,
             your credit totals, grade breakdown and rank-score projection appear here.</p>
          <button class="btn btn-primary" id="seed-record">Load my NZQA record</button>
        </div>
      </div>`,
      onMount() {
        document.getElementById('seed-record').addEventListener('click', () => {
          results.forEach(r => store.setCreditRecord(keyOf(r), null));
          const v = renderProgress();
          document.getElementById('content').innerHTML = v.html; v.onMount();
        });
      },
    };
  }

  const html = `
  <div class="content-inner">
    ${pageHead({
      eyebrow: '📈 Credit tracker',
      title: 'Progress',
      lede: 'Seeded from your actual NZQA Record of Learning. Edit anything below and it saves on this device.',
    })}

    <!-- Qualification status strip -->
    <div class="stat-row mb-5">
      <div class="stat-tile"><div class="stt-num">${got}<span style="font-size:.5em;color:var(--muted)">/${q.l3Required}</span></div><div class="stt-label">L3 credits banked<br><span class="xs" style="text-transform:none;letter-spacing:0">60 at L3 needed for the certificate</span></div></div>
      <div class="stat-tile" title="${resitCredits ? `Includes ${resitCredits} credits you are resitting — those exams are still ahead of you, even though the credits are already banked.` : ''}"><div class="stt-num">${coming}</div><div class="stt-label">Credits still to sit${resitCredits ? `<br><span class="xs" style="text-transform:none;letter-spacing:0">includes ${resitCredits} being resat</span>` : ''}</div></div>
      <div class="stat-tile"><div class="stt-num">${projected}</div><div class="stt-label">Projected if all passed</div></div>
      <div class="stat-tile"><div class="stt-num">${q.literacy.met && q.numeracy.met ? '✓' : '—'}</div><div class="stt-label">Literacy &amp; numeracy met</div></div>
    </div>

    <div class="prog-top">
      <div class="card prog-donut">
        <h3>Level 3 credits by grade</h3>
        <div class="dn-wrap">
          ${donut(segments, { centreTop: got, centreSub: 'earned' })}
          ${legend(segments)}
        </div>
        ${(() => {
          /* Two sources of truth exist here and they can drift apart:
               • `got` / byGrade — computed live from the standards list, and
                 updated whenever you edit a grade or status below.
               • qualification.byLevel — a fixed transcription of the NZQA
                 Record of Learning.
             They agree on a clean load. As soon as you edit anything they may
             not, so state which is which rather than claiming a match blindly. */
          const rec = q.byLevel.find(l => l.level === 3) || { total: 0, a: 0, m: 0, e: 0 };
          const same = rec.total === got && rec.a === byGrade.A && rec.m === byGrade.M && rec.e === byGrade.E;
          return same
            ? `<p class="xs muted mt-3">Matches your NZQA record: ${rec.total} credits at Level 3
                 (${rec.a} A · ${rec.m} M · ${rec.e} E).</p>`
            : `<p class="xs muted mt-3">Showing <strong>your edits</strong>: ${got} credits
                 (${byGrade.A} A · ${byGrade.M} M · ${byGrade.E} E).
                 Your NZQA record as transcribed says ${rec.total}
                 (${rec.a} A · ${rec.m} M · ${rec.e} E) —
                 <button class="linklike" id="pg-reset-inline">reset edits</button>.</p>`;
        })()}
        ${(() => {
          const dropped = rows.filter(r => r.status === 'notassessed' || r.status === 'na');
          if (!dropped.length) return '';
          return `<details class="mt-3"><summary class="xs" style="cursor:pointer;color:var(--accent);font-weight:600">
            What are the ${creditsWhere(dropped, () => true)} “not being assessed” credits?</summary>
            <p class="xs muted mt-3">These are standards that appear on your record as
            <em>Standard Not Assessed</em> or <em>Not Applicable</em> — entered by your school at some point
            but never actually assessed. They earn nothing and you are not pursuing them, so they are shown
            greyed out and excluded from every total:</p>
            <ul class="xs muted" style="margin-top:8px;padding-left:1.2em">
              ${dropped.map(d => `<li>${d.subject} ${d.code} — ${d.title} <em>(${d.credits} cr)</em></li>`).join('')}
            </ul>
            <p class="xs muted mt-3">If any of these is wrong — say you actually are doing one —
            change its status in the table below and it will start counting.</p>
          </details>`;
        })()}
      </div>

      <div class="card prog-goal">
        <h3>🎯 Goal</h3>
        <div class="goal-picker">
          <select id="goal-type" class="sa-input">
            ${Object.entries(GOALS).map(([k, g]) => `<option value="${k}"${goal.type === k ? ' selected' : ''}>${g.name}</option>`).join('')}
          </select>
          <input id="goal-target" class="sa-input" type="number" min="1" placeholder="target credits"
                 value="${goal.target || ''}" ${goal.type === 'custom' ? '' : 'style="display:none"'}>
        </div>
        <p class="xs muted mt-3">${gdef.desc}</p>
        <div class="goal-figure">
          ${blocked ? `
            <div class="gf-num" style="font-size:var(--fs-xl)">Not yet eligible</div>
            <div class="xs muted mt-3">${blocked}</div>
          ` : `
            <div class="gf-num">${goal.type === 'atar' ? have.toFixed(2) : have}<span class="gf-of"> / ${need}</span></div>
            <div class="xs muted">${goal.type === 'atar' ? 'indicative ATAR' : 'credits'} toward ${gdef.name}</div>
            <div class="progress mt-3"><span style="width:${pct}%"></span></div>
            <div class="xs muted mt-3">${pct}% there${have >= need ? ' — 🎉 already met!' : ` · ${(need - have).toFixed(goal.type === 'atar' ? 2 : 0)} to go`}</div>
          `}
        </div>
      </div>
    </div>

    ${resits.length ? `
    <div class="callout callout-note mt-5"><div class="co-icon">🔁</div><div class="co-body">
      <h4>Your Calculus re-sits</h4>
      <p>You've already banked <strong>${creditsWhere(resits, () => true)} credits</strong> from
      ${resits.map(r => r.subject + ' ' + r.code).join(', ')} at <strong>Achieved</strong>.
      Re-sitting these in November can only <em>raise</em> the grade — the credits are already yours and can't be lost.
      Every grade you lift moves you toward a Merit or Excellence endorsement, so they're worth
      ${resits.reduce((n, r) => n + r.credits, 0)} credits of potential upgrade.</p>
    </div></div>` : ''}

    <!-- Rank score / ATAR scenarios -->
    <h2 class="mt-5 mb-3">Rank score &amp; ATAR — what's still on the table</h2>
    <div class="card">
      <p class="muted small mb-3">Two different measures, two different rules:</p>
      <ul class="small muted mb-3" style="padding-left:1.2em">
        <li><strong>NZ rank score</strong> (Auckland and other NZ unis): best <strong>80</strong> Level 3 credits,
            max 5 subjects, max 24 per subject, at <strong>E = 4 · M = 3 · A = 2</strong> points per credit. Max 320.</li>
        <li><strong>ATAR</strong> (Australian unis, calculated by NZQA): best <strong>90</strong> Level 3 credits,
            max 24 per subject, with <strong>externally assessed standards ranked above internals</strong>
            and UE-approved subjects ranked first. Needs <strong>60+</strong> L3 credits to be calculated at all.</li>
      </ul>
      <p class="muted small mb-3">Either way, every remaining credit is still ungraded — <em>this is where Excellence pays</em>:</p>
      <div class="table-wrap">
        <table class="data">
          <thead><tr><th>Scenario</th><th class="center">Rank score</th><th class="center">Indicative ATAR</th><th>What it means</th></tr></thead>
          <tbody>
            ${(() => {
              const mk = (g) => ({ rank: rankScore(rows, g), atar: atarModel(rows, g) });
              const now = mk(null), ifA = mk('A'), ifM = mk('M'), ifE = mk('E');
              const row = (label, x, note, hl) => {
                const a = atarFor(x.atar);
                return `<tr${hl ? ' style="background:var(--accent-soft)"' : ''}>
                  <td><strong>${label}</strong></td>
                  <td class="center mono"><strong>${x.rank.score}</strong><span class="xs muted"> /320</span></td>
                  <td class="center mono">${a === null ? '<span class="xs muted">n/a</span>' : '~' + a.toFixed(2)}</td>
                  <td class="xs muted">${note}</td></tr>`;
              };
              return [
                row('Right now (banked credits only)', now,
                  now.atar.eligible
                    ? `${now.atar.creditsCounted} of the 90 ATAR credits filled.`
                    : `⚠️ Only ${now.atar.creditsCounted} L3 credits — NZQA needs <strong>60+</strong> before it will calculate an ATAR at all. Your November externals get you past that.`),
                row('If you pass everything at Achieved', ifA, 'All credits count, but at the lowest weighting.'),
                row('If you get Merit in everything remaining', ifM, `+${ifM.rank.score - ifA.rank.score} rank points over all-Achieved.`),
                row('If you get Excellence in everything remaining', ifE, `+${ifE.rank.score - ifA.rank.score} rank points over all-Achieved — your ceiling.`, true),
              ].join('');
            })()}
          </tbody>
        </table>
      </div>
      <div class="callout callout-tip mt-3"><div class="co-icon">✓</div><div class="co-body">
        <h4>Why Excellence matters so much for you specifically</h4>
        <p>You currently hold <strong>17 credits at Achieved</strong> (the three Calculus externals) — those
        contribute 2 points per credit instead of 4. Lifting all three to Excellence in your November re-sits
        alone is worth <strong>+${17 * 2} rank points</strong> (and lifts them into the top ATAR weighting band too), and they cost you no risk because the credits are already banked.
        Every remaining external graded E rather than A is worth double.</p>
      </div></div>
      <p class="xs muted mt-3">⚠️ The <strong>rank score</strong> maths follows the standard NZ university rule and should be accurate.
        The <strong>ATAR</strong> column is a rough indicator built only from NZQA's published structure
        (90 credits · 24-per-subject cap · externals weighted higher). NZQA also applies annual statistical scaling for
        subject difficulty and <strong>explicitly does not predict ATAR in advance</strong>, so do not treat that column as a forecast —
        it is there to show the <em>direction</em> your grades move it.
        <a href="https://www2.nzqa.govt.nz/international/nz-quals-overseas/study-with-ncea/australia/" target="_blank" rel="noopener">NZQA's rules →</a></p>
    </div>

    <h2 class="mt-5 mb-3">By class</h2>
    <div class="card">
      <div class="stack-legend mb-5">
        ${/* No "Dropped" key — the group bars filter those rows out (see the
             groupBars build above), so the legend was advertising a colour that
             never appears in any bar. */
          buckets(rows)
          .map(b => `<span class="sl-key"><span class="sl-dot" style="background:${b.colour}"></span>${b.label}</span>`).join('')}
      </div>
      ${groupBars}
    </div>

    <h2 class="mt-5 mb-3">Every Level 3 standard on your record</h2>
    <p class="muted small mb-3">Transcribed from your NZQA Record of Learning. Edit credits, status or grade and it saves instantly.</p>
    <div class="table-wrap">
      <table class="data" id="credit-table">
        <thead><tr><th>Standard</th><th>Title</th><th>Credits</th><th>Status</th><th>Grade</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>

    <div class="callout callout-warn mt-5"><div class="co-icon">⚠</div><div class="co-body">
      <h4>Worth double-checking</h4>
      <p>Credit values for standards you haven't sat yet are the standard published values.
      A few standards outside this site's six subjects (Maths 3.2/3.3/3.15, Biology 3.4, English 3.4/3.7/3.8/3.9)
      have their AS numbers left blank rather than guessed — add them in <code>data/results.js</code> if you want them.
      The UE calculation is a simplified “14 × 3 subjects” model and doesn't encode NZQA's full approved-subject rules.</p>
    </div></div>

    <div class="flex gap-3 mt-5 wrap">
      <button class="btn btn-ghost btn-sm" id="reset-credits">Reset to my NZQA record</button>
    </div>
  </div>`;

  return {
    html,
    onMount() {
      const rerender = () => {
        const v = renderProgress();
        document.getElementById('content').innerHTML = v.html;
        v.onMount();
      };

      document.querySelectorAll('#credit-table tr[data-key]').forEach(tr => {
        const k = tr.dataset.key;
        const save = () => {
          const status = tr.querySelector('.cr-status').value;
          const grade = tr.querySelector('.cr-grade').value;
          const credits = parseInt(tr.querySelector('.cr-credits').value, 10) || 0;
          store.setCreditRecord(k, { status, grade: status === 'achieved' ? grade : '', credits });
        };
        ['.cr-status', '.cr-grade', '.cr-credits'].forEach(sel =>
          tr.querySelector(sel).addEventListener('change', () => { save(); rerender(); }));
      });

      const gt = document.getElementById('goal-type');
      const tgt = document.getElementById('goal-target');
      gt.addEventListener('change', () => {
        store.setGoal({ type: gt.value, target: gt.value === 'custom' ? (parseInt(tgt.value, 10) || 60) : null });
        rerender();
      });
      tgt.addEventListener('change', () => {
        store.setGoal({ type: 'custom', target: parseInt(tgt.value, 10) || 60 });
        rerender();
      });

      /* The inline "reset edits" link in the donut caption does the same thing
         as the button lower down — wire both to one handler. */
      document.getElementById('pg-reset-inline')?.addEventListener('click', () => {
        document.getElementById('reset-credits')?.click();
      });

      document.getElementById('reset-credits').addEventListener('click', () => {
        if (!confirm('Discard your edits and reset every row back to your NZQA record?')) return;
        results.forEach(r => store.setCreditRecord(keyOf(r), null));
        toast('Reset to your NZQA record');
        rerender();
      });
    },
  };
}

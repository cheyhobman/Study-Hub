/* ============================================================================
   pages/progress.js: credit tracker & goal dashboard.
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
import { toast, esc } from '../ui.js';
import { results, qualification } from '../../data/results.js';
import { catalogue, AREAS } from '../../data/nzqa-catalogue.js';

/* Credit colours: chosen so grades and statuses are instantly distinguishable.
   Excellence = gold · Merit = blue · Achieved = green · awaiting = orange ·
   still to sit = red · dropped = grey. */
const GRADE_COLOUR = { E: '#E3A72F', M: '#3E7FB8', A: '#4FA97C' };
const STATUS_COLOUR = {
  pending: '#E07B39',     // sat, result not back
  tosit:   '#C25A52',     // not sat yet (externals + internals still to do)
  /* Kept for reference only. Dropped/Not Applicable credits are no longer
     drawn anywhere, not in the ring, not in the class bars, not in either
     legend, because they earn nothing and aren't being pursued. They appear
     as text in the "what are these?" disclosure and in the standards table. */
  dropped: '#8A9A90',     // not being assessed
};
const GRADE_NAME = { E: 'Excellence', M: 'Merit', A: 'Achieved' };
/* NOTE: the status "Credits banked" deliberately avoids the word *Achieved*,
   which is also a GRADE (A/M/E). Status = do I have the credits yet;
   Grade = how well I did. */
const STATUS_LABEL = {
  achieved:    'Credits banked',
  pending:     'Sat: awaiting result',
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
  notassessed: 'Entered at some point but never assessed: earns nothing and is not being pursued.',
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
  /* Drawn as explicit annular-sector PATHS, not stroke-dasharray circles.
     The dasharray version accumulated a floating-point offset across segments,
     so the final arc could wrap past 12 o'clock and paint over the first. That
     is why the red "Not sat yet" band bled into the gold "Excellence" band.
     Arc paths have no accumulation, and a ~1 degree gap gives every boundary a
     clean radial edge. */
  const cx = size / 2, cy = size / 2;
  const rOut = size / 2, rIn = size / 2 - thickness;
  const segs = segments.filter(s => s.value > 0);
  const total = segs.reduce((n, s) => n + s.value, 0);
  const ring = (colour) => `<circle cx="${cx}" cy="${cy}" r="${(rOut + rIn) / 2}" fill="none" stroke="${colour}" stroke-width="${thickness}"/>`;
  const polar = (r, a) => [ (cx + r * Math.cos(a)).toFixed(3), (cy + r * Math.sin(a)).toFixed(3) ];

  let body;
  if (!total) body = ring('var(--border)');
  else if (segs.length === 1) body = ring(segs[0].colour);
  else {
    /* Sectors MEET rather than being separated by a gap: a normal pie/donut.
       They still get clean straight boundaries because each sector's angles are
       computed from the running fraction, so there is no dasharray drift and no
       overlap at the join. */
    let a = -Math.PI / 2;
    body = segs.map(s => {
      const sweep = (s.value / total) * Math.PI * 2;
      const a1 = a, a2 = a + sweep;
      a += sweep;
      const large = (a2 - a1) > Math.PI ? 1 : 0;
      const [ox1, oy1] = polar(rOut, a1), [ox2, oy2] = polar(rOut, a2);
      const [ix2, iy2] = polar(rIn, a2),  [ix1, iy1] = polar(rIn, a1);
      const d = `M ${ox1} ${oy1} A ${rOut} ${rOut} 0 ${large} 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${rIn} ${rIn} 0 ${large} 0 ${ix1} ${iy1} Z`;
      return `<path d="${d}" fill="${s.colour}"><title>${s.label}: ${s.value}</title></path>`;
    }).join('');
  }
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="donut" role="img"
      aria-label="${segments.map(s => `${s.label} ${s.value}`).join(', ')}">
    ${body}
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" class="dn-top">${centreTop ?? total}</text>
    <text x="${cx}" y="${cy + 18}" text-anchor="middle" class="dn-sub">${centreSub ?? 'credits'}</text>
  </svg>`;
}
const legend = (segs) => `<div class="dn-legend">${segs.map(s => `
  <div class="dn-key"><span class="dn-dot" style="background:${s.colour}"></span>
    <span class="dn-label">${s.label}</span><span class="dn-val">${s.value}</span></div>`).join('')}</div>`;

/* ---- Goals -------------------------------------------------------------- */
const GOALS = {
  l3cert: {
    name: 'NCEA Level 3 certificate',
    desc: '60 credits at Level 3, plus 20 at Level 2 or above. You already have 115 at Level 2, so the Level 2 part is met. This tracks the 60 at Level 3.',
    compute: (rows) => ({ have: creditsWhere(rows, r => r.status === 'achieved'), need: qualification.l3Required }),
  },
  /* University Entrance, verified against NZQA 3 Aug 2026:
       • NCEA Level 3
       • 14 credits at Level 3 in each of THREE approved subjects
       • UE literacy: 10 credits at Level 2+ (5 reading, 5 writing)
       • Numeracy: 10 credits at Level 1+
     There is NO requirement that one of the three be English, the literacy
     requirement is separate and can be met from many subjects.
     Only credits you have actually BANKED count here, which is why this number
     stays low until results come back. */
  ue: {
    name: 'University Entrance',
    desc: '14 credits at Level 3 in each of <strong>three approved subjects</strong>. Any three: English is <em>not</em> required.',
    compute: (rows) => {
      const byGroup = {};
      rows.filter(r => r.status === 'achieved').forEach(r => {
        byGroup[r.group] = (byGroup[r.group] || 0) + r.credits;
      });
      const ranked = Object.entries(byGroup)
        .map(([group, raw]) => ({ group, raw, counts: Math.min(raw, 14) }))
        .sort((a, b) => b.counts - a.counts);
      const best3 = ranked.slice(0, 3);
      return {
        have: best3.reduce((n, x) => n + x.counts, 0),
        need: 42,
        breakdown: best3,
        alsoHave: ranked.slice(3),
      };
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
    name: 'ATAR (Australian unis): indicative',
    desc: 'NZQA calculates this for Australian universities from your <strong>best 90 Level 3 credits</strong> (max 24 per subject), ranking UE-approved subjects first and weighting <strong>externally assessed standards above internals</strong>. You need at least 60 Level 3 credits before NZQA will calculate one at all. NZQA applies annual difficulty scaling and does not predict scores in advance, so the figure below is a rough indicator only.',
    compute: (rows) => {
      const m = atarModel(rows);
      const a = atarFor(m);
      return {
        have: a === null ? 0 : a, need: 99.95,
        blocked: a === null
          ? `NZQA needs <strong>60+ Level 3 credits</strong> before it will calculate an ATAR. You currently have ${m.creditsCounted}. Passing your November externals clears that threshold.`
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
       in a bucket. Otherwise they vanish from the bars and the totals stop
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
   here is an INDICATIVE band only: always confirm with UAC / the university.
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
    const sorted = [...list].sort((a, b) => b.rank - a.rank);
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
   rough indicator built from the published structure only. Treat it as a
   direction of travel, never as a prediction.
   ------------------------------------------------------------------------ */
const ATAR_CREDITS = 90;

/* External vs internal is a SELECTION TIE-BREAKER, not a value multiplier.
   ---------------------------------------------------------------------------
   NZQA's published method ranks standards by grade first, and prefers an
   externally assessed standard over an internal one *of the same grade* when
   deciding which credits make the best-90 cut. It does not say an external
   credit is worth more than an internal one.

   This used to be modelled as ×1.15 on the value, which produced a result that
   is almost certainly backwards: an Economics external at Excellence scored
   5.75/credit while a Calculus internal at Excellence scored 5.00: i.e. the
   easier subject's credit outranked the harder one's purely for being sat in
   an exam room. Real ATAR scaling works the other way round (see the
   SUBJECT SCALING note below). Grade now decides value; external only breaks
   ties over which credits are counted. */
const EXTERNAL_TIEBREAK = 0.001;

/* Per-credit values used for the ATAR estimate.
   ---------------------------------------------------------------------------
   These are NOT the NZ rank-score points (E4/M3/A2: see GRADE_POINTS above).
   Australian admission centres are widely reported to average the best 90
   credits using E=5, M=3.5, A=2.5, and that spread is what makes the estimate
   behave sensibly: an all-Achieved programme lands at 2.5/5 = 50% rather than
   the ~88% the old own-ceiling normalisation produced.
   NZQA does not publish its actual weightings and restates them annually, so
   this remains an approximation: hence the "indicative" labelling. */
const ATAR_GRADE_VALUE = { E: 5, M: 3.5, A: 2.5 };
const ATAR_MAX_VALUE = 5;

/* SUBJECT SCALING, relative, illustrative, and deliberately coarse.
   ---------------------------------------------------------------------------
   NZQA applies annual statistical scaling for relative subject difficulty when
   it calculates an ATAR, and it does NOT publish the factors. So these are not
   NZQA's numbers and cannot be. They are a three-tier approximation of the
   direction the effect runs, which in the Australian system is well documented:
   scaling reflects the measured strength of the cohort taking each subject.

   Traditionally higher-scaling: the sciences, both maths lines, and the
   academic humanities and languages. Traditionally lower-scaling: subjects with
   a large, broad cohort and a heavy practical component.

   The spread here (1.10 / 1.00 / 0.92) is intentionally narrow. A wider spread
   would look more decisive and be less honest. The real factors move every
   year and by cohort. Read the ATAR column as a direction, never a prediction.

   Unknown groups, a subject typed in by hand, get the 1.00 baseline. */
const SCALE_HIGH = 1.10, SCALE_BASE = 1.00, SCALE_LOW = 0.92;
const MAX_SCALE = SCALE_HIGH;

const SUBJECT_SCALE = {};
/* Chey's six sit here, along with the other academically-scaling subjects. */
['13MAC', '13MAS', '13MAT', '13CHE', '13PHY', '13BIO', '13ENU', '13ENG',
 '13ECO', '13ACC', '13HIS', '13GEO', '13CLA', '13ESS', '13AGH',
 '13MAO', '13FRE', '13GER', '13JPN', '13CHI', '13SPA',
].forEach(g => { SUBJECT_SCALE[g] = SCALE_HIGH; });
/* Baseline: arts and technology. */
['13ARH', '13MUS', '13DRA', '13ART', '13DVC', '13DIT', '13MED', '13BUS',
].forEach(g => { SUBJECT_SCALE[g] = SCALE_BASE; });
/* Traditionally lower-scaling. */
['13PED', '13HEA'].forEach(g => { SUBJECT_SCALE[g] = SCALE_LOW; });

function scaleFor(group) {
  return SUBJECT_SCALE[group] != null ? SUBJECT_SCALE[group] : SCALE_BASE;
}

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
    const value = (ATAR_GRADE_VALUE[g] || 0) * scaleFor(r.group);
    /* `rank` is only used for sorting. The nudge is far too small to move the
       average, so an external is picked ahead of an internal of the SAME grade
       without being treated as worth more. `pts` carries the real value. */
    const rank = value + (r.assess === 'External' ? EXTERNAL_TIEBREAK : 0);
    (bySubject[r.group] = bySubject[r.group] || []).push({ credits: r.credits, pts: value, rank });
  });

  return Object.values(bySubject).flatMap(list => {
    const sorted = [...list].sort((a, b) => b.pts - a.pts);
    const out = []; let used = 0;
    for (const it of sorted) {
      if (used >= MAX_PER_SUBJECT) break;
      const take = Math.min(it.credits, MAX_PER_SUBJECT - used);
      out.push({ credits: take, pts: it.pts, rank: it.rank }); used += take;
    }
    return out;
  }).sort((a, b) => b.rank - a.rank);
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
  const quality = used ? Math.min(1, (points / used) / (ATAR_MAX_VALUE * MAX_SCALE)) : 0;

  return { creditsCounted: used, points: Math.round(points), quality, eligible: used >= 60 };
}

/* Indicative quality → ATAR curve.
   ---------------------------------------------------------------------------
   `quality` is now the average per-credit value over your best 90 credits, as a
   fraction of Excellence-on-an-external. That gives natural anchor points:

     all Excellence  → 1.00     all Merit → 0.70     all Achieved → 0.50

   The mapping below is pinned to the endorsement bands Australian admission
   guidance publishes, Excellence-level ≈ 85–95+, Merit-level ≈ 70–84,
   Achieved-level ≈ 50–69, with the very top reserved for a near-perfect
   external-heavy programme.

   STILL APPROXIMATE. NZQA scales every standard for difficulty, recalculates
   annually, and explicitly does not publish weightings or predict scores. Treat
   this as "roughly where I'm tracking", never as a prediction. */
const ATAR_CURVE = [
  /* 99.95 is the genuine top of the ATAR scale. It is a RANK reported from
     0.00 to 99.95 in 0.05 steps, so there is no 100.00 by construction.
     quality = 1.00 here is not merely "all Excellence": because externals carry
     the ×1.15 weighting, reaching 1.00 requires every one of your best 90
     credits to be Excellence AND externally assessed. That is a perfect,
     external-heavy programme, so mapping it to the top of the scale is fair.
     An all-Excellence programme with internals in it lands a little below. */
  [1.00, 99.95],
  [0.95, 97.60],
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
  if (q >= 1) return 99.95;                      // the top of the scale
  for (let i = 0; i < ATAR_CURVE.length - 1; i++) {
    const [hi, ah] = ATAR_CURVE[i], [lo, al] = ATAR_CURVE[i + 1];
    if (q <= hi && q > lo) {
      const v = al + ((q - lo) / (hi - lo)) * (ah - al);
      return +(Math.round(v / 0.05) * 0.05).toFixed(2);  // NZQA reports ATAR in 0.05 steps
    }
  }
  return 0;
}

export function renderProgress() {
  /* The shipped record PLUS anything the student added from the NZQA catalogue
     or typed in by hand. Both go through withOverride, so an edit to a
     catalogue row behaves exactly like an edit to a record row. */
  /* Standards the student removed drop out of EVERY total, not just the table. */
  const hidden = new Set(store.hiddenStandards());
  const rows = [...results, ...store.extraStandards()]
    .filter(r => !hidden.has(r.group + ':' + r.code))
    .map(withOverride);

  const achieved = rows.filter(r => r.status === 'achieved');
  const toSit = rows.filter(r => r.status === 'external');
  const pending = rows.filter(r => r.status === 'pending');
  const resits = rows.filter(r => r.resit);

  const got = creditsWhere(rows, r => r.status === 'achieved');

  /* Credits still to sit.
     ----------------------------------------------------------------------
     Externals not yet sat + internals submitted or still to do, PLUS the
     standards being RESAT. A resit is already 'achieved' on the record, so it
     was previously excluded: which made the figure read 91 when 17 credits of
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
     credits makes the ring read as more credits than exist, and contradicted
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
    /* Count EVERY standard in the class that can still yield credits. Banked, awaiting a result, sitting an external, or an internal still
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
          <br><span class="badge ${r.assess === 'External' ? 'badge-ext' : 'badge-int'}" style="font-size:.62rem;padding:1px 7px">${r.assess || '–'}</span>
          ${r.as ? `<br><span class="xs muted">AS ${r.as}</span>` : ''}</td>
        <td>${r.title}
          ${r.resit ? '<br><span class="badge badge-flag">re-sitting Nov 2026 to lift the grade</span>' : ''}
          ${r.topicId ? `<br><a class="xs" href="#/topic/${r.topicId}" data-link>study this →</a>` : ''}
</td>
        <td><input class="cr-credits sa-input" type="number" min="0" max="30" value="${r.credits}" aria-label="Credits" style="width:62px;padding:5px 8px"></td>
        <td><select class="cr-status sa-input" aria-label="Status" style="padding:5px 8px"
                    title="${STATUS_HINT[r.status] || ''}">
          ${Object.entries(STATUS_LABEL).map(([k, v]) => `<option value="${k}" title="${STATUS_HINT[k] || ''}"${r.status === k ? ' selected' : ''}>${v}</option>`).join('')}
        </select></td>
        <td class="cr-last"><select class="cr-grade sa-input" aria-label="Grade" style="padding:5px 8px"${r.status !== 'achieved' ? ' disabled' : ''}>
          <option value="">N/A</option>
          ${['A', 'M', 'E'].map(x => `<option value="${x}"${r.grade === x ? ' selected' : ''}>${GRADE_NAME[x]}</option>`).join('')}
        </select>
          <span class="cr-xzone"><button class="x-btn" data-remove-std="${r.group}|${r.code}"
                  title="Remove ${r.subject} ${r.code}" aria-label="Remove ${r.subject} ${r.code}">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor"
                 stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
          </button></span></td>
      </tr>`).join('');
  }).join('');

  const q = qualification;

  /* Empty state: only if literally nothing is banked, pending or upcoming
     (e.g. after a full reset with an emptied record). */
  const nothingTracked = rows.every(r => ['notassessed', 'na'].includes(r.status));
  if (nothingTracked) {
    return {
      html: `<div class="content-inner">
        ${pageHead({ eyebrow: 'Credit tracker', title: 'Progress', lede: '' })}
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
      eyebrow: 'Credit tracker',
      title: 'Progress',
      lede: 'Seeded from your actual NZQA Record of Learning. Edit anything below and it saves on this device.',
    })}

    <!-- Qualification status strip -->
    <div class="stat-row mb-5">
      <div class="stat-tile"><div class="stt-num">${got}<span style="font-size:.5em;color:var(--muted)">/${q.l3Required}</span></div><div class="stt-label">L3 credits banked<br><span class="xs" style="text-transform:none;letter-spacing:0">60 at L3 needed for the certificate</span></div></div>
      <div class="stat-tile" title="${resitCredits ? `Includes ${resitCredits} credits you are resitting. Those exams are still ahead of you, even though the credits are already banked.` : ''}"><div class="stt-num">${coming}</div><div class="stt-label">Credits still to sit${resitCredits ? `<br><span class="xs" style="text-transform:none;letter-spacing:0">includes ${resitCredits} being resat</span>` : ''}</div></div>
      <div class="stat-tile"><div class="stt-num">${projected}</div><div class="stt-label">Projected if all passed</div></div>
      <div class="stat-tile"><div class="stt-num">${q.literacy.met && q.numeracy.met ? '✓' : '–'}</div><div class="stt-label">Literacy &amp; numeracy met</div></div>
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
               • `got` / byGrade, computed live from the standards list, and
                 updated whenever you edit a grade or status below.
               • qualification.byLevel. A fixed transcription of the NZQA
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
                 (${rec.a} A · ${rec.m} M · ${rec.e} E): <button class="linklike" id="pg-reset-inline">reset edits</button>.</p>`;
        })()}
        ${(() => {
          const dropped = rows.filter(r => r.status === 'notassessed' || r.status === 'na');
          if (!dropped.length) return '';
          return `<details class="mt-3"><summary class="xs" style="cursor:pointer;color:var(--accent);font-weight:600">
            What are the ${creditsWhere(dropped, () => true)} “not being assessed” credits?</summary>
            <p class="xs muted mt-3">These are standards that appear on your record as
            <em>Standard Not Assessed</em> or <em>Not Applicable</em>, entered by your school at some point
            but never actually assessed. They earn nothing and you are not pursuing them, so they are shown
            greyed out and excluded from every total:</p>
            <ul class="xs muted" style="margin-top:8px;padding-left:1.2em">
              ${dropped.map(d => `<li>${d.subject} ${d.code}, ${d.title} <em>(${d.credits} cr)</em></li>`).join('')}
            </ul>
            <p class="xs muted mt-3">If any of these is wrong, say you actually are doing one, change its status in the table below and it will start counting.</p>
          </details>`;
        })()}
      </div>

      <div class="card prog-goal">
        <h3>Goal</h3>
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
            <div class="xs muted mt-3">${pct}% there${have >= need ? ', already met' : ` · ${(need - have).toFixed(goal.type === 'atar' ? 2 : 0)} to go`}</div>
            ${goalResult.breakdown ? `
              <div class="ue-breakdown mt-4">
                <div class="ue-rows">
                  ${goalResult.breakdown.map(b => `<div class="ue-row">
                    <span class="ue-g mono">${b.group}</span>
                    <span class="ue-bar"><i style="width:${Math.round((b.counts / 14) * 100)}%"></i></span>
                    <span class="ue-n mono">${b.counts}/14</span>
                  </div>`).join('')}
                </div>
                <details class="ue-more">
                  <summary class="xs">Where these come from</summary>
                  <div class="xs muted mt-2">
                    Your best three subjects, each capped at the 14 credits UE counts.
                    ${goalResult.breakdown.filter(b => b.raw > 14).map(b =>
                      `${b.group} has ${b.raw} banked, so ${b.raw - 14} sit above the cap.`).join(' ')}
                    ${goalResult.alsoHave && goalResult.alsoHave.length
                      ? `Also banked: ${goalResult.alsoHave.map(b => `${b.group} (${b.raw})`).join(', ')}.` : ''}
                    You also need UE literacy (10 credits at Level 2 or above, 5 reading and
                    5 writing) and numeracy (10 at Level 1 or above). Only banked credits count
                    here, so this stays low until results come back.
                  </div>
                </details>
              </div>` : ''}
          `}
        </div>
      </div>
    </div>

    ${resits.length ? `
    <div class="callout callout-note mt-5"><div class="co-icon">↻</div><div class="co-body">
      <h4>Your Calculus re-sits</h4>
      <p>You've already banked <strong>${creditsWhere(resits, () => true)} credits</strong> from
      ${resits.map(r => r.subject + ' ' + r.code).join(', ')} at <strong>Achieved</strong>.
      Re-sitting these in November can only <em>raise</em> the grade. The credits are already yours and can't be lost.
      Every grade you lift moves you toward a Merit or Excellence endorsement, so they're worth
      ${resits.reduce((n, r) => n + r.credits, 0)} credits of potential upgrade.</p>
    </div></div>` : ''}

    <!-- Rank score / ATAR scenarios -->
    <h2 class="mt-5 mb-3">Rank score &amp; ATAR, what's still on the table</h2>
    <div class="card">
      <p class="muted small mb-3">Two different measures, two different rules:</p>
      <ul class="small muted mb-3" style="padding-left:1.2em">
        <li><strong>NZ rank score</strong> (Auckland and other NZ unis): best <strong>80</strong> Level 3 credits,
            max 5 subjects, max 24 per subject, at <strong>E = 4 · M = 3 · A = 2</strong> points per credit. Max 320.</li>
        <li><strong>ATAR</strong> (Australian unis, calculated by NZQA): best <strong>90</strong> Level 3 credits,
            max 24 per subject, with <strong>externally assessed standards ranked above internals</strong>
            and UE-approved subjects ranked first. Needs <strong>60+</strong> L3 credits to be calculated at all.</li>
      </ul>
      <p class="muted small mb-3">Either way, every remaining credit is still ungraded, <em>this is where Excellence pays</em>:</p>
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
                    : `⚠️ Only ${now.atar.creditsCounted} L3 credits. NZQA needs <strong>60+</strong> before it will calculate an ATAR at all. Your November externals get you past that.`),
                row('If you pass everything at Achieved', ifA, 'All credits count, but at the lowest weighting.'),
                row('If you get Merit in everything remaining', ifM, `+${ifM.rank.score - ifA.rank.score} rank points over all-Achieved.`),
                row('If you get Excellence in everything remaining', ifE, `+${ifE.rank.score - ifA.rank.score} rank points over all-Achieved: your ceiling.`, true),
              ].join('');
            })()}
          </tbody>
        </table>
      </div>
      <div class="callout callout-tip mt-3"><div class="co-icon">✓</div><div class="co-body">
        <h4>Why Excellence matters so much for you specifically</h4>
        <p>You currently hold <strong>17 credits at Achieved</strong> (the three Calculus externals), those
        contribute 2 points per credit instead of 4. Lifting all three to Excellence in your November re-sits
        alone is worth <strong>+${17 * 2} rank points</strong> (and lifts them into the top ATAR weighting band too), and they cost you no risk because the credits are already banked.
        Every remaining external graded E rather than A is worth double.</p>
      </div></div>
      <div class="callout callout-note mt-4"><div class="co-icon">ℹ</div><div class="co-body">
        <h4>How this ATAR estimate is built</h4>
        <p>The <strong>rank score</strong> follows the standard NZ university rule and should be
          accurate. The <strong>ATAR</strong> column applies NZQA's published structure, best 90
          credits, 24-per-subject cap, and externals preferred over internals of the
          <em>same grade</em> when choosing which credits count, plus a coarse
          <strong>subject-scaling</strong> step.</p>
        <p>NZQA does scale for relative subject difficulty and <strong>does not publish the
          factors</strong>, so the three tiers used here are illustrative, not NZQA's:
          the sciences, both maths lines and the academic humanities and languages sit highest;
          arts and technology sit at the baseline; PE and Health sit lowest. The spread is
          deliberately narrow. A wider one would look more decisive and be less honest.</p>
        <p>Your programme (Chemistry, Physics, Calculus, Statistics, Biology, English) is entirely
          in the top tier, so an all-Excellence result reaches the top of the scale here. NZQA
          <strong>explicitly does not predict ATAR in advance</strong>. Read this as the
          <em>direction</em> your grades move things, never as a forecast.
          <a href="https://www2.nzqa.govt.nz/international/nz-quals-overseas/study-with-ncea/australia/" target="_blank" rel="noopener">NZQA's rules →</a></p>
      </div></div>
    </div>

    <h2 class="mt-5 mb-3">By class</h2>
    <div class="card">
      <div class="stack-legend mb-5">
        ${/* No "Dropped" key. The group bars filter those rows out (see the
             groupBars build above), so the legend was advertising a colour that
             never appears in any bar. */
          buckets(rows)
          .map(b => `<span class="sl-key"><span class="sl-dot" style="background:${b.colour}"></span>${b.label}</span>`).join('')}
      </div>
      ${groupBars}
    </div>

    <h2 class="mt-5 mb-3">Every Level 3 standard on your record</h2>
    <p class="muted small mb-3">Transcribed from your NZQA Record of Learning. Edit credits, status or grade and it saves instantly.</p>
    <div class="table-wrap credit-wrap">
      <table class="data" id="credit-table">
        <thead><tr><th>Standard</th><th>Title</th><th>Credits</th><th>Status</th><th>Grade</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>

    <h2 class="mt-5 mb-3" id="add-standards">Add standards from other subjects</h2>
    <p class="muted small mb-3">This site only teaches six subjects, but your credits, rank score and
      ATAR should count <strong>everything</strong> you're sitting. Add your other subjects here and they
      are treated exactly like the rest of your record, including on the calendar, once you give them dates.</p>

    <div class="card mb-5">
      <div class="flex gap-3 wrap items-center mb-3">
        <label class="field-inline"><span class="xs muted">Subject area</span>
          <select id="lib-area">
            <option value="">All areas</option>
            ${AREAS.map(a => `<option value="${esc(a)}">${esc(a)}</option>`).join('')}
          </select>
        </label>
        <label class="field-inline" style="flex:1;min-width:200px"><span class="xs muted">Search</span>
          <input type="text" id="lib-search" placeholder="Subject, standard number or title…" autocomplete="off">
        </label>
      </div>
      <div id="lib-list" class="lib-list"><!-- injected --></div>
    </div>

    <details class="card mb-5">
      <summary style="cursor:pointer;font-weight:600">Add a standard by hand</summary>
      <p class="xs muted mt-3">Use this for anything the catalogue doesn't have: unit standards, a
        subject we've missed, or a standard whose details differ from the list above.</p>
      <form id="lib-manual" class="int-form" style="box-shadow:none;padding:0;border:0" novalidate>
        <div class="grid-2">
          <label class="field"><span>Subject</span><input name="subject" required placeholder="e.g. Psychology"></label>
          <label class="field"><span>Class code</span><input name="group" required placeholder="e.g. 13PSY"></label>
          <label class="field"><span>Standard code</span><input name="code" required placeholder="e.g. 3.1"></label>
          <label class="field"><span>AS number <em class="xs muted">(optional)</em></span><input name="as" placeholder="e.g. 91875"></label>
          <label class="field"><span>Credits</span><input type="number" name="credits" min="1" max="30" required value="4"></label>
          <label class="field"><span>Assessment</span>
            <select name="assess"><option value="Internal">Internal</option><option value="External">External</option></select>
          </label>
        </div>
        <label class="field"><span>Title</span><input name="title" required placeholder="What the standard is called"></label>
        <div class="flex gap-3 mt-3"><button class="btn btn-primary btn-sm" type="submit">Add standard</button></div>
      </form>
    </details>

    <div class="flex gap-3 mt-5 wrap">
      <button class="btn btn-ghost btn-sm" id="reset-credits" title="Also restores any standards you have removed">Reset to my NZQA record</button>
      ${store.extraStandards().length ? `<button class="btn btn-ghost btn-sm" id="clear-extras">Remove all ${store.extraStandards().length} added standards</button>` : ''}
    </div>
  </div>`;

  return {
    html,
    onMount() {
      /* Re-render the page WITHOUT losing the reader's place, and without
         collapsing the standards library they are working in. Replacing
         #content.innerHTML scrolled them to the top and shut every <details>,
         which made adding several standards in a row genuinely unpleasant. */
      const rerender = () => {
        const y = window.scrollY;
        const openLibs = [...document.querySelectorAll('.lib-sub[open]')]
          .map(d => d.querySelector('[data-add-subject]')?.dataset.addSubject)
          .filter(Boolean);
        const area = document.getElementById('lib-area')?.value || '';
        const search = document.getElementById('lib-search')?.value || '';
        const activeId = document.activeElement?.id || '';

        const v = renderProgress();
        document.getElementById('content').innerHTML = v.html;
        v.onMount();

        // put the library back exactly as it was
        const areaEl = document.getElementById('lib-area');
        const searchEl = document.getElementById('lib-search');
        if (areaEl && area) { areaEl.value = area; }
        if (searchEl && search) { searchEl.value = search; }
        if (areaEl || searchEl) document.getElementById('lib-area')?.dispatchEvent(new Event('change'));
        openLibs.forEach(id => {
          document.querySelector(`[data-add-subject="${id}"]`)?.closest('.lib-sub')
            ?.setAttribute('open', '');
        });
        if (activeId) document.getElementById(activeId)?.focus({ preventScroll: true });
        window.scrollTo(0, y);
      };

      document.querySelectorAll('#credit-table tr[data-key]').forEach(tr => {
        const k = tr.dataset.key;
        const save = () => {
          const status = tr.querySelector('.cr-status').value;
          const grade = tr.querySelector('.cr-grade').value;
          const credits = parseInt(tr.querySelector('.cr-credits').value, 10) || 0;
          store.setCreditRecord(k, { status, grade: status === 'achieved' ? grade : '', credits });
        };
        /* Changing the status away from "graded" clears the grade. Leaving a
           stale Excellence sitting next to "Internal still to do" reads as a
           result you have actually got, and it would count if the status were
           flipped back by accident. */
        tr.querySelector('.cr-status').addEventListener('change', (e) => {
          if (e.target.value !== 'achieved') tr.querySelector('.cr-grade').value = '';
          save(); rerender();
        });
        ['.cr-grade', '.cr-credits'].forEach(sel =>
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
         as the button lower down: wire both to one handler. */
      document.getElementById('pg-reset-inline')?.addEventListener('click', () => {
        document.getElementById('reset-credits')?.click();
      });

      document.getElementById('reset-credits').addEventListener('click', () => {
        const hidden = store.hiddenStandards().length;
        const msg = hidden
          ? `Discard your edits and reset every row back to your NZQA record? This also brings back the ${hidden} standard${hidden === 1 ? '' : 's'} you removed.`
          : 'Discard your edits and reset every row back to your NZQA record?';
        if (!confirm(msg)) return;
        results.forEach(r => store.setCreditRecord(keyOf(r), null));
        /* Removing a standard is otherwise a one-way door now the restore panel
           is gone, so the reset button is the way back. */
        store.showAllStandards();
        toast('Reset to your NZQA record');
        rerender();
      });


      /* ---- standards library ------------------------------------------- */
      const area = document.getElementById('lib-area');
      const search = document.getElementById('lib-search');
      const list = document.getElementById('lib-list');

      /* Which subjects has the student already taken rows from? Used to show
         "3 of 5 added" rather than making them remember. */
      const addedKeys = new Set(store.extraStandards().map(r => `${r.group}:${r.code}`));

      const paintLib = () => {
        const q = (search.value || '').trim().toLowerCase();
        const a = area.value;
        const subjects = catalogue
          .filter(sub => !a || sub.area === a)
          .map(sub => {
            const hit = !q || sub.name.toLowerCase().includes(q)
              || sub.group.toLowerCase().includes(q)
              || sub.standards.some(st => (st.as || '').includes(q)
                  || st.code.toLowerCase().includes(q)
                  || st.title.toLowerCase().includes(q));
            return hit ? sub : null;
          })
          .filter(Boolean);

        if (!subjects.length) {
          list.innerHTML = `<p class="muted small">No subject matches “${esc(q)}”. Use <em>Add a standard by hand</em> below.</p>`;
          return;
        }

        list.innerHTML = subjects.map(sub => {
          const have = sub.standards.filter(st => addedKeys.has(`${sub.group}:${st.code}`)).length;
          const total = sub.standards.length;
          const cr = sub.standards.reduce((n, st) => n + st.credits, 0);
          return `
          <details class="lib-sub"${q ? ' open' : ''}>
            <summary>
              <span class="ls-icon" aria-hidden="true">${sub.icon}</span>
              <span class="ls-name"><strong>${esc(sub.name)}</strong><em>${sub.group} · ${total} standards · ${cr} credits</em></span>
              ${have ? `<span class="badge badge-good">${have}/${total} added</span>` : ''}
              <button class="btn btn-ghost btn-sm" data-add-subject="${sub.id}"
                      ${have === total ? 'disabled' : ''}>${have === total ? 'All added' : 'Add all'}</button>
            </summary>
            <table class="data lib-table">
              <tbody>${sub.standards.map(st => {
                const on = addedKeys.has(`${sub.group}:${st.code}`);
                return `<tr>
                  <td class="mono xs">${st.code}${st.as ? ` · AS${st.as}` : ''}</td>
                  <td>${esc(st.title)}</td>
                  <td class="mono xs" style="white-space:nowrap">${st.credits} cr · ${st.assess}</td>
                  <td style="text-align:right"><button class="btn ${on ? 'btn-ghost' : 'btn-primary'} btn-sm"
                      data-add-std="${sub.id}|${st.code}" ${on ? 'disabled' : ''}>${on ? 'Added' : 'Add'}</button></td>
                </tr>`;
              }).join('')}</tbody>
            </table>
          </details>`;
        }).join('');
      };

      const rowFor = (sub, st) => ({
        group: sub.group, subject: sub.name, code: st.code, as: st.as || '',
        title: st.title, credits: st.credits, assess: st.assess,
        status: st.assess === 'External' ? 'external' : 'todo',
        topicId: null,
      });

      area?.addEventListener('change', paintLib);
      search?.addEventListener('input', paintLib);

      list?.addEventListener('click', (e) => {
        const one = e.target.closest('[data-add-std]');
        const all = e.target.closest('[data-add-subject]');
        if (one) {
          const [subId, code] = one.dataset.addStd.split('|');
          const sub = catalogue.find(x => x.id === subId);
          const st = sub?.standards.find(x => x.code === code);
          if (!st) return;
          const res = store.addExtraStandard(rowFor(sub, st));
          toast(res.ok ? `Added ${sub.name} ${st.code}` : 'That standard is already on your record');
          rerender();
        } else if (all) {
          const sub = catalogue.find(x => x.id === all.dataset.addSubject);
          if (!sub) return;
          const res = store.addExtraStandards(sub.standards.map(st => rowFor(sub, st)));
          toast(`Added ${res.added} ${sub.name} standard${res.added === 1 ? '' : 's'}`
                + (res.skipped ? ` (${res.skipped} already there)` : ''));
          rerender();
        }
      });

      paintLib();

      /* Remove a whole subject. Works for the six taught subjects exactly as it
         does for anything added from the library. Hiding is reversible. */
      /* Remove ONE standard. Works the same whether it came from the shipped
         record or from the library: a hidden key drops it out of every total,
         and it can be put back from the "removed standards" list below. */
      document.getElementById('credit-table')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-remove-std]');
        if (!btn) return;
        const [g, c] = btn.dataset.removeStd.split('|');
        store.hideStandard(`${g}:${c}`);
        store.removeExtraStandard(g, c);
        store.setCreditRecord(`${g}:${c}`, null);
        toast(`Removed ${g} ${c}`);
        rerender();
      });


      /* Per-row remove control on the standards the student added. */
      document.getElementById('credit-table')?.addEventListener('click', (e) => {
        const rem = e.target.closest('[data-remove-std]');
        if (!rem) return;
        const [g, c] = rem.dataset.removeStd.split('|');
        store.removeExtraStandard(g, c);
        store.setCreditRecord(`${g}:${c}`, null);   // drop any edit too
        toast('Standard removed');
        rerender();
      });

      /* ---- add by hand ---- */
      document.getElementById('lib-manual')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        const row = {
          group: f.group.value.trim().toUpperCase() || 'OTHER',
          subject: f.subject.value.trim(),
          code: f.code.value.trim(),
          as: f.as.value.trim(),
          title: f.title.value.trim(),
          credits: parseInt(f.credits.value, 10) || 0,
          assess: f.assess.value,
          status: f.assess.value === 'External' ? 'external' : 'todo',
          topicId: null,
        };
        if (!row.subject || !row.code || !row.title || !row.credits) {
          toast('Subject, standard code, title and credits are all needed'); return;
        }
        const res = store.addExtraStandard(row);
        toast(res.ok ? `Added ${row.subject} ${row.code}` : 'You already have a standard with that class code and number');
        rerender();
      });

      document.getElementById('clear-extras')?.addEventListener('click', () => {
        const n = store.extraStandards().length;
        if (!confirm(`Remove all ${n} standards you added? Your own NZQA record is not touched.`)) return;
        store.extraStandards().forEach(r => store.removeExtraStandard(r.group, r.code));
        toast(`Removed ${n} added standards`);
        rerender();
      });
    },
  };
}

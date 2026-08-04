/* ============================================================================
   pages/commandwords.js: NZQA command-word glossary.
   ----------------------------------------------------------------------------
   Command words decide what an answer must DO. Getting them wrong is one of the
   commonest reasons a technically-correct answer is capped at Achieved.
   Each entry: what it demands, the grade it usually sits at, and a worked
   contrast so the difference between (say) describe and explain is concrete.
   ========================================================================== */
import { store } from '../store.js';
import { toast } from '../ui.js';
import { pageHead, sectionTabs} from './common.js';

const WORDS = [
  {
    word: 'Identify / Name / State',
    tier: 'Achieved',
    demands: 'Give a short factual answer. No reasoning required: just the correct term, value or label.',
    example: '“The functional group is a carboxylic acid.”',
    note: 'One sentence is usually enough. Don’t waste exam time explaining.',
  },
  {
    word: 'Describe',
    tier: 'Achieved',
    demands: 'Say <strong>what</strong> happens, or what something is like. Add detail and characteristics, but you do <em>not</em> need to give reasons.',
    example: '“As light shines from one side, the shoot bends toward the light source.”',
    note: 'A description answers <em>what</em>. If you find yourself writing “because”, you’ve moved into explaining.',
  },
  {
    word: 'Explain',
    tier: 'Merit',
    demands: 'Say <strong>how</strong> or <strong>why</strong> it happens. Give the mechanism and link cause to effect.',
    example: '“Auxin moves to the shaded side of the shoot, <em>because</em> light causes it to migrate away from the lit side. Auxin promotes cell elongation, <em>so</em> cells on the shaded side grow longer, <em>which causes</em> the shoot to bend toward the light.”',
    note: 'Use connectives: because, therefore, this causes, which means, as a result. If your answer has none, you probably haven’t explained.',
  },
  {
    word: 'Discuss',
    tier: 'Merit → Excellence',
    demands: 'Explain, then consider more than one aspect, factor or viewpoint, and show how they relate.',
    example: '“Increasing temperature raises the rate, but because the forward reaction is exothermic it also lowers the equilibrium yield, so industry compromises at ~450 °C.”',
    note: 'A discussion needs at least two things in tension. Show the trade-off, don’t just list points.',
  },
  {
    word: 'Analyse',
    tier: 'Merit → Excellence',
    demands: 'Break something into its parts and examine how those parts relate or contribute to the whole.',
    example: '“The low-key lighting isolates Cobb in shadow, while the tight framing crops out the background: together they construct him as psychologically trapped.”',
    note: 'Analysis = parts + relationship. Naming techniques without linking them is only description.',
  },
  {
    word: 'Compare / Contrast',
    tier: 'Merit',
    demands: 'Give the similarities <em>and</em>/or differences <strong>side by side</strong>, on the same criteria.',
    example: '“A taxis is directional. The animal moves toward or away from the stimulus. A kinesis is non-directional: only the <em>rate</em> of movement changes. Both, however, end with the animal in a more favourable environment.”',
    note: 'Use comparative language (whereas, in contrast, both, however). Two separate paragraphs that never touch is NOT a comparison.',
  },
  {
    word: 'Evaluate',
    tier: 'Excellence',
    demands: 'Judge the worth, strength or significance of something: and <strong>justify the judgement</strong> with evidence. Usually means weighing strengths against weaknesses and reaching a conclusion.',
    example: '“The claim is not justified. Because this was an observational study, a lurking variable such as household income could explain both variables, so a causal conclusion cannot be drawn from this data.”',
    note: 'An evaluation must reach a <em>verdict</em>. Listing pros and cons without concluding stops short of Excellence.',
  },
  {
    word: 'Justify',
    tier: 'Excellence',
    demands: 'Give reasons and <strong>evidence</strong> supporting a choice or conclusion, and say why alternatives are weaker.',
    example: '“Phenolphthalein is the correct indicator because the equivalence point is basic (pH ≈ 8.8), which falls inside its 8.3–10 range. Methyl orange would change colour far too early, at pH 3–4.”',
    note: 'Justify = defend a decision. Always link back to the specific data or context in the question.',
  },
  {
    word: 'Assess',
    tier: 'Excellence',
    demands: 'Weigh up the importance or impact of something, considering multiple factors, and state an overall judgement.',
    example: '“Bipedalism was the more significant adaptation: it freed the hands, which enabled tool use, which in turn drove the selection pressure for the larger brain seen later.”',
    note: 'Very close to evaluate. The key move is prioritising or ranking, with a reason.',
  },
  {
    word: 'Elaborate / Fully explain',
    tier: 'Excellence',
    demands: 'Take your explanation further. Add depth, extra links, quantitative support, or wider consequences.',
    example: '“…and because ΔG = ΔH − TΔS, the reaction only becomes feasible above T = ΔH/ΔS = 1106 K, which is why the industrial furnace must run above ~850 °C.”',
    note: 'Usually the difference between Merit and Excellence in the sciences: same idea, taken one causal step further.',
  },
];

export function renderCommandWords() {
  const cards = WORDS.map(w => `
    <div class="cw-card">
      <div class="cw-head">
        <h3>${w.word}</h3>
        <span class="badge ${w.tier.includes('Excellence') ? 'badge-ext' : 'badge-int'}">${w.tier}</span>
      </div>
      <p class="cw-demands">${w.demands}</p>
      <div class="cw-example"><span class="cw-ex-label">What it looks like</span>${w.example}</div>
      <p class="cw-note">${w.note}</p>
    </div>`).join('');

  const html = `
  <div class="content-inner">
    ${sectionTabs('tools', 'command-words')}
    ${pageHead({
      eyebrow: 'Study skills',
      title: 'NZQA command words',
      lede: 'The verb in the question tells you what your answer must DO. Answering a “discuss” question with a description is the single most common way to lose a grade you actually knew the content for.',
    })}

    <div class="callout callout-tip">
      <div class="co-icon">✓</div><div class="co-body">
        <h4>The one-line version</h4>
        <p><strong>Describe = what. Explain = why/how. Discuss/Evaluate/Justify = why <em>and</em> so what, with a verdict.</strong>
        As a rule of thumb: Achieved verbs ask for facts, Merit verbs ask for reasons, Excellence verbs ask for judgement.</p>
      </div>
    </div>

    <div class="cw-grid">${cards}</div>

    <h2 class="mt-5 mb-3">The same content, at three different command words</h2>
    <p class="muted small mb-3">One piece of Biology content, answered three ways. Notice that only the <em>verb</em> changed.</p>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th style="width:110px">Command word</th><th>An answer that would score</th></tr></thead>
        <tbody>
          <tr><td><strong>Describe</strong><br><span class="xs muted">Achieved</span></td>
            <td>Woodlice move more quickly in dry conditions and more slowly in damp conditions, so they end up gathered in damp areas.</td></tr>
          <tr><td><strong>Explain</strong><br><span class="xs muted">Merit</span></td>
            <td>Woodlice move quickly in dry air <em>because</em> the stimulus intensity is high, and slow down in damp air. <em>As a result</em>, they spend more time in damp areas and accumulate there. This is a kinesis <em>because</em> the response is non-directional, only the rate of movement changes.</td></tr>
          <tr><td><strong>Discuss / Evaluate</strong><br><span class="xs muted">Excellence</span></td>
            <td>…all of the above, <em>plus</em>: this behaviour has clear survival value, damp conditions reduce water loss through the woodlouse’s permeable cuticle and lower desiccation risk, so individuals that respond this way survive longer and reproduce more. A kinesis is sufficient here <em>because</em> woodlice cannot detect the <em>direction</em> of humidity, so a directional taxis would not be possible; random movement plus a variable rate achieves the same outcome at lower sensory cost.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="grid grid-2 mt-5">
      <div class="callout callout-warn"><div class="co-icon">⚠</div><div class="co-body">
        <h4>Biology: where this bites hardest</h4>
        <p>Biology answers are marked on <em>depth of reasoning</em>, and the command word sets the required depth. A perfect description of a process still caps at Achieved if the question said “explain”. Two habits fix most of it: always define your key term precisely (see the Key Definitions box on each topic), and always finish with <strong>survival value</strong> when the question is about a response or adaptation.</p>
      </div></div>
      <div class="callout callout-warn"><div class="co-icon">⚠</div><div class="co-body">
        <h4>English: where this bites hardest</h4>
        <p>English externals almost always use <strong>“analyse”</strong> or <strong>“respond critically”</strong>. Both demand technique → effect → wider meaning. Retelling the plot is description and will not get past Achieved, no matter how detailed. Every paragraph should end by answering “so what?”: what the director/author achieves, and how you as viewer/reader are positioned.</p>
      </div></div>
    </div>

    <div class="callout callout-note mt-5"><div class="co-icon">ℹ</div><div class="co-body">
      <h4>Before you write anything in the exam</h4>
      <p>Circle the command word in the question. Then ask: “Am I being asked for a fact, a reason, or a judgement?” Match your answer’s shape to that. It is the cheapest mark-grab available to you.</p>
    </div></div>

    <div class="card mt-5" id="backup-panel">
      <h3 class="mb-2">Back up your data</h3>
      <p class="small muted mb-3">Everything you have entered, your name, results and grades, subjects,
        assessments and dates, flashcard boxes, quiz history, streak and flags, is stored in
        <strong>this browser only</strong>. Clearing your browsing data, switching device or a bad
        update loses it. The site is in beta, so keep a recent backup.</p>
      <div class="flex gap-3 wrap">
        <button class="btn btn-primary btn-sm" id="bk-export">Download my data</button>
        <label class="btn btn-ghost btn-sm" style="cursor:pointer;margin:0">
          Restore from file
          <input type="file" id="bk-import" accept="application/json,.json" hidden>
        </label>
      </div>
      <p class="xs muted mt-3" id="bk-status">${(() => {
        const t = store.lastBackupAt();
        if (!t) return 'No backup taken on this device yet.';
        const d = Math.floor((Date.now() - t) / 86400000);
        return `Last backup ${d === 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago'}.`;
      })()}</p>
      <p class="xs muted mt-2">Restoring <strong>replaces</strong> everything currently saved in this
        browser with the contents of the file.</p>
    </div>
</div>`;

  return {
    html,
    onMount() { wireBackupPanel(); },
  };
}

/* Exported so the dashboard's beta popup can reuse this exact implementation
   rather than carrying a second copy of the download/restore logic. */
export function wireBackupPanel() {
  const status = (msg) => {
    const st = document.getElementById('bk-status');
    if (st) st.textContent = msg;
  };

  document.getElementById('bk-export')?.addEventListener('click', () => {
    const payload = store.exportAll();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const who = (payload.profile.name || 'study-hub').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    a.download = `${who}-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    store.markBackedUp();
    status(`Downloaded ${payload.counts.keys} saved items.`);
    toast('Backup downloaded');
  });

  document.getElementById('bk-import')?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let payload;
      try { payload = JSON.parse(reader.result); }
      catch (err) { status('That file is not valid JSON.'); return; }
      if (!confirm('Restore this backup?\n\nThis REPLACES everything currently saved in this browser.')) {
        e.target.value = '';
        return;
      }
      const res = store.importAll(payload);
      status(res.ok ? `Restored ${res.keys} items: reloading…` : `Could not restore: ${res.error}`);
      /* A full reload IS right here: importAll() has just replaced the whole of
         localStorage, so every module's in-memory mirror is stale. */
      if (res.ok) setTimeout(() => location.reload(), 900);
    };
    reader.readAsText(file);
  });
}

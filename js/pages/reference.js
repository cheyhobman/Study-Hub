/* ============================================================================
   pages/reference.js — condensed, printable formula & quick-reference sheet
   per subject. Pulls from content.reference in data/content/<subject>.js.
   ========================================================================== */
import { subjectById, getSubjectContent } from '../registry.js';
import { renderBlocks, icons, mathSpan, renderMathIn } from '../ui.js';
import { crumbs, pageHead } from './common.js';

/* The official NZQA resource/formula sheets (provided in the exam). These are
   the "same one NCEA uses" — the condensed sheet below is a study companion.
   Links go to the stable NZQA subject pages where the current sheet lives. */
const OFFICIAL = {
  physics:    { has: true,  label: 'Official NZQA Physics resource booklet (formulae & constants — supplied in the exam)', url: 'https://www.nzqa.govt.nz/ncea/subjects/physics/' },
  calculus:   { has: true,  label: 'Official NZQA Level 3 Mathematics formulae & tables', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/' },
  statistics: { has: true,  label: 'Official NZQA Level 3 Mathematics formulae & tables', url: 'https://www.nzqa.govt.nz/ncea/subjects/mathematics/' },
  chemistry:  { has: true,  label: 'Official NZQA Chemistry resource (periodic table & data sheet — supplied in the exam)', url: 'https://www.nzqa.govt.nz/ncea/subjects/chemistry/' },
  biology:    { has: false, label: 'Biology has no formula sheet — this is a concept study aid.', url: 'https://www.nzqa.govt.nz/ncea/subjects/biology/' },
  english:    { has: false, label: 'English has no formula sheet — this is a technique/criteria study aid.', url: 'https://www.nzqa.govt.nz/ncea/subjects/english/' },
};

export async function renderReference(subjectId) {
  const s = subjectById[subjectId];
  if (!s) return { html: `<div class="content-inner"><div class="placeholder"><div class="ph-icon">🤔</div><h3>Not found</h3></div></div>` };

  const content = await getSubjectContent(subjectId);
  const ref = content && content.reference;

  let sheet;
  if (ref && ref.groups && ref.groups.length) {
    sheet = `
      ${ref.intro ? `<p class="lede mb-5 no-print">${ref.intro}</p>` : ''}
      <div class="print-columns">
        ${ref.groups.map(g => `
          <div class="mb-5" style="break-inside:avoid">
            <h3 style="border-bottom:2px solid var(--accent);padding-bottom:6px;margin-bottom:12px;">${g.title}</h3>
            ${g.blocks ? renderBlocks(g.blocks) : ''}
            ${g.items ? `<div class="formula-list">${g.items.map(f => `
              <div class="formula-item">
                <div class="fi-name">${f.name}</div>
                <div class="fi-eq">${f.tex ? mathSpan(f.tex, { isTex: true, big: true }) : mathSpan(f.eq, { big: true })}</div>
                ${f.note ? `<div class="fi-note">${f.note}</div>` : ''}
              </div>`).join('')}</div>` : ''}
          </div>`).join('')}
      </div>`;
  } else {
    sheet = `<div class="placeholder no-print">
      <div class="ph-icon">📄</div>
      <h3>Reference sheet coming soon</h3>
      <p>Key formulas and quick-reference tables for ${s.name} will collect here — condensed and print-friendly.</p>
    </div>`;
  }

  const html = `
  <div class="content-inner">
    <div class="no-print">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: s.name, href: `#/subject/${s.id}` }, { label: 'Reference sheet' }])}
      <div class="flex items-center wrap gap-3" style="justify-content:space-between">
        ${pageHead({ eyebrow: `${s.icon} ${s.name}`, title: `${s.name} — quick reference`, lede: '' }).replace('</header>', '')}
        <button class="btn btn-primary no-print" id="btn-print" style="align-self:flex-start">🖨 Print sheet</button>
      </div></header>
      <p class="print-hint mb-3">Tip: this page is styled for printing — hit print (or ⌘P) for a clean, chrome-free sheet.</p>
      ${(() => { const o = OFFICIAL[s.id]; if (!o) return ''; return `
        <a class="linkrow no-print mb-5" href="${o.url}" target="_blank" rel="noopener" style="display:flex">
          <span class="lr-icon">${icons.doc}</span>
          <span class="lr-main"><span class="lr-label">${o.has ? '📄 ' + o.label : o.label}</span>
          <span class="lr-note">Opens the official NZQA subject page${o.has ? ' — download the current resource/formula sheet there' : ''}</span></span>
          <span class="lr-ext">${icons.ext}</span>
        </a>`; })()}
    </div>

    <div class="print-title">
      <strong style="font-family:var(--font-display);font-size:1.4rem;">${s.name} — Formula &amp; Reference Sheet</strong>
      <span style="float:right;color:#555;font-size:0.85rem;">NCEA L3 · Study Hub</span>
    </div>

    ${sheet}
  </div>`;

  return {
    html,
    onMount() {
      const b = document.getElementById('btn-print');
      b && b.addEventListener('click', () => window.print());
      renderMathIn(document.getElementById('content'));
    },
  };
}

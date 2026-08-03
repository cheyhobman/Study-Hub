/* ============================================================================
   math.js — all mathematical / chemical notation goes through KaTeX.
   ----------------------------------------------------------------------------
   Content files write equations in a readable "near-plain-text" form (e.g.
   'a = v² / r' or 'ΔG = ΔH − TΔS'). This module converts that to LaTeX and
   hands it to KaTeX, so nothing is typeset with HTML/CSS tricks.

   Two ways to author an equation in a content file:
     { name: 'Centripetal', eq: 'a = v² / r' }              ← auto-converted
     { name: 'Redox',       tex: '\\ce{MnO4^- + 8H+ + 5e- -> Mn^2+ + 4H2O}' }
                                                            ← explicit LaTeX
   `tex` always wins, and is the right choice for anything the converter
   would get wrong (chemistry with mhchem, big fractions, matrices…).
   ========================================================================== */

/* ---- Unicode → LaTeX lookup tables ------------------------------------- */
const SUPER = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9',
                '⁺':'+','⁻':'-','⁼':'=','⁽':'(','⁾':')','ⁿ':'n','ⁱ':'i','ᵏ':'k','ˣ':'x','ʸ':'y','ᵐ':'m' };
const SUB   = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9',
                '₊':'+','₋':'-','₍':'(','₎':')','ₙ':'n','ₐ':'a','ₑ':'e','ₒ':'o','ₓ':'x','ₕ':'h',
                'ₖ':'k','ₗ':'l','ₘ':'m','ₚ':'p','ₛ':'s','ₜ':'t','ᵣ':'r','ᵥ':'v','ᵢ':'i','ⱼ':'j','ᶜ':'c' };

const SYMBOLS = [
  // multi-char first
  ['⟶', '\\longrightarrow '], ['⟵', '\\longleftarrow '], ['⟹', '\\implies '], ['⟸', '\\impliedby '],
  ['⇌', '\\rightleftharpoons '], ['⇒', '\\Rightarrow '], ['↔', '\\leftrightarrow '],
  ['→', '\\rightarrow '], ['←', '\\leftarrow '], ['≈', '\\approx '], ['≠', '\\neq '],
  ['≤', '\\le '], ['≥', '\\ge '], ['±', '\\pm '], ['∓', '\\mp '], ['×', '\\times '], ['÷', '\\div '],
  ['·', '\\cdot '], ['∝', '\\propto '], ['∞', '\\infty '], ['∴', '\\therefore '],
  ['∑', '\\sum '], ['Σ', '\\Sigma '], ['∫', '\\int '], ['∂', '\\partial '], ['∆', '\\Delta '],
  ['°', '^{\\circ}'], ['′', "'"], ['″', "''"], ['∎', '\\blacksquare '],
  ['⩽', '\\le '], ['⩾', '\\ge '], ['≡', '\\equiv '], ['∈', '\\in '],
  // Greek
  ['Δ','\\Delta '], ['Ω','\\Omega '], ['Φ','\\Phi '], ['Ψ','\\Psi '], ['Λ','\\Lambda '], ['Θ','\\Theta '],
  ['α','\\alpha '], ['β','\\beta '], ['γ','\\gamma '], ['δ','\\delta '], ['ε','\\varepsilon '],
  ['ζ','\\zeta '], ['η','\\eta '], ['θ','\\theta '], ['κ','\\kappa '], ['λ','\\lambda '],
  ['μ','\\mu '], ['ν','\\nu '], ['ξ','\\xi '], ['π','\\pi '], ['ρ','\\rho '],
  ['σ','\\sigma '], ['τ','\\tau '], ['υ','\\upsilon '], ['φ','\\phi '], ['χ','\\chi '],
  ['ψ','\\psi '], ['ω','\\omega '],
  // misc text
  ['−', '-'], ['–', '-'], ['—', '-'], ['⁄', '/'],
];

/* Characters that must be escaped so KaTeX doesn't choke on them. */
function escapeText(t) {
  return t.replace(/%/g, '\\%').replace(/&/g, '\\&').replace(/#/g, '\\#');
}

/**
 * Convert a readable equation string into LaTeX.
 * Handles: Unicode super/subscripts, HTML <sub>/<sup>, √(...), a/b fractions,
 * Greek letters, arrows and comparison operators.
 */
export function texify(input) {
  if (input == null) return '';
  let s = String(input);

  // 1. HTML sub/sup tags → LaTeX
  s = s.replace(/<sub>(.*?)<\/sub>/gi, (_, g) => `_{${g}}`)
       .replace(/<sup>(.*?)<\/sup>/gi, (_, g) => `^{${g}}`)
       .replace(/<\/?(strong|em|b|i|span)[^>]*>/gi, '');

  // 2. Runs of Unicode superscripts / subscripts → ^{...} / _{...}
  const superRe = new RegExp('[' + Object.keys(SUPER).join('') + ']+', 'g');
  const subRe = new RegExp('[' + Object.keys(SUB).join('') + ']+', 'g');
  s = s.replace(superRe, m => '^{' + [...m].map(c => SUPER[c]).join('') + '}')
       .replace(subRe,  m => '_{' + [...m].map(c => SUB[c]).join('') + '}');

  // 3. √(...) and √x → \sqrt{...}
  s = s.replace(/√\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, g) => `\\sqrt{${g}}`)
       .replace(/√\s*([A-Za-z0-9_^{}\\]+)/g, (_, g) => `\\sqrt{${g}}`);
  // cube roots written ∛
  s = s.replace(/∛\(([^()]*)\)/g, (_, g) => `\\sqrt[3]{${g}}`);

  // 3b. Combining diacritics: z̄ (macron) → \bar{z}, v⃗ (arrow) → \vec{v}
  s = s.replace(/([A-Za-z])\u0304/g, (_, c) => `\\bar{${c}}`)
       .replace(/([A-Za-z])\u20D7/g, (_, c) => `\\vec{${c}}`)
       .replace(/([A-Za-z])\u0302/g, (_, c) => `\\hat{${c}}`);

  // 4. Symbols & Greek
  for (const [from, to] of SYMBOLS) s = s.split(from).join(to);

  // 5. NOTE: we deliberately do NOT auto-convert a/b into \frac{}{}.
  //    Working out which side of a '/' the numerator ends is ambiguous, and a
  //    wrong fraction is far worse than an inline solidus. Equations that
  //    genuinely need a built-up fraction carry an explicit `tex:` field.

  // 6. Common function names get upright treatment
  s = s.replace(/\b(sin|cos|tan|sec|cosec|cot|ln|log|exp|max|min)\b/g, '\\$1 ');
  // KaTeX has no \cosec — use \operatorname
  s = s.replace(/\\cosec\s?/g, '\\operatorname{cosec}');
  // cis isn't a LaTeX operator either
  s = s.replace(/\bcis\b/g, '\\operatorname{cis}');

  // 7. Multi-letter variable names shouldn't be italicised letter-by-letter
  s = s.replace(/\b(pH|pOH|pKa|pKb|Ka|Kb|Kw|Ks|RMS|rms|emf|EMF)\b/g, '\\mathrm{$1}');

  return escapeText(s).trim();
}

/* ---- Rendering ---------------------------------------------------------- */
let warned = false;

/** Render one element's LaTeX (from data-tex) in place. */
function renderOne(el) {
  const tex = el.getAttribute('data-tex');
  if (!tex) return;
  try {
    window.katex.render(tex, el, {
      throwOnError: false,
      displayMode: el.dataset.display === 'block',
      trust: true,
      strict: false,
    });
    el.classList.add('is-rendered');
  } catch (e) {
    // Leave the readable fallback text in place rather than showing nothing
    el.classList.add('math-fallback');
  }
}

/**
 * Typeset every `.math` element inside `root`. Safe to call repeatedly.
 * Waits for KaTeX if the CDN script hasn't finished loading yet.
 */
export function renderMathIn(root = document) {
  const nodes = root.querySelectorAll('.math:not(.is-rendered)');
  if (!nodes.length) return;

  if (!window.katex) {
    if (!warned) { warned = true; }
    // KaTeX is deferred — retry shortly, then give up gracefully.
    let tries = 0;
    const wait = setInterval(() => {
      if (window.katex) { clearInterval(wait); nodes.forEach(renderOne); }
      else if (++tries > 40) { clearInterval(wait); }
    }, 100);
    return;
  }
  nodes.forEach(renderOne);
}

/**
 * Build an inline math span. `src` is either explicit LaTeX (when `isTex`)
 * or a readable string to be converted. The element keeps the original text
 * as fallback content so it stays legible if KaTeX fails to load.
 */
export function mathSpan(src, { isTex = false, display = false, cls = '', big = false } = {}) {
  let tex = isTex ? src : texify(src);
  // `big` renders fractions/integrals at full display size while staying inline
  if (big) tex = '\\displaystyle ' + tex;
  const fallback = String(src).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  return `<span class="math ${cls}" data-tex="${tex.replace(/"/g, '&quot;')}"${display ? ' data-display="block"' : ''}>${fallback}</span>`;
}

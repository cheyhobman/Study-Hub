/* ============================================================================
   chemistry/mechanisms-svg.js: curly-arrow mechanism diagrams.
   ----------------------------------------------------------------------------
   These are drawn properly, not decoratively:
     • Every curly arrow STARTS at a real electron source, either a lone pair
       (drawn as two dots) or the midpoint of a bond (drawn as a real line).
     • Every arrow ENDS at the atom/bond where the new bond forms, or at the
       atom that takes the electrons.
     • Arrowheads use an SVG <marker> with orient="auto", so the head always
       points along the curve's true tangent (the old hand-placed polygons
       could point the wrong way).
     • Colours use CSS variables, so they adapt to light/dark mode.

   Each mechanism is exported as an HTML string used by a `figure` block.
   ========================================================================== */

/* Shared <defs>: an auto-orienting arrowhead. `id` must be unique per diagram
   because all three diagrams live on the same page. */
const defs = (id) => `
  <defs>
    <marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--bad)"/>
    </marker>
  </defs>`;

/* Common styling for every mechanism diagram. */
const style = `
  <style>
    .atom  { fill: currentColor; stroke: none; font-size: 17px; font-family: var(--font-mono); }
    .sub   { fill: currentColor; stroke: none; font-size: 12px; font-family: var(--font-mono); }
    .note  { fill: var(--muted); stroke: none; font-size: 12px; font-family: var(--font-body); }
    .step  { fill: var(--accent); stroke: none; font-size: 11px; font-weight: 700; font-family: var(--font-body); }
    .bond  { stroke: currentColor; stroke-width: 1.6; fill: none; }
    .lp    { fill: currentColor; stroke: none; }          /* lone-pair dots */
    .arrow { stroke: var(--bad); stroke-width: 1.8; fill: none; }
    .rxn   { fill: currentColor; stroke: none; font-size: 20px; }
  </style>`;

/* ---------------------------------------------------------------- SN2 ---- */
/* HO⁻ attacks CH₃Br from the side opposite Br; C–Br breaks as O–C forms. */
export const SN2_SVG = `
<svg viewBox="0 0 760 210" width="100%" style="max-width:760px" role="img"
     aria-label="SN2 mechanism: hydroxide attacks bromomethane, bromide leaves">
  ${defs('ah-sn2')}${style}

  <!-- ============ REACTANTS ============ -->
  <text class="atom" x="34" y="118">HO</text>
  <text class="sub"  x="72" y="106">−</text>
  <!-- lone pair on the oxygen (the electron source for arrow 1) -->
  <circle class="lp" cx="40" cy="96" r="2.6"/>
  <circle class="lp" cx="50" cy="96" r="2.6"/>

  <!-- the electrophilic carbon + its H's -->
  <text class="atom" x="196" y="118">C</text>
  <text class="sub"  x="192" y="99">H₃</text>
  <text class="sub"  x="186" y="137">δ+</text>

  <!-- the C–Br bond drawn as a REAL line (electron source for arrow 2) -->
  <line class="bond" x1="216" y1="112" x2="268" y2="112"/>
  <text class="atom" x="274" y="118">Br</text>
  <text class="sub"  x="276" y="137">δ−</text>

  <!-- ARROW 1: from the oxygen LONE PAIR to the carbon (new bond forms) -->
  <path class="arrow" d="M 47 88 Q 120 44 190 100" marker-end="url(#ah-sn2)"/>
  <text class="step" x="86" y="42">① lone pair → C</text>

  <!-- ARROW 2: from the MIDPOINT OF THE C–Br BOND to Br (bond breaks) -->
  <path class="arrow" d="M 242 106 Q 258 74 282 92" marker-end="url(#ah-sn2)"/>
  <text class="step" x="246" y="66">② C–Br bond → Br</text>

  <text class="rxn" x="330" y="118">⟶</text>

  <!-- ============ TRANSITION STATE ============ -->
  <text class="atom" x="378" y="112">[ HO</text>
  <text class="atom" x="434" y="112">⋯</text>
  <text class="atom" x="454" y="112">C</text>
  <text class="atom" x="474" y="112">⋯</text>
  <text class="atom" x="494" y="112">Br ]</text>
  <text class="sub"  x="536" y="100">‡</text>
  <text class="sub"  x="386" y="92">δ−</text>
  <text class="sub"  x="496" y="92">δ−</text>
  <text class="note" x="378" y="140">one concerted step</text>
  <text class="note" x="378" y="158">backside attack ⟹ inversion</text>

  <text class="rxn" x="570" y="118">⟶</text>

  <!-- ============ PRODUCTS ============ -->
  <text class="atom" x="616" y="118">CH₃OH</text>
  <text class="atom" x="700" y="118">+ Br</text>
  <text class="sub"  x="742" y="106">−</text>
  <text class="note" x="616" y="140">methanol</text>
</svg>`;

/* -------------------------------------------------- ELECTROPHILIC ADDITION */
/* Ethene + HBr. The C=C π bond is the nucleophile; it attacks the δ+ H. */
export const ADDITION_SVG = `
<svg viewBox="0 0 760 230" width="100%" style="max-width:760px" role="img"
     aria-label="Electrophilic addition: ethene plus HBr via a carbocation">
  ${defs('ah-add')}${style}

  <!-- ============ STEP 1 ============ -->
  <text class="atom" x="26" y="126">H₂C</text>
  <!-- the C=C double bond: the LOWER line is the π bond (electron source) -->
  <line class="bond" x1="76" y1="114" x2="122" y2="114"/>
  <line class="bond" x1="76" y1="124" x2="122" y2="124"/>
  <text class="atom" x="126" y="126">CH₂</text>
  <text class="note" x="72" y="150">π bond = nucleophile</text>

  <!-- H–Br with a real bond line + partial charges -->
  <text class="atom" x="252" y="126">H</text>
  <line class="bond" x1="270" y1="120" x2="300" y2="120"/>
  <text class="atom" x="304" y="126">Br</text>
  <text class="sub"  x="250" y="145">δ+</text>
  <text class="sub"  x="306" y="145">δ−</text>

  <!-- ARROW 1: from the π BOND (midpoint) to the δ+ hydrogen -->
  <path class="arrow" d="M 99 108 Q 175 56 250 108" marker-end="url(#ah-add)"/>
  <text class="step" x="120" y="48">① π electrons → H</text>

  <!-- ARROW 2: from the H–Br BOND to Br (heterolysis) -->
  <path class="arrow" d="M 285 114 Q 302 84 320 100" marker-end="url(#ah-add)"/>
  <text class="step" x="288" y="76">② H–Br → Br</text>

  <text class="rxn" x="366" y="126">⟶</text>

  <!-- ============ INTERMEDIATE ============ -->
  <text class="atom" x="410" y="118">CH₃, CH₂</text>
  <text class="sub"  x="504" y="106">+</text>
  <text class="atom" x="410" y="150">+  Br</text>
  <text class="sub"  x="462" y="138">−</text>
  <!-- lone pair on bromide: the source for step 3 -->
  <circle class="lp" cx="446" cy="158" r="2.6"/>
  <circle class="lp" cx="456" cy="158" r="2.6"/>
  <text class="note" x="410" y="182">carbocation intermediate</text>

  <!-- ARROW 3: bromide LONE PAIR attacks the carbocation carbon -->
  <path class="arrow" d="M 452 166 Q 500 184 512 124" marker-end="url(#ah-add)"/>
  <text class="step" x="470" y="198">③ Br⁻ lone pair → C⁺</text>

  <text class="rxn" x="590" y="126">⟶</text>

  <!-- ============ PRODUCT ============ -->
  <text class="atom" x="634" y="126">CH₃CH₂Br</text>
  <text class="note" x="634" y="148">bromoethane</text>
</svg>`;

/* ------------------------------------------------------------ ELIMINATION */
/* Bromoethane + ethanolic OH⁻. Base removes a β-H; those electrons form C=C
   as Br⁻ leaves. Three arrows, in a chain. */
export const ELIM_SVG = `
<svg viewBox="0 0 760 240" width="100%" style="max-width:760px" role="img"
     aria-label="Elimination: bromoethane plus ethanolic hydroxide gives ethene">
  ${defs('ah-elim')}${style}

  <!-- base with its lone pair -->
  <text class="atom" x="30" y="140">HO</text>
  <text class="sub"  x="68" y="128">−</text>
  <circle class="lp" cx="36" cy="118" r="2.6"/>
  <circle class="lp" cx="46" cy="118" r="2.6"/>

  <!-- the substrate: H–C–C–Br with real bonds -->
  <text class="atom" x="150" y="140">H</text>
  <line class="bond" x1="168" y1="134" x2="196" y2="134"/>   <!-- C–H (β) -->
  <text class="atom" x="200" y="140">CH₂</text>
  <line class="bond" x1="248" y1="134" x2="276" y2="134"/>   <!-- C–C -->
  <text class="atom" x="280" y="140">CH₂</text>
  <line class="bond" x1="328" y1="134" x2="356" y2="134"/>   <!-- C–Br -->
  <text class="atom" x="360" y="140">Br</text>
  <text class="sub"  x="150" y="160">β-H</text>

  <!-- ARROW 1: base LONE PAIR grabs the β-hydrogen -->
  <path class="arrow" d="M 43 110 Q 95 66 148 122" marker-end="url(#ah-elim)"/>
  <text class="step" x="52" y="56">① base lone pair → β-H</text>

  <!-- ARROW 2: the C–H BOND electrons swing down to form the new C=C -->
  <path class="arrow" d="M 182 128 Q 218 92 258 126" marker-end="url(#ah-elim)"/>
  <text class="step" x="176" y="76">② C–H bond → new C=C</text>

  <!-- ARROW 3: the C–Br BOND electrons leave with the bromide -->
  <path class="arrow" d="M 342 128 Q 356 98 372 110" marker-end="url(#ah-elim)"/>
  <text class="step" x="322" y="80">③ C–Br → Br⁻</text>

  <text class="rxn" x="424" y="140">⟶</text>

  <!-- products -->
  <text class="atom" x="474" y="140">CH₂</text>
  <line class="bond" x1="522" y1="134" x2="552" y2="134"/>
  <line class="bond" x1="522" y1="144" x2="552" y2="144"/>
  <text class="atom" x="556" y="140">CH₂</text>
  <text class="atom" x="628" y="140">+ H₂O + Br</text>
  <text class="sub"  x="742" y="128">−</text>
  <text class="note" x="474" y="166">ethene (alkene)</text>
  <text class="note" x="474" y="192">All three arrows happen together (E2, one step).</text>
</svg>`;

/* A small legend used under the first mechanism, explaining the convention. */
export const ARROW_LEGEND = `
<svg viewBox="0 0 700 60" width="100%" style="max-width:700px" role="img" aria-label="Curly arrow legend">
  ${defs('ah-leg')}${style}
  <circle class="lp" cx="24" cy="28" r="2.6"/>
  <circle class="lp" cx="34" cy="28" r="2.6"/>
  <text class="note" x="46" y="33">= a lone pair (2 electrons)</text>
  <line class="bond" x1="236" y1="28" x2="272" y2="28"/>
  <text class="note" x="280" y="33">= a bond (2 electrons)</text>
  <path class="arrow" d="M 452 40 Q 484 8 516 34" marker-end="url(#ah-leg)"/>
  <text class="note" x="524" y="33">= that pair moves</text>
</svg>`;

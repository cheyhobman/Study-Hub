/* ============================================================================
   Chemistry: condensed formula & quick-reference sheet (printable)
   Consumed by pages/reference.js. Each group is either { items:[formulas] }
   or { blocks:[content blocks] }.
   ========================================================================== */
export default {
  intro: 'Everything condensed for last-minute revision. Hit print (⌘P) for a clean two-column sheet.',
  groups: [
    {
      title: 'Thermochemistry (91390)',
      items: [
        { name: 'Enthalpy from bonds', eq: 'ΔH = Σ(bonds broken) − Σ(bonds formed)' },
        { name: 'Hess (formation)', eq: 'ΔH<sub>r</sub>° = ΣΔH<sub>f</sub>°(products) − ΣΔH<sub>f</sub>°(reactants)' },
        { name: 'Gibbs free energy', eq: 'ΔG = ΔH − TΔS   (feasible if ΔG < 0)' },
        { name: 'Change-over temperature', eq: 'T = ΔH / ΔS   (ΔG = 0). Convert ΔS J→kJ!', tex: 'T=\\frac{\\Delta H}{\\Delta S}\\quad(\\Delta G=0)' },
      ],
    },
    {
      title: 'Aqueous equilibria (91392)',
      items: [
        { name: 'Water', eq: 'K<sub>w</sub> = [H⁺][OH⁻] = 1.0×10⁻¹⁴' },
        { name: 'pH', eq: 'pH = −log[H⁺] ; pH + pOH = 14' },
        { name: 'Weak acid', eq: 'K<sub>a</sub> = [H⁺][A⁻]/[HA] ; [H⁺] = √(K<sub>a</sub>·c)', tex: 'K_a=\\frac{[\\ce{H+}][\\ce{A-}]}{[\\ce{HA}]}\\qquad [\\ce{H+}]=\\sqrt{K_a c}' },
        { name: 'Buffer', eq: 'pH = pK<sub>a</sub> + log([A⁻]/[HA])', tex: '\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{[\\ce{A-}]}{[\\ce{HA}]}' },
        { name: 'Solubility product', eq: 'K<sub>s</sub> = [Aⁿ⁺]ˣ[Bᵐ⁻]ʸ ; precipitate if Q > K<sub>s</sub>' },
      ],
    },
    {
      title: 'Redox (91393)',
      items: [
        { name: 'Cell potential', eq: 'E°<sub>cell</sub> = E°<sub>cathode</sub> − E°<sub>anode</sub>  (>0 = spontaneous)' },
        { name: 'Half-equation (acid)', eq: 'balance atom → O with H₂O → H with H⁺ → charge with e⁻' },
        { name: 'OIL RIG', eq: 'Oxidation Is Loss, Reduction Is Gain (of e⁻)' },
      ],
    },
    {
      title: 'Organic: naming & conditions (91391)',
      blocks: [
        { t: 'table', mono: true, headers: ['Group', 'Suffix/prefix'], rows: [
          ['carboxylic acid', '-oic acid'], ['ester', '-yl -oate'], ['amide', '-amide'],
          ['nitrile', '-nitrile'], ['aldehyde', '-al'], ['ketone', '-one'],
          ['alcohol', '-ol'], ['amine', '-amine/amino'], ['alkene', '-ene'], ['haloalkane', 'halo-'],
        ]},
        { t: 'table', mono: true, headers: ['Transformation', 'Reagent / conditions'], rows: [
          ['alkene → alcohol', 'H₂O, H⁺'],
          ['alcohol → alkene', 'conc H₂SO₄, Δ'],
          ['haloalkane → alcohol', 'NaOH(aq), warm'],
          ['haloalkane → nitrile', 'KCN / ethanol'],
          ['haloalkane → alkene', 'KOH / ethanol, Δ'],
          ['1° alcohol → aldehyde', 'K₂Cr₂O₇/H⁺, distil'],
          ['aldehyde → acid', 'K₂Cr₂O₇/H⁺, reflux'],
          ['2° alcohol → ketone', 'K₂Cr₂O₇/H⁺, reflux'],
          ['nitrile → amine', 'H₂/Ni'],
          ['acid + alcohol → ester', 'conc H₂SO₄'],
        ]},
      ],
    },
    {
      title: 'Spectroscopy: IR (91388)',
      blocks: [
        /* Ranges taken from the AS91388 data sheet so this sheet and the
           teaching page can never disagree. C≡N is not on that data sheet
           and nitriles are not in the standard's scope, so it is not listed. */
        { t: 'table', mono: true, headers: ['Bond', 'cm⁻¹'], rows: [
          ['O–H alcohol', '3200–3550 broad'], ['O–H acid', '2500–3300 v.broad'],
          ['N–H amine/amide', '3300–3500 (amide = 2 peaks)'], ['C–H alkane', '2850–3000'],
          ['C=O acid chloride', '1785–1815'], ['C=O ester', '1735–1750'],
          ['C=O aldehyde', '1720–1740'], ['C=O ketone', '1710–1720'],
          ['C=O acid', '1705–1720'], ['C=O amide', '1630–1695'],
          ['C=C alkene', '1630–1680'], ['C–O', '1000–1300'],
          ['C–N', '1000–1250'], ['C–Cl', '600–800'], ['C–Br', '500–600'],
        ]},
      ],
    },
    {
      title: 'Spectroscopy: ¹³C NMR & MS (91388)',
      blocks: [
        /* The "student NMR table". This is the exact table handed out in the
           assessment. AS91388 uses ¹³C only; there is no ¹H NMR in the standard,
           so no ¹H shift table and no n+1 rule appear here. */
        { t: 'table', mono: true, headers: ['¹³C δ (ppm)', 'Carbons in this region'], rows: [
          ['0–15', 'CH₃CH₂–'], ['15–30', 'CH₃–'], ['20–35', '–CH₂–'],
          ['30–60', 'C–N, C–Cl, C–Br, C–C=O'], ['50–70', 'C–O'], ['60–90', 'C≡C'],
          ['100–150', 'C=C'],
          ['160–185', 'C=O in acids, esters, acyl chlorides, amides'],
          ['180–220', 'C=O in aldehydes and ketones'],
        ]},
        { t: 'table', mono: true, headers: ['Fragment m/z', 'Ion'], rows: [
          ['15', 'CH₃⁺'], ['17', 'OH⁺'], ['28', 'CO⁺'], ['29', 'CH₃CH₂⁺ / CHO⁺'],
          ['30', 'CH₂NH₂⁺'], ['31', 'CH₃O⁺ / CH₂OH⁺'], ['43', 'C₃H₇⁺ / CH₃CO⁺'],
          ['44', 'CONH₂⁺'], ['45', 'COOH⁺ / CH₃CHOH⁺ / CH₃CH₂O⁺'], ['57', 'C₄H₉⁺'],
        ]},
        { t: 'table', mono: true, headers: ['Mass lost', 'Group', 'Indicates'], rows: [
          ['1', 'H', '–COOH / –CHO / –NH– / sometimes –OH'], ['15', 'CH₃', '–CH₃'],
          ['17', 'OH', '–COOH / –OH'], ['18', 'H₂O', '–OH (alcohol)'],
          ['29', 'CH₃CH₂ or CHO', '–CH₂CH₃ / –CHO'], ['43', 'CH₃CO', 'CH₃CO–'],
        ]},
        { t: 'html', html: '<p class="xs muted">Cl → M:M+2 ≈ 3:1 · Br → ≈ 1:1 · I → mass 127 (and HI⁺ 128) · odd M⁺ → odd number of N · ¹³C isotope peak = M+1, ignore it · CDCl₃ solvent peak at 77.0, ignore it. H=1, C=12, N=14, O=16, Cl=35.5, Br=80.</p>' },
      ],
    },
  ],
};

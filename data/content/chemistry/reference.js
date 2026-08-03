/* ============================================================================
   Chemistry — condensed formula & quick-reference sheet (printable)
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
      title: 'Organic — naming & conditions (91391)',
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
      title: 'Spectroscopy — IR (91388)',
      blocks: [
        { t: 'table', mono: true, headers: ['Bond', 'cm⁻¹'], rows: [
          ['O–H alcohol', '3200–3550 broad'], ['O–H acid', '2500–3300 v.broad'],
          ['N–H', '3300–3500'], ['C–H', '2850–3100'], ['C≡N', '2200–2260'],
          ['C=O', '1670–1750'], ['C=C', '1620–1680'], ['C–O', '1000–1300'],
        ]},
      ],
    },
    {
      title: 'Spectroscopy — NMR & MS (91388)',
      blocks: [
        { t: 'table', mono: true, headers: ['¹H δ (ppm)', 'Environment'], rows: [
          ['0.8–1.2', 'R–CH₃'], ['2.0–2.6', 'CH₃CO–'], ['3.3–4.5', 'CH–O'],
          ['4.5–6.5', '=C–H'], ['9.4–10', '–CHO'], ['2–12', 'OH/COOH'],
        ]},
        { t: 'table', mono: true, headers: ['Mass lost', 'Group'], rows: [
          ['15', 'CH₃'], ['17', 'OH'], ['18', 'H₂O'], ['29', 'CHO/C₂H₅'], ['45', 'COOH'],
        ]},
        { t: 'html', html: '<p class="xs muted">n+1 rule: n neighbours → n+1 peaks. Cl → M:M+2 ≈ 3:1; Br → ≈ 1:1. Odd M⁺ → N present.</p>' },
      ],
    },
  ],
};

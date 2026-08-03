/* ============================================================================
   Chemistry — content module (PRIORITY SUBJECT, built in most depth).
   ----------------------------------------------------------------------------
   Each standard's teaching content lives in its own file under chemistry/ so
   they're easy to find and edit. This file just wires topicId → content.
   Topic ids match data/subjects.js.
   ========================================================================== */
import thermochemistry from './chemistry/thermochemistry.js';
import organic from './chemistry/organic.js';
import equilibrium from './chemistry/equilibrium.js';
import spectroscopy from './chemistry/spectroscopy.js';
import quantitative from './chemistry/quantitative.js';
import redox from './chemistry/redox.js';
import reference from './chemistry/reference.js';

export default {
  topics: {
    'chem-91390': thermochemistry, // Thermochemical principles (External)
    'chem-91391': organic,         // Organic compounds (External) ★
    'chem-91392': equilibrium,     // Aqueous equilibria (External)
    'chem-91388': spectroscopy,    // Spectroscopic data (Internal) ★
    'chem-91387': quantitative,    // Quantitative analysis (Internal)
    'chem-91393': redox,           // Oxidation-reduction (Internal)
  },
  reference,
};

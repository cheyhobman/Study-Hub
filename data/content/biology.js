/* ============================================================================
   Biology: content module. Standards verified vs NZQA (2026), 31 Jul 2026.
   ========================================================================== */
import responses from './biology/responses.js';
import evolution from './biology/evolution.js';
import humanEvolution from './biology/human-evolution.js';
import socioscientific from './biology/socioscientific.js';
import reference from './biology/reference.js';

export default {
  topics: {
    'bio-91603': responses,       // Responses to external environment (External, 5cr)
    'bio-91605': evolution,       // Evolutionary processes → speciation (External, 4cr)
    'bio-91606': humanEvolution,  // Trends in human evolution (External, 4cr)
    'bio-91602': socioscientific, // Socio-scientific issue (Internal, 3cr)
  },
  reference,
};

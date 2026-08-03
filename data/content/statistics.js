/* ============================================================================
   Statistics: content module. Wires topicId → per-topic content.
   ========================================================================== */
import reports from './statistics/reports.js';
import probability from './statistics/probability.js';
import distributions from './statistics/distributions.js';
import inference from './statistics/inference.js';
import reference from './statistics/reference.js';

export default {
  topics: {
    'stat-91584': reports,        // Evaluate statistical reports (External)
    'stat-91585': probability,    // Probability concepts (External)
    'stat-91586': distributions,  // Probability distributions (External)
    'stat-91582': inference,      // Formal inference (Internal)
  },
  reference,
};

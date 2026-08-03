/* ============================================================================
   Calculus — content module. Wires topicId → per-topic content (calculus/*.js).
   ========================================================================== */
import complex from './calculus/complex.js';
import differentiation from './calculus/differentiation.js';
import integration from './calculus/integration.js';
import reference from './calculus/reference.js';

export default {
  topics: {
    'calc-91577': complex,          // Complex numbers (External)
    'calc-91578': differentiation,  // Differentiation methods (External)
    'calc-91579': integration,      // Integration methods (External)
  },
  reference,
};

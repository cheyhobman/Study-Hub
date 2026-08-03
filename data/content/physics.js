/* ============================================================================
   Physics — content module. Wires topicId → per-topic content (physics/*.js).
   ========================================================================== */
import waves from './physics/waves.js';
import mechanics from './physics/mechanics.js';
import electricity from './physics/electricity.js';
import modern from './physics/modern.js';
import practical from './physics/practical.js';
import reference from './physics/reference.js';

export default {
  topics: {
    'phys-91523': waves,        // Wave Systems (External)
    'phys-91524': mechanics,    // Mechanical Systems (External)
    'phys-91526': electricity,  // Electrical Systems (External)
    'phys-91525': modern,       // Modern Physics (Internal)
    'phys-91521': practical,    // Practical Investigation (Internal)
  },
  reference,
};

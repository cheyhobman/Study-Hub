/* ============================================================================
   English: content module. Standards verified vs NZQA (2026), 31 Jul 2026.
   ========================================================================== */
import written from './english/written.js';
import visual from './english/visual.js';
import connections from './english/connections.js';
import closereading from './english/closereading.js';
import reference from './english/reference.js';

export default {
  topics: {
    'eng-91472': written,  // Written text response (External, 4cr)
    'eng-91473': visual,   // Visual/oral text response: Inception/Interstellar (External, 4cr)
    'eng-3-7': connections,   // Connections across texts (Internal, 4cr)
    'eng-3-9': closereading,  // Close reading visual/oral (Internal, 3cr)
  },
  reference,
};

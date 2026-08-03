/* ============================================================================
   revision-scope.js: should this topic still be in a revision session?
   ----------------------------------------------------------------------------
   Once an internal is submitted or graded, there is no exam left to revise for.
   Drilling its flashcards is wasted time, UNLESS the same content is also
   examined by an external you still have to sit.

   Two outcomes:

     'normal'    include and weight as usual
     'excluded'  the internal has been submitted or graded. There is no exam
                 left to sit for it, so you are never asked about it again

   NOTE: an earlier version kept finished internals at reduced weight when their
   content also appeared in an external. That was wrong in practice, you still
   got Chemistry 3.1 questions after handing 3.1 in. Where content genuinely
   overlaps an external, that external has its OWN topic with its own cards and
   questions, so nothing is lost by dropping the internal's topic entirely.
   `stillExaminedIn` is now used only to TELL you where to revise that material
   instead.

   "Finished" is read from three places, in order of authority:
     1. the planner item's status   (submitted / graded): what you actually set
     2. the credit record override  (pending / achieved): Progress page edits
     3. the NZQA record baseline    (pending / achieved). Data/results.js

   Overlap is declared per topic as `stillExaminedIn: [...]` in the content file,
   listing the standards whose EXAM draws on the same material. A topic stays in
   revision if any of those standards is itself still unsat.
   ========================================================================== */
import { results } from '../data/results.js';
import { store } from './store.js';
import { allInternals } from './internals-catalog.js';

/** Has this internal been handed in or marked? */
function internalIsFinished(entry) {
  // 1. planner (most current. You set it yourself)
  const item = store.internals().find(i => i.recordKey === entry.recordKey || i.topicId === entry.topicId);
  if (item) {
    if (item.status === 'graded' || item.status === 'submitted') return true;
    // explicitly still in progress. Trust that over the stale record below
    if (item.status === 'notstarted' || item.status === 'inprogress') return false;
  }
  // 2. credit-tracker override
  const rec = store.creditRecord(entry.recordKey);
  if (rec) return rec.status === 'achieved' || rec.status === 'pending';
  // 3. the record as transcribed
  return entry.status === 'achieved' || entry.status === 'pending';
}

/** Is this standard still to be sat (so its content is worth revising)? */
function standardStillAhead(topicId) {
  const row = results.find(r => r.topicId === topicId);
  if (!row) return true;                       // unknown → assume still relevant
  if (row.assess === 'External') {
    // externals count as ahead unless already graded on the record
    return row.status !== 'achieved';
  }
  const entry = allInternals().find(i => i.topicId === topicId);
  return entry ? !internalIsFinished(entry) : true;
}

/**
 * @param {string} topicId
 * @param {object} topic   the loaded content module (for stillExaminedIn)
 * @returns {{scope:'normal'|'deprioritised'|'excluded', reason:string}}
 */
export function revisionScope(topicId, topic) {
  const entry = allInternals().find(i => i.topicId === topicId);
  if (!entry) return { scope: 'normal', reason: '' };          // not an internal
  if (!internalIsFinished(entry)) return { scope: 'normal', reason: '' };

  const overlaps = ((topic && topic.stillExaminedIn) || []).filter(standardStillAhead);
  return {
    scope: 'excluded',
    reason: overlaps.length
      ? `${entry.code} is handed in: revise this material via ${overlaps.join(', ')} instead`
      : `${entry.code} is handed in, and nothing else examines this content`,
    seeInstead: overlaps,
  };
}

/** Every topic currently excluded, for the "what's being skipped" note. */
export function excludedSummary(pool) {
  return pool.filter(t => t.scopeInfo && t.scopeInfo.scope === 'excluded')
             .map(t => ({ topicId: t.topicId, title: t.title, reason: t.scopeInfo.reason }));
}

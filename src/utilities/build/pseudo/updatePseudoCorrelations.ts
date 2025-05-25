import type { Values } from '../../../types/correlation.js';
import { getAtomCounts } from '../../general/getAtomCounts.js';

import { addPseudoCorrelations } from './addPseudoCorrelations.js';
import { checkPseudoCorrelations } from './checkPseudoCorrelations.js';
import { replacePseudoCorrelationsByEquivalences } from './replacePseudoCorrelationsByEquivalences.js';

/**
 * Adds pseudo correlations if needed, checks for replacement
 * by equivalent atoms and cleanup.
 * @param {Values} correlations
 * @param {string} mf
 */
export function updatePseudoCorrelations(
  correlations: Values,
  mf: string,
): Values {
  const atoms = getAtomCounts(mf);
  if (Object.keys(atoms).length === 0) {
    correlations = correlations.filter((correlation) => !correlation.pseudo);
  }
  // add pseudo correlations
  correlations = addPseudoCorrelations(correlations, atoms);
  // remove pseudo correlations to be replaced by equivalences
  correlations = replacePseudoCorrelationsByEquivalences(correlations, atoms);
  // remove pseudo correlations which are out of limit, clean up links and proton counts
  correlations = checkPseudoCorrelations(correlations, atoms);

  return correlations;
}

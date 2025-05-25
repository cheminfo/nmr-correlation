import type { Values } from '../../types/correlation.js';

/**
 * Returns all correlations of a certain atom type.
 *
 * @param {Values} correlations
 * @param {string} atomType
 */
export function getCorrelationsByAtomType(
  correlations: Values,
  atomType: string,
): Values {
  return correlations
    ? correlations.filter((correlation) => correlation.atomType === atomType)
    : [];
}

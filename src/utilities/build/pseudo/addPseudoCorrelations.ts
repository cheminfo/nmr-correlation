import type { Values } from '../../../types/correlation.js';
import { buildCorrelation } from '../../correlation/buildCorrelation.js';
import { getCorrelationsByAtomType } from '../../general/getCorrelationsByAtomType.js';

export function addPseudoCorrelations(
  correlations: Values,
  atoms: Record<string, number>,
): Values {
  for (const atomType in atoms) {
    const atomTypeCount = getCorrelationsByAtomType(
      correlations,
      atomType,
    ).reduce((sum, correlation) => sum + correlation.equivalence, 0);
    // add missing pseudo correlations
    for (let i = atomTypeCount; i < atoms[atomType]; i++) {
      correlations.push(
        buildCorrelation({
          atomType,
          pseudo: true,
        }),
      );
    }
  }
  return correlations;
}

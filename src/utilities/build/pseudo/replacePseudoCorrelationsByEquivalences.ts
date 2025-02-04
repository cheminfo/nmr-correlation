import type { Correlation, Values } from '../../../types/correlation';
import { hasLinks } from '../../correlation/hasLinks';
import { getCorrelationsByAtomType } from '../../general/getCorrelationsByAtomType';

export function replacePseudoCorrelationsByEquivalences(
  correlations: Values,
  atoms: Record<string, number>,
): Values {
  for (const atomType in atoms) {
    // remove pseudo correlations to be replaced by equivalences, starting at the end
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    const validCorrelationsAtomType = correlationsAtomType.filter(
      (correlation) =>
        !correlation.pseudo ||
        correlation.equivalence > 1 ||
        hasLinks(correlation),
    );
    const atomTypeEquivalencesCount = validCorrelationsAtomType.reduce(
      (sum, correlation) => sum + (correlation.equivalence - 1),
      0,
    );

    const pseudoCorrelationsAtomType: Values = correlationsAtomType.filter(
      (correlation) =>
        correlation.pseudo &&
        !validCorrelationsAtomType.some(
          (validCorrelation) => validCorrelation.id === correlation.id,
        ),
    );

    for (
      let i = 0;
      i <
      correlationsAtomType.length -
        (atoms[atomType] - atomTypeEquivalencesCount);
      i++
    ) {
      if (pseudoCorrelationsAtomType.length === 0) {
        break;
      }
      const pseudoCorrelationToRemove: Correlation | undefined =
        pseudoCorrelationsAtomType.pop();

      if (pseudoCorrelationToRemove) {
        correlations.splice(correlations.indexOf(pseudoCorrelationToRemove), 1);
      }
    }
  }

  return correlations;
}

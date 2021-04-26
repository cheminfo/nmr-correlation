import { Correlation } from '../../types/correlation/correlation';
import { Values } from '../../types/correlation/values';

/**
 * Returns the array index of a correlation.
 *
 * @param {Values} correlations
 * @param {Correlation} correlation
 */
export function getCorrelationIndex(
  correlations: Values,
  correlation: Correlation,
): number {
  return correlations.findIndex(
    (_correlation) => _correlation.id === correlation.id,
  );
}

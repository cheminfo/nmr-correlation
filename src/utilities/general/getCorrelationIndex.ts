import { Correlation } from '../../types/correlation/correlation';
import { Values } from '../../types/correlation/values';

export function getCorrelationIndex(
  correlations: Values,
  correlation: Correlation,
): number {
  return correlations.findIndex(
    (_correlation) => _correlation.id === correlation.id,
  );
}

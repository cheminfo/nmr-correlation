import { Correlation, Values } from '../../types/primary';

function getCorrelationIndex(
  correlations: Values,
  correlation: Correlation,
): number {
  return correlations.findIndex(
    (_correlation) => _correlation.id === correlation.id,
  );
}

export default getCorrelationIndex;

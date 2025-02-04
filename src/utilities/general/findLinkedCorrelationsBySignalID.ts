import type { Correlation, Values } from '../../types/correlation';

export function findLinkedCorrelationsBySignalID(
  correlations: Values,
  signalID: string,
): Correlation[] {
  return correlations.filter((_correlation) =>
    _correlation.link.some((_link) => _link.signal.id === signalID),
  );
}

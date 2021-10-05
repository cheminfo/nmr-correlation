import { Values } from '../../types';

export function findCorrelationBySignalID(
  correlations: Values,
  signalID: string,
) {
  return correlations.find((_correlation) =>
    _correlation.link.some((_link) => _link.signal.id === signalID),
  );
}

import { Correlation } from "../../types/correlation/correlation";
import { Values } from "../../types/correlation/values";

export function findLinkedCorrelationsBySignalID(
  correlations: Values,
  signalID: string,
): Correlation[] {
  return correlations.filter((_correlation) =>
    _correlation.link.some((_link) => _link.signal.id === signalID),
  );
}

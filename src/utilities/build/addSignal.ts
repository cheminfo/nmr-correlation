import type { Link, Values } from '../../types/correlation';
import { addLink } from '../correlation/addLink';
import { buildCorrelation } from '../correlation/buildCorrelation';
import { containsLink } from '../correlation/containsLink';
import { hasLinks } from '../correlation/hasLinks';

export function addSignal(
  matchedCorrelationIndices: number[],
  atomType: string,
  link: Link,
  correlations: Values,
) {
  if (matchedCorrelationIndices.length === 0) {
    // in case of no signal match -> add new signal from 2D
    const newCorrelation = buildCorrelation({
      atomType,
    });
    addLink(newCorrelation, link);

    const pseudoIndex = correlations.findIndex(
      (correlation) =>
        correlation.atomType === atomType &&
        correlation.pseudo &&
        !hasLinks(correlation),
    );
    if (pseudoIndex !== -1) {
      correlations[pseudoIndex] = newCorrelation;
    } else {
      correlations.push(newCorrelation);
    }
  } else if (!containsLink(correlations[matchedCorrelationIndices[0]], link)) {
    // if allowed then add links from 2D data in first match only
    addLink(correlations[matchedCorrelationIndices[0]], link);
  }
}

import { addLink, buildCorrelation } from '../..';
import type { Link } from '../../types/correlation/link';
import type { Values } from '../../types/correlation/values';
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

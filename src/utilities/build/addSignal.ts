import { addLink, buildCorrelation } from '../..';
import { Link } from '../../types/correlation/link';
import { Values } from '../../types/correlation/values';
import { containsLink } from '../correlation/containsLink';
import { hasLinks } from '../correlation/hasLinks';

export function addSignal(
  matchedCorrelationIndices: number[],
  atomType: string,
  link: Link,
  correlations: Values,
) {
  // in case of no signal match -> add new signal from 2D
  if (matchedCorrelationIndices.length === 0) {
    const newCorrelation = buildCorrelation({
      atomType,
    });
    addLink(newCorrelation, link);

    const pseudoIndex = correlations.findIndex(
      (correlation) =>
        correlation.atomType === atomType &&
        correlation.pseudo === true &&
        !hasLinks(correlation),
    );
    if (pseudoIndex >= 0) {
      correlations[pseudoIndex] = newCorrelation;
    } else {
      correlations.push(newCorrelation);
    }
  } else {
    // if allowed then add links from 2D data in first match only
    if (!containsLink(correlations[matchedCorrelationIndices[0]], link)) {
      addLink(correlations[matchedCorrelationIndices[0]], link);
    }
  }
}

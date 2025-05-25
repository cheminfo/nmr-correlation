import type { Values } from '../../types/correlation.js';
import { addMatch } from '../correlation/addMatch.js';
import { removeLink } from '../correlation/removeLink.js';
import { removeMatches } from '../correlation/removeMatches.js';
import { getCorrelationIndex } from '../general/getCorrelationIndex.js';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType.js';
import { isArrayEqual } from '../general/isArrayEqual.js';

/**
 * Sets the match indices for each link within a correlation.
 *
 * @param {Values} correlations
 */
export function setMatches(correlations: Values): Values {
  for (const correlation of correlations) {
    for (const link of correlation.link) {
      // remove previously added matches
      removeMatches(link);
      // add matches
      const otherAtomType =
        link.axis === 'x' ? link.atomType[1] : link.atomType[0];
      for (const correlationOtherAtomType of getCorrelationsByAtomType(
        correlations,
        otherAtomType,
      )) {
        if (correlation.id !== correlationOtherAtomType.id) {
          const correlationIndexOtherAtomType = getCorrelationIndex(
            correlations,
            correlationOtherAtomType,
          );
          for (const linkOtherAtomType of correlationOtherAtomType.link) {
            // check for correlation match and avoid possible duplicates
            if (
              linkOtherAtomType.experimentType === link.experimentType &&
              linkOtherAtomType.experimentID === link.experimentID &&
              isArrayEqual(linkOtherAtomType.atomType, link.atomType) &&
              linkOtherAtomType.signal.id === link.signal.id &&
              linkOtherAtomType.axis !== link.axis
            ) {
              addMatch(link, correlationIndexOtherAtomType);
            }
          }
        }
      }
    }
  }

  // remove links without any matches
  for (const correlation of correlations) {
    const linksToRemove = correlation.link.filter(
      (link) =>
        link.match.length === 0 &&
        link.experimentType !== '1d' &&
        !link.edited?.moved,
    );
    for (const link of linksToRemove) removeLink(correlation, link.id);
  }

  return correlations;
}

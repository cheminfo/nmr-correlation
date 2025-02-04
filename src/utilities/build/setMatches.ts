import lodashIsEqual from 'lodash/isEqual';

import type { Values } from '../../types/correlation/values';
import { addMatch } from '../correlation/addMatch';
import { removeLink } from '../correlation/removeLink';
import { removeMatches } from '../correlation/removeMatches';
import { getCorrelationIndex } from '../general/getCorrelationIndex';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

/**
 * Sets the match indices for each link within a correlation.
 *
 * @param {Values} values
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
              lodashIsEqual(linkOtherAtomType.atomType, link.atomType) &&
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

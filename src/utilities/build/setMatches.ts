import { Values } from "../../types/primary";
import { removeLink } from "../CorrelationUtilities";
import { getCorrelationIndex, getCorrelationsByAtomType } from "../GeneralUtilities";
import { addMatch, removeMatches } from "../LinkUtilities";
import lodashIsEqual from "lodash/isEqual";

function setMatches(correlations: Values): Values {
  correlations.forEach((correlation) => {
    correlation.link.forEach((link) => {
      // remove previously added matches
      removeMatches(link);
      // add matches
      const otherAtomType =
        link.axis === 'x' ? link.atomType[1] : link.atomType[0];
      getCorrelationsByAtomType(correlations, otherAtomType).forEach(
        (correlationOtherAtomType) => {
          if (correlation.id !== correlationOtherAtomType.id) {
            const correlationIndexOtherAtomType = getCorrelationIndex(
              correlations,
              correlationOtherAtomType,
            );
            correlationOtherAtomType.link.forEach((linkOtherAtomType) => {
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
            });
          }
        },
      );
    });
  });

  // remove links without any matches
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) => link.match.length === 0 && link.experimentType !== '1d',
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });

  return correlations;
}

export default setMatches;
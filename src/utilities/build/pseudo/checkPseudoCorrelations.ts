import { Correlation, Link, Values } from "../../../types/primary";
import getCorrelationIndex from "../../correlation/getCorrelationIndex";
import getCorrelationsByAtomType from "../../correlation/getCorrelationsByAtomType";
import hasLinks from "../../correlation/hasLinks";
import removeLink from "../../correlation/removeLink";
import removeMatch from "../../link/removeMatch";
function checkPseudoCorrelations(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  Object.keys(atoms).forEach((atomType) => {
    // consider also pseudo correlations
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    if (correlationsAtomType.length > atoms[atomType]) {
      // remove pseudo correlations which are out of limit and not linked
      const pseudoCorrelationsAtomType = correlationsAtomType.filter(
        (correlation) => correlation.pseudo === true && !hasLinks(correlation),
      );
      for (let i = correlationsAtomType.length - 1; i >= atoms[atomType]; i--) {
        if (pseudoCorrelationsAtomType.length === 0) {
          break;
        }
        const pseudoCorrelationToRemove:
          | Correlation
          | undefined = pseudoCorrelationsAtomType.pop();
        if (pseudoCorrelationToRemove) {
          correlations.splice(
            correlations.indexOf(pseudoCorrelationToRemove),
            1,
          );
        }
      }
    }
  });
  // check for deleted links and correct proton counts if no HSQC link exists
  correlations.forEach((pseudoCorrelation: Correlation) => {
    if (pseudoCorrelation.pseudo === true) {
      // remove wrong (old) match indices and empty links
      const linksToRemove: Array<Link> = [];
      const pseudoCorrelationIndex = getCorrelationIndex(
        correlations,
        pseudoCorrelation,
      );
      pseudoCorrelation.link.forEach((pseudoLink: Link) => {
        for (let i = 0; i < pseudoLink.match.length; i++) {
          const matchIndex = pseudoLink.match[i];
          if (
            !correlations[matchIndex] ||
            !correlations[matchIndex].link.some((_link) =>
              _link.match.includes(pseudoCorrelationIndex),
            )
          ) {
            removeMatch(pseudoLink, matchIndex);
          }
        }
        if (pseudoLink.match.length === 0) {
          linksToRemove.push(pseudoLink);
        }
      });
      linksToRemove.forEach((pseudoLink) =>
        removeLink(pseudoCorrelation, pseudoLink.id),
      );
      // correct protons count if no HSQC link was found anymore and the field was not edited manually
      if (
        !pseudoCorrelation.edited.protonsCount &&
        !pseudoCorrelation.link.some(
          (pseudoLink) => pseudoLink.experimentType === 'hsqc',
        )
      ) {
        pseudoCorrelation.protonsCount = [];
      }
    }
  });

  return correlations;
}

export default checkPseudoCorrelations;
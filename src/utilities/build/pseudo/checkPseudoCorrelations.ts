import { Correlation } from '../../../types/correlation/correlation';
import { Link } from '../../../types/correlation/link';
import { Values } from '../../../types/correlation/values';
import { hasLinks } from '../../correlation/hasLinks';
import { removeLink } from '../../correlation/removeLink';
import { removeMatch } from '../../correlation/removeMatch';
import { getCorrelationIndex } from '../../general/getCorrelationIndex';
import { getCorrelationsByAtomType } from '../../general/getCorrelationsByAtomType';

export function checkPseudoCorrelations(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  for (const atomType in atoms) {
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
  }
  // check for deleted links and correct proton counts if no HSQC link exists
  for (const pseudoCorrelation of correlations) {
    if (pseudoCorrelation.pseudo === false) continue;
    // remove wrong (old) match indices and empty links
    const linksToRemove: Array<Link> = [];
    const pseudoCorrelationIndex = getCorrelationIndex(
      correlations,
      pseudoCorrelation,
    );
    for (const pseudoLink of pseudoCorrelation.link) {
      for (const matchIndex of pseudoLink.match) {
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
    }
    for (const pseudoLink of linksToRemove) {
      removeLink(pseudoCorrelation, pseudoLink.id);
    }
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

  return correlations;
}

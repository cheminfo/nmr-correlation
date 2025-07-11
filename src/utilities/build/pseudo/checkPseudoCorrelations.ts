import type { Correlation, Link, Values } from '../../../types/correlation.js';
import { hasLinks } from '../../correlation/hasLinks.js';
import { removeLink } from '../../correlation/removeLink.js';
import { removeMatch } from '../../correlation/removeMatch.js';
import { getCorrelationIndex } from '../../general/getCorrelationIndex.js';
import { getCorrelationsByAtomType } from '../../general/getCorrelationsByAtomType.js';

export function checkPseudoCorrelations(
  correlations: Values,
  atoms: Record<string, number>,
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
        (correlation) =>
          correlation.pseudo &&
          correlation.equivalence === 1 &&
          !hasLinks(correlation),
      );
      for (let i = correlationsAtomType.length - 1; i >= atoms[atomType]; i--) {
        if (pseudoCorrelationsAtomType.length === 0) {
          break;
        }
        const pseudoCorrelationToRemove: Correlation | undefined =
          pseudoCorrelationsAtomType.pop();
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
    if (
      !pseudoCorrelation.pseudo ||
      pseudoCorrelation.equivalence > 1 ||
      hasLinks(pseudoCorrelation)
    ) {
      continue;
    }
    // remove wrong (old) match indices and empty links
    const linksToRemove: Link[] = [];
    const pseudoCorrelationIndex = getCorrelationIndex(
      correlations,
      pseudoCorrelation,
    );
    for (const pseudoLink of pseudoCorrelation.link) {
      for (const matchIndex of pseudoLink.match) {
        if (
          !correlations[matchIndex]?.link.some((_link) =>
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

  // filter out correlations with unknown atom types from previous molecular formula
  return Object.keys(atoms).length > 0
    ? correlations.filter((correlation) =>
        Object.keys(atoms).includes(correlation.atomType),
      )
    : correlations;
}

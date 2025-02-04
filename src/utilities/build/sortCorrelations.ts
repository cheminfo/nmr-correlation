import type { Correlation } from '../../types/correlation/correlation';
import type { Values } from '../../types/correlation/values';
import { getCorrelationDelta } from '../general/getCorrelationDelta';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

/**
 * Sorts the correlations according to its atom type value and signal delta.
 *
 * @param {Values} correlations
 */
export function sortCorrelations(correlations: Values): Values {
  let sortedCorrelations: Values = [];
  const atomTypes = correlations
    .map((correlation) => correlation.atomType)
    .filter((atomType, i, a) => a.indexOf(atomType) === i);
  atomTypes.sort(compareAtomTypes);
  for (const atomType of atomTypes) {
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    correlationsAtomType.sort(compareCorrelations);
    sortedCorrelations = sortedCorrelations.concat(correlationsAtomType);
  }

  return sortedCorrelations;
}

function compareAtomTypes(atomType1: string, atomType2: string) {
  // C and H have the highest priority
  if (atomType1 === 'C') {
    return -1;
  }
  if (atomType2 === 'C') {
    return 1;
  }
  if (atomType1 === 'H') {
    return -1;
  }
  if (atomType2 === 'H') {
    return 1;
  }
  // alphabetical sort
  if (atomType1 < atomType2) {
    return -1;
  }
  if (atomType1 > atomType2) {
    return 1;
  }

  return 0;
}

function compareCorrelations(corr1: Correlation, corr2: Correlation) {
  if (
    !corr1.pseudo &&
    !corr2.pseudo &&
    corr1.link.length > 0 &&
    corr2.link.length > 0
  ) {
    const corr1Delta = getCorrelationDelta(corr1);
    const corr2Delta = getCorrelationDelta(corr2);
    if (corr1Delta !== undefined && corr2Delta !== undefined) {
      if (corr1Delta < corr2Delta) {
        return -1;
      } else if (corr1Delta > corr2Delta) {
        return 1;
      }
    }
  }
  if (!corr1.pseudo && corr2.pseudo) {
    return -1;
  }
  if (corr1.pseudo && !corr2.pseudo) {
    return 1;
  }
  if (corr1.label.origin < corr2.label.origin) {
    return -1;
  }
  if (corr1.label.origin > corr2.label.origin) {
    return 1;
  }
  return 0;
}

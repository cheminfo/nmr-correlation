import { Correlation } from '../../types/correlation/correlation';
import { Values } from '../../types/correlation/values';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

export function sortCorrelations(correlations: Values): Values {
  const compareAtomTypes = (atomType1: string, atomType2: string) => {
    // C and H highest priority
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
  };

  const compareCorrelations = (corr1: Correlation, corr2: Correlation) => {
    if (corr1.pseudo === false && corr2.pseudo === false) {
      if (corr1.signal.delta < corr2.signal.delta) {
        return -1;
      } else if (corr1.signal.delta > corr2.signal.delta) {
        return 1;
      }
    }
    if (corr1.label.origin < corr2.label.origin) {
      return -1;
    }
    if (corr1.label.origin > corr2.label.origin) {
      return 1;
    }
    return 0;
  };

  let sortedCorrelations: Values = [];
  const atomTypes = correlations
    .map((correlation) => correlation.atomType)
    .filter((atomType, i, a) => a.indexOf(atomType) === i);
  atomTypes.sort(compareAtomTypes);
  atomTypes.forEach((atomType) => {
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    correlationsAtomType.sort(compareCorrelations);
    sortedCorrelations = sortedCorrelations.concat(correlationsAtomType);
  });

  return sortedCorrelations;
}

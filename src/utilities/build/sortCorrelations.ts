import { Correlation } from '../../types/correlation/correlation';
import { Values } from '../../types/correlation/values';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

export function sortCorrelations(correlations: Values): Values {
  const compare = (corr1: Correlation, corr2: Correlation) => {
    if (corr1.pseudo === false && corr2.pseudo === false) {
      if (corr1.signal.delta < corr2.signal.delta) {
        return -1;
      } else if (corr1.signal.delta > corr2.signal.delta) {
        return 1;
      }
    }
    if (corr1.label['origin'] < corr2.label['origin']) {
      return -1;
    }
    if (corr1.label['origin'] > corr2.label['origin']) {
      return 1;
    }
    return 0;
  };

  let sortedCorrelations: Values = [];
  const atomTypes = correlations
    .map((correlation) => correlation.atomType)
    .filter((atomType, i, a) => a.indexOf(atomType) === i);
  atomTypes.forEach((atomType) => {
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    correlationsAtomType.sort(compare);
    sortedCorrelations = sortedCorrelations.concat(correlationsAtomType);
  });

  return sortedCorrelations;
}

import lodashGet from 'lodash/get';

import { Values } from '../../types/correlation/values';

export function setLabels(correlations: Values): Values {
  const atomTypeCounts: { [atomType: string]: number } = {};
  correlations.forEach((correlation) => {
    if (!lodashGet(atomTypeCounts, correlation.atomType, false)) {
      atomTypeCounts[correlation.atomType] = 0;
    }
    atomTypeCounts[correlation.atomType]++;
    correlation.label.origin = `${correlation.atomType}${
      atomTypeCounts[correlation.atomType]
    }`;
  });

  return correlations;
}

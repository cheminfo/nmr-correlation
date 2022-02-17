import lodashGet from 'lodash/get';

import { Values } from '../../types/correlation/values';


/**
 * Sets the origin (default) label for each correlation, e.g. C1 or H2, depending on its order.
 *
 * @param {Values} values
 */
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

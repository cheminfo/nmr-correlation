import type { Correlation, Values } from '../../types/correlation.js';

import { getLabel } from './getLabel.js';
import { sortLabels } from './sortLabels.js';

export function getLabels(
  correlations: Values,
  correlation: Correlation,
  experimentType: string,
): string[] {
  const labels = correlation.link
    .filter((link) => link.experimentType === experimentType)
    .flatMap((link) =>
      link.match.flatMap((match) => {
        const matchingCorrelation = correlations[match];
        return getLabel(correlations, matchingCorrelation);
      }),
    )
    .filter((label, i, a) => label.length > 0 && a.indexOf(label) === i);

  return sortLabels(labels);
}

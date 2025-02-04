import type { Correlation } from '../../types/correlation/correlation';
import type { Values } from '../../types/correlation/values';

import { getLabel } from './getLabel';
import { sortLabels } from './sortLabels';

export function getLabels(
  correlations: Values,
  correlation: Correlation,
  experimentType: string,
): string[] {
  const labels = correlation.link
    .filter((link) => link.experimentType === experimentType)
    .map((link) =>
      link.match
        .map((match) => {
          const matchingCorrelation = correlations[match];
          return getLabel(correlations, matchingCorrelation);
        })
        .flat(),
    )
    .flat()
    .filter((label, i, a) => label.length > 0 && a.indexOf(label) === i);

  return sortLabels(labels);
}

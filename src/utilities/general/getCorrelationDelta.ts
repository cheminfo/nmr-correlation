import { Correlation } from '../../types';

import { getLinkDelta } from './getLinkDelta';

export function getCorrelationDelta(
  correlation: Correlation,
): number | undefined {
  if (correlation.link.length > 0) return getLinkDelta(correlation.link[0]);
}

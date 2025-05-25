import type { Correlation } from '../../types/correlation.js';

import { getLinkDelta } from './getLinkDelta.js';

export function getCorrelationDelta(
  correlation: Correlation,
): number | undefined {
  if (correlation.link.length > 0) return getLinkDelta(correlation.link[0]);
}

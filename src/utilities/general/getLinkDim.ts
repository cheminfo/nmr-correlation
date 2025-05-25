import type { Link } from '../../types/correlation.js';

export function getLinkDim(link: Link): number {
  return link.experimentType === '1d' ? 1 : 2;
}

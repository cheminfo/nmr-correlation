import type { Link } from '../../types/correlation';

export function getLinkDim(link: Link): number {
  return link.experimentType === '1d' ? 1 : 2;
}

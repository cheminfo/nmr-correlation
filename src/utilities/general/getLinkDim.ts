import type { Link } from '../../types/correlation/link';

export function getLinkDim(link: Link): number {
  return link.experimentType === '1d' ? 1 : 2;
}

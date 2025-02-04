import type { Correlation } from '../../types/correlation/correlation';
import type { Link } from '../../types/correlation/link';

/**
 * Adds a link to a correlation.
 *
 * @param {Correlation} correlation
 * @param {Link} link
 */
export function addLink(correlation: Correlation, link: Link): Correlation {
  correlation.link.push(link);
  return correlation;
}

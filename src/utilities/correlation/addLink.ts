import type { Correlation, Link } from '../../types/correlation.js';

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

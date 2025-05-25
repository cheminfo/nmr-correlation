import type { Link } from '../../types/correlation.js';

/**
 * Removes all match indices in a link.
 *
 * @param {Link} link
 */
export function removeMatches(link: Link): Link {
  link.match = [];
  return link;
}

import type { Link } from '../../types/correlation';

/**
 * Removes all match indices in a link.
 *
 * @param {Link} link
 */
export function removeMatches(link: Link): Link {
  link.match = [];
  return link;
}

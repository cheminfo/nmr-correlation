import { Link } from '../../types/correlation/link';

/**
 * Removes all match indices in a link.
 *
 * @param {Link} link
 */
export function removeMatches(link: Link): Link {
  link.match = [];

  return link;
}

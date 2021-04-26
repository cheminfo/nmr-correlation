import { Link } from '../../types/correlation/link';

/**
 * Adds an index to the match array of a link.
 *
 * @param {Link} link
 * @param {number} index
 */
export function addMatch(link: Link, index: number): Link {
  if (!link.match.includes(index)) {
    link.match.push(index);
  }

  return link;
}

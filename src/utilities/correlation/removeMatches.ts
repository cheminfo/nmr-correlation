import { Link } from '../../types/correlation/link';

export function removeMatches(link: Link): Link {
  link.match = [];

  return link;
}

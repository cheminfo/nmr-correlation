import { Link } from '../../types/correlation/link';

export function addMatch(link: Link, index: number): Link {
  if (!link.match.includes(index)) {
    link.match.push(index);
  }

  return link;
}

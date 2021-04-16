import { Link } from '../../types/correlation/link';

export function removeMatch(link: Link, index: number): Link {
  const indexOf = link.match.indexOf(index);
  if (indexOf >= 0) {
    link.match.splice(indexOf, 1);
  }

  return link;
}

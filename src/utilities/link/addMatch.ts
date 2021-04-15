import { Link } from '../../types/primary';

function addMatch(link: Link, index: number): Link {
  if (!link.match.includes(index)) {
    link.match.push(index);
  }

  return link;
}

export default addMatch;

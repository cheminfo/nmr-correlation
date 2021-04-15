import { Link } from '../../types/primary';

function removeMatches(link: Link): Link {
  link.match = [];

  return link;
}

export default removeMatches;

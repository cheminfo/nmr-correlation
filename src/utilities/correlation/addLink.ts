import { Correlation, Link } from '../../types/primary';

function addLink(correlation: Correlation, link: Link): Correlation {
  correlation.link.push(link);

  return correlation;
}

export default addLink;

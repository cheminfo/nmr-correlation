import { Correlation } from '../../types/correlation/correlation';
import { Link } from '../../types/correlation/link';

export function addLink(correlation: Correlation, link: Link): Correlation {
  correlation.link.push(link);

  return correlation;
}

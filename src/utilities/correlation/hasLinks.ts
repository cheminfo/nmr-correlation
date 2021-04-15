import { Correlation } from '../../types/primary';

function hasLinks(correlation: Correlation): boolean {
  return correlation.link.length > 0;
}

export default hasLinks;

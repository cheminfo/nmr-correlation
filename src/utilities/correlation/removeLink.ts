import { Correlation } from '../../types/correlation/correlation';

export function removeLink(correlation: Correlation, id: string): Correlation {
  correlation.link = correlation.link.filter((_link) => _link.id !== id);

  return correlation;
}

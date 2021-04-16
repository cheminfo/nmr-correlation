import { Correlation } from '../../types/correlation/correlation';

export function hasLinks(correlation: Correlation): boolean {
  return correlation.link.length > 0;
}

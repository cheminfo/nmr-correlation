import type { Correlation } from '../../types/correlation/correlation';

/**
 * Checks whether a correlation has links.
 *
 * @param {Correlation} correlation
 */
export function hasLinks(correlation: Correlation): boolean {
  return correlation.link.length > 0;
}

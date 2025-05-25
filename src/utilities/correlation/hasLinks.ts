import type { Correlation } from '../../types/correlation.js';

/**
 * Checks whether a correlation has links.
 *
 * @param {Correlation} correlation
 */
export function hasLinks(correlation: Correlation): boolean {
  return correlation.link.length > 0;
}

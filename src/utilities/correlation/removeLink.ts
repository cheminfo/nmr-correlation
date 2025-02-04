import type { Correlation } from '../../types/correlation';

/**
 * Removes a link by id search.
 *
 * @param {Correlation} correlation
 * @param {string} id
 */
export function removeLink(correlation: Correlation, id: string): Correlation {
  correlation.link = correlation.link.filter((_link) => _link.id !== id);
  return correlation;
}

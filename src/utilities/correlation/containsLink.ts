import type { Correlation, Link } from '../../types/correlation';
import { isArrayEqual } from '../general/isArrayEqual';

/**
 * Checks whether a correlation contains a link by id search.
 *
 * @param {Correlation} correlation
 * @param {Link} link
 */
export function containsLink(correlation: Correlation, link: Link): boolean {
  return correlation.link.some(
    (_link) =>
      _link.experimentType === link.experimentType &&
      _link.experimentID === link.experimentID &&
      isArrayEqual(_link.atomType, link.atomType) &&
      _link.signal.id === link.signal.id &&
      _link.axis === link.axis,
  );
}

import lodashIsEqual from 'lodash/isEqual';

import type { Correlation } from '../../types/correlation/correlation';
import type { Link } from '../../types/correlation/link';

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
      lodashIsEqual(_link.atomType, link.atomType) &&
      _link.signal.id === link.signal.id &&
      _link.axis === link.axis,
  );
}

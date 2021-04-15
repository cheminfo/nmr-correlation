import { Correlation, Link } from '../../types/primary';
import lodashIsEqual from 'lodash/isEqual';

function containsLink(correlation: Correlation, link: Link): boolean {
  return correlation.link.some(
    (_link) =>
      _link.experimentType === link.experimentType &&
      _link.experimentID === link.experimentID &&
      lodashIsEqual(_link.atomType, link.atomType) &&
      _link.signal.id === link.signal.id &&
      _link.axis === link.axis,
  );
}

export default containsLink;

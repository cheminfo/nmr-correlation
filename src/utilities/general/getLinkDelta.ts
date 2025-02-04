import { Link } from '../../types/correlation/link';
import { Signal1D } from '../../types/spectrum/Signal1D';
import { Signal2D } from '../../types/spectrum/Signal2D';

import { getLinkDim } from './getLinkDim';

export function getLinkDelta(link: Link): number | undefined {
  if (!link.pseudo) {
    return getLinkDim(link) === 1
      ? (link.signal as Signal1D).delta
      : link.axis === 'x'
        ? (link.signal as Signal2D).x.delta
        : (link.signal as Signal2D).y.delta;
  }
}

import { Link, Signal1D, Signal2D } from '../../types';

import { getLinkDim } from './getLinkDim';

export function getLinkDelta(link: Link): number | undefined {
  if (link.pseudo === false) {
    return getLinkDim(link) === 1
      ? (link.signal as Signal1D).delta
      : link.axis === 'x'
      ? (link.signal as Signal2D).x.delta
      : (link.signal as Signal2D).y.delta;
  }
}

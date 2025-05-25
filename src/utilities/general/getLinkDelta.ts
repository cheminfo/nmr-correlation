import type { Link } from '../../types/correlation.js';
import type { Signal1D, Signal2D } from '../../types/spectrum.js';

import { getLinkDim } from './getLinkDim.js';

export function getLinkDelta(link: Link): number | undefined {
  if (!link.pseudo) {
    return getLinkDim(link) === 1
      ? (link.signal as Signal1D).delta
      : link.axis === 'x'
        ? (link.signal as Signal2D).x.delta
        : (link.signal as Signal2D).y.delta;
  }
}

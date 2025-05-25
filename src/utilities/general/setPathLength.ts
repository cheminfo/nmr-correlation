import type { FromTo } from 'cheminfo-types';

import type { Values } from '../../types/correlation.js';
import type { Signal2D } from '../../types/spectrum.js';

import { findLinksBySignalID } from './findLinksBySignalID.js';

export function setPathLength(
  correlations: Values,
  signalID: string,
  pathLength: FromTo | undefined,
): Values {
  const links = findLinksBySignalID(correlations, signalID);
  for (const link of links) {
    const signal = link.signal as Signal2D;
    if (pathLength) {
      if (!signal.j) {
        signal.j = { pathLength };
      } else {
        signal.j.pathLength = pathLength;
      }
    } else {
      delete signal.j?.pathLength;
    }
  }

  return correlations;
}

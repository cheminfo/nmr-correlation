import { FromTo } from 'cheminfo-types';

import { Values } from '../../types/correlation/values';
import { Signal2D } from '../../types/spectrum/Signal2D';


import { findLinksBySignalID } from './findLinksBySignalID';

export function setPathLength(
  correlations: Values,
  signalID: string,
  pathLength: FromTo | undefined,
): Values {
  const links = findLinksBySignalID(correlations, signalID);
  links.forEach((link) => {
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
  });

  return correlations;
}

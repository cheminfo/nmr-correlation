import { Signal2D, Values } from '../../types';
import { PathLength } from '../../types/spectrum/pathLength';

import { findLinksBySignalID } from './findLinksBySignalID';

export function setPathLength(
  correlations: Values,
  signalID: string,
  pathLength: PathLength | undefined,
): Values {
  const links = findLinksBySignalID(correlations, signalID);
  links.forEach((link) => {
    const signal = link.signal as Signal2D;
    if (pathLength) {
      signal.pathLength = pathLength;
    } else {
      delete signal.pathLength;
    }
  });

  return correlations;
}

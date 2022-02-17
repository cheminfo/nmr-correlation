import { FromTo } from 'cheminfo-types';

import { Signal2D, Values } from '../../types';

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

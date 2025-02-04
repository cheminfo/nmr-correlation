import type { Values } from '../../types/correlation';
import type {
  Experiment1DSignals,
  Experiment2DSignals,
} from '../../types/experiment';
import { removeLink } from '../correlation/removeLink';

/**
 * Removes non-pseudo correlations which signal id can not be found or have no links anymore.
 *
 * @param correlations
 * @param signals1D
 * @param signals2D
 */
export function removeObsoleteLinksAndNotLinkedCorrelations(
  correlations: Values,
  signals1D: Experiment1DSignals,
  signals2D: Experiment2DSignals,
): Values {
  const _correlations = correlations.filter(
    (correlation) => !correlation.pseudo,
  );
  const removeList = _correlations.slice();
  for (const correlation of _correlations) {
    for (const link of correlation.link) {
      if (link.experimentType === '1d') {
        // search in 1D data
        if (
          (signals1D[link.atomType[0]] ?? []).some(
            (signal1D) => signal1D.signal.id === link.signal.id,
          )
        ) {
          const index = removeList.indexOf(correlation);
          if (index !== -1) {
            removeList.splice(index, 1);
          }
        } else if (!link.pseudo) {
          // remove obsolete link to not anymore existing signal
          removeLink(correlation, link.id);
        }
      } else if (
        (signals2D[link.experimentType] ?? []).some(
          (signal2D) => signal2D.signal.id === link.signal.id,
        )
      ) {
        // search in 2D data
        const index = removeList.indexOf(correlation);
        if (index !== -1) {
          removeList.splice(index, 1);
        }
      } else if (!link.pseudo) {
        // remove obsolete link to not anymore existing signal
        removeLink(correlation, link.id);
      }
    }
  }

  for (const correlation of removeList) {
    const index = correlations.indexOf(correlation); // in case we already removed previously
    if (index !== -1) {
      correlations.splice(index, 1);
    }
  }

  return correlations;
}

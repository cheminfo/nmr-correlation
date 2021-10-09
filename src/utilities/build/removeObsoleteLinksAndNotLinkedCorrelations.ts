import lodashGet from 'lodash/get';

import { removeLink } from '../..';
import { Values } from '../../types/correlation/values';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { Experiment2DSignals } from '../../types/experiment/experiment2DSignals';

/**
 * Removes non-pseudo correlations which signal id can not be found or have no links anymore.
 *
 * @param {Values} values
 * @param {Experiment1DSignals} signals1D
 * @param {Experiment2DSignals} signals2D
 */
export function removeObsoleteLinksAndNotLinkedCorrelations(
  correlations: Values,
  signals1D: Experiment1DSignals,
  signals2D: Experiment2DSignals,
): Values {
  const _correlations = correlations.filter(
    (correlation) => correlation.pseudo === false,
  );
  const removeList = _correlations.slice();
  _correlations.forEach((correlation) => {
    for (const link of correlation.link) {
      if (link.experimentType === '1d') {
        // search in 1D data
        if (
          lodashGet(signals1D, link.atomType[0], []).some(
            (signal1D) => signal1D.signal.id === link.signal.id,
          )
        ) {
          const index = removeList.indexOf(correlation);
          if (index >= 0) {
            removeList.splice(index, 1);
          }
        }
      } else {
        // search in 2D data
        if (
          lodashGet(signals2D, `${link.experimentType}`, []).some(
            (signal2D) => signal2D.signal.id === link.signal.id,
          )
        ) {
          const index = removeList.indexOf(correlation);
          if (index >= 0) {
            removeList.splice(index, 1);
          }
        } else {
          if (link.pseudo === false) {
            // remove obsolete link to not anymore existing signal
            removeLink(correlation, link.id);
          }
        }
      }
    }
  });

  removeList.forEach((correlation) => {
    const index = correlations.indexOf(correlation); // in case we already removed previously
    if (index >= 0) {
      correlations.splice(index, 1);
    }
  });

  return correlations;
}

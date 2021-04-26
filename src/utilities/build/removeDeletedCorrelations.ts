import lodashGet from 'lodash/get';

import { Values } from '../../types/correlation/values';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { Experiment2DSignals } from '../../types/experiment/experiment2DSignals';

export function removeDeletedCorrelations(
  correlations: Values,
  signals1D: Experiment1DSignals,
  signals2D: Experiment2DSignals,
): Values {
  const _correlations = correlations.filter(
    (correlation) => correlation.pseudo === false,
  );
  const removeList = _correlations.slice();
  _correlations.forEach((correlation) => {
    if (correlation.experimentType === '1d') {
      // search in 1D data
      if (
        lodashGet(signals1D, correlation.atomType, []).some(
          (signal1D) => signal1D.signal.id === correlation.signal.id,
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
        lodashGet(signals2D, `${correlation.experimentType}`, []).some(
          (signal2D) =>
            signal2D.atomType.includes(correlation.atomType) &&
            signal2D.signal.id === correlation.signal.id,
        )
      ) {
        const index = removeList.indexOf(correlation);
        if (index >= 0) {
          removeList.splice(index, 1);
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

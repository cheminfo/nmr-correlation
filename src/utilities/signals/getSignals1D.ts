import signalKindsToInclude from '../../constants/signalKinds';
import { Spectrum1D } from '../../types/primary';
import {
  Experiment1DSignal,
  Experiment1DSignals,
  ExperimentsType,
} from '../../types/secondary';

import lodashGet from 'lodash/get';
import lodashCloneDeep from 'lodash/cloneDeep';
import checkSignalMatch from '../general/checkSignalMatch';

/**
 * Get all different 1D signals from experiments with allowed signal kinds in "SignalKindsToInclude"
 * @param {ExperimentsType} experiments1D
 */
export default function getSignals1D(
  experiments1D: ExperimentsType,
): Experiment1DSignals {
  // store valid signals from 1D experiments
  const _signals1D: Experiment1DSignals = {};
  Object.keys(experiments1D).forEach((atomType) => {
    const _signals: Array<Experiment1DSignal> = [];
    if (lodashGet(experiments1D, `${atomType}`, []).length > 0) {
      // @TODO for now we will use the first occurring matched spectrum only (index)
      const index = 0;
      const spectrum1D = experiments1D[`${atomType}`][index] as Spectrum1D;
      const __signals = spectrum1D.ranges.values
        .map((_range) =>
          _range.signal.filter((_signal) =>
            signalKindsToInclude.includes(_signal.kind),
          ),
        )
        .flat();
      __signals.forEach((__signal) => {
        if (
          !_signals.some((_signal) =>
            checkSignalMatch(_signal.signal.delta, __signal.delta, 0.0),
          )
        ) {
          _signals.push({
            experimentType: '1d',
            experimentID: spectrum1D.id,
            atomType,
            signal: lodashCloneDeep(__signal),
          });
        }
      });

      _signals1D[atomType] = _signals;
    }
  });

  return _signals1D;
}

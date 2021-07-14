import { allowedSignalKinds } from '../../constants/allowedSignalKinds';
import { Spectrum1D } from '../../types';
import { Experiment1DSignal } from '../../types/experiment/experiment1DSignal';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { ExperimentsType } from '../../types/experiment/experimentsType';
import { checkMatch } from '../general/checkMatch';

/**
 * Get all different 1D signals from experiments with allowed signal kinds in "signalKindsToInclude".
 *
 * @param {ExperimentsType} experiments1D
 */
export function getSignals1D(
  experiments1D: ExperimentsType,
): Experiment1DSignals {
  // store valid signals from 1D experiments
  const signals1DByAtomType: Experiment1DSignals = {};
  for (const atomType in experiments1D) {
    const signals: Array<Experiment1DSignal> = [];
    const experiment = experiments1D[`${atomType}`] || [];

    if (experiment.length === 0) continue;

    const index = 0;
    const spectrum1D = experiment[index] as Spectrum1D;

    for (const range of spectrum1D.ranges.values) {
      for (const signal of range.signal) {
        if (!allowedSignalKinds.includes(signal.kind)) continue;
        if (!checkExistence(signal, signals)) {
          signals.push({
            experimentType: '1d',
            experimentID: spectrum1D.id,
            integration: signal.integration ? signal.integration : range.integral,
            atomType,
            signal: { ...signal },
          });
        }
      }
    }

    signals1DByAtomType[atomType] = signals;
  }
  return signals1DByAtomType;
}

function checkExistence(current: any, group: Array<Experiment1DSignal>) {
  for (let i = 0; i < group.length; i++) {
    if (checkMatch(group[i].signal.delta, current.delta, 0.0)) {
      return true;
    }
  }
  return false;
}

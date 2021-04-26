import { ExperimentSignals } from '../../types/experiment/experimentSignals';
import { Spectra } from '../../types/spectrum/spectra';
import { getExperiments } from '../experiment/getExperiments';
import { getExperiments1D } from '../experiment/getExperiments1D';
import { getExperiments1DExtra } from '../experiment/getExperiments1DExtra';
import { getExperiments2D } from '../experiment/getExperiments2D';

import { getSignals2D } from './getSignal2D';
import { getSignals1D } from './getSignals1D';
import { getSignalsDEPT } from './getSignalsDEPT';

// general remark for all experiment types:
// build an array of experiments, because one could have more than
// one spectrum in spectra list for one atom type or experiment type

/**
 * Get all signals from experiments with allowed signal kinds in "SignalKindsToInclude"
 * @param {Spectra} spectraData
 */
export function getSignals(spectraData: Spectra): ExperimentSignals {
  const experiments = getExperiments(spectraData);
  const experiments1D = getExperiments1D(experiments);
  const experiments1DExtra = getExperiments1DExtra(experiments);
  const experiments2D = getExperiments2D(experiments);

  const signals1D = getSignals1D(experiments1D);
  const signals2D = getSignals2D(experiments2D);
  const signalsDEPT = getSignalsDEPT(experiments1DExtra);

  return {
    signals1D,
    signals2D,
    signalsDEPT,
  };
}

import type { ExperimentSignals } from '../../types/experiment.js';
import type { Spectra } from '../../types/spectrum.js';
import { getExperiments } from '../experiment/getExperiments.js';
import { getExperiments1D } from '../experiment/getExperiments1D.js';
import { getExperiments1DExtra } from '../experiment/getExperiments1DExtra.js';
import { getExperiments2D } from '../experiment/getExperiments2D.js';

import { getSignals1D } from './getSignals1D.js';
import { getSignals2D } from './getSignals2D.js';
import { getSignalsDEPT } from './getSignalsDEPT.js';

// general remark for all experiment types:
// build an array of experiments, because one could have more than
// one spectrum in spectra list for one atom type or experiment type

/**
 * Get all signals from experiments with allowed signal kinds in "signalKindsToInclude".
 *
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

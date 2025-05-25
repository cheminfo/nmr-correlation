import type { Experiments, ExperimentsType } from '../../types/experiment.js';
import type { Spectrum1D } from '../../types/spectrum.js';
import { getAtomTypeFromNucleus } from '../general/getAtomTypeFromNucleus.js';

import { addToExperiments } from './addToExperiments.js';

/**
 * Get "plain" 1D experiments containing ranges, i.e. without DEPT etc..
 *
 * @param {Spectra} experiments
 */
export function getExperiments1D(experiments: Experiments): ExperimentsType {
  const _experiments1D: ExperimentsType = {};
  for (const atomType of (
    (experiments['1D']?.['1d'] ?? []) as Spectrum1D[]
  ).map((experiment) => getAtomTypeFromNucleus(experiment.info.nucleus))) {
    addToExperiments(experiments, _experiments1D, '1D', '1d', true, atomType);
  }

  return _experiments1D;
}

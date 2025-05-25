import type { Experiments, ExperimentsType } from '../../types/experiment.js';

import { addToExperiments } from './addToExperiments.js';

/**
 * Get 2D experiments containing zones.
 *
 * @param {Spectra} experiments
 */
export function getExperiments2D(experiments: Experiments): ExperimentsType {
  const _experiments2D: ExperimentsType = {};
  for (const experimentType of Object.keys(experiments['2D'] ?? {})) {
    addToExperiments(
      experiments,
      _experiments2D,
      '2D',
      experimentType,
      false,
      experimentType,
    );
  }

  return _experiments2D;
}

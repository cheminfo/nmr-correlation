import lodashGet from 'lodash/get';

import type { Experiments } from '../../types/experiment/experiments';
import type { ExperimentsType } from '../../types/experiment/experimentsType';

import { addToExperiments } from './addToExperiments';

/**
 * Get 2D experiments containing zones.
 *
 * @param {Spectra} experiments
 */
export function getExperiments2D(experiments: Experiments): ExperimentsType {
  const _experiments2D: ExperimentsType = {};
  for (const experimentType of Object.keys(lodashGet(experiments, '2D', {}))) {
    addToExperiments(
      experiments,
      _experiments2D,
      `2D.${experimentType}`,
      false,
      experimentType,
    );
  }

  return _experiments2D;
}

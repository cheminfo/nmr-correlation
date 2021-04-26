import lodashGet from 'lodash/get';

import { Experiments } from '../../types/experiment/experiments';
import { ExperimentsType } from '../../types/experiment/experimentsType';

import { addToExperiments } from './addToExperiments';

/**
 * Get 2D experiments containing zones
 * @param {Spectra} spectraData
 */
export function getExperiments2D(experiments: Experiments): ExperimentsType {
  const _experiments2D: ExperimentsType = {};
  Object.keys(lodashGet(experiments, '2D', {})).forEach((experimentType) => {
    addToExperiments(
      experiments,
      _experiments2D,
      `2D.${experimentType}`,
      false,
      experimentType,
    );
  });

  return _experiments2D;
}

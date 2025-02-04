import lodashGet from 'lodash/get';

import type { Experiments } from '../../types/experiment/experiments';
import type { ExperimentsType } from '../../types/experiment/experimentsType';

import { addToExperiments } from './addToExperiments';

/**
 * Get "extra" 1D experiments containing ranges, e.g. DEPT.
 *
 * @param {Spectra} spectraData
 */
export function getExperiments1DExtra(
  experiments: Experiments,
): ExperimentsType {
  const _experiments1DExtra: ExperimentsType = {};
  Object.keys(lodashGet(experiments, `1D`, {}))
    .filter((experimentType) => experimentType !== '1d') // don't consider "plain" 1D experiments here
    .forEach((experimentType) => {
      addToExperiments(
        experiments,
        _experiments1DExtra,
        `1D.${experimentType}`,
        false,
        experimentType,
      );
    });

  return _experiments1DExtra;
}

import lodashGet from 'lodash/get';

import type { Experiments } from '../../types/experiment/experiments';
import type { ExperimentsType } from '../../types/experiment/experimentsType';
import type { Spectrum1D } from '../../types/spectrum/spectrum1D';
import { getAtomTypeFromNucleus } from '../general/getAtomTypeFromNucleus';

import { addToExperiments } from './addToExperiments';

/**
 * Get "plain" 1D experiments containing ranges, i.e. without DEPT etc..
 *
 * @param {Spectra} spectraData
 */
export function getExperiments1D(experiments: Experiments): ExperimentsType {
  const _experiments1D: ExperimentsType = {};
  (lodashGet(experiments, '1D.1d', []) as Spectrum1D[])
    .map((experiment) => getAtomTypeFromNucleus(experiment.info.nucleus))
    .forEach((atomType) => {
      addToExperiments(experiments, _experiments1D, '1D.1d', true, atomType);
    });

  return _experiments1D;
}

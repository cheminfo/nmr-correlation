import lodashGet from 'lodash/get';
import { addToExperiments } from './addToExperiments';
import { getAtomTypeFromNucleus } from '../general/getAtomTypeFromNucleus';
import { Experiments } from '../../types/experiment/experiments';
import { ExperimentsType } from '../../types/experiment/experimentsType';
import { Spectrum1D } from '../../types/spectrum/spectrum1D';

/**
 * Get "plain" 1D experiments containing ranges, i.e. without DEPT etc.
 * @param {Spectra} spectraData
 */
export function getExperiments1D(experiments: Experiments): ExperimentsType {
  const _experiments1D: ExperimentsType = {};
  (lodashGet(experiments, '1D.1d', []) as Array<Spectrum1D>)
    .map((experiment) => getAtomTypeFromNucleus(experiment.info.nucleus))
    .forEach((atomType) => {
      addToExperiments(experiments, _experiments1D, '1D.1d', true, atomType);
    });

  return _experiments1D;
}

import { Spectrum1D } from '../../types/primary';
import { Experiments, ExperimentsType } from '../../types/secondary';
import addToExperiments from './addToExperiments';
import lodashGet from 'lodash/get';

/**
 * Get "plain" 1D experiments containing ranges, i.e. without DEPT etc.
 * @param {Spectra} spectraData
 */
export default function getExperiments1D(
  experiments: Experiments,
): ExperimentsType {
  const _experiments1D: ExperimentsType = {};
  (lodashGet(experiments, '1D.1d', []) as Array<Spectrum1D>)
    .map((experiment) => getAtomType(experiment.info.nucleus))
    .forEach((atomType) => {
      addToExperiments(experiments, _experiments1D, '1D.1d', true, atomType);
    });

  return _experiments1D;
}

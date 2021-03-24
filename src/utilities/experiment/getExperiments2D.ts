import { Experiments, ExperimentsType } from '../../types/secondary';
import addToExperiments from './addToExperiments';
import lodashGet from 'lodash/get';

/**
 * Get 2D experiments containing zones
 * @param {Spectra} spectraData
 */
export default function getExperiments2D(
  experiments: Experiments,
): ExperimentsType {
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

import lodashGet from 'lodash/get';
import { Experiments } from '../../types/experiment/experiments';
import { Spectra } from '../../types/spectrum/spectra';

/**
 * Get all different experiments from spectra data
 * @param {Spectra} spectraData
 */
export function getExperiments(spectraData: Spectra): Experiments {
  const _experiments: Experiments = {};
  if (spectraData) {
    spectraData
      .filter((_data) => _data.info.isFid === false)
      .forEach((_data) => {
        if (!lodashGet(_experiments, `${_data.info.dimension}D`, false)) {
          _experiments[`${_data.info.dimension}D`] = {};
        }
        const _experiment = _data.info.experiment;
        if (
          !lodashGet(
            _experiments,
            `${_data.info.dimension}D.${_experiment}`,
            false,
          )
        ) {
          _experiments[`${_data.info.dimension}D`][`${_experiment}`] = [];
        }
        _experiments[`${_data.info.dimension}D`][`${_experiment}`].push(_data);
      });
  }
  return _experiments;
}

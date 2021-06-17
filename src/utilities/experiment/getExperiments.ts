import { Experiments } from '../../types/experiment/experiments';
import { Spectra } from '../../types/spectrum/spectra';

/**
 * Get all different experiments from spectra data.
 *
 * @param {Spectra} spectraData
 */

export function getExperiments(spectraData: Spectra): Experiments {
  if (!spectraData) return {};
  const experiments: Experiments = {};
  for (const spectrum of spectraData) {
    if (spectrum.info.isFid) continue;
    if (!experiments[`${spectrum.info.dimension}D`]) {
      experiments[`${spectrum.info.dimension}D`] = {};
    }
    const experiment = spectrum.info.experiment;
    if (!experiments[`${spectrum.info.dimension}D`][`${experiment}`]) {
      experiments[`${spectrum.info.dimension}D`][`${experiment}`] = [];
    }
    experiments[`${spectrum.info.dimension}D`][`${experiment}`].push(spectrum);
  }

  return experiments;
}

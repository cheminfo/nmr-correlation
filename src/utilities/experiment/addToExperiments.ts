import type { Experiments, ExperimentsType } from '../../types/experiment.js';
import type { Spectrum1D, Spectrum2D } from '../../types/spectrum.js';
import { getAtomTypeFromNucleus } from '../general/getAtomTypeFromNucleus.js';

/**
 * Add experiment of certain type to experiments.
 *
 * @param {Experiments} experiments
 * @param {ExperimentsType} experimentsType
 * @param {string} type1
 * @param {string} type2
 * @param {boolean} checkAtomType
 * @param {string} experimentKey
 */
export function addToExperiments(
  experiments: Experiments,
  experimentsType: ExperimentsType,
  type1: string,
  type2: string,
  checkAtomType: boolean,
  experimentKey: string,
): void {
  const _experiments = (experiments[type1]?.[type2] ?? [])
    // don't consider DEPT etc. here
    .filter((_experiment) => {
      const rangesOrZones =
        type1 === '1D'
          ? (_experiment as Spectrum1D).ranges
          : (_experiment as Spectrum2D).zones;
      const hasValues = (rangesOrZones?.values ?? []).length > 0;
      return checkAtomType
        ? getAtomTypeFromNucleus((_experiment as Spectrum1D).info.nucleus) ===
            experimentKey && hasValues
        : hasValues;
    });

  if (_experiments.length > 0) {
    experimentsType[experimentKey] = _experiments;
  }
}

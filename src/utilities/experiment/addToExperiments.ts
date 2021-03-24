import lodashGet from 'lodash/get';
import { Spectrum1D, Spectrum2D } from '../../types/primary';
import { Experiments, ExperimentsType } from '../../types/secondary';

/**
 * Add experiment of certain type to experiments
 * @param {Experiments} experiments
 * @param {ExperimentsType} experimentsType
 * @param {string} type
 * @param {boolean} checkAtomType
 * @param {string} experimentKey
 */
export default function addToExperiments(
  experiments: Experiments,
  experimentsType: ExperimentsType,
  type: string,
  checkAtomType: boolean,
  experimentKey: string,
): void {
  const _experiments = (lodashGet(experiments, `${type}`, []) as Array<
    Spectrum1D | Spectrum2D
  >) // don't consider DEPT etc. here
    .filter((_experiment) => {
      const hasValues =
        lodashGet(
          _experiment,
          type.includes('1D') ? 'ranges.values' : 'zones.values',
          [],
        ).length > 0;
      return checkAtomType === true
        ? getAtomType((_experiment as Spectrum1D).info.nucleus) ===
            experimentKey && hasValues
        : hasValues;
    });

  if (_experiments.length > 0) {
    experimentsType[experimentKey] = _experiments;
  }
}

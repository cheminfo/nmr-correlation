import { allowedSignalKinds } from '../../constants/allowedSignalKinds.js';
import type {
  Experiment2DSignal,
  Experiment2DSignals,
  ExperimentsType,
} from '../../types/experiment.js';
import type { Spectrum2D } from '../../types/spectrum.js';
import { checkMatch } from '../general/checkMatch.js';
import { getAtomTypeFromNucleus } from '../general/getAtomTypeFromNucleus.js';
import { isArrayEqual } from '../general/isArrayEqual.js';
import { isEditedHSQC } from '../general/isEditedHSQC.js';

/**
 * Get all different 2D signals from experiments with allowed signal kinds in "signalKindsToInclude".
 *
 * @param {ExperimentsType} experiments2D
 */
export function getSignals2D(
  experiments2D: ExperimentsType,
): Experiment2DSignals {
  // store valid signals from 2D experiments
  const _signals2D: Experiment2DSignals = {};
  for (const experimentType of Object.keys(experiments2D)) {
    const _signals: Experiment2DSignal[] = [];
    // for now we use the first occurring spectrum only, for each experiment type (current loop) and nuclei combination
    const indices: number[] = [];
    const nuclei: string[][] = [];
    for (const [i, _experiment] of experiments2D[experimentType].entries()) {
      const experiment: Spectrum2D = _experiment as Spectrum2D;
      if (
        !nuclei.some((_nuclei) =>
          isArrayEqual(_nuclei, experiment.info.nucleus),
        )
      ) {
        nuclei.push(experiment.info.nucleus);
        indices.push(i);
      }
    }
    for (const index of indices) {
      const spectrum2D: Spectrum2D = experiments2D[experimentType][
        index
      ] as Spectrum2D;
      const atomType = spectrum2D.info.nucleus.map((nucleus) =>
        getAtomTypeFromNucleus(nucleus),
      );
      const __signals = spectrum2D.zones.values.flatMap((zone) =>
        zone.signals.filter(
          (signal) => signal.kind && allowedSignalKinds.includes(signal.kind),
        ),
      );
      for (const signal of __signals) {
        if (
          !_signals.some(
            (_signal) =>
              checkMatch(_signal.signal.x.delta, signal.x.delta, 0) &&
              checkMatch(_signal.signal.y.delta, signal.y.delta, 0),
          )
        ) {
          _signals.push({
            experimentType,
            experimentID: spectrum2D.id,
            atomType,
            // @TODO here we assume that only one peak exists for the signal and its intensity indicates the sign
            signal: {
              ...structuredClone(signal),
              sign:
                isEditedHSQC(spectrum2D) && signal.peaks
                  ? signal.peaks[0].z >= 0
                    ? 1
                    : -1
                  : 0,
            },
          });
        }
      }
    }

    _signals2D[experimentType] = _signals;
  }

  return _signals2D;
}

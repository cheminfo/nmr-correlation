import { allowedSignalKinds } from '../../constants/allowedSignalKinds.js';
import type {
  Experiment1DSignal,
  Experiment1DSignals,
  ExperimentsType,
} from '../../types/experiment.js';
import type { Spectrum1D } from '../../types/spectrum.js';
import { checkMatch } from '../general/checkMatch.js';
import { getAtomTypeFromNucleus } from '../general/getAtomTypeFromNucleus.js';

/**
 * Get all DEPT signals from experiments with allowed signal kinds in "signalKindsToInclude".
 *
 * @param {ExperimentsType} experiments1DExtra
 */
export function getSignalsDEPT(
  experiments1DExtra: ExperimentsType,
): Experiment1DSignals {
  // store valid signals from 1D extra experiments, e.g. DEPT, APT
  const _signalsDEPT: Experiment1DSignals = {};
  // store valid signals from 2D experiments
  for (const experimentType of Object.keys(experiments1DExtra).filter(
    (experimentType) => experimentType === 'dept',
  )) {
    for (const _experimentDEPT of experiments1DExtra[experimentType]) {
      const experimentDEPT: Spectrum1D = _experimentDEPT as Spectrum1D;
      const _signals: Experiment1DSignal[] = [];
      const match: string[] | null =
        experimentDEPT.info.pulseSequence.match(/\d/g);
      if (match) {
        const mode = match.reduce((_mode, digit) => _mode + digit);
        const atomType = getAtomTypeFromNucleus(experimentDEPT.info.nucleus);
        const __signals = experimentDEPT.ranges.values.flatMap((range) =>
          range.signals
            .filter(
              (signal) =>
                signal.kind && allowedSignalKinds.includes(signal.kind),
            )
            .map((signal) => {
              return { ...signal, sign: range.absolute > 0 ? 1 : -1 };
            }),
        );
        for (const signal of __signals) {
          if (
            !_signals.some((_signal) =>
              checkMatch(_signal.signal.delta, signal.delta, 0),
            )
          ) {
            _signals.push({
              experimentType,
              experimentID: experimentDEPT.id,
              mode,
              atomType,
              signal: structuredClone(signal),
            });
          }
        }
        _signalsDEPT[mode] = _signals;
      }
    }
  }

  return _signalsDEPT;
}

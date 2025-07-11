import type { Tolerance, Values } from '../../types/correlation.js';
import type { Experiment2DSignals } from '../../types/experiment.js';

import { setProtonsCount } from './setProtonsCount.js';

/**
 * Sets proton counts from edited HSQC signals.
 *
 * @param {Values} correlations
 * @param {Experiment2DSignals} signals2D
 * @param {Tolerance} tolerance
 * @param {string} heavyAtomType
 */
export function setProtonsCountFromEditedHSQC(
  correlations: Values,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
  heavyAtomType: string,
): Values {
  const correlationsAtomTypeHSQC = correlations.filter(
    (correlation) =>
      !correlation.pseudo && correlation.atomType === heavyAtomType,
  );
  const signalsEditedHSQC = (signals2D.hsqc ?? [])
    .filter(
      (signal2D) =>
        signal2D.atomType[1] === heavyAtomType && signal2D.signal.sign !== 0,
    )
    .map((signal2D) => {
      return { delta: signal2D.signal.y.delta, sign: signal2D.signal.sign };
    });

  setProtonsCount(
    correlationsAtomTypeHSQC,
    [],
    signalsEditedHSQC,
    tolerance[heavyAtomType],
  );

  return correlations;
}

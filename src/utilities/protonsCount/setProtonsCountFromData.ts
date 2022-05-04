import { Tolerance } from '../../types/correlation/tolerance';
import { Values } from '../../types/correlation/values';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { Experiment2DSignals } from '../../types/experiment/experiment2DSignals';

import { setProtonsCountFromDEPT } from './setProtonsCountFromDEPT';
import { setProtonsCountFromEditedHSQC } from './setProtonsCountFromEditedHSQC';

/**
 * Sets proton counts from DEPT90 and/or DEPT135/edited HSQC signals, depending on what spectra data is given.
 *
 * @param {Values} correlations
 * @param {Experiment1DSignals} signalsDEPT
 * @param {Experiment2DSignals} signals2D
 * @param {Tolerance} tolerance
 */
export function setProtonsCountFromData(
  correlations: Values,
  signalsDEPT: Experiment1DSignals,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
): Values {
  const heavyAtomTypes: Array<string> = [];
  correlations.forEach((correlation) => {
    if (
      !correlation.pseudo &&
      correlation.atomType !== 'H' &&
      !heavyAtomTypes.includes(correlation.atomType)
    ) {
      heavyAtomTypes.push(correlation.atomType);
      if (Object.keys(signalsDEPT).length > 0) {
        setProtonsCountFromDEPT(
          correlations,
          signalsDEPT,
          tolerance,
          correlation.atomType,
        );
      } else {
        setProtonsCountFromEditedHSQC(
          correlations,
          signals2D,
          tolerance,
          correlation.atomType,
        );
      }
    }
  });

  return correlations;
}

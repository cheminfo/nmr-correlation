import { Values } from '../../types/correlation/values';
import { checkMatch } from '../general/checkMatch';
import { getCorrelationDelta } from '../general/getCorrelationDelta';

/**
 * Sets proton counts from DEPT90 signals and DEPT135/edited HSQC signals.
 *
 * @param {Values} correlations
 * @param {Array<{ delta: number }>} signals90
 * @param {Array<{ delta: number; sign?: number }>} signals135
 * @param {number} toleranceAtomType
 */
export function setProtonsCount(
  correlations: Values,
  signals90: Array<{ delta: number }>,
  signals135: Array<{ delta: number; sign?: number }>,
  toleranceAtomType: number,
): Values {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < correlations.length; i++) {
    const correlation = correlations[i];
    if (correlation.edited.protonsCount) {
      // do not overwrite a manually edited value
      continue;
    }
    const correlationDelta = getCorrelationDelta(correlation);

    const match = [-1, -1];
    for (let k = 0; k < signals90.length; k++) {
      if (
        // signals90[k].sign === 1 &&
        correlationDelta !== undefined &&
        checkMatch(correlationDelta, signals90[k].delta, toleranceAtomType)
      ) {
        match[0] = k;
        break;
      }
    }
    for (let k = 0; k < signals135.length; k++) {
      if (
        correlationDelta !== undefined &&
        checkMatch(correlationDelta, signals135[k].delta, toleranceAtomType)
      ) {
        match[1] = k;
        break;
      }
    }

    if (match[0] >= 0) {
      // signal match in DEPT90
      // CH
      correlation.protonsCount = [1];
      continue;
    }
    // no signal match in DEPT90
    if (match[1] >= 0) {
      // signal match in DEPT135
      if (signals135[match[1]].sign === 1) {
        // positive signal
        if (signals90.length > 0) {
          // in case of both DEPT90 and DEPT135 are given
          // CH3
          correlation.protonsCount = [3];
        } else {
          // in case of DEPT135 is given only
          // CH or CH3
          correlation.protonsCount = [1, 3];
        }
      } else {
        // negative signal
        // CH2
        correlation.protonsCount = [2];
      }
    } else if (signals135.length > 0) {
      // no signal match in both spectra
      // qC
      correlation.protonsCount = [0];
    } else {
      // no information
      correlation.protonsCount = [];
    }
  }

  return correlations;
}

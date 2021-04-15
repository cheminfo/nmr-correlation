import { Values } from '../../types/primary';
import checkSignalMatch from '../general/checkSignalMatch';

function setProtonsCount(
  correlationsAtomType: Values,
  signals90: Array<{ delta: number }>,
  signals135: Array<{ delta: number; sign?: number }>,
  toleranceAtomType: number,
): Values {
  for (let i = 0; i < correlationsAtomType.length; i++) {
    if (correlationsAtomType[i].edited.protonsCount) {
      // do not overwrite a manually edited value
      continue;
    }

    const match = [-1, -1];
    for (let k = 0; k < signals90.length; k++) {
      if (
        // signals90[k].sign === 1 &&
        checkSignalMatch(
          correlationsAtomType[i].signal.delta,
          signals90[k].delta,
          toleranceAtomType,
        )
      ) {
        match[0] = k;
        break;
      }
    }
    for (let k = 0; k < signals135.length; k++) {
      if (
        checkSignalMatch(
          correlationsAtomType[i].signal.delta,
          signals135[k].delta,
          toleranceAtomType,
        )
      ) {
        match[1] = k;
        break;
      }
    }

    if (match[0] >= 0) {
      // signal match in DEPT90
      // CH
      correlationsAtomType[i].protonsCount = [1];
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
          correlationsAtomType[i].protonsCount = [3];
          if (!correlationsAtomType[i].edited.hybridization) {
            // do not overwrite a manually edited value
            correlationsAtomType[i].hybridization = 'SP3';
          }
        } else {
          // in case of DEPT135 is given only
          // CH or CH3
          correlationsAtomType[i].protonsCount = [1, 3];
        }
      } else {
        // negative signal
        // CH2
        correlationsAtomType[i].protonsCount = [2];
      }
    } else {
      if (signals135.length > 0) {
        // no signal match in both spectra
        // qC
        correlationsAtomType[i].protonsCount = [0];
      } else {
        // no information
        correlationsAtomType[i].protonsCount = [];
      }
    }
  }

  return correlationsAtomType;
}

export default setProtonsCount;

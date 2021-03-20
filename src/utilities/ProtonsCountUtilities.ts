import lodashGet from 'lodash/get';
import { Experiment1DSignals, Experiment2DSignals, Tolerance, Values } from '../types/types';

import {
  checkSignalMatch,
  getCorrelationsByAtomType,
} from './GeneralUtilities';

function setProtonsCountFromData (
  correlations: Values,
  signalsDEPT: Experiment1DSignals,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
): Values {
  const heavyAtomTypes: Array<string> = [];
  correlations.forEach((correlation) => {
    if (
      correlation.pseudo === false &&
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

function setProtonsCountFromDEPT (
  correlations: Values,
  signalsDEPT: Experiment1DSignals,
  tolerance: Tolerance,
  atomType: string,
): Values {
  const correlationsAtomType = getCorrelationsByAtomType(
    correlations,
    atomType,
  ).filter((correlation) => correlation.pseudo === false);
  const signalsDEPT90 = lodashGet(signalsDEPT, '90', [])
    .filter((signalDEPT90) => signalDEPT90.atomType === atomType)
    .map((signalDEPT90) => signalDEPT90.signal);
  const signalsDEPT135 = lodashGet(signalsDEPT, '135', [])
    .filter((signalDEPT135) => signalDEPT135.atomType === atomType)
    .map((signalDEPT135) => signalDEPT135.signal);

  setProtonsCount(
    correlationsAtomType,
    signalsDEPT90,
    signalsDEPT135,
    tolerance[atomType],
  );

  return correlations;
}

function setProtonsCountFromEditedHSQC (
  correlations: Values,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
  heavyAtomType: string,
): Values {
  const correlationsAtomTypeHSQC = correlations.filter(
    (correlation) =>
      correlation.pseudo === false &&
      correlation.atomType === heavyAtomType,
  );
  const signalsEditedHSQC = lodashGet(signals2D, 'hsqc', [])
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

function setProtonsCount (
  correlationsAtomType: Values,
  signals90: Array<{delta: number}>,
  signals135: Array<{delta: number, sign?: number}>,
  toleranceAtomType: number,
): void {
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
}

export {
  setProtonsCount,
  setProtonsCountFromData,
  setProtonsCountFromDEPT,
  setProtonsCountFromEditedHSQC,
};

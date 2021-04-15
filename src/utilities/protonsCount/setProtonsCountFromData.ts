import { Tolerance, Values } from '../../types/primary';
import {
  Experiment1DSignals,
  Experiment2DSignals,
} from '../../types/secondary';
import setProtonsCountFromDEPT from './setProtonsCountFromDEPT';
import setProtonsCountFromEditedHSQC from './setProtonsCountFromEditedHSQC';

function setProtonsCountFromData(
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

export default setProtonsCountFromData;

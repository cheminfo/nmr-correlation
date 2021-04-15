import { Tolerance, Values } from '../../types/primary';
import { Experiment2DSignals } from '../../types/secondary';
import lodashGet from 'lodash/get';
import setProtonsCount from './setProtonsCount';

function setProtonsCountFromEditedHSQC(
  correlations: Values,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
  heavyAtomType: string,
): Values {
  const correlationsAtomTypeHSQC = correlations.filter(
    (correlation) =>
      correlation.pseudo === false && correlation.atomType === heavyAtomType,
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

export default setProtonsCountFromEditedHSQC;

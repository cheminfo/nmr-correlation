import { Tolerance, Values } from '../../types/primary';
import { Experiment1DSignals } from '../../types/secondary';
import getCorrelationsByAtomType from '../correlation/getCorrelationsByAtomType';
import setProtonsCount from './setProtonsCount';
import lodashGet from 'lodash/get';

function setProtonsCountFromDEPT(
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

export default setProtonsCountFromDEPT;

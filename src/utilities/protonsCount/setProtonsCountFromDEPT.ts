import lodashGet from 'lodash/get';

import { Tolerance } from '../../types/correlation/tolerance';
import { Values } from '../../types/correlation/values';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

import { setProtonsCount } from './setProtonsCount';

export function setProtonsCountFromDEPT(
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

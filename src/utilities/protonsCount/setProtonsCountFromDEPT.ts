import type { Tolerance, Values } from '../../types/correlation';
import type { Experiment1DSignals } from '../../types/experiment';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

import { setProtonsCount } from './setProtonsCount';

/**
 * Sets proton counts from DEPT90 signals and DEPT135 signals.
 *
 * @param {Values} correlations
 * @param {Experiment1DSignals} signalsDEPT
 * @param {Tolerance} tolerance
 * @param {string} atomType
 */
export function setProtonsCountFromDEPT(
  correlations: Values,
  signalsDEPT: Experiment1DSignals,
  tolerance: Tolerance,
  atomType: string,
): Values {
  const correlationsAtomType = getCorrelationsByAtomType(
    correlations,
    atomType,
  ).filter((correlation) => !correlation.pseudo);
  const signalsDEPT90 = (signalsDEPT['90'] ?? [])
    .filter((signalDEPT90) => signalDEPT90.atomType === atomType)
    .map((signalDEPT90) => signalDEPT90.signal);
  const signalsDEPT135 = (signalsDEPT['135'] ?? [])
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

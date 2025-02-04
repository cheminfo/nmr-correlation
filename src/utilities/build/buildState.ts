import type {
  State,
  StateAtomTypeError,
  Values,
} from '../../types/correlation';
import { getAtomCounts } from '../general/getAtomCounts';
import { getCorrelationIndex } from '../general/getCorrelationIndex';
import { getCorrelationsByAtomType } from '../general/getCorrelationsByAtomType';

/**
 * Builds a state from current values and an optional molecular formula.
 *
 * @param {Values} values
 * @param {string} mf
 */
export function buildState(values: Values, mf: string): State {
  const state: State = {};
  const atoms = getAtomCounts(mf);
  const atomTypesInCorrelations = new Set(
    values.map((correlation) => correlation.atomType),
  );

  for (const atomType of atomTypesInCorrelations) {
    const correlationsAtomType = getCorrelationsByAtomType(values, atomType);
    // create state for specific atom type only if there is at least one real correlation
    if (correlationsAtomType.some((correlation) => !correlation.pseudo)) {
      // create state error
      const stateAtomTypeError: StateAtomTypeError = {};

      const atomCount = atoms[atomType];
      // eslint-disable-next-line unicorn/no-array-reduce
      let atomCountAtomType = correlationsAtomType.reduce(
        (sum, correlation) =>
          !correlation.pseudo ? sum + correlation.equivalence : sum,
        0,
      );

      if (atomType === 'H') {
        // add protons count from pseudo correlations without any pseudo HSQC correlation
        for (const correlation of values) {
          if (
            correlation.pseudo &&
            correlation.atomType !== 'H' &&
            correlation.protonsCount.length === 1 &&
            !correlation.link.some((link) => link.experimentType === 'hsqc')
          ) {
            atomCountAtomType += correlation.protonsCount[0];
          }
        }
        // determine the number of pseudo correlations
        // eslint-disable-next-line unicorn/no-array-reduce
        const pseudoCorrelationCount = correlationsAtomType.reduce(
          (sum, correlation) => (correlation.pseudo ? sum + 1 : sum),
          0,
        );
        // determine the not attached protons
        const notAttached = correlationsAtomType.flatMap((correlation) =>
          Object.keys(correlation.attachment).length === 0
            ? getCorrelationIndex(values, correlation)
            : [],
        );
        if (notAttached.length > 0) {
          stateAtomTypeError.notAttached = notAttached;
        }
        atomCountAtomType -= notAttached.length - pseudoCorrelationCount;
        if (atomCountAtomType < 0) {
          atomCountAtomType = 0;
        }

        // determine the ambiguous attached protons
        const ambiguousAttachment = correlationsAtomType.flatMap(
          (correlation) =>
            Object.keys(correlation.attachment).length > 1 ||
            Object.keys(correlation.attachment).some(
              (otherAtomType) =>
                correlation.attachment[otherAtomType].length > 1,
            )
              ? getCorrelationIndex(values, correlation)
              : [],
        );
        if (ambiguousAttachment.length > 0) {
          stateAtomTypeError.ambiguousAttachment = ambiguousAttachment;
        }
      }

      if (atomCount !== undefined) {
        const outOfLimit = correlationsAtomType.some(
          (correlation, k) =>
            !correlation.pseudo &&
            correlation.atomType === atomType &&
            k >= atomCount,
        );
        if (outOfLimit) {
          stateAtomTypeError.outOfLimit = true;
        }
      }

      const complete =
        atomCount === undefined ? undefined : atomCountAtomType === atomCount;

      if (complete === false) {
        stateAtomTypeError.incomplete = true;
      }

      state[atomType] = {
        current: atomCountAtomType,
        total: atomCount,
        complete,
        error: stateAtomTypeError,
      };
    }
  }

  return state;
}

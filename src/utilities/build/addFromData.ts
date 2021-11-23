import { Tolerance } from '../../types/correlation/tolerance';
import { Values } from '../../types/correlation/values';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { Experiment2DSignals } from '../../types/experiment/experiment2DSignals';
import { buildLink } from '../correlation/buildLink';
import { checkMatch } from '../general/checkMatch';
import { findLinkedCorrelationsBySignalID } from '../general/findLinkedCorrelationsBySignalID';
import { getCorrelationDelta } from '../general/getCorrelationDelta';

import { addSignal } from './addSignal';

/**
 * Adds new correlations from 1D and 2D data or adds links to already existing ones.
 *
 * @param {Values} correlations
 * * @param {Experiment1DSignals} signals1D
 * @param {Experiment2DSignals} signals2D
 * @param {Tolerance} tolerance
 */
export function addFromData(
  correlations: Values,
  signals1D: Experiment1DSignals,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
): Values {
  // remove non-pseudo correlation objects without links
  correlations = correlations.filter(
    (correlation) => correlation.link.length > 0 || correlation.pseudo === true,
  );
  // add from 1D data
  Object.keys(signals1D).forEach((atomType) => {
    signals1D[atomType].forEach((signal1D) => {
      const linkedCorrelations = findLinkedCorrelationsBySignalID(
        correlations,
        signal1D.signal.id,
      );
      if (linkedCorrelations.length === 0) {
        const matchedCorrelationIndices = correlations
          .map((correlation, k) => {
            const correlationDelta = getCorrelationDelta(correlation);
            return correlation.pseudo === false &&
              correlation.atomType === atomType &&
              correlationDelta !== undefined &&
              checkMatch(
                correlationDelta,
                signal1D.signal.delta,
                tolerance[atomType],
              )
              ? k
              : -1;
          })
          .filter((index) => index >= 0)
          .filter((index, i, a) => a.indexOf(index) === i);

        const link = buildLink({
          experimentType: signal1D.experimentType,
          experimentID: signal1D.experimentID,
          signal: signal1D.signal,
          atomType: [atomType],
        });
        addSignal(matchedCorrelationIndices, atomType, link, correlations);
      }
    });
  });
  // add from 2D
  // add potential new correlations and push new links via shift matches between 1D vs. 2D and 2D vs. 2D
  Object.keys(signals2D).forEach((experimentType) =>
    signals2D[experimentType].forEach((signal2D) => {
      const linkedCorrelations = findLinkedCorrelationsBySignalID(
        correlations,
        signal2D.signal.id,
      );
      if (linkedCorrelations.length === 0) {
        signal2D.atomType.forEach((atomType, dim) => {
          const axis = dim === 0 ? 'x' : 'y';
          const matchedCorrelationIndices = correlations
            .map((correlation, k) => {
              const correlationDelta = getCorrelationDelta(correlation);
              return correlation.pseudo === false &&
                correlation.atomType === atomType &&
                correlationDelta !== undefined &&
                checkMatch(
                  correlationDelta,
                  signal2D.signal[axis].delta,
                  tolerance[atomType],
                )
                ? k
                : -1;
            })
            .filter((index) => index >= 0)
            .filter((index, i, a) => a.indexOf(index) === i);

          const link = buildLink({
            experimentType: signal2D.experimentType,
            experimentID: signal2D.experimentID,
            signal: signal2D.signal,
            axis,
            atomType: signal2D.atomType,
          });
          addSignal(matchedCorrelationIndices, atomType, link, correlations);
        });
      }
    }),
  );

  return correlations;
}

import { signalSettings } from '../../types/correlation/signalSettings';
import { Tolerance } from '../../types/correlation/tolerance';
import { Values } from '../../types/correlation/values';
import { Experiment1DSignals } from '../../types/experiment/experiment1DSignals';
import { Experiment2DSignals } from '../../types/experiment/experiment2DSignals';
import { buildLink } from '../correlation/buildLink';
import { removeLink } from '../correlation/removeLink';
import { checkMatch } from '../general/checkMatch';
import { findCorrelationBySignalID } from '../general/findCorrelationBySignalID';
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
  const previousSettingsPerSignal: signalSettings[] = [];
  // remove previous set links from 2D, but not pseudo links or edited (moved) links;
  // and store manual edited settings for each signal to restore it later, because it could be the first and
  // thus representative link for a newly attached correlation
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter((link) => {
      previousSettingsPerSignal.push({
        signalID: link.signal.id,
        axis: link.axis,
        equivalence: correlation.equivalence,
        hybridization: correlation.hybridization,
        protonsCount: correlation.protonsCount,
        edited: correlation.edited,
      });
      return link.pseudo === false && link.edited?.moved !== true;
    });
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });
  correlations = correlations.filter(
    (correlation) => correlation.link.length > 0,
  );

  // add from 1D data
  Object.keys(signals1D).forEach((atomType) => {
    signals1D[atomType].forEach((signal1D) => {
      const linkedCorrelation = findCorrelationBySignalID(
        correlations,
        signal1D.signal.id,
      );
      if (!linkedCorrelation) {
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
      const linkedCorrelation = findCorrelationBySignalID(
        correlations,
        signal2D.signal.id,
      );
      if (!linkedCorrelation) {
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

  // restore previously and manually set properties
  correlations.forEach((correlation) => {
    const previousSettings = previousSettingsPerSignal.find((setting) => {
      const link = correlation.link[0];
      return setting.signalID === link.signal.id && setting.axis === link.axis;
    });
    if (previousSettings) {
      correlation.equivalence = previousSettings.equivalence;
      correlation.hybridization = previousSettings.hybridization;
      correlation.protonsCount = previousSettings.protonsCount;
      correlation.edited = {
        ...correlation.edited,
        ...previousSettings.edited,
      };
    }
  });

  return correlations;
}

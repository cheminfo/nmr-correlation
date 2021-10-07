import { Tolerance } from '../../types/correlation/tolerance';
import { Values } from '../../types/correlation/values';
import { Experiment2DSignals } from '../../types/experiment/experiment2DSignals';
import { addLink } from '../correlation/addLink';
import { buildCorrelation } from '../correlation/buildCorrelation';
import { buildLink } from '../correlation/buildLink';
import { containsLink } from '../correlation/containsLink';
import { hasLinks } from '../correlation/hasLinks';
import { removeLink } from '../correlation/removeLink';
import { checkMatch } from '../general/checkMatch';
import { findCorrelationBySignalID } from '../general/findCorrelationBySignalID';
import { getCorrelationDelta } from '../general/getCorrelationDelta';

/**
 * Adds new correlations from 2D data or adds links to already existing ones.
 *
 * @param {Values} correlations
 * @param {Experiment2DSignals} signals2D
 * @param {Tolerance} tolerance
 */
export function addFromData2D(
  correlations: Values,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
): Values {
  // remove previous set links from 2D, but not pseudo links or edited (moved) links
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) =>
        link.pseudo === false &&
        link.experimentType !== '1d' &&
        link.edited?.moved === false,
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });
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
          // in case of no signal match -> add new signal from 2D
          if (matchedCorrelationIndices.length === 0) {
            const newCorrelation = buildCorrelation({
              atomType,
            });
            addLink(newCorrelation, link);

            const pseudoIndex = correlations.findIndex(
              (correlation) =>
                correlation.atomType === atomType &&
                correlation.pseudo === true &&
                !hasLinks(correlation),
            );
            if (pseudoIndex >= 0) {
              correlations[pseudoIndex] = newCorrelation;
            } else {
              correlations.push(newCorrelation);
            }
          } else {
            // if allowed then add links from 2D data in first match only
            if (
              !containsLink(correlations[matchedCorrelationIndices[0]], link)
            ) {
              addLink(correlations[matchedCorrelationIndices[0]], link);
            }
          }
        });
      }
    }),
  );

  return correlations;
}

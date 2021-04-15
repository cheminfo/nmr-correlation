import { Tolerance, Values } from "../../types/primary";
import { Experiment2DSignals } from "../../types/secondary";
import { addLink, buildCorrelation, hasLinks, removeLink } from "../CorrelationUtilities";
import { checkSignalMatch, containsLink } from "../GeneralUtilities";
import { buildLink } from "../LinkUtilities";

function addFromData2D(
  correlations: Values,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
): Values {
  // remove previous set links from 2D, but not pseudo links
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) => link.pseudo === false && link.experimentType !== '1d',
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });
  // add potential new correlations and push new links via shift matches between 1D vs. 2D and 2D vs. 2D
  Object.keys(signals2D).forEach((experimentType) =>
    signals2D[experimentType].forEach((signal2D) =>
      signal2D.atomType.forEach((atomType, dim) => {
        const axis = dim === 0 ? 'x' : 'y';
        const matchedCorrelationIndices = correlations
          .map((correlation, k) =>
            correlation.pseudo === false &&
            correlation.atomType === atomType &&
            checkSignalMatch(
              correlation.signal.delta,
              signal2D.signal[axis].delta,
              tolerance[atomType],
            )
              ? k
              : -1,
          )
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
            experimentType: signal2D.experimentType,
            experimentID: signal2D.experimentID,
            atomType,
            signal: {
              id: signal2D.signal.id,
              delta: signal2D.signal[axis].delta,
              sign: signal2D.signal.sign,
            },
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
          if (!containsLink(correlations[matchedCorrelationIndices[0]], link)) {
            addLink(correlations[matchedCorrelationIndices[0]], link);
            if (
              correlations[matchedCorrelationIndices[0]].experimentType === '1d'
            ) {
              // overwrite 1D signal information by 2D signal information (higher priority)
              const correlation = correlations[matchedCorrelationIndices[0]];
              correlation.signal = {
                id: signal2D.signal.id,
                delta: signal2D.signal[axis].delta,
                sign: signal2D.signal.sign,
              };
              correlation.experimentID = signal2D.experimentID;
              correlation.experimentType = signal2D.experimentType;
            }
          }
          // delete the other matching correlations (i.e. after shift tolerance increase)
          for (let i = 1; i < matchedCorrelationIndices.length; i++) {
            correlations.splice(matchedCorrelationIndices[i], 1);
          }
        }
      }),
    ),
  );

  return correlations;
}

export default addFromData2D;
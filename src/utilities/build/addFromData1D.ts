import { Tolerance, Values } from "../../types/primary";
import { Experiment1DSignals } from "../../types/secondary";
import { addLink, buildCorrelation, hasLinks, removeLink } from "../CorrelationUtilities";
import { checkSignalMatch, containsLink } from "../GeneralUtilities";
import { buildLink } from "../LinkUtilities";

function addFromData1D(
  correlations: Values,
  signals1D: Experiment1DSignals,
  tolerance: Tolerance,
): Values {
  // remove previous set links from 1D, but not pseudo links
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) => link.experimentType === '1d',
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });
  Object.keys(signals1D).forEach((atomType) => {
    signals1D[atomType].forEach((signal1D) => {
      const matchedCorrelationIndices = correlations
        .map((correlation, k) =>
          correlation.pseudo === false &&
          correlation.atomType === atomType &&
          checkSignalMatch(
            correlation.signal.delta,
            signal1D.signal.delta,
            tolerance[atomType],
          )
            ? k
            : -1,
        )
        .filter((index) => index >= 0)
        .filter((index, i, a) => a.indexOf(index) === i);
      if (matchedCorrelationIndices.length === 0) {
        const pseudoIndex = correlations.findIndex(
          (correlation) =>
            correlation.atomType === atomType &&
            correlation.pseudo === true &&
            !hasLinks(correlation),
        );
        const newCorrelation = buildCorrelation({
          ...signal1D,
        });
        if (pseudoIndex >= 0) {
          correlations[pseudoIndex] = newCorrelation;
        } else {
          correlations.push(newCorrelation);
        }
      } else {
        const link = buildLink({
          experimentType: signal1D.experimentType,
          experimentID: signal1D.experimentID,
          signal: signal1D.signal,
          atomType: [atomType],
        });
        // if allowed then add links from 1D data in first match only
        if (!containsLink(correlations[matchedCorrelationIndices[0]], link)) {
          addLink(correlations[matchedCorrelationIndices[0]], link);
        }
      }
    });
  });

  return correlations;
}

export default addFromData1D;
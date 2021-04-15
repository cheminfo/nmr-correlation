import { Correlation, Values } from "../../../types/primary";

function replacePseudoCorrelationsByEquivalences(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  Object.keys(atoms).forEach((atomType) => {
    // remove pseudo correlations to be replaced by equivalences, starting at the end
    const atomTypeEquivalencesCount = correlations.reduce(
      (sum, correlation) =>
        correlation.atomType === atomType && correlation.pseudo === false
          ? sum + (correlation.equivalence - 1)
          : sum,
      0,
    );
    const pseudoCorrelationsAtomType: Values = correlations.filter(
      (correlation) =>
        correlation.atomType === atomType && correlation.pseudo === true,
    );
    for (let i = atomTypeEquivalencesCount - 1; i >= 0; i--) {
      if (pseudoCorrelationsAtomType.length === 0) {
        break;
      }
      const pseudoCorrelationToRemove:
        | Correlation
        | undefined = pseudoCorrelationsAtomType.pop();
      if (pseudoCorrelationToRemove) {
        correlations.splice(correlations.indexOf(pseudoCorrelationToRemove), 1);
      }
    }
  });

  return correlations;
}

export default replacePseudoCorrelationsByEquivalences;
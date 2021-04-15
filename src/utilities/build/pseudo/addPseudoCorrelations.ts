import { Values } from "../../../types/primary";
import { buildCorrelation } from "../../CorrelationUtilities";
import { getCorrelationsByAtomType } from "../../GeneralUtilities";

function addPseudoCorrelations(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  Object.keys(atoms).forEach((atomType) => {
    // consider also pseudo correlations since they do not need to be added again
    const atomTypeCount = getCorrelationsByAtomType(
      correlations,
      atomType,
    ).reduce((sum, correlation) => sum + correlation.equivalence, 0);
    // add missing pseudo correlations
    for (let i = atomTypeCount; i < atoms[atomType]; i++) {
      correlations.push(
        buildCorrelation({
          atomType,
          pseudo: true,
        }),
      );
    }
  });

  return correlations;
}
export default addPseudoCorrelations;
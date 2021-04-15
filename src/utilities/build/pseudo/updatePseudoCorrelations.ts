import { Values } from "../../../types/primary";
import getAtomCounts from "../../general/getAtomCounts";
import addPseudoCorrelations from "./addPseudoCorrelations";
import checkPseudoCorrelations from "./checkPseudoCorrelations";
import replacePseudoCorrelationsByEquivalences from "./replacePseudoCorrelationsByEquivalences";

function updatePseudoCorrelations(correlations: Values, mf: string): Values {
  const atoms = getAtomCounts(mf);
  if (Object.keys(atoms).length === 0) {
    correlations = correlations.filter(
      (correlation) => correlation.pseudo === false,
    );
  }
  // add pseudo correlations
  correlations = addPseudoCorrelations(correlations, atoms);
  // remove pseudo correlations to be replaced by equivalences
  correlations = replacePseudoCorrelationsByEquivalences(correlations, atoms);
  // remove pseudo correlations which are out of limit, clean up links and proton counts
  correlations = checkPseudoCorrelations(correlations, atoms);

  return correlations;
}

export default updatePseudoCorrelations;
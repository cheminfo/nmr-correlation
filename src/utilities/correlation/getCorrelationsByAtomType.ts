import { Values } from '../../types/primary';

function getCorrelationsByAtomType(
  correlations: Values,
  atomType: string,
): Values {
  return correlations
    ? correlations.filter((correlation) => correlation.atomType === atomType)
    : [];
}

export default getCorrelationsByAtomType;

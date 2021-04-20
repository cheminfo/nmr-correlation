import { Correlation } from '../../types/correlation/correlation';
import { CorrelationData } from '../../types/correlation/correlationData';

import { buildCorrelation } from './buildCorrelation';

/**
 * Searches for a correlation index by id in correlation data and replaces it with a given correlation.
 *
 * @param {CorrelationData} data
 * @param {string} id
 * @param {Correlation} correlation
 */
export function setCorrelation(
  data: CorrelationData,
  id: string,
  correlation: Correlation,
): CorrelationData {
  const correlationIndex = data.values.findIndex(
    (_correlation) => _correlation.id === id,
  );
  const _values = data.values.slice();
  _values.splice(correlationIndex, 1, buildCorrelation({ ...correlation }));

  return {
    values: _values,
    state: data.state,
    options: data.options,
  };
}

import type { Correlation, CorrelationData } from '../../types/correlation';

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
  const _values = data.values.slice();
  const correlationIndex = _values.findIndex(
    (_correlation) => _correlation.id === id,
  );
  if (correlationIndex !== -1) {
    _values.splice(correlationIndex, 1, buildCorrelation({ ...correlation }));
  } else {
    _values.push(correlation);
  }

  return {
    values: _values,
    state: data.state,
    options: data.options,
  };
}

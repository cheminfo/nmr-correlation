import { Correlation, Values } from '../../../types/index';
import { buildCorrelation } from '../../correlation/buildCorrelation';
import { getCorrelationIndex } from '../getCorrelationIndex';

describe('getCorrelationIndex', () => {
  const correlation1: Correlation = buildCorrelation({ id: 'id1' });
  const correlation2: Correlation = buildCorrelation({ id: 'id2' });
  const values: Values = [correlation1, correlation2];

  it('getCorrelationIndex', () => {
    expect(getCorrelationIndex(values, correlation2)).toBe(1);
  });
});

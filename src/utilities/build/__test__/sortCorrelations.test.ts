import { describe, expect, it } from 'vitest';

import { buildCorrelation } from '../../correlation/buildCorrelation';
import { sortCorrelations } from '../sortCorrelations';

describe('sortCorrelations', () => {
  const correlation1 = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C1' },
  });
  const correlation2 = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C2' },
  });
  const correlation3 = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H1' },
  });
  const correlation4 = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H2' },
  });
  it('test', () => {
    expect(
      sortCorrelations([
        correlation3,
        correlation2,
        correlation4,
        correlation1,
      ]),
    ).toStrictEqual([correlation1, correlation2, correlation3, correlation4]);
  });
});

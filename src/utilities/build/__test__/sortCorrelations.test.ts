import { buildCorrelation } from '../../correlation/buildCorrelation';
import { sortCorrelations } from '../sortCorrelations';

describe('sortCorrelations', () => {
  const correlation1 = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C1' },
    signal: { delta: 30.2, id: 'id1' },
  });
  const correlation2 = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C2' },
    signal: { delta: 40.7, id: 'id2' },
  });
  const correlation3 = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H1' },
    signal: { delta: 1.0, id: 'id3' },
  });
  const correlation4 = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H2' },
    signal: { delta: 2.1, id: 'id4' },
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

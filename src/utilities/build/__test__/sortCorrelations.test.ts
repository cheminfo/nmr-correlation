import { sortCorrelations } from '../sortCorrelations';
import { buildCorrelation } from '../../correlation/buildCorrelation';

describe('sortCorrelations', () => {
  const correlation1 = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C2' },
    signal: { delta: 30.2, id: 'id1' },
  });
  const correlation2 = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C1' },
    signal: { delta: 10.7, id: 'id2' },
  });
  const correlation3 = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H1' },
    signal: { delta: 4.1, id: 'id3' },
  });
  const correlation4 = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H4' },
    signal: { delta: 2.1, id: 'id4' },
  });
  it('test', () => {
    expect(
      sortCorrelations([
        correlation1,
        correlation2,
        correlation3,
        correlation4,
      ]),
    ).toStrictEqual([correlation2, correlation1, correlation4, correlation3]);
  });
});

import { Correlation, State } from '../../../types';
import { buildCorrelation } from '../../correlation/buildCorrelation';
import { buildState } from '../buildState';

describe('buildState', () => {
  it('test 1: no values, no mf', () => {
    expect(buildState([], '')).toStrictEqual({});
  });

  it('test 2: no values, with mf', () => {
    expect(buildState([], 'C6H6')).toStrictEqual({});
  });

  it('test 3: one real correlation, with mf', () => {
    const correlation: Correlation = buildCorrelation({ atomType: 'C' });
    const expectedState: State = {
      C: { current: 1, total: 6, complete: false, error: { incomplete: true } },
    };
    expect(buildState([correlation], 'C6H6')).toStrictEqual(expectedState);
  });

  it('test 4: two real and pseudo correlations, with mf, not attached H', () => {
    const correlationC1: Correlation = buildCorrelation({ atomType: 'C' });
    const correlationC2: Correlation = buildCorrelation({
      atomType: 'C',
      pseudo: true,
    });
    const correlationH1: Correlation = buildCorrelation({ atomType: 'H' });
    const expectedState: State = {
      C: { current: 1, total: 6, complete: false, error: { incomplete: true } },
      H: {
        current: 0, // because it is not attached and thus not counted
        total: 6,
        complete: false,
        error: { incomplete: true, notAttached: [2] },
      },
    };

    expect(
      buildState([correlationC1, correlationC2, correlationH1], 'C6H6'),
    ).toStrictEqual(expectedState);
  });

  it('test 5: two real and pseudo correlations, with mf, attached H', () => {
    const correlationC1: Correlation = buildCorrelation({
      atomType: 'C',
      attachment: { H: [2] },
    });
    const correlationC2: Correlation = buildCorrelation({
      atomType: 'C',
      pseudo: true,
    });
    const correlationH1: Correlation = buildCorrelation({
      atomType: 'H',
      attachment: { C: [0] },
    });
    const expectedState: State = {
      C: { current: 1, total: 6, complete: false, error: { incomplete: true } },
      H: {
        current: 1,
        total: 6,
        complete: false,
        error: { incomplete: true },
      },
    };

    expect(
      buildState([correlationC1, correlationC2, correlationH1], 'C6H6'),
    ).toStrictEqual(expectedState);
  });

  it('test 5: three real correlations, with mf, ambiguous attachment H', () => {
    const correlationC1: Correlation = buildCorrelation({
      atomType: 'C',
      attachment: { H: [2] },
    });
    const correlationC2: Correlation = buildCorrelation({
      atomType: 'C',
      attachment: { H: [2] },
    });
    const correlationH1: Correlation = buildCorrelation({
      atomType: 'H',
      attachment: { C: [0, 1] },
    });
    const expectedState: State = {
      C: { current: 2, total: 6, complete: false, error: { incomplete: true } },
      H: {
        current: 1,
        total: 6,
        complete: false,
        error: { incomplete: true, ambiguousAttachment: [2] },
      },
    };
    expect(
      buildState([correlationC1, correlationC2, correlationH1], 'C6H6'),
    ).toStrictEqual(expectedState);
  });

  it('test 6: two correlations, with mf, out of limit', () => {
    const correlationC1: Correlation = buildCorrelation({
      atomType: 'C',
    });
    const correlationC2: Correlation = buildCorrelation({
      atomType: 'C',
    });
    const expectedState: State = {
      C: {
        current: 2,
        total: 1,
        complete: false,
        error: { incomplete: true, outOfLimit: true },
      },
    };
    expect(buildState([correlationC1, correlationC2], 'C')).toStrictEqual(
      expectedState,
    );
  });
});

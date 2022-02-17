import { spectraDataSet1 } from '../../data/spectraDataSet1';
import { spectraDataSet2 } from '../../data/spectraDataSet2';
import { spectrumEditedHSQC } from '../../data/spectrumEditedHSQC';
import { Correlation } from '../../types/correlation/correlation';
import { CorrelationData } from '../../types/correlation/correlationData';
import { Link } from '../../types/correlation/link';
import { Options } from '../../types/correlation/options';
import { State } from '../../types/correlation/state';
import { buildCorrelation } from '../../utilities/correlation/buildCorrelation';
import { buildLink } from '../../utilities/correlation/buildLink';
import { buildCorrelationData } from '../buildCorrelationData';

describe('buildCorrelationData', () => {
  const options: Options = { tolerance: { C: 0.25, H: 0.05 } };
  it('test 1: no values', () => {
    const expected: CorrelationData = { values: [], options, state: {} };
    expect(buildCorrelationData([], options)).toStrictEqual(expected);
  });

  it('test 2: with spectraDataSet1, no proton counts', () => {
    const result = buildCorrelationData(spectraDataSet1, options);

    const expectedState: State = {
      C: { current: 3, total: undefined, complete: undefined, error: {} },
      H: {
        current: 1, // index 3 (H1) is attached and counts, index 4 (H2) is not
        total: undefined,
        complete: undefined,
        error: { notAttached: [4] },
      },
    };

    const _expectedCorrelationC1: Correlation = {
      ...expectedCorrelationC1,
      id: result.values[0].id,
      link: [
        {
          atomType: ['C'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum13C',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[0].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 16.4,
            id: 'spectrum13C_range2_1',
            kind: 'signal',
            multiplicity: 'q',
            peaks: [],
          },
        },
      ],
    };
    const _expectedCorrelationC2: Correlation = {
      ...expectedCorrelationC2,
      id: result.values[1].id,
    };
    _expectedCorrelationC2.link[0].id = result.values[1].link[0].id;
    const _expectedCorrelationC3: Correlation = {
      ...expectedCorrelationC3,
      id: result.values[2].id,
      link: [
        {
          atomType: ['C'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum13C',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[2].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 110.9,
            id: 'spectrum13C_range1_1',
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        },
      ],
    };
    const _expectedCorrelationH1: Correlation = {
      ...expectedCorrelationH1,
      id: result.values[3].id,
      link: [
        {
          atomType: ['H'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum1H',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[3].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 1.7,
            id: 'spectrum1H_range1_1',
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        },
        { ...expectedCorrelationH1.link[0], id: result.values[3].link[1].id },
      ],
    };
    const _expectedCorrelationH2: Correlation = {
      ...expectedCorrelationH2,
      id: result.values[4].id,
      link: [
        {
          atomType: ['H'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum1H',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[4].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 1.8,
            id: 'spectrum1H_range1_2',
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        },
      ],
    };

    expect(result.options).toStrictEqual(options);
    expect(result.state).toStrictEqual(expectedState);
    expect(result.values).toHaveLength(5);
    expect(result.values[0]).toStrictEqual(_expectedCorrelationC1);
    expect(result.values[1]).toStrictEqual(_expectedCorrelationC2);
    expect(result.values[2]).toStrictEqual(_expectedCorrelationC3);
    expect(result.values[3]).toStrictEqual(_expectedCorrelationH1);
    expect(result.values[4]).toStrictEqual(_expectedCorrelationH2);
  });

  it('test 3: with spectraDataSet2, with proton counts via DEPT', () => {
    const result = buildCorrelationData(spectraDataSet2, options);

    const expectedState: State = {
      C: { current: 3, total: undefined, complete: undefined, error: {} },
      H: {
        current: 2, // H1 is a CH2 group (protonsCount: [2] in attached C2) and has one signal only (hence equivalence of 2), index 4 is not attached and therefore not counted
        total: undefined,
        complete: undefined,
        error: { notAttached: [4] },
      },
    };

    const _expectedCorrelationC1: Correlation = {
      ...expectedCorrelationC1,
      id: result.values[0].id,
      protonsCount: [1, 3], // there is no DEPT90 signal: we can not not distinguish between one or three
      link: [
        {
          atomType: ['C'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum13C',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[0].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 16.4,
            id: 'spectrum13C_range2_1',
            kind: 'signal',
            multiplicity: 'q',
            peaks: [],
          },
        },
      ],
    };
    const _expectedCorrelationC2: Correlation = {
      ...expectedCorrelationC2,
      id: result.values[1].id,
      protonsCount: [2],
    };
    _expectedCorrelationC2.link[0].id = result.values[1].link[0].id;
    const _expectedCorrelationC3: Correlation = {
      ...expectedCorrelationC3,
      id: result.values[2].id,
      protonsCount: [0], // no signal in DEP90 or DEPT135,
      link: [
        {
          atomType: ['C'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum13C',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[2].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 110.9,
            id: 'spectrum13C_range1_1',
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        },
      ],
    };
    const _expectedCorrelationH1: Correlation = {
      ...expectedCorrelationH1,
      id: result.values[3].id,
      equivalence: 2,
      link: [
        {
          atomType: ['H'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum1H',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[3].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 1.7,
            id: 'spectrum1H_range1_1',
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        },
        {
          atomType: ['H', 'C'],
          axis: 'x',
          edited: {},
          experimentID: 'spectrumHSQC',
          experimentLabel: '',
          experimentType: 'hsqc',
          id: result.values[3].link[1].id,
          match: [1],
          pseudo: false,
          signal: {
            id: 'spectrumHSQC_zone1_1',
            kind: 'signal',
            peaks: [],
            sign: 0,
            x: {
              delta: 1.7,
              originDelta: 1.7,
            },
            y: {
              delta: 51.3,
              originDelta: 51.3,
            },
          },
        },
      ],
    };
    const _expectedCorrelationH2: Correlation = {
      ...expectedCorrelationH2,
      id: result.values[4].id,
      link: [
        {
          atomType: ['H'],
          axis: undefined,
          edited: {},
          experimentID: 'spectrum1H',
          experimentLabel: '',
          experimentType: '1d',
          id: result.values[4].link[0].id,
          match: [],
          pseudo: false,
          signal: {
            delta: 1.8,
            id: 'spectrum1H_range1_2',
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        },
      ],
    };

    expect(result.options).toStrictEqual(options);
    expect(result.state).toStrictEqual(expectedState);
    expect(result.values).toHaveLength(5);
    expect(result.values[0]).toStrictEqual(_expectedCorrelationC1);
    expect(result.values[1]).toStrictEqual(_expectedCorrelationC2);
    expect(result.values[2]).toStrictEqual(_expectedCorrelationC3);
    expect(result.values[3]).toStrictEqual(_expectedCorrelationH1);
    expect(result.values[4]).toStrictEqual(_expectedCorrelationH2);
  });

  const expectedCorrelationC1: Correlation = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C1' },
  });
  const expectedCorrelationC2: Correlation = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C2' },
    attachment: { H: [3] },
    link: [
      buildLink({
        atomType: ['H', 'C'],
        axis: 'y',
        experimentID: 'spectrumHSQC',
        experimentLabel: '',
        experimentType: 'hsqc',
        match: [3],
        pseudo: false,
        signal: {
          id: 'spectrumHSQC_zone1_1',
          kind: 'signal',
          peaks: [],
          sign: 0,
          x: {
            delta: 1.7,
            originDelta: 1.7,
          },
          y: {
            delta: 51.3,
            originDelta: 51.3,
          },
        },
        edited: {},
      }),
    ],
  });
  const expectedCorrelationC3: Correlation = buildCorrelation({
    atomType: 'C',
    label: { origin: 'C3' },
  });
  const expectedCorrelationH1: Correlation = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H1' },
    attachment: { C: [1] },
    link: [
      buildLink({
        atomType: ['H', 'C'],
        axis: 'x',
        experimentID: 'spectrumHSQC',
        experimentLabel: '',
        experimentType: 'hsqc',
        match: [1],
        pseudo: false,
        signal: {
          id: 'spectrumHSQC_zone1_1',
          kind: 'signal',
          peaks: [],
          sign: 0,
          x: {
            delta: 1.7,
            originDelta: 1.7,
          },
          y: {
            delta: 51.3,
            originDelta: 51.3,
          },
        },
        edited: {},
      }),
    ],
  });
  const expectedCorrelationH2: Correlation = buildCorrelation({
    atomType: 'H',
    label: { origin: 'H2' },
  });

  it('test 4: with proton counts via edited HSQC', () => {
    const result = buildCorrelationData([spectrumEditedHSQC], options);

    const expectedState: State = {
      C: { current: 2, total: undefined, complete: undefined, error: {} },
      H: {
        current: 3, // H2 is a CH2 group (protonsCount: [2] in attached C2) and has one signal only (hence equivalence of 2), H1 is only counted with equivalence value of 1 since its ambiguous protonsCount
        total: undefined,
        complete: undefined,
        error: {},
      },
    };

    const link1: Link = buildLink({
      atomType: ['H', 'C'],
      experimentID: 'spectrumEditedHSQC',
      experimentLabel: '',
      experimentType: 'hsqc',
      pseudo: false,
      signal: {
        id: 'spectrumEditedHSQC_zone1_1',
        kind: 'signal',
        peaks: [{ z: 1000 }],
        sign: 1,
        x: {
          delta: 1.7,
          originDelta: 1.7,
        },
        y: {
          delta: 16.4,
          originDelta: 16.4,
        },
      },
    });

    const link2: Link = buildLink({
      atomType: ['H', 'C'],
      experimentID: 'spectrumEditedHSQC',
      experimentLabel: '',
      experimentType: 'hsqc',
      pseudo: false,
      signal: {
        id: 'spectrumEditedHSQC_zone2_1',
        kind: 'signal',
        peaks: [{ z: -1000 }],
        sign: -1,
        x: {
          delta: 1.8,
          originDelta: 1.8,
        },
        y: {
          delta: 51.3,
          originDelta: 51.3,
        },
      },
    });

    const _expectedCorrelationC1: Correlation = buildCorrelation({
      id: result.values[0].id,
      atomType: 'C',
      label: { origin: 'C1' },
      attachment: { H: [2] },
      link: [
        {
          ...link1,
          axis: 'y',
          match: [2],
          id: result.values[0].link[0].id,
          edited: {},
        },
      ],
      protonsCount: [1, 3],
    });
    const _expectedCorrelationC2: Correlation = buildCorrelation({
      id: result.values[1].id,
      atomType: 'C',
      label: { origin: 'C2' },
      attachment: { H: [3] },
      link: [
        {
          ...link2,
          axis: 'y',
          match: [3],
          id: result.values[1].link[0].id,
          edited: {},
        },
      ],
      protonsCount: [2],
    });
    const _expectedCorrelationH1: Correlation = buildCorrelation({
      id: result.values[2].id,
      atomType: 'H',
      label: { origin: 'H1' },
      attachment: { C: [0] },
      link: [
        {
          ...link1,
          axis: 'x',
          match: [0],
          id: result.values[2].link[0].id,
          edited: {},
        },
      ],
    });
    const _expectedCorrelationH2: Correlation = buildCorrelation({
      id: result.values[3].id,
      atomType: 'H',
      label: { origin: 'H2' },
      attachment: { C: [1] },
      link: [
        {
          ...link2,
          axis: 'x',
          match: [1],
          id: result.values[3].link[0].id,
          edited: {},
        },
      ],
      equivalence: 2,
    });

    expect(result.options).toStrictEqual(options);
    expect(result.state).toStrictEqual(expectedState);
    expect(result.values).toHaveLength(4);
    expect(result.values[0]).toStrictEqual(_expectedCorrelationC1);
    expect(result.values[1]).toStrictEqual(_expectedCorrelationC2);
    expect(result.values[2]).toStrictEqual(_expectedCorrelationH1);
    expect(result.values[3]).toStrictEqual(_expectedCorrelationH2);
  });
});

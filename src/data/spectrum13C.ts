import { Spectrum1D } from '../types';

export const spectrum13C: Spectrum1D = {
  id: 'spectrum13C',
  info: {
    dimension: 1,
    isFid: false,
    experiment: '1d',
    nucleus: '13C',
    pulseSequence: '1d',
  },
  ranges: {
    values: [
      {
        id: 'spectrum13C_range1',
        absolute: 100,
        integral: 1,
        kind: 'signal',
        signal: [
          {
            id: 'spectrum13C_range1_1',
            delta: 110.9,
            kind: 'signal',
            multiplicity: 'd',
            peak: [],
          },
        ],
      },
      {
        id: 'spectrum13C_range2',
        absolute: 100,
        integral: 1,
        kind: 'signal',
        signal: [
          {
            id: 'spectrum13C_range2_1',
            delta: 16.4,
            kind: 'signal',
            multiplicity: 'q',
            peak: [],
          },
          {
            id: 'spectrum13C_range2_1',
            delta: 100.1,
            kind: 'impurity',
            multiplicity: 'd',
            peak: [],
          },
        ],
      },
    ],
  },
};

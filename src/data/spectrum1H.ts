import { Spectrum1D } from '../types';

export const spectrum1H: Spectrum1D = {
  id: 'spectrum1H',
  info: {
    dimension: 1,
    isFid: false,
    experiment: '1d',
    nucleus: '1H',
    pulseSequence: '1d',
  },
  ranges: {
    values: [
      {
        id: 'spectrum1H_range1',
        absolute: 100,
        integral: 1,
        kind: 'signal',
        signal: [
          {
            id: 'spectrum1H_range1_1',
            delta: 1.7,
            kind: 'signal',
            multiplicity: 'd',
            peak: [],
          },
          {
            id: 'spectrum1H_range1_2',
            delta: 1.8,
            kind: 'signal',
            multiplicity: 'd',
            peak: [],
          },
        ],
      },
    ],
  },
};

import type { Spectrum1D } from '../types/spectrum.js';

export const spectrumDEPT135: Spectrum1D = {
  id: 'spectrumDEPT90',
  info: {
    dimension: 1,
    experiment: 'dept',
    isFid: false,
    nucleus: '13C',
    pulseSequence: 'dept135',
  },
  ranges: {
    options: {},
    values: [
      {
        // CH3
        absolute: 1000,
        integration: 1,
        id: 'DEPT90_range1',
        kind: 'signal',
        signals: [
          {
            id: 'DEPT90_range1_1',
            delta: 16.4,
            kind: 'signal',
            multiplicity: 'q',
            peaks: [],
          },
        ],
      },
      {
        // CH2
        absolute: -1000,
        integration: 1,
        id: 'DEPT90_range2',
        kind: 'signal',
        signals: [
          {
            id: 'DEPT90_range2_1',
            delta: 51.3,
            kind: 'signal',
            multiplicity: 'd',
            peaks: [],
          },
        ],
      },
    ],
  },
};

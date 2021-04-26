import { Spectrum2D } from '../types';

export const spectrumHSQC: Spectrum2D = {
  id: 'spectrumHSQC',
  info: {
    dimension: 2,
    isFid: false,
    experiment: 'hsqc',
    nucleus: ['1H', '13C'],
    pulseSequence: 'hsqc',
  },
  zones: {
    values: [
      {
        id: 'spectrumHSQC_zone1',
        kind: 'signal',
        signal: [
          {
            id: 'spectrumHSQC_zone1_1',
            x: { delta: 1.7 },
            y: { delta: 51.3 },
            kind: 'signal',
            peak: [],
            sign: 0,
          },
        ],
      },
    ],
  },
};

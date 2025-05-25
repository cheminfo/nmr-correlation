import type { Spectrum2D } from '../types/spectrum.js';

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
        signals: [
          {
            id: 'spectrumHSQC_zone1_1',
            x: { delta: 1.7, originDelta: 1.7 },
            y: { delta: 51.3, originDelta: 51.3 },
            kind: 'signal',
            peaks: [],
            sign: 0,
          },
        ],
      },
    ],
  },
};

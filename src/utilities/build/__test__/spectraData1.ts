import { Spectra, Spectrum1D, Spectrum2D } from '../../../types/index';

const spectraData1: Spectra = [];

const spectrum1H: Spectrum1D = {
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
        id: 'spectrum1H_1_range1',
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
const spectrum13C_1: Spectrum1D = {
  id: 'spectrum13C_1',
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
        id: 'spectrum13C_1_range1',
        absolute: 100,
        integral: 1,
        kind: 'signal',
        signal: [
          {
            id: 'spectrum13C_1_range1_1',
            delta: 132.4,
            kind: 'signal',
            multiplicity: 'd',
            peak: [],
          },
        ],
      },
    ],
  },
};

const spectrum13C_2: Spectrum1D = {
  id: 'spectrum13C_2',
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
        id: 'spectrum13C_2_range1',
        absolute: 100,
        integral: 1,
        kind: 'signal',
        signal: [
          {
            id: 'spectrum13C_2_range1_1',
            delta: 108.4,
            kind: 'signal',
            multiplicity: 'd',
            peak: [],
          },
        ],
      },
    ],
  },
};
const spectrumHSQC: Spectrum2D = {
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
spectraData1.push(spectrum1H);
spectraData1.push(spectrum13C_1);
spectraData1.push(spectrum13C_2);
spectraData1.push(spectrumHSQC);

export { spectraData1 };

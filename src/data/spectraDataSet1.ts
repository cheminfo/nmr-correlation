import type { Spectra } from '../types/spectrum.js';

import { spectrum13C } from './spectrum13C.js';
import { spectrum1H } from './spectrum1H.js';
import { spectrumHSQC } from './spectrumHSQC.js';

export const spectraDataSet1: Spectra = [
  spectrum1H,
  spectrum13C,
  spectrum13C,
  spectrumHSQC,
];

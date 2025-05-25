import type { Spectra } from '../types/spectrum.js';

import { spectrum13C } from './spectrum13C.js';
import { spectrum1H } from './spectrum1H.js';
import { spectrumDEPT135 } from './spectrumDEPT135.js';
import { spectrumDEPT90 } from './spectrumDEPT90.js';
import { spectrumHSQC } from './spectrumHSQC.js';

export const spectraDataSet2: Spectra = [
  spectrum1H,
  spectrum13C,
  spectrumHSQC,
  spectrumDEPT90,
  spectrumDEPT135,
];

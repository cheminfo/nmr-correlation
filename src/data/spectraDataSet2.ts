
import { Spectra } from '../types/spectrum/spectra';

import { spectrum13C } from './spectrum13C';
import { spectrum1H } from './spectrum1H';
import { spectrumDEPT135 } from './spectrumDEPT135';
import { spectrumDEPT90 } from './spectrumDEPT90';
import { spectrumHSQC } from './spectrumHSQC';

export const spectraDataSet2: Spectra = [
  spectrum1H,
  spectrum13C,
  spectrumHSQC,
  spectrumDEPT90,
  spectrumDEPT135,
];

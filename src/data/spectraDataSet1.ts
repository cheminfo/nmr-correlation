import { Spectra } from '../types/index';
import { spectrum13C } from './spectrum13C';
import { spectrum1H } from './spectrum1H';
import { spectrumHSQC } from './spectrumHSQC';

export const spectraDataSet1: Spectra = [
  spectrum1H,
  spectrum13C,
  spectrum13C,
  spectrumHSQC,
];

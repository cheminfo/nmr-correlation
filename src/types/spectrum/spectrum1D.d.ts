import { Info1D } from './info1D';
import { Ranges } from './ranges';
import { Spectrum } from './spectrum';

export interface Spectrum1D extends Spectrum {
  ranges: Ranges;
  info: Info1D;
}

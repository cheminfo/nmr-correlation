import type { Info1D } from './info1D';
import type { Ranges } from './ranges';
import type { Spectrum } from './spectrum';

export interface Spectrum1D extends Spectrum {
  ranges: Ranges;
  info: Info1D;
}

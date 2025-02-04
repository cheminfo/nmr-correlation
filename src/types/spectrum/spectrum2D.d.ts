import type { Info2D } from './info2D';
import type { Spectrum } from './spectrum';
import type { Zones } from './zones';

export interface Spectrum2D extends Spectrum {
  zones: Zones;
  info: Info2D;
}

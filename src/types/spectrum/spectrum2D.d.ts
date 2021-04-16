import { Info2D } from './info2D';
import { Spectrum } from './spectrum';
import { Zones } from './zones';

export interface Spectrum2D extends Spectrum {
  zones: Zones;
  info: Info2D;
}

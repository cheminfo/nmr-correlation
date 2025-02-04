import type { Signal2DProjection } from './nmr-processing';

export interface Signal2DAxisData extends Signal2DProjection {
  originDelta: number;
}

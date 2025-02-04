import type { Spectrum1D } from '../spectrum/spectrum1D';
import type { Spectrum2D } from '../spectrum/spectrum2D';

export type ExperimentsType = Record<string, Array<Spectrum1D | Spectrum2D>>;

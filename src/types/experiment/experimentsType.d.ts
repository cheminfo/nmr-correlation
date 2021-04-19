import { Spectrum1D } from '../spectrum/spectrum1D';
import { Spectrum2D } from '../spectrum/spectrum2D';

export type ExperimentsType = {
  [key: string]: Array<Spectrum1D | Spectrum2D>;
};
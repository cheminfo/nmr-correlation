// These types are currently copied from the nmr-processing package.
// TODO: Move to cheminfo-types.

import type { FromTo, PeakXYWidth } from 'cheminfo-types';
import type { Peak2D } from 'ml-matrix-peaks-finder';
import type { Shape1D } from 'ml-peak-shape-generator';

interface NMRPeak1D extends PeakXYWidth {
  kind?: string;
  shape?: Shape1D;
}

interface Jcoupling {
  coupling: number;
  atoms?: number[];
  assignment?: string | string[];
  diaIDs?: string[];
  multiplicity?: string;
  pathLength?: number;
}

export interface NMRSignal1D {
  delta: number;
  id?: string;
  js?: Jcoupling[];
  atoms?: number[];
  assignment?: string;
  kind?: string;
  multiplicity?: string;
  diaIDs?: string[];
  nbAtoms?: number;
  integration?: number;
  peaks?: NMRPeak1D[];
  statistic?: {
    mean: number;
    sd: number;
    min: number;
    max: number;
    nb: number;
  };
}

export interface Signal2DProjection {
  nucleus?: string;
  delta: number;
  resolution?: number;
  atoms?: number[];
  diaIDs?: string[];
}

export interface NMRSignal2D {
  x: Signal2DProjection;
  y: Signal2DProjection;
  j?: {
    pathLength?: number | FromTo;
  };
  id?: string;
  peaks?: Peak2D[];
  kind?: string;
}

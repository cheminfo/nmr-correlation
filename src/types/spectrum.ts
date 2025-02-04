import type { Options, State, Values } from './correlation';
import type {
  NMRSignal1D,
  NMRSignal2D,
  Signal2DProjection,
} from './nmr-processing';

export interface Signal1D extends Omit<NMRSignal1D, 'id'> {
  id: string;
  originDelta?: number;
}

export interface Signal2D extends Omit<NMRSignal2D, 'id' | 'x' | 'y'> {
  id: string;
  x: Signal2DAxisData;
  y: Signal2DAxisData;
  sign: number;
}

export interface Signal2DAxisData extends Signal2DProjection {
  originDelta: number;
}

export interface CorrelationData {
  values: Values;
  options: Options;
  state: State;
}

export interface Info {
  isFid: boolean;
  dimension: number;
  experiment: string;
  pulseSequence: string;
}

export interface Info1D extends Info {
  nucleus: string;
}

export interface Info2D extends Info {
  nucleus: string[];
}

export interface Range {
  id: string;
  absolute: number;
  integration: number;
  kind: string;
  signals: Signal1D[];
}

export interface Ranges {
  values: Range[];
  options?: any;
}

export type Spectra = Array<Spectrum1D | Spectrum2D>;

export interface Spectrum {
  id: string;
}

export interface Spectrum1D extends Spectrum {
  ranges: Ranges;
  info: Info1D;
}

export interface Spectrum2D extends Spectrum {
  zones: Zones;
  info: Info2D;
}

export interface Zone {
  id: string;
  signals: Signal2D[];
  kind: string;
}

export interface Zones {
  values: Zone[];
  options?: any;
}

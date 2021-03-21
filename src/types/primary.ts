import { CorrelationAndLinkFields } from './secondary';

interface Signal {
  id: string;
  kind: string;
  peak: Array<any>;
}

export interface Signal1D extends Signal {
  delta: number;
  multiplictiy: string;
}

export interface Signal2D extends Signal {
  sign: number;
  x: {
    delta: number;
    diaID?: Array<string>;
  };
  y: {
    delta: number;
    diaID?: Array<string>;
  };
}

export type Range = {
  id: string;
  absolute: number;
  integral: number;
  kind: string;
  signal: Array<Signal1D>;
};

export type Ranges = {
  values: Array<Range>;
  options?: any;
};

export type Zone = {
  id: number;
  signal: Array<Signal2D>;
  kind: string;
};

export type Zones = {
  values: Array<Zone>;
  options?: any;
};

interface Info {
  isFid: boolean;
  dimension: number;
  experiment: string;
  pulseSequence: string;
}

interface Info1D extends Info {
  nucleus: string;
}
interface Info2D extends Info {
  nucleus: Array<string>;
}

interface Spectrum {
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

export type Spectra = Array<Spectrum1D | Spectrum2D>;

export interface Link extends CorrelationAndLinkFields {
  atomType: Array<string>;
  signal: Signal1D | Signal2D;
  axis: string;
  match: Array<number>;
  experimentLabel: string;
}

export type CorrelationSignal = {
  id: string;
  delta: number;
  sign?: number;
};

export interface Correlation extends CorrelationAndLinkFields {
  atomType: string;
  signal: CorrelationSignal;
  label: { [key: string]: string };
  link: Array<Link>;
  equivalence: number;
  attachment: { [atomType: string]: Array<number> };
  protonsCount: Array<number>;
  hybridization: string;
  edited: { [key: string]: boolean };
}
export type Values = Array<Correlation>;

export type Tolerance = {
  [atomType: string]: number;
};

export type Options = {
  tolerance: Tolerance;
  mf?: string;
};

export type StateAtomTypeError = {
  [errorKey: string]: boolean | Array<number>;
};

export type StateAtomType = {
  current: number;
  total?: number;
  complete?: boolean;
  error?: StateAtomTypeError;
};

export type State = {
  [atomType: string]: StateAtomType;
};

export type CorrelationData = {
  values: Values;
  options: Options;
  state: State;
};

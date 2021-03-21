import {
  Link,
  Signal1D,
  Signal2D,
  CorrelationSignal,
  Spectrum1D,
  Spectrum2D,
} from './primary';

interface ExperimentSignal {
  experimentType: string;
  experimentID: string;
}
export interface Experiment1DSignal extends ExperimentSignal {
  atomType: string;
  signal: Signal1D;
  mode?: string;
}
export type Experiment1DSignals = {
  [atomType: string]: Array<Experiment1DSignal>;
};
export interface Experiment2DSignal extends ExperimentSignal {
  atomType: Array<string>;
  signal: Signal2D;
}
export type Experiment2DSignals = {
  [atomType: string]: Array<Experiment2DSignal>;
};

export type ExperimentSignals = {
  signals1D: Experiment1DSignals;
  signals2D: Experiment2DSignals;
  signalsDEPT: Experiment1DSignals;
};

export type ExperimentsType = {
  [key: string]: Array<Spectrum1D | Spectrum2D>;
};

export type Experiments = {
  [key: string]: ExperimentsType;
};

export interface CorrelationAndLinkFields {
  id: string;
  experimentType: string;
  experimentID: string;
  pseudo: boolean;
}

interface CorrelationAndLinkOptions {
  id?: string;
  experimentType?: string;
  experimentID?: string;
  pseudo?: boolean;
}
export interface LinkOptions extends CorrelationAndLinkOptions {
  atomType?: Array<string>;
  signal?: Signal1D | Signal2D;
  axis?: string;
  match?: Array<number>;
  experimentLabel?: string;
}

export interface CorrelationOptions extends CorrelationAndLinkOptions {
  atomType?: string;
  signal?: CorrelationSignal;
  label?: { [key: string]: string };
  link?: Array<Link>;
  equivalence?: number;
  attachment?: { [atomType: string]: Array<number> };
  protonsCount?: Array<number>;
  hybridization?: string;
  edited?: { [key: string]: boolean };
}

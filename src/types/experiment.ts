import type { Signal1D, Signal2D, Spectrum1D, Spectrum2D } from './spectrum';

export interface Experiment1DSignal extends ExperimentSignal {
  atomType: string;
  signal: Signal1D;
  integration?: number;
  mode?: string;
}

export type Experiment1DSignals = Record<string, Experiment1DSignal[]>;

export interface Experiment2DSignal extends ExperimentSignal {
  atomType: string[];
  signal: Signal2D;
}

export type Experiment2DSignals = Record<string, Experiment2DSignal[]>;

export type Experiments = Record<string, ExperimentsType>;

export interface ExperimentSignal {
  experimentType: string;
  experimentID: string;
}

export interface ExperimentSignals {
  signals1D: Experiment1DSignals;
  signals2D: Experiment2DSignals;
  signalsDEPT: Experiment1DSignals;
}

export type ExperimentsType = Record<string, Array<Spectrum1D | Spectrum2D>>;

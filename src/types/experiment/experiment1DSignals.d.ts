import { Experiment1DSignal } from './experiment1DSignal';

export interface Experiment1DSignals {
  [atomType: string]: Array<Experiment1DSignal>;
}

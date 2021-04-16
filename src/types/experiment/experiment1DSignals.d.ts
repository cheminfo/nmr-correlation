import { Experiment1DSignal } from './experiment1DSignal';

export type Experiment1DSignals = {
  [atomType: string]: Array<Experiment1DSignal>;
};

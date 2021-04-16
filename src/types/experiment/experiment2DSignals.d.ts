import { Experiment2DSignal } from './experiment2DSignal';

export type Experiment2DSignals = {
  [atomType: string]: Array<Experiment2DSignal>;
};

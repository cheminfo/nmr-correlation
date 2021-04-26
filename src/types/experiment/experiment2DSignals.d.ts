import { Experiment2DSignal } from './experiment2DSignal';

export interface Experiment2DSignals {
  [atomType: string]: Array<Experiment2DSignal>;
}

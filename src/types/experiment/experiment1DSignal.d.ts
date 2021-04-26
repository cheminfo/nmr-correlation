import { Signal1D } from '../spectrum/signal1D';

import { ExperimentSignal } from './experimentSignal';

export interface Experiment1DSignal extends ExperimentSignal {
  atomType: string;
  signal: Signal1D;
  mode?: string;
}

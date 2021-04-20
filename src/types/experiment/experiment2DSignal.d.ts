import { Signal2D } from '../spectrum/signal2D';

import { ExperimentSignal } from './experimentSignal';

export interface Experiment2DSignal extends ExperimentSignal {
  atomType: Array<string>;
  signal: Signal2D;
}

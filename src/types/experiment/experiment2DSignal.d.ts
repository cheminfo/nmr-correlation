import type { Signal2D } from '../spectrum/Signal2D';

import type { ExperimentSignal } from './experimentSignal';

export interface Experiment2DSignal extends ExperimentSignal {
  atomType: string[];
  signal: Signal2D;
}

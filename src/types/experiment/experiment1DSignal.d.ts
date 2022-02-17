import { Signal1D } from '../spectrum/Signal1D';

import { ExperimentSignal } from './experimentSignal';

export interface Experiment1DSignal extends ExperimentSignal {
  atomType: string;
  signal: Signal1D;
  integration?: number;
  mode?: string;
}

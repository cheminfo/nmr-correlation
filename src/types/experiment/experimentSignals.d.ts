import type { Experiment1DSignals } from './experiment1DSignals';
import type { Experiment2DSignals } from './experiment2DSignals';

export interface ExperimentSignals {
  signals1D: Experiment1DSignals;
  signals2D: Experiment2DSignals;
  signalsDEPT: Experiment1DSignals;
}

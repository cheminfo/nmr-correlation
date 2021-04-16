import { Experiment1DSignals } from './experiment1DSignals';
import { Experiment2DSignals } from './experiment2DSignals';

export type ExperimentSignals = {
  signals1D: Experiment1DSignals;
  signals2D: Experiment2DSignals;
  signalsDEPT: Experiment1DSignals;
};

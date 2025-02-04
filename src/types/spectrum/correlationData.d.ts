import type { Options } from '../correlation/options';
import type { State } from '../correlation/state';
import type { Values } from '../correlation/values';

export interface CorrelationData {
  values: Values;
  options: Options;
  state: State;
}

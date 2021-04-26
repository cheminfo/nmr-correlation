import { Options } from '../correlation/options';
import { State } from '../correlation/state';
import { Values } from '../correlation/values';

export interface CorrelationData {
  values: Values;
  options: Options;
  state: State;
}

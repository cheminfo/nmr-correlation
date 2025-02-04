import type { Options } from './options';
import type { State } from './state';
import type { Values } from './values';

export interface CorrelationData {
  values: Values;
  options: Options;
  state: State;
}

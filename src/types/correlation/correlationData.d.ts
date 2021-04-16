import { Options } from './options';
import { State } from './state';
import { Values } from './values';

export type CorrelationData = {
  values: Values;
  options: Options;
  state: State;
};

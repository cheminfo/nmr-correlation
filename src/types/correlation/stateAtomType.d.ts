import { StateAtomTypeError } from './stateAtomTypeError';

export interface StateAtomType {
  current: number;
  total?: number;
  complete?: boolean;
  error?: StateAtomTypeError;
}

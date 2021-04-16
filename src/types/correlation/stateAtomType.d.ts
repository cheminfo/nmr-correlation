import { StateAtomTypeError } from './stateAtomTypeError';

export type StateAtomType = {
  current: number;
  total?: number;
  complete?: boolean;
  error?: StateAtomTypeError;
};

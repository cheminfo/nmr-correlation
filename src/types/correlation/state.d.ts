import { StateAtomType } from './stateAtomType';

export interface State {
  [atomType: string]: StateAtomType;
}

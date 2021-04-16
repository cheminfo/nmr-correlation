import { StateAtomType } from './stateAtomType';

export type State = {
  [atomType: string]: StateAtomType;
};

import { Signal1D } from './signal1D';

export type Range = {
  id: string;
  absolute: number;
  integral: number;
  kind: string;
  signal: Array<Signal1D>;
};

import { Signal2D } from './signal2D';

export type Zone = {
  id: string;
  signal: Array<Signal2D>;
  kind: string;
};

import { Signal2D } from './signal2D';

export type Zone = {
  id: number;
  signal: Array<Signal2D>;
  kind: string;
};

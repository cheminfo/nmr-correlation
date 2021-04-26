import { Signal2D } from './signal2D';

export interface Zone {
  id: string;
  signal: Array<Signal2D>;
  kind: string;
}

import { Signal2D } from './signal2D';

export interface Zone {
  id: string;
  signals: Array<Signal2D>;
  kind: string;
}

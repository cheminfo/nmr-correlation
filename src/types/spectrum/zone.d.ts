import { Signal2D } from './Signal2D';

export interface Zone {
  id: string;
  signals: Array<Signal2D>;
  kind: string;
}

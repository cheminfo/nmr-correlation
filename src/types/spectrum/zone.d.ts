import type { Signal2D } from './Signal2D';

export interface Zone {
  id: string;
  signals: Signal2D[];
  kind: string;
}

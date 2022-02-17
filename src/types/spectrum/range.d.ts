import { Signal1D } from './Signal1D';

export interface Range {
  id: string;
  absolute: number;
  integration: number;
  kind: string;
  signals: Array<Signal1D>;
}

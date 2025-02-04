import type { Tolerance } from './tolerance';
import type { Values } from './values';

export interface Options {
  tolerance: Tolerance;
  mf?: string;
  values?: Values;
  skipDataUpdate?: boolean;
}

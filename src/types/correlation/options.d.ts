import { Tolerance } from './tolerance';
import { Values } from './values';

export interface Options {
  tolerance: Tolerance;
  mf?: string;
  values?: Values;
  skipDataUpdate?: boolean;
}

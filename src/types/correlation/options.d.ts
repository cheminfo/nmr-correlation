import { Values } from '..';

import { Tolerance } from './tolerance';

export interface Options {
  tolerance: Tolerance;
  mf?: string;
  values?: Values;
  skipDataUpdate?: boolean;
}

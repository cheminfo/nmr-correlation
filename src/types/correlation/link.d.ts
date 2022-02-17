import { Signal1D } from '../spectrum/Signal1D';
import { Signal2D } from '../spectrum/Signal2D';

import { CorrelationAndLinkFields } from './correlationAndLinkFields';

export interface Link extends CorrelationAndLinkFields {
  atomType: Array<string>;
  signal: Signal1D | Signal2D;
  axis: string | undefined;
  match: Array<number>;
  experimentLabel: string;
  experimentType: string;
  experimentID: string;
}

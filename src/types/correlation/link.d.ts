import { Signal1D } from '../spectrum/signal1D';
import { Signal2D } from '../spectrum/signal2D';

import { CorrelationAndLinkFields } from './correlationAndLinkFields';

export interface Link extends CorrelationAndLinkFields {
  atomType: Array<string>;
  signal: Signal1D | Signal2D;
  axis: string;
  match: Array<number>;
  experimentLabel: string;
}

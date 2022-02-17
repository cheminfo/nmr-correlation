import { Signal1D } from '../spectrum/Signal1D';
import { Signal2D } from '../spectrum/Signal2D';

import { CorrelationAndLinkOptions } from './correlationAndLinkOptions';

export interface LinkOptions extends CorrelationAndLinkOptions {
  atomType?: Array<string>;
  experimentType?: string;
  experimentID?: string;
  signal?: Signal1D | Signal2D;
  axis?: string;
  match?: Array<number>;
  experimentLabel?: string;
}

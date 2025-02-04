import type { Signal1D } from '../spectrum/Signal1D';
import type { Signal2D } from '../spectrum/Signal2D';

import type { CorrelationAndLinkOptions } from './correlationAndLinkOptions';

export interface LinkOptions extends CorrelationAndLinkOptions {
  atomType?: string[];
  experimentType?: string;
  experimentID?: string;
  signal?: Signal1D | Signal2D;
  axis?: string;
  match?: number[];
  experimentLabel?: string;
}

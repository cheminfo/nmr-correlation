import type { Signal1D } from '../spectrum/Signal1D';
import type { Signal2D } from '../spectrum/Signal2D';

import type { CorrelationAndLinkFields } from './correlationAndLinkFields';

export interface Link extends CorrelationAndLinkFields {
  atomType: string[];
  signal: Signal1D | Signal2D;
  axis: string | undefined;
  match: number[];
  experimentLabel: string;
  experimentType: string;
  experimentID: string;
}

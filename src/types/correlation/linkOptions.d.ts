import { Signal1D } from '../spectrum/signal1D';
import { Signal2D } from '../spectrum/signal2D';
import { CorrelationAndLinkOptions } from './correlationAndLinkOptions';

export interface LinkOptions extends CorrelationAndLinkOptions {
  atomType?: Array<string>;
  signal?: Signal1D | Signal2D;
  axis?: string;
  match?: Array<number>;
  experimentLabel?: string;
}

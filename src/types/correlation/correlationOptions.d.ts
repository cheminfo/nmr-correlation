import { CorrelationAndLinkOptions } from './correlationAndLinkOptions';
import { CorrelationSignal } from './correlationSignal';
import { Link } from './link';

export interface CorrelationOptions extends CorrelationAndLinkOptions {
  atomType?: string;
  signal?: CorrelationSignal;
  label?: { [key: string]: string };
  link?: Array<Link>;
  equivalence?: number;
  attachment?: { [atomType: string]: Array<number> };
  protonsCount?: Array<number>;
  hybridization?: string;
}

import { CorrelationAndLinkOptions } from './correlationAndLinkOptions';
import { Link } from './link';

export interface CorrelationOptions extends CorrelationAndLinkOptions {
  atomType?: string;
  label?: { [key: string]: string };
  link?: Array<Link>;
  equivalence?: number;
  attachment?: { [atomType: string]: Array<number> };
  protonsCount?: Array<number>;
  hybridization?: number[];
}

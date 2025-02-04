import type { CorrelationAndLinkOptions } from './correlationAndLinkOptions';
import type { Link } from './link';

export interface CorrelationOptions extends CorrelationAndLinkOptions {
  atomType?: string;
  label?: Record<string, string>;
  link?: Link[];
  equivalence?: number;
  attachment?: Record<string, number[]>;
  protonsCount?: number[];
  hybridization?: number[];
}

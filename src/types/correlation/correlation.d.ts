import type { CorrelationAndLinkFields } from './correlationAndLinkFields';
import type { Link } from './link';

export interface Correlation extends CorrelationAndLinkFields {
  atomType: string;
  label: Record<string, string>;
  link: Link[];
  equivalence: number;
  attachment: Record<string, number[]>;
  protonsCount: number[];
  hybridization: number[];
}

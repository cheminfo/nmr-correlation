import { CorrelationAndLinkFields } from './correlationAndLinkFields';
import { CorrelationSignal } from './correlationSignal';
import { Link } from './link';

export interface Correlation extends CorrelationAndLinkFields {
  atomType: string;
  signal: CorrelationSignal;
  label: { [key: string]: string };
  link: Array<Link>;
  equivalence: number;
  attachment: { [atomType: string]: Array<number> };
  protonsCount: Array<number>;
  hybridization: string;
  edited: { [key: string]: boolean };
}

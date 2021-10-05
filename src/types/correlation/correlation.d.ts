import { CorrelationAndLinkFields } from './correlationAndLinkFields';
import { Link } from './link';

export interface Correlation extends CorrelationAndLinkFields {
  atomType: string;
  label: { [key: string]: string };
  link: Array<Link>;
  equivalence: number;
  attachment: { [atomType: string]: Array<number> };
  protonsCount: Array<number>;
  hybridization: string;
}

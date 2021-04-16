import { Correlation } from '../../types/correlation/correlation';

export function removeAttachments(correlation: Correlation): Correlation {
  correlation.attachment = {};

  return correlation;
}

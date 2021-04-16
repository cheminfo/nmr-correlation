import { Correlation } from '../../types/correlation/correlation';
import { hasAttachmentAtomType } from './hasAttachmentAtomType';

export function addAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): Correlation {
  if (!hasAttachmentAtomType(correlation, atomType)) {
    correlation.attachment[atomType] = [];
  }

  return correlation;
}

import { Correlation } from '../../types/correlation/correlation';
import { addAttachmentAtomType } from './addAttachmentAtomType';

export function addAttachment(
  correlation: Correlation,
  atomType: string,
  attachment: number,
): Correlation {
  addAttachmentAtomType(correlation, atomType);
  if (!correlation.attachment[atomType].includes(attachment)) {
    correlation.attachment[atomType].push(attachment);
  }

  return correlation;
}

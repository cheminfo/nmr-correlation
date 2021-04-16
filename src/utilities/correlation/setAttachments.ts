import { Correlation } from '../../types/correlation/correlation';
import { addAttachmentAtomType } from './addAttachmentAtomType';

export function setAttachments(
  correlation: Correlation,
  atomType: string,
  attachments: Array<number>,
): Correlation {
  addAttachmentAtomType(correlation, atomType);
  correlation.attachment[atomType] = attachments;

  return correlation;
}

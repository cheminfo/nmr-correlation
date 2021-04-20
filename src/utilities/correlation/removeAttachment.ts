import { Correlation } from '../../types/correlation/correlation';

import { hasAttachmentAtomType } from './hasAttachmentAtomType';

export function removeAttachment(
  correlation: Correlation,
  atomType: string,
  attachment: number,
): Correlation {
  if (hasAttachmentAtomType(correlation, atomType)) {
    const indexOf = correlation.attachment[atomType].indexOf(attachment);
    if (indexOf >= 0) {
      correlation.attachment[atomType].splice(indexOf, 1);
    }
  }

  return correlation;
}

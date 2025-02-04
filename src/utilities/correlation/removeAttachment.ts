import type { Correlation } from '../../types/correlation/correlation';

import { hasAttachmentAtomType } from './hasAttachmentAtomType';

/**
 * Removes an attachment index.
 *
 * @param {Correlation} correlation
 * @param {string} atomType
 * @param {number} attachment
 */
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

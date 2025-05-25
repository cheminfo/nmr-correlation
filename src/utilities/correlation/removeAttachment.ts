import type { Correlation } from '../../types/correlation.js';

import { hasAttachmentAtomType } from './hasAttachmentAtomType.js';

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
    if (indexOf !== -1) {
      correlation.attachment[atomType].splice(indexOf, 1);
    }
  }

  return correlation;
}

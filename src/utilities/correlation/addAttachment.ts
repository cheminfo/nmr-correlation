import type { Correlation } from '../../types/correlation.js';

import { addAttachmentAtomType } from './addAttachmentAtomType.js';

/**
 * Adds an attachment for a certain atom type to a correlation.
 *
 * @param {Correlation} correlation
 * @param {string} atomType
 * @param {number} attachment
 */
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

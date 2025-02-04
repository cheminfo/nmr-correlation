import type { Correlation } from '../../types/correlation/correlation';

import { addAttachmentAtomType } from './addAttachmentAtomType';

/**
 * Sets an attachment array for a given correlation and atom type.
 *
 * @param {Correlation} correlation
 * @param {string} atomType
 * @param {Array<number>} attachments
 */
export function setAttachments(
  correlation: Correlation,
  atomType: string,
  attachments: number[],
): Correlation {
  addAttachmentAtomType(correlation, atomType);
  correlation.attachment[atomType] = attachments;

  return correlation;
}

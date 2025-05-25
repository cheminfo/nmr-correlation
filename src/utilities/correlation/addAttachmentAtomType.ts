import type { Correlation } from '../../types/correlation.js';

import { hasAttachmentAtomType } from './hasAttachmentAtomType.js';

/**
 * Creates an attachment array for a certain atom type in a correlation.
 *
 * @param {Correlation} correlation
 * @param {string} atomType
 */
export function addAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): Correlation {
  if (!hasAttachmentAtomType(correlation, atomType)) {
    correlation.attachment[atomType] = [];
  }

  return correlation;
}

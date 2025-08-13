import type { Correlation } from '../../types/correlation.js';

/**
 * Checks whether an atom type key in attachments already exists.
 *
 * @param {Correlation} correlation
 * @param {string} atomType
 */
export function hasAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): boolean {
  return (
    correlation.attachment[atomType] !== undefined &&
    correlation.attachment[atomType].length > 0
  );
}

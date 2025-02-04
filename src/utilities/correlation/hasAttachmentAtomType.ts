import type { Correlation } from '../../types/correlation';

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
  return Boolean(
    correlation.attachment[atomType] &&
      correlation.attachment[atomType].length > 0,
  );
}

import { Correlation } from '../../types/correlation/correlation';

export function hasAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): boolean {
  return correlation.attachment[atomType] &&
    correlation.attachment[atomType].length > 0
    ? true
    : false;
}

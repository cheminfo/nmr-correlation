import { Correlation } from '../../types/primary';

function hasAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): boolean {
  return correlation.attachment[atomType] &&
    correlation.attachment[atomType].length > 0
    ? true
    : false;
}

export default hasAttachmentAtomType;

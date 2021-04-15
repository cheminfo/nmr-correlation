import { Correlation } from '../../types/primary';
import hasAttachmentAtomType from './hasAttachmentAtomType';

function addAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): Correlation {
  if (!hasAttachmentAtomType(correlation, atomType)) {
    correlation.attachment[atomType] = [];
  }

  return correlation;
}

export default addAttachmentAtomType;

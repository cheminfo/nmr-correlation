import { Correlation } from '../../types/primary';
import hasAttachmentAtomType from './hasAttachmentAtomType';

function removeAttachment(
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

export default removeAttachment;

import { Correlation } from '../../types/primary';
import addAttachmentAtomType from './addAttachmentAtomType';

function addAttachment(
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

export default addAttachment;

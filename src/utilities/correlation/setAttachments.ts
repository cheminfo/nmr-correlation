import { Correlation } from '../../types/primary';
import addAttachmentAtomType from './addAttachmentAtomType';

function setAttachments(
  correlation: Correlation,
  atomType: string,
  attachments: Array<number>,
): Correlation {
  addAttachmentAtomType(correlation, atomType);
  correlation.attachment[atomType] = attachments;

  return correlation;
}

export default setAttachments;

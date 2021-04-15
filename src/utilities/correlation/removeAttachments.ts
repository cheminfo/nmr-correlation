import { Correlation } from '../../types/primary';

function removeAttachments(correlation: Correlation): Correlation {
  correlation.attachment = {};

  return correlation;
}

export default removeAttachments;

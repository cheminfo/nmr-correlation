import type { Correlation } from '../../types/correlation';

/**
 * Removes all attachments of a correlation.
 *
 * @param {Correlation} correlation
 */
export function removeAttachments(correlation: Correlation): Correlation {
  correlation.attachment = {};

  return correlation;
}

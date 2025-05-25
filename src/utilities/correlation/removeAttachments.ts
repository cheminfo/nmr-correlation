import type { Correlation } from '../../types/correlation.js';

/**
 * Removes all attachments of a correlation.
 *
 * @param {Correlation} correlation
 */
export function removeAttachments(correlation: Correlation): Correlation {
  correlation.attachment = {};

  return correlation;
}

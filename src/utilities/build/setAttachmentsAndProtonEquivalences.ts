import { Values } from '../../types/correlation/values';
import { addAttachment } from '../correlation/addAttachment';
import { hasAttachmentAtomType } from '../correlation/hasAttachmentAtomType';
import { removeAttachments } from '../correlation/removeAttachments';

/**
 * Sets the attachment information (indices of attached atoms).
 * And from that, the equivalence value for protons can be set too.
 *
 * @param {Values} values
 */
export function setAttachmentsAndProtonEquivalences(
  correlations: Values,
): Values {
  // update attachment information between heavy atoms and protons via HSQC or HMQC
  for (const correlation of correlations) {
    // remove previous set attachments
    removeAttachments(correlation);
    // add attachments
    const linksFiltered = correlation.link.filter(
      (link) =>
        link.experimentType === 'hsqc' || link.experimentType === 'hmqc',
    );

    for (const link of linksFiltered) {
      const otherAtomType = link.atomType[link.axis === 'x' ? 1 : 0];
      for (let matchIndex of link.match) {
        addAttachment(correlation, otherAtomType, matchIndex);
      }
    }
  }
  // reset previously set proton equivalences and set new ones
  // check heavy atoms with an unambiguous protons count
  for (const correlation of correlations) {
    if (
      correlation.atomType !== 'H' &&
      correlation.protonsCount.length === 1 &&
      hasAttachmentAtomType(correlation, 'H')
    ) {
      const { equivalence, protonsCount } = correlation;

      let equivalences = 1;
      if (protonsCount[0] === 3) {
        equivalences = 3;
      } else if (protonsCount[0] === 2) {
        equivalences = 2;
      }
      const sharedEquivalences =
        (equivalence * equivalences) / correlation.attachment.H.length;

      for (const attachedProtonIndex of correlation.attachment.H) {
        correlations[attachedProtonIndex].equivalence = sharedEquivalences;
      }
    }
  }

  return correlations;
}

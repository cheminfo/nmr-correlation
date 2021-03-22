import { Correlation, CorrelationData, Link } from '../types/primary';
import { CorrelationOptions } from '../types/secondary';
import generateID from './generateID';

function buildCorrelation(options: CorrelationOptions): Correlation {
  return {
    id: options.id || generateID(),
    experimentType: options.experimentType,
    experimentID: options.experimentID,
    atomType: options.atomType,
    signal: options.signal,
    label: options.label || {},
    link: options.link || [],
    equivalence: options.equivalence || 1,
    attachment: options.attachment || {},
    protonsCount: options.protonsCount || [],
    hybridization: options.hybridization || '',
    pseudo: options.pseudo || false,
    edited: options.edited || {},
  } as Correlation;
}

function addLink(correlation: Correlation, link: Link): void {
  correlation.link.push(link);
}

function removeLink(correlation: Correlation, id: string): void {
  correlation.link = correlation.link.filter((_link) => _link.id !== id);
}

function hasLinks(correlation: Correlation): boolean {
  return correlation.link.length > 0;
}

function hasAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): boolean {
  return correlation.attachment[atomType] &&
    correlation.attachment[atomType].length > 0
    ? true
    : false;
}

function addAttachmentAtomType(
  correlation: Correlation,
  atomType: string,
): void {
  if (!hasAttachmentAtomType(correlation, atomType)) {
    correlation.attachment[atomType] = [];
  }
}

function setAttachments(
  correlation: Correlation,
  atomType: string,
  attachments: Array<number>,
): void {
  addAttachmentAtomType(correlation, atomType);
  correlation.attachment[atomType] = attachments;
}

function addAttachment(
  correlation: Correlation,
  atomType: string,
  attachment: number,
): void {
  addAttachmentAtomType(correlation, atomType);
  if (!correlation.attachment[atomType].includes(attachment)) {
    correlation.attachment[atomType].push(attachment);
  }
}

function removeAttachment(
  correlation: Correlation,
  atomType: string,
  attachment: number,
): void {
  if (hasAttachmentAtomType(correlation, atomType)) {
    const indexOf = correlation.attachment[atomType].indexOf(attachment);
    if (indexOf >= 0) {
      correlation.attachment[atomType].splice(indexOf, 1);
    }
  }
}

function removeAttachments(correlation: Correlation): void {
  correlation.attachment = {};
}

function setCorrelation(
  data: CorrelationData,
  id: string,
  correlation: Correlation,
): CorrelationData {
  const correlationIndex = data.values.findIndex(
    (_correlation) => _correlation.id === id,
  );
  const _values = data.values.slice();
  _values.splice(correlationIndex, 1, buildCorrelation({ ...correlation }));

  return {
    values: _values,
    state: data.state,
    options: data.options,
  };
}

export {
  addAttachment,
  addAttachmentAtomType,
  addLink,
  buildCorrelation,
  hasAttachmentAtomType,
  hasLinks,
  removeAttachment,
  removeAttachments,
  removeLink,
  setAttachments,
  setCorrelation,
};

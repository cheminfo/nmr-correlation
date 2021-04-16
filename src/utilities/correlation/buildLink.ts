import { Link } from '../../types/correlation/link';
import { LinkOptions } from '../../types/correlation/linkOptions';
import { generateID } from '../general/generateID';

export function buildLink(options: LinkOptions): Link {
  return {
    id: options.id || generateID(),
    experimentType: options.experimentType,
    experimentID: options.experimentID,
    atomType: options.atomType,
    signal: options.signal,
    axis: options.axis,
    match: options.match || [],
    experimentLabel: options.experimentLabel || '',
    pseudo: options.pseudo || false,
  } as Link;
}

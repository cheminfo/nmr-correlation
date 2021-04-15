import { Link } from '../../types/primary';
import { LinkOptions } from '../../types/secondary';
import generateID from '../general/generateID';

function buildLink(options: LinkOptions): Link {
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

export default buildLink;

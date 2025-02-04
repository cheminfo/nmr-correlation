import type { Link } from '../../types/correlation/link';
import type { LinkOptions } from '../../types/correlation/linkOptions';
import { generateID } from '../general/generateID';

/**
 * Builds a link object with some existing default values.
 *
 * @param {LinkOptions} options
 */
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
    edited: options.edited || {},
  } as Link;
}

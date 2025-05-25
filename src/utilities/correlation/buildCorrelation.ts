import type {
  Correlation,
  CorrelationOptions,
} from '../../types/correlation.js';
import { generateID } from '../general/generateID.js';

/**
 * Builds a correlation object with some existing default values.
 *
 * @param {CorrelationOptions} options
 */
export function buildCorrelation(options: CorrelationOptions): Correlation {
  return {
    id: options.id || generateID(),
    atomType: options.atomType,
    label: options.label || {},
    link: options.link || [],
    equivalence: options.equivalence || 1,
    attachment: options.attachment || {},
    protonsCount: options.protonsCount || [],
    hybridization: options.hybridization || [],
    pseudo: options.pseudo || false,
    edited: options.edited || {},
  } as Correlation;
}

import { Correlation } from '../../types/primary';
import { CorrelationOptions } from '../../types/secondary';
import generateID from '../general/generateID';

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

export default buildCorrelation;

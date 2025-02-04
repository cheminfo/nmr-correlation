import type { CorrelationData } from '../types/correlation/correlationData';
import type { Options } from '../types/correlation/options';
import type { Spectra } from '../types/spectrum/spectra';
import { buildState } from '../utilities/build/buildState';
import { buildValues } from '../utilities/build/buildValues';

/**
 * Builds the correlation data from spectra data and some options.
 *
 * @param {Spectra} spectra
 * @param {Options} options
 */
export function buildCorrelationData(
  spectra: Spectra,
  options: Options,
): CorrelationData {
  const values = spectra ? buildValues(spectra, options) : [];

  delete options.values;
  delete options.skipDataUpdate;

  return {
    values,
    options,
    state: buildState(values, options.mf || ''),
  };
}

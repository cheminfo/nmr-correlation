import type { CorrelationData, Options } from '../types/correlation.js';
import type { Spectra } from '../types/spectrum.js';
import { buildState } from '../utilities/build/buildState.js';
import { buildValues } from '../utilities/build/buildValues.js';

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

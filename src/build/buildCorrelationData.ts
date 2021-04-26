import { CorrelationData } from '../types/correlation/correlationData';
import { Options } from '../types/correlation/options';
import { Spectra } from '../types/spectrum/spectra';
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
  const { tolerance = {}, mf = '', values: prevValues = [] } = options;
  const values = spectra ? buildValues(spectra, mf, tolerance, prevValues) : [];

  return {
    values,
    options,
    state: buildState(values, mf),
  };
}

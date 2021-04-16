import { CorrelationData } from '../types/correlation/correlationData';
import { Options } from '../types/correlation/options';
import { Values } from '../types/correlation/values';
import { Spectra } from '../types/spectrum/spectra';
import {buildState} from '../utilities/build/buildState';
import {buildValues} from '../utilities/build/buildValues';

export function buildCorrelationData(
  spectra: Spectra,
  options: Options,
  prevValues: Values = [],
): CorrelationData {
  const { tolerance, mf = '' } = options;
  const values =
    spectra && tolerance ? buildValues(spectra, mf, tolerance, prevValues) : [];

  return {
    values,
    options,
    state: buildState(values, mf),
  };
}

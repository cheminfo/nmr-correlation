import { CorrelationData, Spectra, Options, Values } from '../types/primary';
import buildState from '../utilities/build/buildState';
import buildValues from '../utilities/build/buildValues';

function build(
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

export { build };

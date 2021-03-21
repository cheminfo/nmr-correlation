import {
  CorrelationData,
  Spectra,
  Options,
  State,
  Values,
} from './types/primary';
import { buildValues, buildState } from './utilities/BuildUtilities';

function init(data: CorrelationData): CorrelationData {
  let _data = {
    values: [] as Values,
    state: {} as State,
    options: {} as Options,
  };
  if (data) {
    _data = { ..._data, ...data };
  }

  return _data;
}

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

export { build, init };

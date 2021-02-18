import Correlation from './model/Correlation';
import {
  buildCorrelationsData,
  buildCorrelationsState,
} from './utilities/CorrelationUtilities';

export default class CorrelationManager {
  static getOptions(data) {
    return data.options;
  }

  static getState(data) {
    return data.state;
  }

  static getCorrelations(data) {
    return data.values;
  }

  static getCorrelationIndex(data, id) {
    return data.values.findIndex((correlation) => correlation.getID() === id);
  }

  static addCorrelation(data, correlation) {
    data.values = data.values.concat([correlation]);
    return data;
  }

  static deleteCorrelation(data, id) {
    data.values = data.values.filter((correlation) => correlation.id !== id);
    return data;
  }

  static setCorrelation(data, id, correlation) {
    let correlationIndex = data.values.findIndex(
      (_correlation) => _correlation.id === id,
    );
    const _values = data.values.slice();
    _values.splice(correlationIndex, 1, new Correlation({ ...correlation }));

    return {
      values: _values,
      state: data.state,
      options: data.options,
    };
  }

  static buildCorrelationObjects(values) {
    return values
      ? values.map((correlation) => new Correlation({ ...correlation }))
      : [];
  }

  static init(data) {
    let _data = { values: [], state: {}, options: {} };
    if (data) {
      _data = { ..._data, ...data };
    }
    _data.values = CorrelationManager.buildCorrelationObjects(_data.values);

    return _data;
  }

  static build(spectra, options, prevValues) {
    const { tolerance, mf = '' } = options;
    const values =
      spectra && tolerance
        ? buildCorrelationsData(
            spectra,
            mf,
            tolerance,
            CorrelationManager.buildCorrelationObjects(prevValues),
          )
        : [];

    return {
      values,
      options,
      state: buildCorrelationsState(values, mf),
    };
  }
}

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
    _values.splice(correlationIndex, 1, correlation);
    data.values = _values;

    return data;
  }

  static buildCorrelationObjects(data) {
    return data && data.values
      ? data.values.map((correlation) => new Correlation({ ...correlation }))
      : [];
  }

  static init(data) {
    if (data) {
      data.values = CorrelationManager.buildCorrelationObjects(data);
      return data;
    }
    return { values: [], state: {}, options: {} };
  }

  static build(spectra, mf, tolerance, prevData) {
    const values = buildCorrelationsData(
      spectra,
      mf,
      tolerance,
      CorrelationManager.buildCorrelationObjects(prevData),
    );
    const data = {
      values,
      options: { mf, tolerance },
    };
    const correlationsState = buildCorrelationsState(data);
    data.state = correlationsState;

    return data;
  }
}

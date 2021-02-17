import Correlation from './model/Correlation';
import {
  buildCorrelationsData,
  buildCorrelationsState,
} from './utilities/CorrelationUtilities';

const defaultTolerance = {
  C: 0.25,
  H: 0.02,
  N: 0.25,
  F: 0.25,
  Si: 0.25,
  P: 0.25,
};

export default class CorrelationManager {
  constructor(options = {}, spectra = [], values = []) {
    this.options = options;
    if (!this.options.tolerance) {
      this.options.tolerance = defaultTolerance;
    }
    this.state = {};
    this.spectra = spectra;
    this.values = values.map(
      (correlation) => new Correlation({ ...correlation }),
    );
  }

  getOptions() {
    return this.options;
  }

  setOptions(options = {}) {
    this.options = options;
  }

  setOption(key, value) {
    this.setOptions({ ...this.options, [key]: value });
  }

  deleteOption(key) {
    delete this.options[key];
  }

  setMF(mf) {
    this.setOption('mf', mf);
    this.build();
  }

  unsetMF() {
    this.deleteOption('mf');
  }

  getMF() {
    return this.getOptions().mf;
  }

  setTolerance(tolerance) {
    this.setOption('tolerance', tolerance);
    this.build();
  }

  getTolerance() {
    return this.getOptions().tolerance;
  }

  getState() {
    return this.state;
  }

  getSpectra() {
    return this.spectra;
  }

  setSpectra(spectra) {
    this.spectra = spectra;
    this.build();
  }

  getCorrelations() {
    return this.values;
  }

  getCorrelationIndex(id) {
    return this.values.findIndex((correlation) => correlation.getID() === id);
  }

  getData() {
    return {
      options: Object.assign({}, this.options),
      values: this.values.slice(),
      state: Object.assign({}, this.state),
    };
  }

  addCorrelation(correlation) {
    this.values = this.values.concat([correlation]);
    this.build();
  }

  deleteCorrelation(id) {
    this.values = this.values.filter((correlation) => correlation.id !== id);
    this.build();
  }

  setCorrelation(id, correlation) {
    let correlationIndex = this.values.findIndex(
      (_correlation) => _correlation.id === id,
    );
    const _values = this.values.slice();
    _values.splice(correlationIndex, 1, correlation);
    this.values = _values;
    this.build();
  }

  build() {
    this.values = buildCorrelationsData(
      this.getSpectra(),
      this.getMF(),
      this.getTolerance(),
      this.getCorrelations(),
    );
    this.state = buildCorrelationsState(this.getData());
  }
}

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
  constructor(options, spectra, correlations) {
    this.options = options || {};
    if (!this.options.tolerance) {
      this.options.tolerance = defaultTolerance;
    }

    this.correlations = correlations || [];
    this.setSpectra(spectra || []);
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
    this.updateCorrelations();
  }

  unsetMF() {
    this.deleteOption('mf');
  }

  getMF() {
    return this.getOptions().mf;
  }

  setTolerance(tolerance) {
    this.setOption('tolerance', tolerance);
    this.updateCorrelations();
  }

  getTolerance() {
    return this.getOptions().tolerance;
  }

  getState() {
    return this.state;
  }

  getCorrelations() {
    return this.correlations;
  }

  getCorrelationIndex(id) {
    return this.correlations.findIndex(
      (correlation) => correlation.getID() === id,
    );
  }

  getData() {
    return {
      options: Object.assign({}, this.options),
      correlations: this.correlations.slice(),
      state: Object.assign({}, this.state),
    };
  }

  addCorrelation(correlation) {
    this.correlations = this.correlations.concat([correlation]);
    this.updateCorrelations();
  }

  deleteCorrelation(id) {
    this.correlations = this.correlations.filter(
      (correlation) => correlation.id !== id,
    );
    this.updateCorrelations();
  }

  updateCorrelation(id, correlation) {
    let correlationIndex = this.correlations.findIndex(
      (_correlation) => _correlation.id === id,
    );
    const _correlations = this.correlations.slice();
    _correlations.splice(correlationIndex, 1, correlation);
    this.correlations = _correlations;
    this.updateCorrelations();
  }

  updateCorrelations() {
    this.correlations = buildCorrelationsData(
      this.spectra,
      this.getMF(),
      this.getTolerance(),
      this.getCorrelations(),
    );
    this.state = buildCorrelationsState(this.getData());
  }

  getSpectra() {
    return this.spectra;
  }

  setSpectra(spectra) {
    this.spectra = spectra;
    this.updateCorrelations();
  }
}

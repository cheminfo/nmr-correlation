import lodashGet from 'lodash/get';
import lodashIsEqual from 'lodash/isEqual';

import { SignalKindsToInclude } from '../constants/SignalKinds';
import { Spectra, Spectrum1D, Spectrum2D } from '../types/primary';
import {
  Experiment1DSignal,
  Experiment1DSignals,
  Experiment2DSignal,
  Experiment2DSignals,
  Experiments,
  ExperimentSignals,
  ExperimentsType,
} from '../types/secondary';

import { checkSignalMatch, isEditedHSQC } from './GeneralUtilities';

function addToExperiments(
  experiments: Experiments,
  experimentsType: ExperimentsType,
  type: string,
  checkAtomType: boolean,
  experimentKey: string,
): void {
  const _experiments = (lodashGet(experiments, `${type}`, []) as Array<
    Spectrum1D | Spectrum2D
  >) // don't consider DEPT etc. here
    .filter((_experiment) => {
      const hasValues =
        lodashGet(
          _experiment,
          type.includes('1D') ? 'ranges.values' : 'zones.values',
          [],
        ).length > 0;
      return checkAtomType === true
        ? getAtomType((_experiment as Spectrum1D).info.nucleus) ===
            experimentKey && hasValues
        : hasValues;
    });

  if (_experiments.length > 0) {
    experimentsType[experimentKey] = _experiments;
  }
}

function getAtomType(nucleus: string): string {
  return nucleus.split(/\d+/)[1];
}

function getExperiments(spectraData: Spectra): Experiments {
  const _experiments: Experiments = {};
  if (spectraData) {
    spectraData
      .filter((_data) => _data.info.isFid === false)
      .forEach((_data) => {
        if (!lodashGet(_experiments, `${_data.info.dimension}D`, false)) {
          _experiments[`${_data.info.dimension}D`] = {};
        }
        const _experiment = _data.info.experiment;
        if (
          !lodashGet(
            _experiments,
            `${_data.info.dimension}D.${_experiment}`,
            false,
          )
        ) {
          _experiments[`${_data.info.dimension}D`][`${_experiment}`] = [];
        }
        _experiments[`${_data.info.dimension}D`][`${_experiment}`].push(_data);
      });
  }
  return _experiments;
}

// general remark for all experiment types:
// build an array of experiments, because one could have more than
// one spectrum in spectra list for one atom type or experiment type

// "plain" 1D experiments contain ranges, i.e. without DEPT etc.
function getExperiments1D(experiments: Experiments): ExperimentsType {
  const _experiments1D: ExperimentsType = {};
  (lodashGet(experiments, '1D.1d', []) as Array<Spectrum1D>)
    .map((experiment) => getAtomType(experiment.info.nucleus))
    .forEach((atomType) => {
      addToExperiments(experiments, _experiments1D, '1D.1d', true, atomType);
    });

  return _experiments1D;
}

// "extra" 1D experiments contain ranges, e.g. DEPT
function getExperiments1DExtra(experiments: Experiments): ExperimentsType {
  const _experiments1DExtra: ExperimentsType = {};
  Object.keys(lodashGet(experiments, `1D`, {}))
    .filter((experimentType) => experimentType !== '1d') // don't consider "plain" 1D experiments here
    .forEach((experimentType) => {
      addToExperiments(
        experiments,
        _experiments1DExtra,
        `1D.${experimentType}`,
        false,
        experimentType,
      );
    });

  return _experiments1DExtra;
}

// 2D experiments contain zones
function getExperiments2D(experiments: Experiments): ExperimentsType {
  const _experiments2D: ExperimentsType = {};
  Object.keys(lodashGet(experiments, '2D', {})).forEach((experimentType) => {
    addToExperiments(
      experiments,
      _experiments2D,
      `2D.${experimentType}`,
      false,
      experimentType,
    );
  });

  return _experiments2D;
}

function getSignals1D(experiments1D: ExperimentsType): Experiment1DSignals {
  // store valid signals from 1D experiments
  const _signals1D: Experiment1DSignals = {};
  Object.keys(experiments1D).forEach((atomType) => {
    const _signals: Array<Experiment1DSignal> = [];
    if (lodashGet(experiments1D, `${atomType}`, []).length > 0) {
      // @TODO for now we will use the first occurring matched spectrum only (index)
      const index = 0;
      const spectrum1D = experiments1D[`${atomType}`][index] as Spectrum1D;
      const __signals = spectrum1D.ranges.values
        .map((_range) =>
          _range.signal.filter((_signal) =>
            SignalKindsToInclude.includes(_signal.kind),
          ),
        )
        .flat();
      __signals.forEach((__signal) => {
        if (
          !_signals.some((_signal) =>
            checkSignalMatch(_signal.signal.delta, __signal.delta, 0.0),
          )
        ) {
          _signals.push({
            experimentType: '1d',
            experimentID: spectrum1D.id,
            atomType,
            signal: { ...__signal },
          });
        }
      });

      _signals1D[atomType] = _signals;
    }
  });

  return _signals1D;
}

function getSignalsDEPT(
  experiments1DExtra: ExperimentsType,
): Experiment1DSignals {
  // store valid signals from 1D extra experiments, e.g. DEPT, APT
  const _signalsDEPT: Experiment1DSignals = {};
  // store valid signals from 2D experiments
  Object.keys(experiments1DExtra)
    .filter((experimentType) => experimentType === 'dept')
    .forEach((experimentType) =>
      experiments1DExtra[experimentType].forEach((_experimentDEPT) => {
        const experimentDEPT: Spectrum1D = _experimentDEPT as Spectrum1D;
        const _signals: Array<Experiment1DSignal> = [];
        const match: Array<string> | null = experimentDEPT.info.pulseSequence.match(
          /\d/g,
        );
        if (match) {
          const mode = match.reduce((_mode, digit) => _mode + digit);
          const atomType = getAtomType(experimentDEPT.info.nucleus);
          const __signals = experimentDEPT.ranges.values
            .map((range) =>
              range.signal
                .filter((signal) => SignalKindsToInclude.includes(signal.kind))
                .map((signal) => {
                  return { ...signal, sign: range.absolute > 0 ? 1 : -1 };
                }),
            )
            .flat();
          __signals.forEach((signal) => {
            if (
              !_signals.some((_signal) =>
                checkSignalMatch(_signal.signal.delta, signal.delta, 0.0),
              )
            ) {
              _signals.push({
                experimentType,
                experimentID: experimentDEPT.id,
                mode,
                atomType,
                signal,
              });
            }
          });

          _signalsDEPT[mode] = _signals;
        }
      }),
    );

  return _signalsDEPT;
}

function getSignals2D(experiments2D: ExperimentsType): Experiment2DSignals {
  // store valid signals from 2D experiments
  const _signals2D: Experiment2DSignals = {};
  Object.keys(experiments2D).forEach((experimentType) => {
    const _signals: Array<Experiment2DSignal> = [];
    // for now we use the first occurring spectrum only, for each experiment type (current loop) and nuclei combination
    const indices: Array<number> = [];
    const nuclei: Array<Array<string>> = [];
    experiments2D[experimentType].forEach((_experiment, i) => {
      const experiment: Spectrum2D = _experiment as Spectrum2D;
      if (
        !nuclei.some((_nuclei) =>
          lodashIsEqual(_nuclei, experiment.info.nucleus),
        )
      ) {
        nuclei.push(experiment.info.nucleus);
        indices.push(i);
      }
    });
    indices.forEach((index) => {
      const spectrum2D: Spectrum2D = experiments2D[experimentType][
        index
      ] as Spectrum2D;
      const atomType = spectrum2D.info.nucleus.map((nucleus) =>
        getAtomType(nucleus),
      );
      const __signals = spectrum2D.zones.values
        .map((zone) =>
          zone.signal.filter((signal) =>
            SignalKindsToInclude.includes(signal.kind),
          ),
        )
        .flat();
      __signals.forEach((signal) => {
        if (
          !_signals.some(
            (_signal) =>
              checkSignalMatch(_signal.signal.x.delta, signal.x.delta, 0.0) &&
              checkSignalMatch(_signal.signal.y.delta, signal.y.delta, 0.0),
          )
        ) {
          _signals.push({
            experimentType,
            experimentID: spectrum2D.id,
            atomType,
            // here we assume that only one peak exists for the signal and its intensity indicates the sign
            signal: {
              ...signal,
              sign: isEditedHSQC(spectrum2D)
                ? signal.peak[0].z >= 0
                  ? 1
                  : -1
                : 0,
            },
          });
        }
      });
    });

    _signals2D[experimentType] = _signals;
  });

  return _signals2D;
}

function getSignals(spectraData: Spectra): ExperimentSignals {
  const experiments = getExperiments(spectraData);
  const experiments1D = getExperiments1D(experiments);
  const experiments1DExtra = getExperiments1DExtra(experiments);
  const experiments2D = getExperiments2D(experiments);

  const signals1D = getSignals1D(experiments1D);
  const signals2D = getSignals2D(experiments2D);
  const signalsDEPT = getSignalsDEPT(experiments1DExtra);

  return {
    signals1D,
    signals2D,
    signalsDEPT,
  };
}

export { getSignals };

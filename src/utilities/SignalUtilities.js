import lodash from 'lodash';

import { SignalKindsToInclude } from '../constants/SignalKinds';

import { checkSignalMatch, isEditedHSQC } from './GeneralUtilities';

function addToExperiments(
  experiments,
  experimentsType,
  type,
  checkAtomType,
  experimentKey,
) {
  const _experiments = lodash
    .get(experiments, `${type}`, []) // don't consider DEPT etc. here
    .filter((_experiment) => {
      const hasValues =
        lodash.get(
          _experiment,
          type.includes('1D') ? 'ranges.values' : 'zones.values',
          [],
        ).length > 0;
      return checkAtomType === true
        ? getAtomType(_experiment.info.nucleus) === experimentKey && hasValues
        : hasValues;
    });

  if (_experiments.length > 0) {
    experimentsType[experimentKey] = _experiments;
  }
  return _experiments;
}

function getAtomType(nucleus) {
  return nucleus.split(/\d+/)[1];
}

const getExperiments = (spectraData) => {
  const _experiments = {};
  if (spectraData) {
    spectraData
      .filter((_data) => _data.info.isFid === false)
      .forEach((_data) => {
        if (!lodash.get(_experiments, `${_data.info.dimension}D`, false)) {
          _experiments[`${_data.info.dimension}D`] = {};
        }
        let _experiment = _data.info.experiment;
        if (
          !lodash.get(
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
};

// general remark for all experiment types:
// build an array of experiments, because one could have more than
// one spectrum in spectra list for one atom type or experiment type

// "plain" 1D experiments contain ranges, i.e. without DEPT etc.
const getExperiments1D = (experiments) => {
  const _experiments1D = {};
  lodash
    .get(experiments, '1D.1d', [])
    .map((experiment) => getAtomType(experiment.info.nucleus))
    .forEach((atomType) => {
      addToExperiments(experiments, _experiments1D, '1D.1d', true, atomType);
    });

  return _experiments1D;
};

// "extra" 1D experiments contain ranges, e.g. DEPT
const getExperiments1DExtra = (experiments) => {
  const _experiments1DExtra = {};
  Object.keys(lodash.get(experiments, `1D`, {}))
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
};

// 2D experiments contain zones
const getExperiments2D = (experiments) => {
  const _experiments2D = {};
  Object.keys(lodash.get(experiments, '2D', {})).forEach((experimentType) => {
    addToExperiments(
      experiments,
      _experiments2D,
      `2D.${experimentType}`,
      false,
      experimentType,
    );
  });

  return _experiments2D;
};

const getSignals1D = (experiments1D) => {
  // store valid signals from 1D experiments
  const _signals1D = {};
  Object.keys(experiments1D).forEach((atomType) => {
    let _signals = [];
    if (lodash.get(experiments1D, `${atomType}`, []).length > 0) {
      // @TODO for now we will use the first occurring matched spectrum only (index)
      const index = 0;
      const __signals = experiments1D[`${atomType}`][index].ranges.values
        .map((_range) =>
          _range.signal.filter((_signal) =>
            SignalKindsToInclude.includes(_signal.kind),
          ),
        )
        .flat();
      __signals.forEach((__signal) => {
        if (
          !_signals.some((_signal) =>
            checkSignalMatch(_signal.signal, __signal, 0.0),
          )
        ) {
          _signals.push({
            experimentType: '1d',
            experimentID: experiments1D[`${atomType}`][index].id,
            atomType: atomType,
            signal: { ...__signal },
          });
        }
      });

      _signals1D[atomType] = _signals;
    }
  });

  return _signals1D;
};

const getSignalsDEPT = (experiments1DExtra) => {
  // store valid signals from 1D extra experiments, e.g. DEPT, APT
  const _signalsDEPT = {};
  // store valid signals from 2D experiments
  Object.keys(experiments1DExtra)
    .filter((experimentType) => experimentType === 'dept')
    .forEach((experimentType) =>
      experiments1DExtra[experimentType].forEach((experimentDEPT) => {
        let _signals = [];
        const mode = experimentDEPT.info.pulseSequence
          .match(/\d/g)
          .reduce((_mode, digit) => _mode + digit);
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
              checkSignalMatch(_signal.signal, signal, 0.0),
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
      }),
    );

  return _signalsDEPT;
};

const getSignals2D = (experiments2D) => {
  // store valid signals from 2D experiments
  const _signals2D = {};
  Object.keys(experiments2D).forEach((experimentType) => {
    let _signals = [];
    // for now we use the first occurring spectrum only, for each experiment type (current loop) and nuclei combination
    const indices = [];
    const nuclei = [];
    experiments2D[experimentType].forEach((experiment, i) => {
      if (
        !nuclei.some((_nuclei) =>
          lodash.isEqual(_nuclei, experiment.info.nucleus),
        )
      ) {
        nuclei.push(experiment.info.nucleus);
        indices.push(i);
      }
    });
    indices.forEach((index) => {
      const atomType = experiments2D[experimentType][
        index
      ].info.nucleus.map((nucleus) => getAtomType(nucleus));
      const __signals = experiments2D[experimentType][index].zones.values
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
              checkSignalMatch(_signal.signal.x, signal.x, 0.0) &&
              checkSignalMatch(_signal.signal.y, signal.y, 0.0),
          )
        ) {
          _signals.push({
            experimentType,
            experimentID: experiments2D[experimentType][index].id,
            atomType,
            // here we assume that only one peak exists for the signal and its intensity indicates the sign
            signal: {
              ...signal,
              sign: isEditedHSQC(experiments2D[experimentType][index])
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
};

const getSignals = (spectraData) => {
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
};

export { getSignals };

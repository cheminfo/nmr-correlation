import lodashGet from 'lodash/get';
import lodashIsEqual from 'lodash/isEqual';
import {
  Correlation,
  Link,
  Spectra,
  State,
  StateAtomTypeError,
  Tolerance,
  Values,
} from '../types/primary';
import {
  Experiment1DSignals,
  Experiment2DSignals,
  ExperimentSignals,
} from '../types/secondary';
import {
  addAttachment,
  addLink,
  buildCorrelation,
  hasAttachmentAtomType,
  hasLinks,
  removeAttachments,
  removeLink,
} from './CorrelationUtilities';

import {
  checkSignalMatch,
  containsLink,
  getAtomCounts,
  getCorrelationIndex,
  getCorrelationsByAtomType,
} from './GeneralUtilities';
import {
  addMatch,
  buildLink,
  removeMatch,
  removeMatches,
} from './LinkUtilities';
import { setProtonsCountFromData } from './ProtonsCountUtilities';
import { getSignals } from './SignalUtilities';

function addFromData1D(
  correlations: Values,
  signals1D: Experiment1DSignals,
  tolerance: Tolerance,
): Values {
  // remove previous set links from 1D, but not pseudo links
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) => link.experimentType === '1d',
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });
  Object.keys(signals1D).forEach((atomType) => {
    signals1D[atomType].forEach((signal1D) => {
      const matchedCorrelationIndices = correlations
        .map((correlation, k) =>
          correlation.pseudo === false &&
          correlation.atomType === atomType &&
          checkSignalMatch(
            correlation.signal.delta,
            signal1D.signal.delta,
            tolerance[atomType],
          )
            ? k
            : -1,
        )
        .filter((index) => index >= 0)
        .filter((index, i, a) => a.indexOf(index) === i);
      if (matchedCorrelationIndices.length === 0) {
        const pseudoIndex = correlations.findIndex(
          (correlation) =>
            correlation.atomType === atomType &&
            correlation.pseudo === true &&
            !hasLinks(correlation),
        );
        const newCorrelation = buildCorrelation({
          ...signal1D,
        });
        if (pseudoIndex >= 0) {
          correlations[pseudoIndex] = newCorrelation;
        } else {
          correlations.push(newCorrelation);
        }
      } else {
        const link = buildLink({
          experimentType: signal1D.experimentType,
          experimentID: signal1D.experimentID,
          signal: signal1D.signal,
          atomType: [atomType],
        });
        // if allowed then add links from 1D data in first match only
        if (!containsLink(correlations[matchedCorrelationIndices[0]], link)) {
          addLink(correlations[matchedCorrelationIndices[0]], link);
        }
      }
    });
  });

  return correlations;
}

function addFromData2D(
  correlations: Values,
  signals2D: Experiment2DSignals,
  tolerance: Tolerance,
): Values {
  // remove previous set links from 2D, but not pseudo links
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) => link.pseudo === false && link.experimentType !== '1d',
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });
  // add potential new correlations and push new links via shift matches between 1D vs. 2D and 2D vs. 2D
  Object.keys(signals2D).forEach((experimentType) =>
    signals2D[experimentType].forEach((signal2D) =>
      signal2D.atomType.forEach((atomType, dim) => {
        const axis = dim === 0 ? 'x' : 'y';
        const matchedCorrelationIndices = correlations
          .map((correlation, k) =>
            correlation.pseudo === false &&
            correlation.atomType === atomType &&
            checkSignalMatch(
              correlation.signal.delta,
              signal2D.signal[axis].delta,
              tolerance[atomType],
            )
              ? k
              : -1,
          )
          .filter((index) => index >= 0)
          .filter((index, i, a) => a.indexOf(index) === i);

        const link = buildLink({
          experimentType: signal2D.experimentType,
          experimentID: signal2D.experimentID,
          signal: signal2D.signal,
          axis,
          atomType: signal2D.atomType,
        });
        // in case of no signal match -> add new signal from 2D
        if (matchedCorrelationIndices.length === 0) {
          const newCorrelation = buildCorrelation({
            experimentType: signal2D.experimentType,
            experimentID: signal2D.experimentID,
            atomType,
            signal: {
              id: signal2D.signal.id,
              delta: signal2D.signal[axis].delta,
              sign: signal2D.signal.sign,
            },
          });
          addLink(newCorrelation, link);

          const pseudoIndex = correlations.findIndex(
            (correlation) =>
              correlation.atomType === atomType &&
              correlation.pseudo === true &&
              !hasLinks(correlation),
          );
          if (pseudoIndex >= 0) {
            correlations[pseudoIndex] = newCorrelation;
          } else {
            correlations.push(newCorrelation);
          }
        } else {
          // if allowed then add links from 2D data in first match only
          if (!containsLink(correlations[matchedCorrelationIndices[0]], link)) {
            addLink(correlations[matchedCorrelationIndices[0]], link);
            if (
              correlations[matchedCorrelationIndices[0]].experimentType === '1d'
            ) {
              // overwrite 1D signal information by 2D signal information (higher priority)
              const correlation = correlations[matchedCorrelationIndices[0]];
              correlation.signal = {
                id: signal2D.signal.id,
                delta: signal2D.signal[axis].delta,
                sign: signal2D.signal.sign,
              };
              correlation.experimentID = signal2D.experimentID;
              correlation.experimentType = signal2D.experimentType;
            }
          }
          // delete the other matching correlations (i.e. after shift tolerance increase)
          for (let i = 1; i < matchedCorrelationIndices.length; i++) {
            correlations.splice(matchedCorrelationIndices[i], 1);
          }
        }
      }),
    ),
  );

  return correlations;
}

function setMatches(correlations: Values): Values {
  correlations.forEach((correlation) => {
    correlation.link.forEach((link) => {
      // remove previously added matches
      removeMatches(link);
      // add matches
      const otherAtomType =
        link.axis === 'x' ? link.atomType[1] : link.atomType[0];
      getCorrelationsByAtomType(correlations, otherAtomType).forEach(
        (correlationOtherAtomType) => {
          if (correlation.id !== correlationOtherAtomType.id) {
            const correlationIndexOtherAtomType = getCorrelationIndex(
              correlations,
              correlationOtherAtomType,
            );
            correlationOtherAtomType.link.forEach((linkOtherAtomType) => {
              // check for correlation match and avoid possible duplicates
              if (
                linkOtherAtomType.experimentType === link.experimentType &&
                linkOtherAtomType.experimentID === link.experimentID &&
                lodashIsEqual(linkOtherAtomType.atomType, link.atomType) &&
                linkOtherAtomType.signal.id === link.signal.id &&
                linkOtherAtomType.axis !== link.axis
              ) {
                addMatch(link, correlationIndexOtherAtomType);
              }
            });
          }
        },
      );
    });
  });

  // remove links without any matches
  correlations.forEach((correlation) => {
    const linksToRemove = correlation.link.filter(
      (link) => link.match.length === 0 && link.experimentType !== '1d',
    );
    linksToRemove.forEach((link) => removeLink(correlation, link.id));
  });

  return correlations;
}

function setAttachmentsAndProtonEquivalences(correlations: Values): Values {
  // update attachment information between heavy atoms and protons via HSQC or HMQC
  correlations.forEach((correlation) => {
    // remove previous set attachments
    removeAttachments(correlation);
    // add attachments
    correlation.link
      .filter(
        (link) =>
          link.experimentType === 'hsqc' || link.experimentType === 'hmqc',
      )
      .forEach((link) => {
        const otherAtomType = link.atomType[link.axis === 'x' ? 1 : 0];
        link.match.forEach((matchIndex) => {
          addAttachment(correlation, otherAtomType, matchIndex);
        });
      });
  });
  // reset previously set proton equivalences and set new ones
  // check heavy atoms with an unambiguous protons count
  correlations.forEach((correlation) => {
    if (
      correlation.atomType !== 'H' &&
      correlation.protonsCount.length === 1 &&
      hasAttachmentAtomType(correlation, 'H')
    ) {
      let equivalences = 1;
      if (correlation.protonsCount[0] === 3) {
        equivalences = 3;
      } else if (correlation.protonsCount[0] === 2) {
        equivalences = 2;
      }
      const sharedEquivalences =
        (correlation.equivalence * equivalences) /
        correlation.attachment.H.length;
      correlation.attachment.H.forEach((attachedProtonIndex) => {
        correlations[attachedProtonIndex].equivalence = sharedEquivalences;
      });
    }
  });

  return correlations;
}

function updatePseudoCorrelations(correlations: Values, mf: string): Values {
  const atoms = getAtomCounts(mf);
  // add pseudo correlations
  correlations = addPseudoCorrelations(correlations, atoms);
  // remove pseudo correlations to be replaced by equivalences
  correlations = replacePseudoCorrelationsByEquivalences(correlations, atoms);
  // remove pseudo correlations which are out of limit, clean up links and proton counts
  correlations = checkPseudoCorrelations(correlations, atoms);

  return correlations;
}

function addPseudoCorrelations(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  Object.keys(atoms).forEach((atomType) => {
    // consider also pseudo correlations since they do not need to be added again
    const atomTypeCount = getCorrelationsByAtomType(
      correlations,
      atomType,
    ).reduce((sum, correlation) => sum + correlation.equivalence, 0);
    // add missing pseudo correlations
    for (let i = atomTypeCount; i < atoms[atomType]; i++) {
      correlations.push(
        buildCorrelation({
          atomType,
          pseudo: true,
        }),
      );
    }
  });

  return correlations;
}

function replacePseudoCorrelationsByEquivalences(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  Object.keys(atoms).forEach((atomType) => {
    // remove pseudo correlations to be replaced by equivalences, starting at the end
    const atomTypeEquivalencesCount = correlations.reduce(
      (sum, correlation) =>
        correlation.atomType === atomType && correlation.pseudo === false
          ? sum + (correlation.equivalence - 1)
          : sum,
      0,
    );
    const pseudoCorrelationsAtomType: Values = correlations.filter(
      (correlation) =>
        correlation.atomType === atomType && correlation.pseudo === true,
    );
    for (let i = atomTypeEquivalencesCount - 1; i >= 0; i--) {
      if (pseudoCorrelationsAtomType.length === 0) {
        break;
      }
      const pseudoCorrelationToRemove:
        | Correlation
        | undefined = pseudoCorrelationsAtomType.pop();
      if (pseudoCorrelationToRemove) {
        correlations.splice(correlations.indexOf(pseudoCorrelationToRemove), 1);
      }
    }
  });

  return correlations;
}

function checkPseudoCorrelations(
  correlations: Values,
  atoms: { [atomType: string]: number },
): Values {
  Object.keys(atoms).forEach((atomType) => {
    // consider also pseudo correlations
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    if (correlationsAtomType.length > atoms[atomType]) {
      // remove pseudo correlations which are out of limit and not linked
      const pseudoCorrelationsAtomType = correlationsAtomType.filter(
        (correlation) => correlation.pseudo === true && !hasLinks(correlation),
      );
      for (let i = correlationsAtomType.length - 1; i >= atoms[atomType]; i--) {
        if (pseudoCorrelationsAtomType.length === 0) {
          break;
        }
        const pseudoCorrelationToRemove:
          | Correlation
          | undefined = pseudoCorrelationsAtomType.pop();
        if (pseudoCorrelationToRemove) {
          correlations.splice(
            correlations.indexOf(pseudoCorrelationToRemove),
            1,
          );
        }
      }
    }
  });
  // check for deleted links and correct proton counts if no HSQC link exists
  correlations.forEach((pseudoCorrelation: Correlation) => {
    if (pseudoCorrelation.pseudo === true) {
      // remove wrong (old) match indices and empty links
      const linksToRemove: Array<Link> = [];
      const pseudoCorrelationIndex = getCorrelationIndex(
        correlations,
        pseudoCorrelation,
      );
      pseudoCorrelation.link.forEach((pseudoLink: Link) => {
        for (let i = 0; i < pseudoLink.match.length; i++) {
          const matchIndex = pseudoLink.match[i];
          if (
            !correlations[matchIndex] ||
            !correlations[matchIndex].link.some((_link) =>
              _link.match.includes(pseudoCorrelationIndex),
            )
          ) {
            removeMatch(pseudoLink, matchIndex);
          }
        }
        if (pseudoLink.match.length === 0) {
          linksToRemove.push(pseudoLink);
        }
      });
      linksToRemove.forEach((pseudoLink) =>
        removeLink(pseudoCorrelation, pseudoLink.id),
      );
      // correct protons count if no HSQC link was found anymore and the field was not edited manually
      if (
        !pseudoCorrelation.edited.protonsCount &&
        !pseudoCorrelation.link.some(
          (pseudoLink) => pseudoLink.experimentType === 'hsqc',
        )
      ) {
        pseudoCorrelation.protonsCount = [];
      }
    }
  });

  return correlations;
}

function removeDeletedCorrelations(
  correlations: Values,
  signals1D: Experiment1DSignals,
  signals2D: Experiment2DSignals,
): Values {
  const _correlations = correlations.filter(
    (correlation) => correlation.pseudo === false,
  );
  const removeList = _correlations.slice();
  _correlations.forEach((correlation) => {
    if (correlation.experimentType === '1d') {
      // search in 1D data
      if (
        lodashGet(signals1D, correlation.atomType, []).some(
          (signal1D) => signal1D.signal.id === correlation.signal.id,
        )
      ) {
        const index = removeList.indexOf(correlation);
        if (index >= 0) {
          removeList.splice(index, 1);
        }
      }
    } else {
      // search in 2D data
      if (
        lodashGet(signals2D, `${correlation.experimentType}`, []).some(
          (signal2D) =>
            signal2D.atomType.indexOf(correlation.atomType) !== -1 &&
            signal2D.signal.id === correlation.signal.id,
        )
      ) {
        const index = removeList.indexOf(correlation);
        if (index >= 0) {
          removeList.splice(index, 1);
        }
      }
    }
  });

  removeList.forEach((correlation) => {
    const index = correlations.indexOf(correlation); // in case we already removed previously
    if (index >= 0) {
      correlations.splice(index, 1);
    }
  });

  return correlations;
}

function setLabels(correlations: Values): void {
  const atomTypeCounts: { [atomType: string]: number } = {};
  correlations.forEach((correlation) => {
    if (!lodashGet(atomTypeCounts, correlation.atomType, false)) {
      atomTypeCounts[correlation.atomType] = 0;
    }
    atomTypeCounts[correlation.atomType]++;
    correlation.label['origin'] = `${correlation.atomType}${
      atomTypeCounts[correlation.atomType]
    }`;
  });
}

function sortCorrelations(correlations: Values): Values {
  const compare = (corr1: Correlation, corr2: Correlation) => {
    if (corr1.pseudo === true && corr2.pseudo === true) {
      return 0;
    }
    if (
      (corr1.pseudo === false && corr2.pseudo === true) ||
      corr1.signal.delta < corr2.signal.delta
    ) {
      return -1;
    }
    if (
      (corr1.pseudo === true && corr2.pseudo === false) ||
      corr1.signal.delta > corr2.signal.delta
    ) {
      return 1;
    }
    return 0;
  };

  let sortedCorrelations: Values = [];
  const atomTypes = correlations
    .map((correlation) => correlation.atomType)
    .filter((atomType, i, a) => a.indexOf(atomType) === i);
  atomTypes.forEach((atomType) => {
    const correlationsAtomType = getCorrelationsByAtomType(
      correlations,
      atomType,
    );
    correlationsAtomType.sort(compare);
    sortedCorrelations = sortedCorrelations.concat(correlationsAtomType);
  });

  return sortedCorrelations;
}

function buildState(values: Values, mf: string): State {
  const state: State = {};
  const atoms = getAtomCounts(mf);
  const atomTypesInCorrelations: Array<string> = values.reduce(
    (array: Array<string>, correlation) =>
      array.includes(correlation.atomType)
        ? array
        : array.concat(correlation.atomType),
    [],
  );

  atomTypesInCorrelations.forEach((atomType) => {
    const correlationsAtomType = getCorrelationsByAtomType(values, atomType);
    // create state for specific atom type only if there is at least one real correlation
    if (
      correlationsAtomType.some((correlation) => correlation.pseudo === false)
    ) {
      // create state error
      const stateAtomTypeError: StateAtomTypeError = {};

      const atomCount = atoms[atomType];
      let atomCountAtomType = correlationsAtomType.reduce(
        (sum, correlation) =>
          correlation.pseudo === false ? sum + correlation.equivalence : sum,
        0,
      );

      if (atomType === 'H') {
        // add protons count from pseudo correlations without any pseudo HSQC correlation
        values.forEach((correlation) => {
          if (
            correlation.pseudo === true &&
            correlation.atomType !== 'H' &&
            correlation.protonsCount.length === 1 &&
            !correlation.link.some((link) => link.experimentType === 'hsqc')
          ) {
            atomCountAtomType += correlation.protonsCount[0];
          }
        });
        // determine the number of pseudo correlations
        const pseudoCorrelationCount = correlationsAtomType.reduce(
          (sum, correlation) => (correlation.pseudo === true ? sum + 1 : sum),
          0,
        );
        // determine the not attached protons
        const notAttached = correlationsAtomType.reduce(
          (array: Array<number>, correlation) =>
            Object.keys(correlation.attachment).length === 0
              ? array.concat(getCorrelationIndex(values, correlation))
              : array,
          [],
        );
        if (notAttached.length > 0) {
          stateAtomTypeError.notAttached = notAttached;
        }
        atomCountAtomType -= notAttached.length - pseudoCorrelationCount;
        if (atomCountAtomType < 0) {
          atomCountAtomType = 0;
        }

        // determine the ambiguous attached protons
        const ambiguousAttachment = correlationsAtomType.reduce(
          (array: Array<number>, correlation) =>
            Object.keys(correlation.attachment).length > 1 ||
            Object.keys(correlation.attachment).some(
              (otherAtomType) =>
                correlation.attachment[otherAtomType].length > 1,
            )
              ? array.concat(getCorrelationIndex(values, correlation))
              : array,
          [],
        );
        if (ambiguousAttachment.length > 0) {
          stateAtomTypeError.ambiguousAttachment = ambiguousAttachment;
        }
      }

      const outOfLimit = correlationsAtomType.some(
        (correlation, k) =>
          correlation.pseudo === false &&
          correlation.atomType === atomType &&
          k >= atomCount,
      );
      if (outOfLimit) {
        stateAtomTypeError.outOfLimit = true;
      }

      const complete =
        atomCount === undefined
          ? undefined
          : atomCountAtomType === atomCount
          ? true
          : false;

      if (complete === false) {
        stateAtomTypeError.incomplete = true;
      }

      state[atomType] = {
        current: atomCountAtomType,
        total: atomCount,
        complete,
        error: stateAtomTypeError,
      };
    }
  });

  return state;
}

function buildValues(
  spectra: Spectra,
  mf: string,
  tolerance: Tolerance,
  values: Values,
): Values {
  const signals: ExperimentSignals = getSignals(spectra);

  let _correlations = values ? values.slice() : [];
  // remove deleted correlations
  _correlations = removeDeletedCorrelations(
    _correlations,
    signals.signals1D,
    signals.signals2D,
  );
  // add all 1D signals
  _correlations = addFromData1D(_correlations, signals.signals1D, tolerance);
  // add signals from 2D if 1D signals for an atom type and belonging shift are missing
  // add correlations: 1D -> 2D
  _correlations = addFromData2D(_correlations, signals.signals2D, tolerance);
  // set the number of attached protons via DEPT or edited HSQC
  _correlations = setProtonsCountFromData(
    _correlations,
    signals.signalsDEPT,
    signals.signals2D,
    tolerance,
  );

  _correlations = updateValues(_correlations, mf);

  return _correlations;
}

function updateValues(correlations: Values, mf: string): Values {
  // sort by atom type and shift value
  correlations = sortCorrelations(correlations);
  // link signals via matches to same 2D signal: e.g. 13C -> HSQC <- 1H
  setMatches(correlations);
  // set attachments via HSQC or HMQC
  setAttachmentsAndProtonEquivalences(correlations);
  // update pseudo correlation
  updatePseudoCorrelations(correlations, mf);
  // set labels
  setLabels(correlations);

  return correlations;
}

export { buildValues, buildState, updateValues };

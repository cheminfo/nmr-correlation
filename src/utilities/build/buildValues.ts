import type { Options, Values } from '../../types/correlation.js';
import type { ExperimentSignals } from '../../types/experiment.js';
import type { Spectra } from '../../types/spectrum.js';
import { setProtonsCountFromData } from '../protonsCount/setProtonsCountFromData.js';
import { getSignals } from '../signals/getSignals.js';

import { addFromData } from './addFromData.js';
import { updatePseudoCorrelations } from './pseudo/updatePseudoCorrelations.js';
import { removeObsoleteLinksAndNotLinkedCorrelations } from './removeObsoleteLinksAndNotLinkedCorrelations.js';
import { setAttachmentsAndProtonEquivalences } from './setAttachmentsAndProtonEquivalences.js';
import { setLabels } from './setLabels.js';
import { setMatches } from './setMatches.js';
import { sortCorrelations } from './sortCorrelations.js';

/**
 * Builds the correlation data values from given input spectra and options.
 * @param {Spectra} spectra
 * @param {Options} options
 */
export function buildValues(spectra: Spectra, options: Options): Values {
  const { tolerance = {}, mf = '', values: prevValues = [] } = options;
  const signals: ExperimentSignals = getSignals(spectra);

  let _correlations = prevValues ? prevValues.slice() : [];

  if (options.skipDataUpdate !== true) {
    // remove obsolete links/correlations
    _correlations = removeObsoleteLinksAndNotLinkedCorrelations(
      _correlations,
      signals.signals1D,
      signals.signals2D,
    );
    // add signals from either 1D or 2D if not already existing as correlation
    // if a signal already exists then add a link within matched correlation
    _correlations = addFromData(
      _correlations,
      signals.signals1D,
      signals.signals2D,
      tolerance,
    );
  } else {
    // in case an external movement has led to en empty link array within a correlation
    _correlations = _correlations.filter(
      (correlation) => correlation.link.length > 0 || correlation.pseudo,
    );
  }
  // set the number of attached protons via DEPT or edited HSQC
  _correlations = setProtonsCountFromData(
    _correlations,
    signals.signalsDEPT,
    signals.signals2D,
    tolerance,
  );
  // sort by atom type and shift value
  _correlations = sortCorrelations(_correlations);
  // link signals via matches to same 2D signal: e.g. 13C -> HSQC <- 1H
  setMatches(_correlations);
  // set attachments via HSQC or HMQC
  setAttachmentsAndProtonEquivalences(_correlations);
  // update pseudo correlation
  _correlations = updatePseudoCorrelations(_correlations, mf);
  // set labels
  setLabels(_correlations);

  return _correlations;
}

import { Options } from '../../types';
import { Values } from '../../types/correlation/values';
import { ExperimentSignals } from '../../types/experiment/experimentSignals';
import { Spectra } from '../../types/spectrum/spectra';
import { setProtonsCountFromData } from '../protonsCount/setProtonsCountFromData';
import { getSignals } from '../signals/getSignals';

import { addFromData } from './addFromData';
import { updatePseudoCorrelations } from './pseudo/updatePseudoCorrelations';
import { removeObsoleteLinksAndNotLinkedCorrelations } from './removeObsoleteLinksAndNotLinkedCorrelations';
import { setAttachmentsAndProtonEquivalences } from './setAttachmentsAndProtonEquivalences';
import { setLabels } from './setLabels';
import { setMatches } from './setMatches';
import { sortCorrelations } from './sortCorrelations';

/**
 * Builds the correlation data values from given input spectra.
 *
 * @param {Spectra} spectra
 * @param {string} mf
 * @param {Tolerance} tolerance
 * @param {Values} values
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

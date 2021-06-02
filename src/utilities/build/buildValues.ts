import { Tolerance } from '../../types/correlation/tolerance';
import { Values } from '../../types/correlation/values';
import { ExperimentSignals } from '../../types/experiment/experimentSignals';
import { Spectra } from '../../types/spectrum/spectra';
import { setProtonsCountFromData } from '../protonsCount/setProtonsCountFromData';
import { getSignals } from '../signals/getSignals';

import { addFromData1D } from './addFromData1D';
import { addFromData2D } from './addFromData2D';
import { updatePseudoCorrelations } from './pseudo/updatePseudoCorrelations';
import { removeDeletedCorrelations } from './removeDeletedCorrelations';
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
export function buildValues(
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
  // add signals from either 1D or 2D if not already existing as correlation
  // if a signal already exists then add a link within matched correlation
  _correlations = addFromData1D(_correlations, signals.signals1D, tolerance);
  _correlations = addFromData2D(_correlations, signals.signals2D, tolerance);
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

import {
  Spectra,
  Spectrum1D,
  Spectrum2D,
  Tolerance,
  Values,
} from '../../../types/index';
import { buildValues } from '../buildValues';
import { buildCorrelation } from '../../correlation/buildCorrelation';
import { spectraData1 } from './testData';

describe('buildValues', () => {
  it('test 1, no values', () => {
    const spectra: Spectra = [];
    const mf: string = '';
    const tolerance: Tolerance = { C: 0.25 };
    const prevValues: Values = [];
    expect(buildValues(spectra, mf, tolerance, prevValues)).toStrictEqual([]);
  });

  it('test 2, mf only', () => {
    const spectra: Spectra = [];
    const mf: string = 'CH3';
    const tolerance: Tolerance = { C: 0.25 };
    const prevValues: Values = [];
    expect(buildValues(spectra, mf, tolerance, prevValues)).toHaveLength(4);
  });

  it('test 3, prev value (will be deleted)', () => {
    const correlation = buildCorrelation({
      atomType: 'C',
      label: { origin: 'C1' },
      id: 'id1',
    });
    const spectra: Spectra = [];
    const mf: string = '';
    const tolerance: Tolerance = { C: 0.25 };
    const prevValues: Values = [correlation];
    expect(buildValues(spectra, mf, tolerance, prevValues)).toStrictEqual([]);
  });

  it('test 4, spectra data: only take first 13C spectrum, no mf', () => {
    const tolerance: Tolerance = {C: 0.25, H:0.05}
    expect(buildValues(spectraData1, '', tolerance, [])).toHaveLength(4);
  });

it('test 5, spectra data: only take first 13C spectrum, no mf, increased tolerance for H', () => {
    const tolerance: Tolerance = {C: 0.25, H:0.1}
    expect(buildValues(spectraData1, '', tolerance, [])).toHaveLength(3);
  });

  it('test 6, spectra data: only take first 13C spectrum, with mf', () => {
    const tolerance: Tolerance = {C: 0.25, H:0.05}
    expect(buildValues(spectraData1, 'C6H6', tolerance, [])).toHaveLength(12);
  });
});

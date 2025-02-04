import { describe, expect, it } from 'vitest';

import { spectraDataSet1 } from '../../data/spectraDataSet1';
import type { Options, Tolerance, Values } from '../../types/correlation';
import type { Spectra } from '../../types/spectrum';
import { buildCorrelation } from '../correlation/buildCorrelation';

import { buildValues } from './buildValues';

describe('buildValues', () => {
  it('test 1, no values', () => {
    const spectra: Spectra = [];
    const mf = '';
    const tolerance: Tolerance = { C: 0.25 };
    const prevValues: Values = [];
    const options: Options = { tolerance, mf, values: prevValues };
    expect(buildValues(spectra, options)).toStrictEqual([]);
  });

  it('test 2, mf only', () => {
    const spectra: Spectra = [];
    const mf = 'CH3';
    const tolerance: Tolerance = { C: 0.25 };
    const prevValues: Values = [];
    const options: Options = { tolerance, mf, values: prevValues };
    expect(buildValues(spectra, options)).toHaveLength(4);
  });

  it('test 3, prev value (will be deleted)', () => {
    const correlation = buildCorrelation({
      atomType: 'C',
      label: { origin: 'C1' },
      id: 'id1',
    });
    const spectra: Spectra = [];
    const mf = '';
    const tolerance: Tolerance = { C: 0.25 };
    const prevValues: Values = [correlation];
    const options: Options = { tolerance, mf, values: prevValues };
    expect(buildValues(spectra, options)).toStrictEqual([]);
  });

  it('test 4, spectra data: only take first 13C spectrum, no mf', () => {
    const tolerance: Tolerance = { C: 0.25, H: 0.05 };
    const options: Options = { tolerance };
    expect(buildValues(spectraDataSet1, options)).toHaveLength(5);
  });

  it('test 5, spectra data: only take first 13C spectrum, no mf, increased tolerance for H', () => {
    const tolerance: Tolerance = { C: 0.25, H: 0.1 };
    const options: Options = { tolerance };
    expect(buildValues(spectraDataSet1, options)).toHaveLength(4);
  });

  it('test 6, spectra data: only take first 13C spectrum, with mf', () => {
    const tolerance: Tolerance = { C: 0.25, H: 0.05 };
    const options: Options = { tolerance, mf: 'C6H6' };
    expect(buildValues(spectraDataSet1, options)).toHaveLength(12);
  });
});

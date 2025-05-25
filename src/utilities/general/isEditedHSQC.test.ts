import { describe, expect, it } from 'vitest';

import type { Spectrum2D } from '../../types/spectrum.js';

import { isEditedHSQC } from './isEditedHSQC.js';

describe('isEditedHSQC', () => {
  const spectrum1: Spectrum2D = {
    info: {
      pulseSequence: 'hsqced',
      nucleus: ['1H', '13C'],
      dimension: 2,
      isFid: false,
      experiment: 'hsqc',
    },
    zones: { values: [] },
    id: 'id1',
  };
  const spectrum2: Spectrum2D = {
    info: {
      pulseSequence: 'hsqc',
      nucleus: ['1H', '13C'],
      dimension: 2,
      isFid: false,
      experiment: 'hsqc',
    },
    zones: { values: [] },
    id: 'id1',
  };
  it('test 1, true', () => {
    expect(isEditedHSQC(spectrum1)).toBe(true);
  });
  it('test 2, false', () => {
    expect(isEditedHSQC(spectrum2)).toBe(false);
  });
});

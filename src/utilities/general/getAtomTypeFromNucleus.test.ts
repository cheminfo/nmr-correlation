import { describe, expect, it } from 'vitest';

import { getAtomTypeFromNucleus } from './getAtomTypeFromNucleus.js';

describe('getAtomTypeFromNucleus', () => {
  it('empty', () => {
    expect(getAtomTypeFromNucleus('')).toBe('');
  });
  it('13C', () => {
    expect(getAtomTypeFromNucleus('13C')).toBe('C');
  });
  it('1H', () => {
    expect(getAtomTypeFromNucleus('1H')).toBe('H');
  });
  it('29Si', () => {
    expect(getAtomTypeFromNucleus('29Si')).toBe('Si');
  });
});

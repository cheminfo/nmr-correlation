import { describe, expect, it } from 'vitest';

import { getAtomCounts } from '../getAtomCounts';

describe('getAtomCounts', () => {
  it('empty', () => {
    expect(getAtomCounts('')).toStrictEqual({});
  });
  it('C10H1BBrNa2N', () => {
    expect(getAtomCounts('C10H1BBrNa2N')).toStrictEqual({
      C: 10,
      H: 1,
      B: 1,
      Br: 1,
      Na: 2,
      N: 1,
    });
  });
});

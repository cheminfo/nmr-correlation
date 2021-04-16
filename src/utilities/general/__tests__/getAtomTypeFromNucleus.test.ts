import { getAtomTypeFromNucleus } from '../getAtomTypeFromNucleus';

describe('getAtomTypeFromNucleus', () => {
  it('empty', () => {
    expect(getAtomTypeFromNucleus('')).toStrictEqual('');
  });
  it('13C', () => {
    expect(getAtomTypeFromNucleus('13C')).toStrictEqual('C');
  });
  it('1H', () => {
    expect(getAtomTypeFromNucleus('1H')).toStrictEqual('H');
  });
  it('29Si', () => {
    expect(getAtomTypeFromNucleus('29Si')).toStrictEqual('Si');
  });
});

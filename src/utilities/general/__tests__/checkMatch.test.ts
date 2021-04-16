import { checkMatch } from '../checkMatch';

describe('checkSignalMatch', () => {
  it('no tolerance, same values', () => {
    expect(checkMatch(1.2, 1.2, 0.0)).toStrictEqual(true);
  });

  it('no tolerance, different values', () => {
    expect(checkMatch(1.21, 1.2, 0.0)).toStrictEqual(false);
  });

  it('allow tolerance, same values', () => {
    expect(checkMatch(2.7, 2.7, 0.5)).toStrictEqual(true);
  });

  it('allow tolerance, different values, true', () => {
    expect(checkMatch(2.7, 2.2, 0.5)).toStrictEqual(true);
  });

  it('allow tolerance, different values, false', () => {
    expect(checkMatch(2.7, 2.19, 0.5)).toStrictEqual(false);
  });
});

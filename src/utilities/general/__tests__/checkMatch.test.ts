import { checkMatch } from '../checkMatch';

describe('checkSignalMatch', () => {
  it('no tolerance, same values', () => {
    expect(checkMatch(1.2, 1.2, 0)).toBe(true);
  });

  it('no tolerance, different values', () => {
    expect(checkMatch(1.21, 1.2, 0)).toBe(false);
  });

  it('allow tolerance, same values', () => {
    expect(checkMatch(2.7, 2.7, 0.5)).toBe(true);
  });

  it('allow tolerance, different values, true', () => {
    expect(checkMatch(2.7, 2.2, 0.5)).toBe(true);
  });

  it('allow tolerance, different values, false', () => {
    expect(checkMatch(2.7, 2.19, 0.5)).toBe(false);
  });
});

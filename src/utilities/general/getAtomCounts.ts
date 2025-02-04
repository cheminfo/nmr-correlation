/**
 * Returns the number of atoms per atom type for a given molecular formula.
 *
 * @param {string} mf
 */
export function getAtomCounts(mf: string): Record<string, number> {
  const elements: string[] | null = mf ? mf.match(/[A-Z][a-z]{0,1}/g) : [];
  const counts: Record<string, number> = {};

  if (elements) {
    for (const elem of elements) {
      const regex = new RegExp(`(${elem}\\d+)`, 'g');
      const match = regex.exec(mf);
      let count = 1;
      if (match) {
        count = Number(match[0].split(elem)[1]);
      }
      counts[elem] = count;
    }
  }

  return counts;
}

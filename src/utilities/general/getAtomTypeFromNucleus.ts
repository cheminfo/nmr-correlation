/**
 * Get atom type from nucleus
 * @param {string} nucleus
 */
export function getAtomTypeFromNucleus(nucleus: string): string {
  return nucleus.split(/\d+/)[1];
}

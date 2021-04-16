/**
 * Get atom type from nucleus
 * @param {string} nucleus
 */
export function getAtomTypeFromNucleus(nucleus: string): string {
  return nucleus.length > 0 ? nucleus.split(/\d+/)[1] : '';
}

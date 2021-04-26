/**
 * Checks for a numeric match within a certain tolerance.
 *
 * @param {number} value1
 * @param {number} value2
 * @param {number} tolerance
 */
export function checkMatch(
  value1: number,
  value2: number,
  tolerance: number,
): boolean {
  return value1 - tolerance <= value2 && value2 <= value1 + tolerance;
}

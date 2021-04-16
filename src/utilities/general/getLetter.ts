import { labelLetters } from '../../constants/labelLetters';

export function getLetter(number: number): string {
  return labelLetters[number];
}

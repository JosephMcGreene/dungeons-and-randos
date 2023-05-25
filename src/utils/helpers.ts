/**
 * generates a random integer no larger than its argument - 1
 * @param {number} maxNumber number representing the upper limit for the return value
 * @returns {number}         a random integer no larger than the function's argument - 1
 */
export function randomNumberLessThan(maxNumber: number): number {
  return Math.floor(Math.random() * maxNumber);
}

export function oneLetterUpperCase(
  stringToConvert: string,
  indexOfChar: number
): string {
  return stringToConvert.replace(
    stringToConvert.charAt(indexOfChar),
    stringToConvert.charAt(indexOfChar).toUpperCase()
  );
}

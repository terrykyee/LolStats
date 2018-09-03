// @flow
/**
 * @file String utilities
 */

/**
 * Capitalize first letter of a word band lower cases remaining letters
 * @param value String value to operate on
 * @returns {*} A string with first letter capitalized and remaining letters lower case
 */
export function lowerCaseAllWordsExceptFirstLetters(value: string) {
  return value.replace(/\w\S*/g, function (word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

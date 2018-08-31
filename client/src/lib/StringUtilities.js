/**
 * @file String utilities
 */

export function lowerCaseAllWordsExceptFirstLetters(value) {
  return value.replace(/\w\S*/g, function (word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const sMapping = new Map();

  for (let letter of s) {
    sMapping.set(letter, sMapping.has(letter) ? sMapping.get(letter) + 1 : 1);
  }

  for (letter of t) {
    if (sMapping.has(letter) && sMapping.get(letter) !== 0) {
      sMapping.set(letter, sMapping.get(letter) - 1);
    } else {
      return false;
    }
  }
  return true;
};

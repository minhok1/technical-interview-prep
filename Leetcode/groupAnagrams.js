/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // Idea: For each word, sort it and check if map has that key
  const mapping = new Map();

  for (word of strs) {
    const sortedWord = word.split("").sort().join("");
    if (mapping.has(sortedWord)) {
      mapping.set(sortedWord, [...mapping.get(sortedWord), word]);
    } else {
      mapping.set(sortedWord, [word]);
    }
  }

  return [...mapping.values()];
};

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
  // Idea: Use map to check if same letter maps to different words, and use set to check if different letters map to same word
  const sArray = s.split(' ');
  const mapping = new Map();
  const words = new Set();

  if (sArray.length !== pattern.length) {
      return false;
  }

  for (let i = 0; i < pattern.length; i++) {
      if (mapping.has(pattern[i])) {
          if (mapping.get(pattern[i]) !== sArray[i]) {
              return false;
          }
      }
      else {
          mapping.set(pattern[i], sArray[i]);
          if (words.has(sArray[i])) {
              return false;
          }
      }
      words.add(sArray[i]);
  }
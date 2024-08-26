/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  // Idea: use hashmap to map from s to t. Then, use a set to check if two letters from s are mapping to the same t letter.
  // Map has keys that take O(1) lookup. It has "has," "get," "set"
  // Set just contains items that cannot be repeated (also O(1)). It has "has," "add" and "delete"
  const mapping = new Map();
  const tDuplicates = new Set();

  for (i = 0; i < s.length; i++) {
    if (mapping.has(s[i])) {
      if (mapping.get(s[i]) !== t[i]) {
        return false;
      }
    } else {
      if (!tDuplicates.has(t[i])) {
        mapping.set(s[i], t[i]);
        tDuplicates.add(t[i]);
      } else {
        return false;
      }
    }
  }
  return true;
};

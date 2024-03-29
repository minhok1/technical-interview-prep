var lengthOfLongestSubstring = function (s) {
  // Idea: If right exists in the set, move left until there is no duplicate, then take maxLength
  let set = new Set();
  let left = 0;
  let maxLength = 0;

  for (right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};

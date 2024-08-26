/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // Idea: Use set because we need to remove duplicate numbers and then see if each number can be the start of a sequence

  let maxLength = 0;
  const set = new Set(nums);

  for (let num of nums) {
    if (set.has(num - 1)) {
      continue;
    }
    let counter = 1;
    current = num;

    while (set.has(current + 1)) {
      counter++;
      current++;
    }

    maxLength = Math.max(maxLength, counter);
  }

  return maxLength;
};

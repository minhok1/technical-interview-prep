/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // All possible combinations - a perfect backtracking example!

  const results = [];

  const DFS = (candidates, tempPermutation) => {
    if (!candidates.length) {
      results.push(tempPermutation);
      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      DFS(
        [...candidates.slice(0, i), ...candidates.slice(i + 1)],
        [...tempPermutation, candidates[i]]
      );
    }
  };

  DFS(nums, []);

  return results;
};

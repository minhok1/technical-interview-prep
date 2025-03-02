/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // Idea: Kadane's Algorithm

  let result = nums[0]; // Max for the point to which we've traversed
  let currentSubarrayMax = nums[0]; // Max for the current subarray I'm working with

  for (let i = 1; i < nums.length; i++) {
    // 1st is for continuing the subarray, and the second is for starting a new one
    currentSubarrayMax = Math.max(currentSubarrayMax + nums[i], nums[i]);
    result = Math.max(result, currentSubarrayMax);
  }

  return result;
};

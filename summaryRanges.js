/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const ranges = [];

  let left = 0;
  let right = 1;
  let rangedFlag = false;

  while (left < nums.length) {
    if (right >= nums.length) {
      ranges.push(`${nums[left]}${rangedFlag ? "->" + nums[right - 1] : ""}`);
      left = right;
    } else if (nums[right] - nums[right - 1] === 1) {
      right++;
      rangedFlag = true;
    } else {
      ranges.push(`${nums[left]}${rangedFlag ? "->" + nums[right - 1] : ""}`);
      left = right;
      right++;
      rangedFlag = false;
    }
  }

  return ranges;
};

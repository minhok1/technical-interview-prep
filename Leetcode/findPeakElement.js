/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  // Idea: Go through binary search. Only save the half that's higher than med because that guarantees the existence of a peak

  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (mid === 0 || nums[mid] > nums[mid - 1]) {
      if (mid === nums.length - 1 || nums[mid] > nums[mid + 1]) {
        return mid;
      } else {
        low = mid + 1;
      }
    } else {
      high = mid - 1;
    }
  }

  return low;
};

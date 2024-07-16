/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let low = 0;
  let high = nums.length; //Why not nums.length - 1? -> because can be inserted at the end of the array

  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    if (target > nums[mid]) {
      low = mid + 1; //because target is strictly bigger, mid's not a valid option, hence the lowest possible is mid + 1
    } else {
      high = mid; //because target can be the same as nums[mid], high should be mid
    }
  }
  return low;
};

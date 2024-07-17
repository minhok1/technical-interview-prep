/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // Idea 1: Go through the array and find the element in O(n). I'm not even going to code this up

  // Idea 2: Use binary search. This array is sorted (possibly rotated, but still sorted), so binary search can be used.
  // this array was in ascending order to start with.
  // So for its subarray, even after the rotation, it's in ascending order if last > first.

  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] >= nums[low]) {
      //left part is in ascending order
      if (nums[low] <= target && target <= nums[mid]) {
        //target is in the left part
        high = mid - 1; //then the answer should be looked in the left part
      } else {
        // there's no chance that target is in left, so look to the right
        low = mid + 1;
      }
    } else {
      //left part is not in ascending order, so right part must be
      if (nums[mid] <= target && target <= nums[high]) {
        //target is in the right part
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // Idea 1: Iterate through the array and find in O(n) time
  // Idea 2: Use binary search

  let low = 0;
  let high = nums.length - 1;
  let min = nums[0];

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[low] >= nums[high]) {
      //rotated
      if (nums[mid] <= nums[high]) {
        // mid ~ high is in ascending order
        min = Math.min(min, nums[mid]); //min value from the right side must be mid
        high = mid - 1; //now check the left side
      } else {
        // low ~ mid is ascending order
        min = Math.min(min, nums[low]);
        low = mid + 1;
      }
    } else {
      return Math.min(min, nums[low]);
    }
  }
  return min;
};

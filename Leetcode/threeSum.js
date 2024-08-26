/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // With brute force (or backtracking), it would take O(n^2) to go through this.
  // The goal is to bring this down to O(n^2) using two pointers.
  // I'm using two pointers strategy because there's a target that we have to meet with elements of the array.
  // Idea: Sort first. Then, iterate over the first element and two pointers for the rest of the array.

  const sorted = nums.sort((a, b) => a - b); // O(nlogn)
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      // duplicate fixed value check
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;
    const compliment = 0 - nums[i];
    while (left < right) {
      if (nums[left] + nums[right] === compliment) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && sorted[left] === sorted[left + 1]) {
          // move left until all duplicates are bypassed
          left++;
        }
        while (left < right && sorted[right] === sorted[right - 1]) {
          // move right until all duplicates are bypassed
          right--;
        }
        left++;
        right--;
      } else if (nums[left] + nums[right] < compliment) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
};

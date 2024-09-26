/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  // Idea: As I iterate, I can keep track of the smallest number.
  // If I find a number to its right smaller than that, reset it.
  // If I find a bigger one, mark it as second biggest and move on.
  // If I find another one even bigger than that, return true.

  let first = Infinity;
  let second = Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= first) {
      first = nums[i];
      //Should not set second = nums[i+1] because we want to leave the second just in case third is found elsewhere for that second!
    } else {
      if (nums[i] <= second) {
        second = nums[i];
      } else {
        return true;
      }
    }
  }
  return false;
};

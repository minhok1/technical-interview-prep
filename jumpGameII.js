/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  // Idea: use greedy algorithm in which you check i -> i + 1 -> ... -> i + nums[i] and move ahead with the option that can jump the furthest
  let jumps = 0;
  let currentIndex = 0;

  while (currentIndex < nums.length - 1) {
    let maxJump = 0;
    let maxJumpIndex = currentIndex;
    for (i = 1; i <= nums[currentIndex]; i++) {
      if (currentIndex + i === nums.length - 1) {
        maxJumpIndex = nums.length - 1;
        break;
      }
      if (i + nums[currentIndex + i] > maxJump) {
        maxJump = i + nums[currentIndex + i];
        maxJumpIndex = currentIndex + i;
      }
    }
    currentIndex = maxJumpIndex;
    jumps += 1;
  }

  return jumps;
};

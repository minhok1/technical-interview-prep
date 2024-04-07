var productExceptSelf = function (nums) {
  // Idea: multiply everything and divide each time by the respecitve number. If there is a 0, all would be 0 except for that one 0. If there are more than one 0, all would be 0.

  let total = 1;
  let numZero = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      numZero += 1;
    } else {
      // Required because otherwise for numZero = 1, total would be zero even at that single zero
      total = total * nums[i];
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (!numZero) {
      nums[i] = total / nums[i];
    } else if (numZero === 1) {
      if (nums[i] === 0) {
        nums[i] = total;
      } else {
        nums[i] = 0;
      }
    } else {
      nums[i] = 0;
    }
  }

  return nums;
};

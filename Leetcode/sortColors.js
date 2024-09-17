/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let numR = 0;
  let numW = 0;
  let numB = 0;

  for (let i = 0; i < nums.length; i++) {
    switch (nums[i]) {
      case 0:
        numR++;
        break;
      case 1:
        numW++;
        break;
      case 2:
        numB++;
        break;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (i < numR) {
      nums[i] = 0;
    } else if (i < numR + numW) {
      nums[i] = 1;
    } else {
      nums[i] = 2;
    }
  }
};

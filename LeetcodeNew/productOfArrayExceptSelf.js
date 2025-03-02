/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // Idea: multiply everything then divide as I iterate
  // Keep in mind that if the total is 0 and if there is only one 0, I should return an actual number when iterating through that one 0

  let numZero = 0;
  let nonZeroTotal = 1; //For when there's only one 0 and we stumble upon it
  // let total = 1 -> no need as we would only use total when numZero === 0

  nums.forEach((num) => {
    if (num === 0) {
      numZero += 1;
    } else {
      nonZeroTotal *= num;
    }
  });

  return nums.map((num) => {
    if (numZero === 0) {
      return nonZeroTotal / num;
    } else if (numZero === 1) {
      if (num === 0) {
        return nonZeroTotal;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
};

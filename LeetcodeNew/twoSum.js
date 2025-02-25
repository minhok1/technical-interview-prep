/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // Idea: Save complements as you iterate through nums -> use hashmap

  const complements = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (complements.has(nums[i])) {
      return [i, complements.get(nums[i])];
    }
    complements.set(target - nums[i], i);
  }
};

var twoSum = function (nums, target) {
  // Idea: As you go through the nums, save the target - num in hashmap, and check if that exists as you go on

  const complements = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (complements.has(nums[i])) {
      return [complements.get(nums[i]), i];
    }
    complements.set(target - nums[i], i);
  }
};

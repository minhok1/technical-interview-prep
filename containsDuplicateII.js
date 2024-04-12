var containsNearbyDuplicate = function (nums, k) {
  const checked = new Map();

  for (i = 0; i < nums.length; i++) {
    if (checked.has(nums[i])) {
      if (i - checked.get(nums[i]) <= k) {
        return true;
      }
    }
    checked.set(nums[i], i);
  }
  return false;
};

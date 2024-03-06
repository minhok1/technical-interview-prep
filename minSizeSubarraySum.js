var minSubArrayLen = function (target, nums) {
  // Idea: right travels until target is surpassed, then left catches up until the sum drops below target. This allows me to check all subarrays
  // This ensures the minimal length subarray because distance keeps getting checked and I'm only saving the one with minimal length
  var distance = Number.MAX_SAFE_INTEGER;
  var left = 0;
  var sum = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      distance = Math.min(distance, right - left + 1);
      sum -= nums[left];
      left += 1;
    }
  }
  return distance === Number.MAX_SAFE_INTEGER ? 0 : distance;
};

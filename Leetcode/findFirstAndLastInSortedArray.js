/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const binarySearch = (nums, target, isSearchingStart) => {
    let low = 0;
    let high = nums.length - 1;
    let index = -1;

    while (low <= high) {
      //need = here because index=mid is set inside the loop, so need that last iteration
      let mid = low + Math.floor((high - low) / 2);
      if (nums[mid] < target) {
        low = mid + 1;
      } else if (nums[mid] === target) {
        index = mid;
        if (isSearchingStart) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      } else {
        high = mid - 1;
      }
    }

    return index;
  };

  const start = binarySearch(nums, target, true);
  const end = binarySearch(nums, target, false);
  return [start, end];
};

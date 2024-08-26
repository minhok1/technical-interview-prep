/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // Idea: go through the interval process but sort first
  let left = 0;
  let right = 1;
  intervals.sort((a, b) => a[0] - b[0]);

  while (left < intervals.length) {
    if (right === intervals.length) {
      break;
    } else if (intervals[right][0] <= intervals[left][1]) {
      intervals[left][0] = Math.min(intervals[left][0], intervals[right][0]);
      intervals[left][1] = Math.max(intervals[right][1], intervals[left][1]);
      intervals.splice(right, 1);
    } else {
      left++;
      right++;
    }
  }

  return intervals;
};

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  // Idea: Divide the problem into two parts

  // 1. add newInterval into intervals -> array is sorted so use binary search
  let low = 0;
  let high = intervals.length;
  const target = newInterval[0];

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (target > intervals[mid][0]) {
      //mid not a valid option
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  let sortedArray = intervals.slice(0, low);
  sortedArray.push(newInterval);
  sortedArray = sortedArray.concat(intervals.slice(low, intervals.length));

  // 2. use two pointer to merge
  const result = [];
  low = 0;
  high = 1;
  let tempInterval = [...sortedArray[low]];

  while (high < sortedArray.length) {
    if (sortedArray[high][0] <= tempInterval[1]) {
      tempInterval[1] = Math.max(tempInterval[1], sortedArray[high][1]);
    } else {
      result.push(tempInterval);
      low = high;
      tempInterval = [...sortedArray[low]];
    }
    high++;
  }
  result.push(tempInterval);
  return result;
};

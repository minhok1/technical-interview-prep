/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // This is min priority queue installed on Leetcode. In the actual interview, different syntax may be provided.
  const minPriQ = new MinPriorityQueue();

  for (let num of nums) {
    minPriQ.enqueue(num);
    if (minPriQ.size() > k) {
      minPriQ.dequeue();
    }
  }
  return minPriQ.front().element;
};

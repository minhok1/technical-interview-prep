/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // Idea: When faced with a container of different walls, the only way to maximize is to move the lower one because that's that governs the size of the container
  // Use two pointer

  let p1 = 0;
  let p2 = height.length - 1;
  let maxArea = 0;

  while (p2 > p1) {
    const currArea = (p2 - p1) * Math.min(height[p1], height[p2]);
    if (currArea > maxArea) {
      maxArea = currArea;
    }

    if (height[p1] > height[p2]) {
      p2--;
    } else {
      p1++;
    }
  }
  return maxArea;
};

var maxArea = function (height) {
  // Idea: Move the lower pointer because that's the bottleneck! e.g. even if there was a 5 in the beginning of the example, the 5-8 wouldn't be bigger than 5-7
  var p1 = 0;
  var p2 = height.length - 1;
  var maxArea = 0;

  while (p2 > p1) {
    if (height[p1] > height[p2]) {
      maxArea = Math.max(maxArea, (p2 - p1) * height[p2]);
      p2--;
    } else {
      maxArea = Math.max(maxArea, (p2 - p1) * height[p1]);
      p1++;
    }
  }
  return maxArea;
};

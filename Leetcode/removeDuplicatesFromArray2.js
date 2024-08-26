var removeDuplicates = function (nums) {
  var p1 = 0;
  var p2 = 1;

  while (p2 !== nums.length) {
    if (nums[p1] !== nums[p2]) {
      p1 = p2;
      p2++;
    } else {
      if (p2 - p1 < 2) {
        p2++;
      } else {
        nums.splice(p2, 1);
      }
    }
  }
};

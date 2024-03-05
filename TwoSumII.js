var twoSum = function (numbers, target) {
  // Idea: With the 2 pointer solution, either L or R will get to its correct position first. At that point, whether it's L or R, the correct pointer wouldn't move anymore and the other pointer would move until the correct pair is found.
  var L = 0;
  var R = numbers.length - 1;

  while (numbers[L] + numbers[R] !== target) {
    if (numbers[L] + numbers[R] < target) {
      L++;
    } else {
      R--;
    }
  }

  return [L + 1, R + 1];
};

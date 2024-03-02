var isPalindrome = function (s) {
  const converted = s.replace(/[^0-9a-z]/gi, "").toLowerCase();
  var p1 = 0;
  var p2 = converted.length - 1;

  while (p2 > p1) {
    if (converted[p1] !== converted[p2]) {
      return false;
    }
    p1++;
    p2--;
  }
  return true;
};

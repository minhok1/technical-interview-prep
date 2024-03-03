var isSubsequence = function (s, t) {
  var pointerS = 0;
  var pointerT = 0;
  if (!s.length) {
    return true;
  }

  while (pointerT < t.length) {
    if (s[pointerS] === t[pointerT]) {
      if (pointerS === s.length - 1) {
        return true;
      }
      pointerS++;
    }
    pointerT++;
  }
  return false;
};

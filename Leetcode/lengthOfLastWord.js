var lengthOfLastWord = function (s) {
  var lastWordStarted = false;
  var result = 0;

  for (i = s.length - 1; i >= 0; i--) {
    if (s[i] === " ") {
      if (lastWordStarted) {
        break;
      } else {
        continue;
      }
    } else {
      lastWordStarted = true;
      result++;
    }
  }
  return result;
};

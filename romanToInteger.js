var romanToInt = function (s) {
  // Idea: If a roman numeral is before a value that is bigger than itself, just subtract it. Otherwise, I can just add it to total.
  const characters = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  var result = 0;

  for (i = 0; i < s.length; i++) {
    if (i != s.length - 1 && characters[s[i + 1]] > characters[s[i]]) {
      result -= characters[s[i]];
    } else {
      result += characters[s[i]];
    }
  }

  return result;
};

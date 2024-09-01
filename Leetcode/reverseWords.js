/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  p1 = 0;
  p2 = 1;
  result = [];

  while (p1 < s.length) {
    if (s[p1] === " ") {
      p1++;
      p2 = p1 + 1;
    } else {
      if (p2 === s.length) {
        result.unshift(s.slice(p1, p2));
        p1 = p2;
      } else if (s[p2] !== " ") {
        p2++;
      } else {
        result.unshift(s.slice(p1, p2));
        p1 = p2;
        p2++;
      }
    }
  }

  return result.join(" ");
};

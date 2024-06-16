/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  for (i = 0; i < s.length; i++) {
    if (s[i] === "[" || s[i] === "{" || s[i] === "(") {
      stack.push(s[i]);
    } else {
      if (!stack.length) {
        return false;
      }
      const match = stack.pop();
      if (s[i] === "}") {
        if (match !== "{") {
          return false;
        }
      } else if (s[i] === "]") {
        if (match !== "[") {
          return false;
        }
      } else {
        if (match !== "(") {
          return false;
        }
      }
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
};

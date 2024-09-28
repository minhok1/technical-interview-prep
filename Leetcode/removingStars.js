/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
  const stack = [];
  let index = 0;
  while (index < s.length) {
    if (s[index] === "*") {
      stack.pop();
    } else {
      stack.push(s[index]);
    }
    index++;
  }
  return stack.join("");
};

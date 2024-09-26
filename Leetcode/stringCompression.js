/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  let start = 0;
  let end = 0;
  let currentLength = 0;

  while (start < chars.length) {
    if (chars[start] === chars[end]) {
      end++;
      currentLength++;
    } else {
      const toAdd = chars[start] + (currentLength === 1 ? "" : currentLength);
      chars.splice(start, end - start, ...toAdd);
      start += toAdd.length;
      end = start;
      currentLength = 0;
    }
  }

  return chars.length;
};

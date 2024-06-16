/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = [];
  let pathArray = path.split("/");

  for (let i = 0; i < pathArray.length; i++) {
    if (pathArray[i] === "." || pathArray[i] === "") {
      continue;
    } else if (pathArray[i] === "..") {
      stack.pop();
    } else {
      stack.push(pathArray[i]);
    }
  }
  return "/" + stack.join("/");
};

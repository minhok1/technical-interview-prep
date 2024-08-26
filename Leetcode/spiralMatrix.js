/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  // Idea: I could use set to check if that space has already been visited, but it's faster to replace the value on the matrix
  const maxCount = matrix.length * matrix[0].length;
  const result = [];
  let row = 0;
  let col = 0;
  let direction = "R"; //R, L, U, D

  function nextPosition() {
    if (direction === "R") {
      if (col === matrix[0].length - 1 || matrix[row][col + 1] === ".") {
        direction = "D";
        row++;
      } else {
        col++;
      }
    } else if (direction === "D") {
      if (row === matrix.length - 1 || matrix[row + 1][col] === ".") {
        direction = "L";
        col--;
      } else {
        row++;
      }
    } else if (direction === "L") {
      if (col === 0 || matrix[row][col - 1] === ".") {
        direction = "U";
        row--;
      } else {
        col--;
      }
    } else {
      if (row === 0 || matrix[row - 1][col] === ".") {
        direction = "R";
        col++;
      } else {
        row--;
      }
    }
  }

  while (result.length < maxCount) {
    result.push(matrix[row][col]);
    matrix[row][col] = ".";
    nextPosition();
  }

  return result;
};

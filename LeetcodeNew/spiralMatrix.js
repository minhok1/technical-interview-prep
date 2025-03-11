/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  // Idea: I could use set to check if that space has already been visited, but it's faster to replace the value on the matrix

  let direction = "R"; // R -> D -> L -> U
  let row = 0;
  let col = 0;
  const spiral = [];
  const matrixSize = matrix.length * matrix[0].length;

  while (spiral.length < matrixSize) {
    spiral.push(matrix[row][col]);
    matrix[row][col] = "x";
    if (direction === "R") {
      if (col === matrix[0].length - 1 || matrix[row][col + 1] === "x") {
        direction = "D";
        row++;
      } else {
        col++;
      }
    } else if (direction === "D") {
      if (row === matrix.length - 1 || matrix[row + 1][col] === "x") {
        direction = "L";
        col--;
      } else {
        row++;
      }
    } else if (direction === "L") {
      if (col === 0 || matrix[row][col - 1] === "x") {
        direction = "U";
        row--;
      } else {
        col--;
      }
    } else if (direction === "U") {
      if (row === 0 || matrix[row - 1][col] === "x") {
        direction = "R";
        col++;
      } else {
        row--;
      }
    }
  }

  return spiral;
};

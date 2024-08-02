/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function (mat) {
  let direction = "UR"; // UR goes up-right, DL goes down-left
  let row = 0;
  let col = 0;

  const result = [];
  const numRows = mat.length;
  const numCols = mat[0].length;
  const matLength = numRows * numCols;

  while (result.length < matLength) {
    result.push(mat[row][col]);
    if (direction === "UR") {
      if (col === numCols - 1) {
        row++;
        direction = "DL";
      } else if (row === 0) {
        col++;
        direction = "DL";
      } else {
        col++;
        row--;
      }
    } else {
      if (row === numRows - 1) {
        col++;
        direction = "UR";
      } else if (col === 0) {
        row++;
        direction = "UR";
      } else {
        col--;
        row++;
      }
    }
  }

  return result;
};

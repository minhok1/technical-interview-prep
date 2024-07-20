/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // Idea: first, find the correct row with binary search. Then, find the correct element also using binary search.

  const findRow = (minRow, maxRow) => {
    if (minRow > maxRow) {
      return -1;
    }
    const mid = minRow + Math.floor((maxRow - minRow) / 2);
    if (
      matrix[mid][0] <= target &&
      target <= matrix[mid][matrix[mid].length - 1]
    ) {
      return mid;
    } else if (matrix[mid][0] > target) {
      return findRow(minRow, mid - 1);
    } else {
      return findRow(mid + 1, maxRow);
    }
  };

  const targetRow = findRow(0, matrix.length - 1);

  const findElement = (low, high) => {
    if (high < low) {
      return false;
    }
    const mid = low + Math.floor((high - low) / 2);

    if (matrix[targetRow][mid] === target) {
      return true;
    } else if (matrix[targetRow][mid] < target) {
      return findElement(mid + 1, high);
    } else {
      return findElement(low, mid - 1);
    }
  };

  if (targetRow >= 0) {
    return findElement(0, matrix[targetRow].length - 1);
  } else {
    return false;
  }
};

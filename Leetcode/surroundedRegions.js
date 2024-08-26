/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  // Idea: use graph to traverse through all the spaces in the same chunk, while checking if they touch the edge at all
  // O(n^2)
  if (!board.length) {
    return null;
  }

  const bfs = (row, col) => {
    if (
      row < 0 ||
      row > board.length - 1 ||
      col < 0 ||
      col > board[0].length - 1 ||
      board[row][col] !== "O"
    ) {
      return;
    }
    board[row][col] = "T"; //T for temporary
    bfs(row + 1, col);
    bfs(row - 1, col);
    bfs(row, col + 1);
    bfs(row, col - 1);
  };

  for (row = 0; row < board.length; row++) {
    for (col = 0; col < board[0].length; col++) {
      if (
        board[row][col] === "O" &&
        (row == 0 ||
          row == board.length - 1 ||
          col == 0 ||
          col == board[0].length - 1)
      ) {
        //only bfs from the ones adjacent to edge, because others will be captured
        bfs(row, col);
      }
    }
  }

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] == "T") {
        board[i][j] = "O";
      } else {
        board[i][j] = "X";
      }
    }
  }

  return board;
};

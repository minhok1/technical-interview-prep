/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  // Have to check for every letter of the target -> this is ridiculous! So use backtracking
  // I was using set to keep track of visited nodes, but I can just modify the board!
  const initialWord = word.split("");
  const initialCandidates = [];
  let result = false;
  const numRows = board.length;
  const numCols = board[0].length;

  const findCandidates = (position) => {
    const candidates = [];
    if (position[0] !== 0) {
      candidates.push([position[0] - 1, position[1]]);
    }
    if (position[0] !== numRows - 1) {
      candidates.push([position[0] + 1, position[1]]);
    }
    if (position[1] !== 0) {
      candidates.push([position[0], position[1] - 1]);
    }
    if (position[1] !== numCols - 1) {
      candidates.push([position[0], position[1] + 1]);
    }
    return candidates;
  };

  const backtrack = (candidates, wordRemainder) => {
    if (!wordRemainder.length) {
      result = true;
      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      if (board[candidates[i][0]][candidates[i][1]] !== ".") {
        if (wordRemainder[0] === board[candidates[i][0]][candidates[i][1]]) {
          const visited = board[candidates[i][0]][candidates[i][1]];
          board[candidates[i][0]][candidates[i][1]] = ".";
          backtrack(findCandidates(candidates[i]), wordRemainder.slice(1));
          board[candidates[i][0]][candidates[i][1]] = visited;
        }
      }
    }
    return;
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      initialCandidates.push([i, j]);
    }
  }

  backtrack(initialCandidates, initialWord);

  return result;
};

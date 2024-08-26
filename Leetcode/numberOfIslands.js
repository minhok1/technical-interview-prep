/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  // Idea: Use BFS to traverse all the parts of a single island, add 1 to the number of islands, then keep checking other parts of the board
  // While a normal BFS would use a set to keep track of visited nodes, we can just turn the checked nodes to "0" for this one

  if (!grid.length || !grid[0].length) {
    return 0;
  }

  const maxRow = grid.length;
  const maxCol = grid[0].length;
  let islands = 0;
  let queue = [];

  const bfs = () => {
    while (queue.length) {
      const [i, j] = queue.shift();
      if (i < 0 || j < 0 || i >= maxRow || j >= maxCol || grid[i][j] === "0") {
        continue;
      }
      grid[i][j] = "0";
      queue.push([i - 1, j]);
      queue.push([i + 1, j]);
      queue.push([i, j - 1]);
      queue.push([i, j + 1]);
    }
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        queue.push([i, j]);
        bfs();
        islands++;
      }
    }
  }

  return islands;
};

// A way to speed this up would be to: instead of using queue, just recurse bfs() with the 4 options

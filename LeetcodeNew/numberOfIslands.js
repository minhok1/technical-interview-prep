/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  // Idea: This is a graph. Instead of using a separate "visited" set, I can just cross out each space

  const maxX = grid[0].length;
  const maxY = grid.length;
  let islands = 0;
  queue = []; // this is for iterating through a single island - elements are [y, x]

  function BFS() {
    while (queue.length) {
      const [y, x] = queue.shift();
      if (y < 0 || x < 0 || y >= maxY || x >= maxX || grid[y][x] === "0") {
        continue;
      }
      grid[y][x] = "0";
      queue.push([y - 1, x]);
      queue.push([y + 1, x]);
      queue.push([y, x - 1]);
      queue.push([y, x + 1]);
    }
  }

  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      if (grid[i][j] === "1") {
        queue.push([i, j]);
        BFS();
        islands++;
      }
    }
  }

  return islands;
};

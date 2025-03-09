/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
  // Idea: Use BFS or DFS

  if (!node) {
    return null;
  }

  const cloneStart = new _Node(node.val);
  let queue = [node]; // This is used to go through the old graph
  const visited = new Map(); // old node as the key, new node as the value

  visited.set(node, cloneStart);

  while (queue.length) {
    const currCheck = queue.shift(); // take the first element (old node)
    for (let neighbor of currCheck.neighbors) {
      // neighbors of the currCheck old node
      if (!visited.has(neighbor)) {
        const newCloneNode = new _Node(neighbor.val);
        queue.push(neighbor);
        visited.set(neighbor, newCloneNode);
      }
      visited.get(currCheck).neighbors.push(visited.get(neighbor));
    }
  }
  return cloneStart;
};

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
  // Idea: either BFS or DFS works, I'll use BFS this time around
  // When cloning (linked list or graph), you need to store the mapping between old nodes and new nodes
  // So the idea is to do a BFS traversal through the old graph, while storing the relationships and updating neighbors in the map as you go along
  if (!node) {
    return null;
  }

  const start = new _Node(node.val);
  let queue = []; //Used to go through the old nodes
  const visited = new Map(); //maps old nodes (key) - new nodes(value)

  queue = [node];
  visited.set(node, start);

  while (queue.length) {
    const currCheck = queue.shift();
    for (let neighbor of currCheck.neighbors) {
      if (!visited.has(neighbor)) {
        let newNode = new _Node(neighbor.val);
        queue.push(neighbor);
        visited.set(neighbor, newNode);
      }
      visited.get(currCheck).neighbors.push(visited.get(neighbor));
    }
  }

  return start;
};

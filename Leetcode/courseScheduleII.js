/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  // Idea: Go through topological sorting because we require the order

  const order = new Set();
  const adjacency = {};

  const DFS = (visited, node) => {
    if (!adjacency[node]) {
      order.add(node);
      return true;
    }

    if (visited.has(node)) {
      return false;
    } else {
      visited.add(node);

      for (let adjElement of adjacency[node]) {
        if (!DFS(visited, adjElement)) {
          return false;
        }
      }
      adjacency[node] = undefined;
      order.add(node);
      return true;
    }
  };

  // Build adjacency list and indegree list
  for (let [end, start] of prerequisites) {
    if (!adjacency[start]) {
      adjacency[start] = [];
    }
    adjacency[start].push(end);
  }

  const initialVisited = new Set();
  for (let i = 0; i < numCourses; i++) {
    if (!DFS(initialVisited, i)) {
      return [];
    }
  }

  const stack = [...order];
  const result = [];
  while (stack.length) {
    result.push(stack.pop());
  }

  return result;
};

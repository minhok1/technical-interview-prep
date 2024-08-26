/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // Idea: This is a graph question because to find a/e, for example, we can do (a/b)*(b/d)*(d/e) to get there.
  // So in a way, consider each "equation" as an edge in an directed graph.
  // BUT WAIT! if we know b/c, we also know c/b. So in fact, this is an undirected graph!
  // Start off by creating a graph out of the equations first then.

  const graph = {};

  for (let i = 0; i < equations.length; i++) {
    // graph will be in the format {numerator: {denominator: value}}
    const [numerator, denominator] = equations[i];
    let value = values[i];
    if (!graph[numerator]) {
      graph[numerator] = {};
    }
    if (!graph[denominator]) {
      graph[denominator] = {};
    }

    graph[numerator][denominator] = value;
    graph[denominator][numerator] = 1 / value;
  }

  const results = [];

  const DFS = (numerator, denominator, visited) => {
    if (!(numerator in graph) || !(denominator in graph)) {
      return -1.0;
    }
    if (numerator === denominator) {
      //final step = multiply by 1 when the end denominator has been reached
      return 1.0;
    }

    visited.add(numerator);
    const neighbors = graph[numerator];

    for (let neighbor in neighbors) {
      //for...in iterates over object keys. For iterable data structures, use for...of
      if (!visited.has(neighbor)) {
        let result = DFS(neighbor, denominator, visited);
        if (result !== -1.0) {
          return result * neighbors[neighbor];
        }
      }
    }
    return -1.0;
  };

  for (let query of queries) {
    const [numerator, denominator] = query;
    let visited = new Set();
    results.push(DFS(numerator, denominator, visited));
  }

  return results;
};

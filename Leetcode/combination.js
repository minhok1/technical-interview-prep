/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // Depending on the number of k, it could be O(n^k) if we use brute force. So...
  // Idea: Use backtracking DFS. DFS saves times because the code remembers the last number that's been checked for each of the k elements

  const result = [];

  const dfs = (start, combination) => {
    if (combination.length === k) {
      result.push([...combination]); //clone by spread operator because combination will be changed below
      return;
    }
    for (let i = start; i <= n; i++) {
      combination.push(i);
      dfs(i + 1, combination);
      combination.pop(); //need to pop to try other values
    }
  };

  dfs(1, []);

  return result;
};

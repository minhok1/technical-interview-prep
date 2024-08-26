/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // Idea: Backtracking - keep adding values in an array until it meets the target (add to result) or goes past it (don't add).
  // Then, go back to last element that got added, replace it with another potential candidate, and check again

  const results = [];

  const dfs = (currCandidates, currTarget, currArray) => {
    if (currTarget === 0) {
      //all the values in currArray add up to the target
      results.push(currArray);
      return;
    } else if (currTarget < 0) {
      // went past, move back to the last value that got added and explore another potential candidate
      return;
    }
    for (let i = 0; i < currCandidates.length; i++) {
      // check for every possible candidate
      dfs(currCandidates.slice(i), currTarget - currCandidates[i], [
        ...currArray,
        currCandidates[i],
      ]);
    }
  };

  dfs(candidates, target, []);
  return results;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  //Idea: use recursion with stack
  result = [];

  if (!root) {
    return result;
  }

  function traverseLevel(levelNodes, goLeft) {
    const currLevel = [];
    const nextLevel = [];

    for (let i = levelNodes.length - 1; i >= 0; i--) {
      currLevel.push(levelNodes[i].val);
      if (goLeft) {
        if (levelNodes[i].left) {
          nextLevel.push(levelNodes[i].left);
        }
        if (levelNodes[i].right) {
          nextLevel.push(levelNodes[i].right);
        }
      } else {
        if (levelNodes[i].right) {
          nextLevel.push(levelNodes[i].right);
        }
        if (levelNodes[i].left) {
          nextLevel.push(levelNodes[i].left);
        }
      }
    }

    result.push(currLevel);

    if (nextLevel.length) {
      traverseLevel(nextLevel, !goLeft);
    }
  }

  traverseLevel([root], true);
  return result;
};

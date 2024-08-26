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
 * @return {number}
 */
var countNodes = function (root) {
  // Idea: do a binary search where if we have all the leaves, return 2 ^ h - 1. But if not, add left and right then +1.
  // Each binary search loop may traverse down h, so O(h^2) = O((logn)^2) -> THIS IS SMALLER THAN O(n)!!!!

  function leftDepth(node) {
    //leftmost depth
    if (!node) {
      return 0;
    }
    return leftDepth(node.left) + 1;
  }

  function rightDepth(node) {
    //rightmost depth
    if (!node) {
      return 0;
    }
    return rightDepth(node.right) + 1;
  }

  function traverse(node) {
    const left = leftDepth(node);
    const right = rightDepth(node);

    if (left === right) {
      return Math.pow(2, left) - 1;
    }
    return traverse(node.left) + traverse(node.right) + 1;
  }
  return traverse(root);
};

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
var sumNumbers = function (root) {
  // Idea: For every iteration of recursion, take the previous passed down number * 10 + current value

  return helper(root, 0);
};

var helper = function (currNode, sum) {
  if (!currNode) {
    return 0; // Need to return 0 instead of sum because if there's no leaf anywhere, you don't want to add that!
  } else if (!currNode.left && !currNode.right) {
    return sum * 10 + currNode.val;
  } else {
    return (
      helper(currNode.left, sum * 10 + currNode.val) +
      helper(currNode.right, sum * 10 + currNode.val)
    );
  }
};

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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }

  if (areSymmetric(root.left, root.right)) {
    return true;
  }
  return false;
};

var areSymmetric = function (node1, node2) {
  if (!node1 && !node2) {
    return true;
  } else if ((node1 && !node2) || (!node1 && node2)) {
    return false;
  } else {
    if (
      node1.val === node2.val &&
      areSymmetric(node1.left, node2.right) &&
      areSymmetric(node1.right, node2.left)
    ) {
      return true;
    } else {
      return false;
    }
  }
};

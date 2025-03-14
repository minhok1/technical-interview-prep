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
  if (areSymmetric(root.left, root.right)) {
    return true;
  } else {
    return false;
  }
};

var areSymmetric = function (root1, root2) {
  if (!root1) {
    if (!root2) {
      return true;
    } else {
      return false;
    }
  } else {
    if (!root2) {
      return false;
    } else {
      if (
        root1.val === root2.val &&
        areSymmetric(root1.left, root2.right) &&
        areSymmetric(root1.right, root2.left)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};

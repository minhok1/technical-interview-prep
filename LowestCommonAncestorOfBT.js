/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // Idea: DFS - if something is returned from both subtrees (= either p or q found), then that node is the LCA.
  // If something is returned from only one subtree but that node is either p or q, that node is the LCA.
  // If only one subtree returns something, then return that subtree instead of the node itself
  // If the root isn't either p or q and both subtrees don't return anything, return null
  if (!root || root.val === p.val || root.val === q.val) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left) {
    if (right) {
      return root;
    } else {
      return left;
    }
  } else {
    if (right) {
      return right;
    } else {
      return null;
    }
  }
};

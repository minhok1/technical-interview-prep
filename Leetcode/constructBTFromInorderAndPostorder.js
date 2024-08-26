/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  // Idea: When the root is found by taking the last element of postorder, then the left subtree (k elements) in inorder should correspond to the first k elements of the postorder
  let inOrderMapping = new Map();
  for (i = 0; i < inorder.length; i++) {
    inOrderMapping.set(inorder[i], i);
  }

  return helper(
    inorder,
    0,
    inorder.length - 1,
    postorder,
    0,
    postorder.length - 1,
    inOrderMapping
  );
};

var helper = (inorder, is, ie, postorder, ps, pe, inOrderMapping) => {
  if (is > ie) return null;
  if (is == ie) return new TreeNode(inorder[ie]); // last node of postorder

  const root = new TreeNode(postorder[pe]);
  const rI = inOrderMapping.get(postorder[pe]);
  const numsLeft = rI - is;

  root.left = helper(
    inorder,
    is,
    rI - 1,
    postorder,
    ps,
    ps + numsLeft - 1,
    inOrderMapping
  );
  root.right = helper(
    inorder,
    rI + 1,
    ie,
    postorder,
    ps + numsLeft,
    pe - 1,
    inOrderMapping
  );
  return root;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// var buildTree = function(preorder, inorder) {
//     // Idea 1: first element of preorder is always the root. That means we can divide inorder by the first element of preorder and then recurse on the two halves.

//     if (!preorder.length) {
//         return null;
//     }

//     const rootIndex = inorder.indexOf(preorder[0]);
//     const leftInorder = inorder.slice(0, rootIndex);
//     const rightInorder = inorder.slice(rootIndex + 1);
//     const leftPreorder = leftInorder.length ? preorder.slice(1, 1+leftInorder.length) : []
//     const rightPreorder = rightInorder.length ? preorder.slice(1+leftInorder.length) : []

//     return new TreeNode(preorder[0], buildTree(leftPreorder, leftInorder), buildTree(rightPreorder, rightInorder))
// };

var buildTree = function (preorder, inorder) {
  // Idea 2: First idea works. But indexOf takes O(n), so the whole code is O(n^2). Surely there's a better way to handle this!!
  // Use a map - this would increase the space complexity to O(n) but bring down the time complexity to O(n)

  let inorderMapping = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMapping.set(inorder[i], i); // element, index as key, value
  }

  return splitTree(preorder, inorderMapping, 0, 0, inorder.length - 1);
};

var splitTree = function (P, M, pix, ileft, iright) {
  let rval = P[pix],
    root = new TreeNode(rval),
    imid = M.get(rval);
  if (imid > ileft) root.left = splitTree(P, M, pix + 1, ileft, imid - 1);
  if (imid < iright)
    root.right = splitTree(P, M, pix + imid - ileft + 1, imid + 1, iright);
  return root;
};

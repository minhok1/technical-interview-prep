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
 */
var BSTIterator = function (root) {
  // Idea: use stack to imitate inorder traversal -> helper func will take care of going all the way to left, then just resolve whatever's in stack from that point on
  this.stack = [];
  this._inorderLeftChain(root); // Now at the leftmost child
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const current = this.stack.pop();
  this._inorderLeftChain(current.right);
  return current.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0; // more to be explored
};

BSTIterator.prototype._inorderLeftChain = function (node) {
  while (node) {
    this.stack.push(node);
    node = node.left;
  }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

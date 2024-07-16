/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
  if (!root) {
    return null;
  }

  let queue = [root];

  const populateLevel = () => {
    const nextQueue = [];
    while (queue.length > 0) {
      let curr = queue.shift();
      if (queue.length) {
        curr.next = queue[0];
      }

      if (curr.left) {
        nextQueue.push(curr.left);
      }
      if (curr.right) {
        nextQueue.push(curr.right);
      }
    }
    queue = nextQueue;
  };

  while (queue.length) {
    populateLevel();
  }

  return root;
};

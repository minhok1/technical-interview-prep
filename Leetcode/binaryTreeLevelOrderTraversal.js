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

var levelOrder = function (root) {
  // Idea: Include the root value in the result, then store its children in a queue (because I need FIFO)

  const result = [];
  let queue = [];
  queue.push(root);
  while (queue.length) {
    queue = traverseLevel(result, queue);
  }

  return result;
};

var traverseLevel = function (result, queue) {
  const levelResult = [];
  const levelQueue = [...queue];
  let addLevel = false;
  queue = [];
  while (levelQueue.length) {
    const node = levelQueue.shift();
    if (node) {
      addLevel = true;
      levelResult.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  if (addLevel) {
    result.push(levelResult);
  } else {
    queue = [];
  }
  return queue;
};

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
 * @return {void} Do not return anything, modify root in-place instead.
 */

// var flatten = function(root) {
//     // Idea: Use stack to store the right pointers as you go down to the left

//     if (!root) {
//         return null;
//     }
//     let head = new TreeNode(root.val, null, null);
//     let stack = [];

//     stack.unshift(root.right);
//     head.right = helper(root.left, stack);
//     return head;
// };

// var helper = function(root, stack) {
//     if (!root) {
//         return null;
//     }
//     let node = new TreeNode(root.val, null, null);
//     console.log(node.left)
//     if (root.left) {
//         stack.unshift(root.right);
//         node.right = helper(root.left, stack);
//     }
//     else {
//         if (root.right) {
//             node.right = helper(root.right, stack);
//         }
//         else {
//             if (stack.length) {
//                 node.right = helper(stack.shift(), stack);
//             }
//         }
//     }

//     return node;
// }

// WARNING: The above didn't work because I was returning something instead of modifying in-place!

let stack = [];
var flatten = function (root) {
  if (root) {
    if (root.left) {
      if (root.right) {
        stack.unshift(root.right);
      }
      root.right = root.left;
      root.left = null;
      flatten(root.right);
    } else {
      if (root.right) {
        flatten(root.right);
      } else {
        if (stack.length) {
          root.right = stack.shift();
          flatten(root.right);
        }
      }
    }
  }
};

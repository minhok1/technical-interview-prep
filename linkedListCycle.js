/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // Solution 1: Hash table - in Javascript, this uses Set

  // let visited_nodes = new Set();
  // let current_node = head;
  // while (current_node) {
  //     if (visited_nodes.has(current_node)) {
  //         return true;
  //     }
  //     visited_nodes.add(current_node);
  //     current_node = current_node.next;
  // }
  // return false;

  // Solution 2: "Tortoise and Hare" algorithm

  let slowP = head;
  let fastP = head;

  while (fastP && fastP.next) {
    slowP = slowP.next;
    fastP = fastP.next.next;
    if (slowP === fastP) {
      return true;
    }
  }
  return false;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // Idea: mark the node before left(beforeLeftNode) and left (leftNode). Then, reverse left to right. Then, make leftNode point to the currNode, which should now be past the range.
  let currNode = head;
  let prevNode = null;
  let nextNode = null;
  let count = 1; // where currentNode is

  while (count < left) {
    prevNode = currNode;
    currNode = prevNode.next;
    count++;
  }

  // Now currentNode is at left

  let beforeLeftNode = prevNode; // So that this can later point to the right node
  let leftNode = currNode; // So that this can later point to the node after right
  prevNode = null;

  while (count <= right) {
    nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
    count++;
  }

  if (beforeLeftNode !== null) {
    //if left was 1, no need for prevLeftNode
    beforeLeftNode.next = prevNode;
  }
  leftNode.next = currNode;

  return left === 1 ? prevNode : head;
};

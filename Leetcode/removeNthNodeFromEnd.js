/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // Idea: make a two-pointer solution where the left pointer(s) follow with the delay of n from the right pointer
  let rightNode = head;
  let leftPrevNode = null;
  let leftCurrNode = head;
  let nCount = 0;

  while (nCount !== n) {
    rightNode = rightNode.next;
    nCount++;
  }

  while (rightNode !== null) {
    rightNode = rightNode.next;
    leftPrevNode = leftCurrNode;
    leftCurrNode = leftPrevNode.next;
  }

  // Now leftCurrNode is what needs to be removed
  if (leftPrevNode !== null) {
    leftPrevNode.next = leftCurrNode.next;
  } else {
    leftCurrNode = leftCurrNode.next;
  }
  return leftPrevNode ? head : leftCurrNode;
};

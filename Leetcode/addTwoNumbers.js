/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carryover = false;
  let pointer = new ListNode();
  result = pointer;

  while (l1 !== null || l2 !== null || carryover) {
    let sum = carryover ? 1 : 0;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    if (sum >= 10) {
      carryover = true;
      sum -= 10;
    } else {
      carryover = false;
    }
    pointer.next = new ListNode(sum);
    pointer = pointer.next;
  }
  return result.next;
};

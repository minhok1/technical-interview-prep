/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  // Idea: curr keeps moving forward as long as curr.val === curr.next.val. Once done, if there was any duplicate value, curr wouldn't be prev's next anymore. In that case, make prev.next = curr.next

  let dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  let curr = head;
  while (curr) {
    while (curr.next && curr.val == curr.next.val) {
      curr = curr.next;
    }
    if (prev.next == curr) {
      prev = curr;
    } else {
      prev.next = curr.next;
    }
    curr = curr.next;
  }
  return dummy.next;
};

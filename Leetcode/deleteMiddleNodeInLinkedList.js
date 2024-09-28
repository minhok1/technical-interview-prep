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
var deleteMiddle = function (head) {
  // Idea: Have a two pointer system where end moves by 2 and mid moves by 1
  // When end meets the real end of the linked list, we know that mid is current at the middle.

  let end = head;
  let endCount = 0;
  let mid = head;
  let prevMid = mid;

  if (!head.next) {
    return head.next;
  }

  while (end.next) {
    end = end.next;
    endCount++;
    if (endCount % 2 === 1) {
      prevMid = mid;
      mid = mid.next;
    }
  }
  prevMid.next = mid.next;

  return head;
};

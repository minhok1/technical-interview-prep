/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let beforeList = null;
  let beforeListHead = null;
  let afterList = null;
  let afterListHead = null;

  let traverse = head;

  while (traverse) {
    if (traverse.val < x) {
      if (beforeList) {
        beforeList.next = new ListNode(traverse.val, null);
        beforeList = beforeList.next;
      } else {
        beforeListHead = new ListNode(traverse.val, null);
        beforeList = beforeListHead;
      }
    } else {
      if (afterList) {
        afterList.next = new ListNode(traverse.val, null);
        afterList = afterList.next;
      } else {
        afterListHead = new ListNode(traverse.val, null);
        afterList = afterListHead;
      }
    }
    traverse = traverse.next;
  }

  if (beforeList) {
    beforeList.next = afterListHead;
    return beforeListHead;
  }
  return afterListHead;
};

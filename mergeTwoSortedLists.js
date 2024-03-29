/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let p3 = new ListNode();
  let result = p3;
  while (list1 || list2) {
    if (!list1) {
      p3.next = list2;
      break;
    } else if (!list2) {
      p3.next = list1;
      break;
    } else {
      if (list1.val > list2.val) {
        p3.next = new ListNode(list2.val);
        list2 = list2.next;
      } else {
        p3.next = new ListNode(list1.val);
        list1 = list1.next;
      }
      p3 = p3.next;
    }
  }
  return result.next;
};

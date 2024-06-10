/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  // Idea: if k is bigger than the full list, then subtract multiples of the length from k
  if (head === null) {
    return null;
  }
  let fullLength = 0;
  let traversePointer = head;

  while (traversePointer !== null) {
    fullLength++;
    traversePointer = traversePointer.next;
  }

  if (fullLength === 1) {
    return head;
  }

  k = k % fullLength;

  if (k === 0) {
    return head;
  }

  let p1 = head;
  let p2 = head.next;
  let count = 1;

  while (count < fullLength - k) {
    p1 = p1.next;
    p2 = p2.next;
    count++;
  }

  let resNode = p2;
  p1.next = null; //break p1 and p2

  while (p2) {
    if (p2.next === null) {
      p2.next = head;
      break;
    }
    p2 = p2.next;
  }
  return resNode;

  head = linkedMap.get(fullLength - k);
};

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  // Idea: Use hashmap to store the relationship between the old node and the new node
  const relationship = new Map();

  let current = head;
  // first pass: map old node to new node with just the value
  while (current !== null) {
    const oldNode = current;
    const newNode = new Node(oldNode.val, null, null);
    relationship.set(oldNode, newNode);
    current = current.next;
  }

  // second pass: fill in next and random
  current = head;
  while (current !== null) {
    const newNode = relationship.get(current);
    newNode.next = relationship.get(current.next) || null;
    newNode.random = relationship.get(current.random) || null;
    current = current.next;
  }

  return relationship.get(head);
};

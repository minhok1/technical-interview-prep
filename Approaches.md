# List

- push() adds to the end, pop() takes out from the end. shift() and unshift() are for the beginning.

# Greedy algorithm

- Simply using the best solution at each iteration
- Use when iterations of best local solutions surmount to the best overall solution (e.g. jump game II works because the index that jumps the furthest includes the range provided by indices that jump less)

# Two pointer

- Effective solution to many array problems
- Use when searching for elements that satisfy a particular condition (e.g. elements that add up to the target value)
- Use when comparing/merging two arrays

# Sliding window

- Use when searching for maximum/minimum length subarray that satisfies a particular condition

# Hashmap

- Use when you want to store unique item or unique key-value pair. (for the fast lookup time)
- new Map has keys that take O(1) lookup. It allows you to store key-value pair. It has has(key), get(key), set(key, value)
- Set just contains items that cannot be repeated (also O(1)). It has has(item), add(item) and delete(item)

# Linked list

- When reversing, use prevNode -> currNode -> nextNode relationship, make it prevNode -> currNode nextNode then move on

# Binary Tree

- Binary tree is just a hierarchical data structure where each parent has at most two children nodes
- Because binary trees can have "up to" 2 children, worst case time complexity is O(n) and not O(logn)
- Use recursion when dealing with binary trees
- Inorder traversal: left -> node -> right
- Preorder traversal: node -> left -> right
- Postorder traversal: left -> right -> node
- When the recursion takes too long, consider using a map to shorten the lookup
- Recursion is DFS

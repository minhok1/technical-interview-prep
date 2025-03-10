# List

- push() adds to the end, pop() takes out from the end. shift() and unshift() are for the beginning -> these are all in-place and therefore mutate the original array
- splice(index, x) gets rid of x number of elements starting from index, in-place.
- new Array(50).fill(0) gives an array with 50 0's

# Kadane's algorithm

- Idea is that an addition of a subarray with positive sum will always end up in a subarray with maximum sum.
- Iterate through the array with the current pointer as the last element of the subarray, keeping track of the sum
- When the sum falls below 0, abandon that entire subarray and start over again, with the next element as the starting point of a new subarray

# Greedy algorithm

- Simply using the best solution at each iteration
- Use when iterations of best local solutions surmount to the best overall solution (e.g. jump game II works because the index that jumps the furthest includes the range provided by indices that jump less) -> Think about it. If current index has 3 and the next three elements are 7, 3, 2, I should always pick 7 instead of the 2 and 3 because whatever "good" jump that the 3 and 2 can give me in the next iteration will be included in the 7 jump anyways!
- Chances are, if you're trying to find the optimal sum over an array of values (unordered and timed) OR if you're trying to find optimal jumps, at least consider greedy

# Two pointer

- Effective solution to many array problems
- Use when searching for a certain number of elements that satisfy a particular condition (e.g. elements that add up to the target value, two bars that make the biggest container, etc)
- Use when comparing/merging two arrays

# Sliding window

- Use when searching for maximum/minimum length subarray that satisfies a particular condition

# Hashmap

- Use when you want to store unique item or unique key-value pair. (for the fast lookup time)
- new Map has keys that take O(1) lookup. It allows you to store key-value pair. It has has(key), get(key), set(key, value). Map can just be replaced with an object as well.
- Set just contains items that cannot be repeated (also O(1)). It has has(item), add(item) and delete(item) and .size (for length).

# Linked list

- When reversing, use prevNode -> currNode -> nextNode relationship, make it prevNode -> currNode nextNode then move on
- Reversing a subpart of a linked list: mark nodes before the left node and after the right node, and then go through by making currNode point to prevNode -> prevNode = currNode -> currNode -> nextNode
- When copying, consider using a hashmap to store mapping from old node to new node

# Binary Tree

- Binary tree is just a hierarchical data structure where each parent has at most two children nodes
- Because binary trees can have "up to" 2 children, worst case time complexity is O(n) and not O(logn)
- Use recursion when dealing with binary trees
- Inorder traversal: left -> node -> right
- Preorder traversal: node -> left -> right
- Postorder traversal: left -> right -> node
- When solving a traversal problem, consider employing queues or stacks
- When the recursion takes too long, consider using a map to shorten the lookup
- Recursion is DFS
- When doing a binary search for trees, always remember that O(h^2) = O((logn)^2) is smaller than O(n)!!!!!

# Backtracking

- Use when even multiple for loops can't give a solution and you might have to use a ridiculous number of for loops
- Use when there's a constraint that needs to be met
- O(t 2^t) where t is the target

# Binary Search

- Assuming array is sorted, check half an array every time to reduce the search time from O(n) to O(logn) -> so if the solution looks like O(n) and the array's sorted in any way, use binary search.
- After picking mid (low + floor of half of difference), make sure to have the correct update logic for high and low -> if mid is the one returned, no need to set low <= high, and just do low < high. But if you need that last iteration, do low <= high.
- For low and high updates, using <= and => is very useful -> basically just all the values low and high could take.
- Example: findPeakElement, searchInRotatedSortedArray

# Graph

- Both BFS and DFS uses a set to store visited nodes
- BFS uses queue: once a node has been visited, push its neighbours into the queue and move onto the next iteration, resolving elements of queue one by one
- DFS uses stack: visit a node and visit its first neighbour, while putting all its other neighbours into the stack to be visited afterwards
- Or you could just use backtracking method as well - just loop through neighbors and call DFS for every neighbor that haven't been visited yet.
- Keep in mind that when using matrix, I might be able to replace the values on the grid instead of using a set to keep track of visited nodes
- Graph and backtracking are actually quite similar!! -> They both use backtracking with DFS
- Example: numberOfIslands

# Topological Sorting

- A way to order printing of graphs so that the ones that are not dependent on others come first (so only for DAGs). For example, if 5 and 4 have edges to 0, then the order could be 4-5-0 but not 4-0-5.
- Use topological sorting when you need to find the order of nodes within a DAG.
- Adjacency list is usually stored in an object with key as the source and the value as the edges FROM that key node to other nodes.
- After creating the adjacency list, run DFS on the each of the nodes starting with the one with 0 in-degree (found during the adjacency list formation) -> nodes found along it are inserted first, then the node itself. (e.g. if DFS goes 1 -> 3 -> 5, stack goes 5, 3, 1 so that 5 is at the bottom of the stack). These nodes are stored in "visited" so that they're skipped if seen later.
- Pop the stack and return (bottom of the stack is the last)
- In-degree means the number of adjacent nodes. YOU ALWAYS START TOPOSORT WITH A NODE OF IN-DEGREE 0!! That way, you can check if there's a cycle in topological sort. If the total length of the stack at the end doesn't match the number of nodes given initially, that means there was a cycle somewhere because we haven't added. If there's no node with in-degree of 0, then that means there is a cycle.
- But we use in-degree only for Kahn's algorithm, which is BFS. Don't get this confused with the DFS toposort.
- So for DFS toposort, I can:
  - Make a graph
  - For every node, run DFS
  - At the DFS level, if a cycle is detected (with the visited set), then return []
  - if not, keep pushing to the result
- For BFS Kahn's algorithm:
  - Make a graph
  - Use in-degree
- Example: courseScheduleII

# Heaps

- Binary tree with the following properties:
  - Max heap: root is maximum, and each node is bigger than its children nodes
  - Min heap: root is minimum, and each node is smaller than its children nodes
- Use heaps when you're trying to find kth max or kth min element, or k number of elements that meet a certain threshold.

# Priority queue

- A queue where enqueue is normal, but dequeue removes the element with the highest priority (usually the numerical value of the element) -> MinPriorityQueue dequeues the minimal priority and MaxPriorityQueue dequeues the maximum
- front() returns the highest (or lowest if min priority queue) priority element of the priority queue
- There is no built in priority queue, but it will either be provided or I'll be asked to make one myself
- Based on MaxHeap and MinHeap
- Could even save objects into priority keys as long as we're setting priority as a part of the object: new MinPriorityQueue({ priority: x => x[0] });
- Priority queue is just the array heapified. The array is just normal preorder traversal of a binary tree, so you can heapify that. In the preorder traversal, the parent of the node is floor of (i - 1) / 2, left child of the node is 2i + 1, and right child of the node is 2i + 2. -> for the code, see heapBasics.js
- With this heap structure in mind, inserting into priority queue (enqueue) is easy: You just need to make sure that these heap properties are kept while finding the new element's place.

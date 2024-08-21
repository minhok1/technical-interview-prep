# Javascript basics

- Array.push(value), Array.pop(value), shift(value) and unshift() -> all in-place
- Array.sort() is in-place, but only for string. Use sort((a, b) => a-b) for integers
- Hoisting means that all the "var" variables (but not const and let) and function declarations (but not initialization with a value) are moved up
- let test1 = 'hello'; let test2 = test1; test2 = 'new' only changes test2 but not test1. That's because we make a copy of the value for test2.
- But for objects, it's different. variables store the location of the object, so changing something in one variable will also make the same change in another variable that stores it.
- == only compares values but === also compares the type.
- var is global/function scope, let and const are function/block scope
- Implicit type coercion: 24 + "hello" = "24hello", "5" - 3 = 2, falsey/truthy value coercion, (A || B) returns A if A is truthy and B if not, (A && B) returns B if both are truthy and else whichever's falsey
- Immediately invoked function runs as soon as it's defined: (function(){//do something})()
- "this" refers to the object that the function is a DIRECT property of (AT THE TIME OF ITS CALLING). If there is none, it will return the global object. But when the function is defined using arrow function, "this" refers to the parent scope.
- Object.call(function) allows to call function as if it's a method of that object. Object.apply() works the same way except it requires an array parameter.
- If you return a function in a function, you can "curry" it like this: func1(1)(2)
- Returning a function in a function allows the other parts of the outer function to only run once. That's because the lexical scope of a function forms closures, meaning that the variables in that particular INSTANCE of the invoked function is made available.

  - For example, see the following:
    function makeAdder(x) {
    return function (y) {
    return x + y;
    };
    }

  const add5 = makeAdder(5);
  const add10 = makeAdder(10);

  console.log(add5(2)); // 7
  console.log(add10(2)); // 12

- global scope, function scope, block scope -> closure is when a function remembers the variables declared outside of its own scope
- Memoization: caching the return value of a function based on its parameters. If the parameters don't change, the function is not re-calculated.
- Constructor is used to initialize an object
- Promise has resolve() or reject() inside of it so that it knows when to fulfill it, then can be consumed using .then() and .catch(). They can be used together like promise.then().catch() so that either resolve or reject would work for then or catch block. -> syntax: new Promise((resolve, reject) => {}). Also, setTimeOut takes in a function and the delay in ms. Try to resolve within that function.
- Object.keys(), Object.values(), Object.entries()
- e.g.
  const b = {
  name:"Vivek",
  f: function(){
  var self = this;
  console.log(this.name);
  (function(){
  console.log(this.name);
  console.log(self.name);
  })();
  }
  }
  b.f();

  returns Vivek, undefined and Vivek. IIFE doesn't run immediately because it's not getting defined (object's the one getting defined!). So console.log(this.name) goes first, produces Vivek because we're calling f() of b, then we move onto the IIFE inside. Since this func is not a direct property of an object, this is global so this.name is undefined.

- Always hoist var definition within the functional scope but keep the initialization at the original spot
  e.g.
  x++;
  console.log(x);
  var x = 23;
  returns NaN because var x; moves to the top but x = 23 remains at the bottom

- var has no block scope, so if you use var for a for loop, then it will be global (which may impact async stuff within the loops)
- Event loop in javascript is between call stack, callback queue and Web API. Call stack is just the main body that executes functions. Functions that get called inside other functions get added to the stack and get executed first - easy. Then, once the call stack is empty, the ever-rotating event loop starts grabbing elements from the callback queue. Web API is for adding these async elements to the callback queue. When the main body in call stack has promise, setTimeOut, etc, Web API adds it to the callback queue.
- Document represents the DOM, and is a part of window. window consists of many things, including document, console, setTimeOut, etc
- DOM manipulation: Getting a DOM element, storing it in a variable, then altering it (which would change it because it's an object, so the variable would contain a reference to the DOM object)
- Document.getElementById(), Document.getElementsByClassName, Document.getElementsByTagName(), Document.querySelector() -> selecting elements. getElementsById gives the element, but the others give nodelist. Nodelist is not an array - it's an object, so you need to convert it to an array to loop through it -> = [].slice.call(document.getElementsById().children);
- querySelector can work for id and class as well by using '#idname' and '.classname' but it is slower
- const para = Document.createElement("p") creates a p element. Then you can do something like document.querySelector("section").appendChild(para). You can also append text by creating with Document.createTextNode().
- Doing appendChild(element) will move that element to the end, and removeChild(element) will remove that element. To make a copy, use Node.cloneNode(). You can also remove the element by itself by doing element.remove() or element.parentNode.removeChild(element).
- Elements have "style" field as well. If you add it in the style tag of HTML, it's just css syntax. But you can also do element.style.color/background-color/width/etc as well.
- element.setAttribute("class", "highlight") will set the class to highlight defined in css.
- element.classList.add() adds a class. removeClass, hasClass also exist.
- Event bubbling -> event propagating upwards into parent elements.
- You can add events to elements:
  document.getElementById('test').addEventListener('click', function(e) {
  //do stuff -> e.target has the element
  })

# List

- push() adds to the end, pop() takes out from the end. shift() and unshift() are for the beginning.
- splice(index, x) gets rid of x number of elements starting from index, in-place.

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

# Graph

- Both BFS and DFS uses a set to store visited nodes
- BFS uses queue: once a node has been visited, push its neighbours into the queue and move onto the next iteration, resolving elements of queue one by one
- DFS uses stack: visit a node and visit its first neighbour, while putting all its other neighbours into the stack to be visited afterwards
- Or you could just use backtracking method as well - just loop through neighbors and call DFS for every neighbor that haven't been visited yet.
- Keep in mind that when using matrix, I might be able to replace the values on the grid instead of using a set to keep track of visited nodes
- Graph and backtracking are actually quite similar!! -> They both use backtracking with DFS

# Topological Sorting

- A way to order printing of graphs so that the ones that are not dependent on others come first (so only for DAGs). For example, if 5 and 4 have edges to 0, then the order could be 4-5-0 but not 4-0-5.
- Use topological sorting when you need to find the order of nodes within a DAG.
- Adjacency list is usually stored in an object with key as the source ans the value as the edges FROM that key node to other nodes.
- After creating the adjacency list, run DFS on the each of the nodes -> nodes found along it are inserted first, then the node itself. (e.g. if DFS goes 1 -> 3 -> 5, stack goes 5, 3, 1 so that 5 is at the bottom of the stack). These nodes are stored in "visited" so that they're skipped if seen later.
- Pop the stack and return (bottom of the stack is the last)

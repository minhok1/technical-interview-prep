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

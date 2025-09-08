// Exercise 6: Debounce and Throttle with Promises
// Implement debounce and throttle functions
// Use closures and async/await

function debounce(fn, delay) {
  let timeoutId; // This works because technically debounce runs only once - to define debouncedFn. So timeoutId is the same (because of closure) for all debounceFn calls
  return function (newValue) {
    clearTimeout(timeoutId); // clear any previous timer
    timeoutId = setTimeout(() => {
      fn(newValue);
    }, delay);
  };
}

function throttle(fn, delay) {
  let timeoutId = null;

  return function (newValue) {
    if (!timeoutId) {
      fn(newValue);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay)
    }
  }
}

// Test cases:
console.log("=== Debounce and Throttle Tests ===");

const debouncedFn = debounce((value) => {
  console.log("Debounced call with:", value);
  return `Result for ${value}`;
}, 300);

const throttledFn = throttle((value) => {
  console.log("Throttled call with:", value);
  return `Result for ${value}`;
}, 300);

// console.log("\n1. Debounce test:");
// console.log("Calling debounced function multiple times quickly...");
// debouncedFn("A");
// debouncedFn("B");
// debouncedFn("C");
// Should only call once with 'C' after 300ms

console.log("\n2. Throttle test:");
console.log("Calling throttled function multiple times...");
throttledFn("X");
throttledFn("Y");
throttledFn("Z");
// Should call with 'X' immediately, then 'Z' after delay
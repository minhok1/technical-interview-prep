// Exercise 6: Debounce and Throttle with Promises
// Implement debounce and throttle functions that return Promises
// Use closures and async/await

function debounce(fn, delay) {
  let timeoutId; // This works because technically debounce runs only once - to define debouncedFn. So timeoutId is the same (because of closure) for all debounceFn calls
  return async function (newValue) {
    clearTimeout(timeoutId); // clear any previous timer
    timeoutId = setTimeout(() => {
      fn(newValue);
    }, delay);
  };
}

function throttle(fn, delay) {
  return async function () {};
}

// Test cases:
console.log("=== Debounce and Throttle Tests ===");

const debouncedFn = debounce((value) => {
  console.log("Debounced call with:", value);
  return `Result for ${value}`;
}, 300);

const throttledFn = throttle(async (value) => {
  console.log("Throttled call with:", value);
  return `Result for ${value}`;
}, 300);

console.log("\n1. Debounce test:");
console.log("Calling debounced function multiple times quickly...");
debouncedFn("A");
debouncedFn("B");
debouncedFn("C");
// Should only call once with 'C' after 300ms

console.log("\n2. Throttle test:");
console.log("Calling throttled function multiple times...");
throttledFn("X");
throttledFn("Y");
throttledFn("Z");
// Should call with 'X' immediately, then 'Z' after delay

// console.log("\n3. Debounce with different delays:");
// const fastDebounce = debounce(async (value) => {
//   console.log("Fast debounce:", value);
//   return `Fast result for ${value}`;
// }, 100);

// const slowDebounce = debounce(async (value) => {
//   console.log("Slow debounce:", value);
//   return `Slow result for ${value}`;
// }, 500);

// console.log("Fast debounce calls:");
// fastDebounce("Fast1");
// fastDebounce("Fast2");
// fastDebounce("Fast3");

// console.log("Slow debounce calls:");
// slowDebounce("Slow1");
// slowDebounce("Slow2");
// slowDebounce("Slow3");

// console.log("\n4. Throttle with different delays:");
// const fastThrottle = throttle(async (value) => {
//   console.log("Fast throttle:", value);
//   return `Fast throttle result for ${value}`;
// }, 100);

// const slowThrottle = throttle(async (value) => {
//   console.log("Slow throttle:", value);
//   return `Slow throttle result for ${value}`;
// }, 500);

// console.log("Fast throttle calls:");
// fastThrottle("Fast1");
// fastThrottle("Fast2");
// fastThrottle("Fast3");

// console.log("Slow throttle calls:");
// slowThrottle("Slow1");
// slowThrottle("Slow2");
// slowThrottle("Slow3");

// console.log("\n=== End of Debounce and Throttle Tests ===");

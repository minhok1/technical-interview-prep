// Exercise 4: Async Queue with Priority
// Implement an async queue that processes tasks with priority
// Higher priority tasks should be processed first
// Use Promises and async/await

class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = []; // let's say each item contains the task and priority
  }

  add(task, priority = 0) {
    let index = 0;

    if (!this.queue.length) {
      this.queue.push({task, priority});
    }
    else {
      while (priority < this.queue[index].priority) {
        index++;
      }
      this.queue.splice(index, 0, {task, priority}); //at index, delete none, and add this object
    }
  }

  async process() {
    if (!this.queue.length || (this.running === this.concurrency)) {
      return;
    }

    const {task} = this.queue.shift();
    this.running++;

    task().then(() => {
      this.running--;
      this.process();
    })
    this.process();
  }
}

// Test cases:
console.log("=== Async Queue Tests ===");

const queue = new AsyncQueue(2);

const createTask = (id, priority, duration) => {
  return () => {
    console.log(`Task ${id} (priority ${priority}) started`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Task ${id} completed`);
        resolve(`Result ${id}`);
      }, duration);
    });
  };
};

console.log("\n1. Priority queue test (concurrency: 2):");
// Add tasks with different priorities
queue.add(createTask(1, 1, 1000), 1);
queue.add(createTask(2, 3, 500), 3);
queue.add(createTask(3, 2, 800), 2);
queue.add(createTask(4, 1, 600), 1);
queue.add(createTask(5, 3, 300), 3);

// Start processing
queue.process();

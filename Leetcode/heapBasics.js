var H = Array(50).fill(0); //MaxHeap
var size = -1;

function parent(i) {
  return parseInt((i - 1) / 2);
}

function leftChild(i) {
  return parseInt(2 * i + 1);
}

function rightChild(i) {
  return parseInt(2 * i + 2);
}

// Function to shift up the node in order
// to maintain the heap property
function shiftUp(i) {
  while (i > 0 && H[parent(i)] < H[i]) {
    // Swap parent and current node
    swap(parent(i), i);

    // Update i to parent of i
    i = parent(i);
  }
}

function swap(i, j) {
  var temp = H[i];
  H[i] = H[j];
  H[j] = temp;
}

function shiftDown(i) {
  var maxIndex = i;

  // Left Child
  var l = leftChild(i);

  if (l <= size && H[l] > H[maxIndex]) {
    maxIndex = l;
  }

  // Right Child
  var r = rightChild(i);

  if (r <= size && H[r] > H[maxIndex]) {
    maxIndex = r;
  }

  // If i not same as maxIndex
  if (i != maxIndex) {
    swap(i, maxIndex);
    shiftDown(maxIndex);
  }
}

function insert(p) {
  size = size + 1;
  H[size] = p;

  // Shift Up to maintain heap property
  shiftUp(size);
}

// Function to extract the element with
// maximum priority
function extractMax() {
  var result = H[0];

  // Replace the value at the root
  // with the last leaf
  H[0] = H[size];
  size = size - 1;

  // Shift down the replaced element
  // to maintain the heap property
  shiftDown(0);
  return result;
}

function changePriority(i, p) {
  var oldp = H[i];
  H[i] = p;

  if (p > oldp) {
    shiftUp(i);
  } else {
    shiftDown(i);
  }
}

function getMax() {
  return H[0];
}

// Function to remove the element
// located at given index
function remove(i) {
  H[i] = getMax() + 1;

  // Shift the node to the root
  // of the heap
  shiftUp(i);

  // Extract the node
  extractMax();
}

class PriorityQueue {
  //MaxPriorityQueue
  constructor() {
    this.data = [];
  }

  // Element Inserting function
  enqueue(item) {
    // item Insertion
    this.data.push(item);
    let ci = this.data.length - 1; // For tracking the index of the new item

    // Re-structure heap(Max Heap) so that after
    // addition max element will lie on top of pq
    while (ci > 0) {
      let pi = Math.floor((ci - 1) / 2); // parent index
      if (this.data[ci] <= this.data[pi]) break;
      let tmp = this.data[ci];
      this.data[ci] = this.data[pi];
      this.data[pi] = tmp;
      ci = pi;
    }
  }

  dequeue() {
    // deleting top element of pq and replace it with the lowest priority one
    let li = this.data.length - 1;
    let frontItem = this.data[0]; // Value to be returned
    this.data[0] = this.data[li];
    this.data.pop();

    --li; // Last index of the queue now that one element is gone
    let pi = 0;

    // Ensure heap structure after the removal of the element by shifting down the current top
    while (true) {
      let ci = pi * 2 + 1; // Left index
      if (ci > li) break;
      let rc = ci + 1; // Right index
      if (rc <= li && this.data[rc] > this.data[ci]) {
        ci = rc; //ci is irrelevant if rc is bigger
      }
      if (this.data[pi] >= this.data[ci]) break;
      // hasn't broken yet -> meaning swap needs to happen between ci and pi
      let tmp = this.data[pi];
      this.data[pi] = this.data[ci];
      this.data[ci] = tmp;
      pi = ci;
    }
    return frontItem;
  }
}

/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  // This is a graph problem - build an adjacency object first!
  // wait, no need to build an adjacency matrix because "rooms" is already one
  // Idea: instead of using a "visited" set (which I can!), I can just mark checked rooms as "X" in the array
  const queue = [0];
  let count = 0;

  while (queue.length) {
    const newElement = queue.shift();
    if (rooms[newElement] !== "X") {
      for (let newRoom of rooms[newElement]) {
        queue.push(newRoom);
      }
      rooms[newElement] = "X";
      count++;
    }
  }

  return count === rooms.length;
};

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  let provinces = 0;
  const queue = [];

  function BFS() {
    while (queue.length) {
      const currCity = queue.shift();
      for (let i = 0; i < currCity.length; i++) {
        if (currCity[i] === 1 && isConnected[i] !== "X") {
          queue.push(isConnected[i]);
          isConnected[i] = "X";
        }
      }
    }
  }

  for (let cityIndex = 0; cityIndex < isConnected.length; cityIndex++) {
    if (isConnected[cityIndex] !== "X") {
      queue.push(isConnected[cityIndex]);
      isConnected[cityIndex] = "X";
      BFS();
      provinces++;
    }
  }

  return provinces;
};

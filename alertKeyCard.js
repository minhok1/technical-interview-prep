/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */

const formatTime = (time) => {
  const timeArray = time.split(":");
  return 60 * parseInt(timeArray[0]) + parseInt(timeArray[1]);
};

var alertNames = function (keyName, keyTime) {
  // Idea: Use objects here to keep the track of employee accesses.
  // Every time a value gets added, if the last 3 are within 1h, add that person's name to result

  const result = new Set();
  const accesses = {};

  for (let i = 0; i < keyTime.length; i++) {
    if (!accesses[keyName[i]]) {
      accesses[keyName[i]] = [];
    }
    accesses[keyName[i]].push(formatTime(keyTime[i]));
  }

  for (let person of Object.keys(accesses)) {
    let time = accesses[person].sort((a, b) => a - b);

    let ind = 0;
    while (ind + 2 < time.length) {
      if (time[ind + 2] - time[ind] <= 60) {
        result.add(person);
      }
      ind++;
    }
  }

  return [...result].sort();
};

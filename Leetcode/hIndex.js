var hIndex = function (citations) {
  // Solution 1: Sort first (O(nlogn))
  // citations.sort(function(a, b){return b-a});
  // var h = 0;
  // while (h < citations[h]) {
  //     h++;
  // }
  // return h;

  // Solution 2: Update possible h-index as I loop through (O(n))
  const hCounter = citations.map((c) => 0);
  hCounter.push(0);

  for (i = 0; i < citations.length; i++) {
    if (citations[i] >= citations.length) {
      hCounter[citations.length] += 1;
    } else {
      hCounter[citations[i]] += 1;
    }
  }

  var index = hCounter.length - 1;
  var addTracker = hCounter[index];
  while (index > addTracker) {
    index--;
    addTracker += hCounter[index];
  }
  return index;
};

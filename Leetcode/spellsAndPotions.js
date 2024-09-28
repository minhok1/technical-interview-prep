/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  // Idea: sort potions first
  // Then, this becomes a binary search problem where you compare current spell * current potion with sucess
  potions.sort((a, b) => a - b);

  function binarySearch(spell) {
    let high = potions.length - 1;
    let low = 0;
    let mid = 0;
    while (high >= low) {
      mid = low + Math.floor((high - low) / 2);
      if (potions[mid] * spell >= success) {
        if (mid === 0 || potions[mid - 1] * spell < success) {
          return mid;
        } else {
          high = mid;
        }
      } else {
        low = mid + 1;
      }
    }
    return potions.length;
  }

  return spells.map((spell) => {
    return potions.length - binarySearch(spell);
  });
};

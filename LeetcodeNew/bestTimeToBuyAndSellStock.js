/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // Note that this is easy because you're buying on a SINGLE day and selling on a SINGLE day

  let profit = 0;
  let maxIndex = 1;
  let minIndex = 0;

  while (maxIndex < prices.length) {
    if (prices[maxIndex] < prices[minIndex]) {
      minIndex = maxIndex;
      maxIndex++;
    } else {
      if (prices[maxIndex] - prices[minIndex] > profit) {
        profit = prices[maxIndex] - prices[minIndex];
      }
      maxIndex++;
    }
  }
  return profit;
};

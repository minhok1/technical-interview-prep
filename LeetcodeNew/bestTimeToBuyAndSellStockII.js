/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // Idea: when the price goes up, I should sell immediately and buy again
  // If the price continues to go up, it's the same profit as holding onto the same stock
  // If the price goes down, that means I've profited from that local maximum

  let index = 0;
  let profit = 0;

  while (index < prices.length - 1) {
    if (prices[index] < prices[index + 1]) {
      profit += prices[index + 1] - prices[index];
    }
    index++;
  }
  return profit;
};

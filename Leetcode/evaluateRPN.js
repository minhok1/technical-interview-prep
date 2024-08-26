/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  // Idea: I can tell I have to use stack because as we traverse the array, the last one that got added needs to come out first when resolving
  const stack = [];

  const calculate = (first, second, operator) => {
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "/":
        return Math.trunc(first / second);
      case "*":
        return first * second;
    }
  };

  const isOperator = (token) => {
    if (token === "*" || token === "/" || token === "+" || token === "-") {
      return true;
    }
    return false;
  };

  for (let token of tokens) {
    if (isOperator(token)) {
      const second = stack.pop();
      const first = stack.pop();
      stack.push(calculate(first, second, token));
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack[0];
};

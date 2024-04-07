var isHappy = function (n) {
  // Idea: Use hashmap because if a number that's about to be checked has been checked already, it is a loop

  const checked = new Map();

  while (n !== 1) {
    if (checked.has(n)) {
      return false;
    }
    checked.set(n, "");
    const digits = n.toString().split("");
    let addUp = 0;
    for (i = 0; i < digits.length; i++) {
      addUp += parseInt(digits[i]) * parseInt(digits[i]);
    }
    n = addUp;
  }

  return true;
};

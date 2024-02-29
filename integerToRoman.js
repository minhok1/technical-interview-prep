var intToRoman = function (num) {
  // Idea: Start from the highest and keep subtracting
  const characters = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  result = "";

  for (const char in characters) {
    var quotient = 0;
    while (num >= characters[char]) {
      quotient++;
      num -= characters[char];
    }
    if (quotient) {
      result += char.repeat(quotient);
    }
  }

  return result;
};

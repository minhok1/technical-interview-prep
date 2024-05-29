var canConstruct = function (ransomNote, magazine) {
  const availableLetters = {};

  for (let letter of magazine) {
    availableLetters[letter] = availableLetters[letter] + 1 || 1;
  }

  for (let letter of ransomNote) {
    if (availableLetters[letter] === 0 || !availableLetters[letter]) {
      return false;
    }
    availableLetters[letter]--;
  }
  return true;
};

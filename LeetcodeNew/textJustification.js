/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */

var justifyArray = function(tempWords, tempLength, maxWidth) {
    if (tempWords.length === 1) {
        return tempWords[0] + " ".repeat(maxWidth - tempLength);
    }

    const quotient = Math.floor((maxWidth - tempLength) / (tempWords.length - 1));
    const remainder = (maxWidth - tempLength) % (tempWords.length - 1);
    
    let justified = "";
    for (i = 0; i < tempWords.length - 1; i++) {
        justified += tempWords[i] + " ".repeat(quotient + ((i < remainder) ? 1 : 0));
    }
    justified += tempWords[tempWords.length - 1];
    return justified;
}

var fullJustify = function(words, maxWidth) {

    const newWords = [];
    let tempWords = [];
    let tempLength = 0; //total length

    for (let currentWord of words) {
        if (tempLength + currentWord.length + tempWords.length > maxWidth) {
            //justify and push
            newWords.push(justifyArray(tempWords, tempLength, maxWidth));

            //reset with currentWord
            tempWords = [currentWord];
            tempLength = currentWord.length;
        }
        else {
            tempWords.push(currentWord);
            tempLength += currentWord.length;
        }
    }
    newWords.push(tempWords.join(" ") + " ".repeat(maxWidth - (tempWords.length + tempLength - 1)));

    return newWords;
};
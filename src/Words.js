import wordBank from "./words.txt";

export const boardDefault = [
  new Array(5).fill(""),
  new Array(5).fill(""),
  new Array(5).fill(""),
  new Array(5).fill(""),
  new Array(5).fill(""),
  new Array(5).fill(""),
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;

  await await fetch(wordBank)
    .then((res) => res.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  return { wordSet, todaysWord };
};

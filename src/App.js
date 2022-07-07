import { useState, createContext, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition < 5) {
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPosition] =
        keyValue;
      setBoard(newBoard);
      setCurrentAttempt({
        ...currentAttempt,
        letterPosition: currentAttempt.letterPosition + 1,
      });
    }
  };

  const onDeleteLetter = () => {
    if (currentAttempt.letterPosition !== 0) {
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
      setBoard(newBoard);
      setCurrentAttempt({
        ...currentAttempt,
        letterPosition: currentAttempt.letterPosition - 1,
      });
    }
  };

  const onEnter = () => {
    if (currentAttempt.letterPosition === 5) {
      let currentWord = "";
      for (let i = 0; i < 5; i++) {
        currentWord += board[currentAttempt.attempt][i];
      }

      if (wordSet.has(currentWord.toLowerCase())) {
        setCurrentAttempt({
          attempt: currentAttempt.attempt + 1,
          letterPosition: 0,
        });
      } else {
        alert("Word doesn't exists");
      }

      if (currentWord === correctWord) {
        setGameOver({ gameOver: true, guessedWord: true });
        return;
      }

      if (currentAttempt.attempt === 5) {
        setGameOver({ gameOver: true, guessedWord: false });
        return;
      }
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDeleteLetter,
          onEnter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

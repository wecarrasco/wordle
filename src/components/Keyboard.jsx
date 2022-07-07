import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const { onSelectLetter, onDeleteLetter, onEnter, disabledLetters } =
    useContext(AppContext);

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDeleteLetter();
    } else {
      keys1.concat(keys2, keys3).forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key, index) => (
          <Key
            key={`${key}-index-1`}
            keyValue={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key, index) => (
          <Key
            key={`${key}-index-2`}
            keyValue={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line3">
        <Key keyValue="ENTER" bigKey />
        {keys3.map((key, index) => (
          <Key
            key={`${key}-index-3`}
            keyValue={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
        <Key keyValue="DELETE" bigKey />
      </div>
    </div>
  );
};

export default Keyboard;

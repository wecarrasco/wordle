import React, { useContext } from "react";
import { AppContext } from "../App";
import Letter from "./Letter";

const Board = () => {
  const { board } = useContext(AppContext);
  return (
    <div className="board">
      {board.map((row, indexRow) => {
        return (
          <div key={`${indexRow}-row`} className="row">
            {new Array(5).fill("a").map((letter, indexLetter) => (
              <Letter
                key={`${indexLetter}-letter`}
                letterPosition={indexLetter}
                attemptValue={indexRow}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

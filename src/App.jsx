import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);
  const handleResetGame = () => {
    resetGame();
  };
  return (
    <div className="box">
      <h2 className="boxed-text">
        <button onClick={handleResetGame}>
          <span className="boxed-text">NEW GAME</span>
        </button>
      </h2>
      <div className="board-box">
        <Board board={board} turn={turn} />
      </div>
      <span>{isGameOver && <h2 className="boxed-text">GAME OVER</h2>}</span>
      {result && <p className="boxed-text">{result}</p>}
    </div>
  );
}

export default App;

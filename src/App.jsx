import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);

      if (!startTime && game.turn === "b") {
        setStartTime(new Date().getTime());
      }
    });
    return () => subscribe.unsubscribe();
  }, [startTime]);

  useEffect(() => {
    let intervalId;
    if (startTime && !isGameOver) {
      intervalId = setInterval(() => {
        setTimer(Math.floor((new Date().getTime() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTime, isGameOver]);

  const handleResetGame = () => {
    resetGame();
    setStartTime(null);
    setTimer(0);
  };

  return (
    <div className="box">
      <h2 className="boxed-text">
        <span className="timer">Timer: {timer} </span>
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

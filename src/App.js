import { useState } from "react";

//TOFIX : FIX THE calculateTie function, when reseting the board, next player doesnt reset
//add yellow background to a button once clicked

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export const Scoreboard = () => {
  return (
    <div className="scoreboard">
      Player1: {score[0]} Player2: {score[1]}
    </div>
  );
};

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentText, setText] = useState("Next player: X");
  const [score, setScore] = useState([0, 0]);
  let status;

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);

    if (calculateTie(nextSquares)) {
      return;
    }

    if (calculateWinner(nextSquares)) {
      const winner = calculateWinner(nextSquares);
      if (winner) {
        status = "Winner: " + winner;
        setText(status);
        winner === "X" ? setScore[0]++ : setScore[1]++;

        return;
      }
    }
    status = "Next player: " + (xIsNext ? "O" : "X"); //Rerenders the status div with the current text
    setText(status);
    setXIsNext(!xIsNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(xIsNext);
  }

  function calculateTie(nextSquares) {
    if (!nextSquares.includes(null) && !calculateWinner(nextSquares)) {
      setText("Its a tie!");
      return true;
    }
  }

  console.log(score);
  return (
    <>
      <Scoreboard score={Scoreboard(score)} />
      <div className="place-center">
        <div className="status">{currentText}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <button type="button" onClick={resetBoard} className="reset-button">
          Reset Board
        </button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

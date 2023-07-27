import { useState } from "react";


function Square({ value, onSquareClick, isColorActive }) {
  return (
    <button className={"square " + (isColorActive ? "button-yellow" : "")}  onClick={onSquareClick}>
      {value}
    </button>
  );
}

export const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-player1">
        Player1: {score[0]}
      </div>
      <div className="scoreboard-player2">
        Player2: {score[1]}
      </div>
    </div>
  );
};

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentText, setText] = useState("Next player: X");
  const [score, setScore] = useState([0, 0]);
  const [color, setColor] = useState(Array(9).fill(false))
  const [opponent, setOpponent] = useState()

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
      let [winner, winningmoves] = calculateWinner(nextSquares);
      change_square_colors(winningmoves); // changes the color of the winning squares
      if (winner) {
        setText("Winner: " + winner)
        if (winner === "X") {
          setScore((scores) => [scores[0]++, scores[1]]);
        } else {
          setScore((scores) => [scores[0], scores[1]++]);
        }

        return;
      }
    }
    setText("Next player: " + (xIsNext ? "O" : "X")); //Rerenders the status div with the current text
    setXIsNext(!xIsNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setColor(Array(9).fill(null));
    setXIsNext(xIsNext);
  }

  function change_square_colors(winningmoves) {
    const nextColor = color.slice();
    for (let i = 0; i < winningmoves.length; i++) {
      nextColor[winningmoves[i]] = true;
    }
    setColor(nextColor);
  }

  function calculateTie(nextSquares) {
    if (!nextSquares.includes(null) && !calculateWinner(nextSquares)) {
      setText("Its a tie!");
      return true;
    }
  }
  return (
    <>
      <div className="place-center">
        <Scoreboard score={score} />
        <div className="status">{currentText}</div>
        <div className="Squares">
          <div className="board-row">
            <Square value={squares[0]} isColorActive={color[0]}  onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} isColorActive={color[1]}  onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} isColorActive={color[2]}  onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} isColorActive={color[3]}  onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} isColorActive={color[4]}  onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} isColorActive={color[5]}  onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} isColorActive={color[6]}  onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} isColorActive={color[7]}  onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} isColorActive={color[8]}  onSquareClick={() => handleClick(8)} />
          </div>
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
      return [squares[a], [a,b,c]];
    }
  }
  return null;
}

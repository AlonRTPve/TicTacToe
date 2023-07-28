import { useState } from "react";
import { useEffect } from "react";
import Game from './Components/Game.js';
import { Scoreboard } from "./Components/Scoreboard";
import  Square from "./Components/Square.js";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); //X : true, O : False
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentText, setText] = useState("Player's turn: X");
  const [score, setScore] = useState([0, 0]);
  const [color, setColor] = useState(Array(9).fill(false));
  const [opponent, setOpponent] = useState(true);

  
  function change_square_colors(winningmoves) { //Function that changes the square colors
    const nextColor = color.slice();
    for (let i = 0; i < winningmoves.length; i++) {
      nextColor[winningmoves[i]] = true;
    }
    setColor(nextColor);
  }

  function resetBoard() { //once resetbutton is clicked, resets the board.
    setSquares(Array(9).fill(null));
    setColor(Array(9).fill(null));
    setXIsNext(true);
    setText("Player's turn: X" );
  }

  function switchMode(Mode) {
    setOpponent(Mode);
    resetBoard();
    setScore([0,0]);

  }

  function handleClick(i) {
    let nextSquares = squares.slice(); // creates a copy of the squares state

    if (squares[i] || Game.calculateWinner(squares) || Game.calculateTie(squares)) { //Check if the move already exists or the game has ended
      return;
    }

    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);

    if (Game.calculateTie(nextSquares)) {
      setText("Its a tie!");
      return;
    }

    if (!opponent) {
      Game.makeMove(nextSquares);
    }

    if (Game.calculateWinner(nextSquares)) {
      let [winner, winningmoves] = Game.calculateWinner(nextSquares);
      change_square_colors(winningmoves); // changes the color of the winning squares to yellow
      if (winner) {
        setText("Winner: " + winner);
        if (winner === "X") {
          setScore(scores => [scores[0] + 1, scores[1]]);
        } else {
          setScore(scores => [scores[0] , scores[1] + 1]);
        }

        return;
      }
    }
    
    if (opponent){
      setXIsNext(!xIsNext);
      setText("Player's turn: " + (xIsNext ? "O" : "X")); //Rerenders the status div with the current text  
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
        <div className="choose-opponent">
          Opponent:
            <button className="choose-opponent-player" onClick={() => switchMode(true)}>Player</button> 
            <button className="choose-opponent-bot" onClick={() => switchMode(false)}>Bot</button>
        </div>
      </div>
    </>
  );
}

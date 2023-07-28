export default class Game {
    static lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    static calculateWinner(squares) {
      for (let i = 0; i < this.lines.length; i++) {
        const [a, b, c] = this.lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return [squares[a], [a,b,c]];
        }
      }
      return null;
    }
  
    static calculateTie(nextSquares) {
      if (!nextSquares.includes(null) && !this.calculateWinner(nextSquares)) {
        return true;
      }
    }

    static makeMove(nextSquares) {
      let turn = Math.floor(Math.random() * 9);
      while (nextSquares[turn] != null) {
        turn = Math.floor(Math.random() * 9);
      }
      nextSquares[turn] = "O";
      return nextSquares;
    }
  
  }
export default function Square({ value, onSquareClick, isColorActive }) { //square component for the squares
    return (
      <button className={"square " + (isColorActive ? "button-yellow" : "")}  onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
export const Scoreboard = ({ score }) => {
    return (
      <div className="scoreboard">
        <div className="scoreboard-player1">
          Player X: {score[0]}
        </div>
        <div className="scoreboard-player2">
          Player O: {score[1]}
        </div>
      </div>
    );
  };
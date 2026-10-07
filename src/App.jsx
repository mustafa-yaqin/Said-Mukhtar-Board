import Board from "./components/Board.jsx";
import useBoard from "./hooks/useBoard.js";

export default function App() {
  const { lists, addCard, deleteCard, moveCard, resetBoard } = useBoard();

  return (
    <div className="container">
      <div className="brand">YAQIN-CODE</div>
      <h1>
        <span>Said Mukhtar</span>
        <span>Board</span>
      </h1>

      <Board
        lists={lists}
        onMove={moveCard}
        onAdd={addCard}
        onDelete={deleteCard}
      />

      <button type="button" className="reset-btn" onClick={resetBoard}>
        Reset board
      </button>
    </div>
  );
}

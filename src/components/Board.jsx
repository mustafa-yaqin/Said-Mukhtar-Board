import { useState } from "react";
import List from "./List.jsx";

export default function Board({ lists, onMove, onAdd, onDelete }) {
  const [draggingId, setDraggingId] = useState(null);

  return (
    <div className="board">
      {lists.map((list) => (
        <List
          key={list.id}
          list={list}
          draggingId={draggingId}
          onDragStart={setDraggingId}
          onDragEnd={() => setDraggingId(null)}
          onMove={onMove}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import Card from "./Card.jsx";
import AddCard from "./AddCard.jsx";

export default function List({
  list,
  draggingId,
  onDragStart,
  onDragEnd,
  onMove,
  onAdd,
  onDelete,
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    // ignore leave events fired when moving over child elements
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const cardId = e.dataTransfer.getData("text/plain");
    if (cardId) onMove(cardId, list.id);
  };

  return (
    <section
      className={"list" + (isOver ? " over" : "")}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="list-header">
        <h2>{list.title}</h2>
        <span className="count">{list.cards.length}</span>
      </header>

      <div className="cards">
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isDragging={draggingId === card.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDropOnCard={(draggedId, targetId) => {
              setIsOver(false);
              onMove(draggedId, list.id, targetId);
            }}
            onDelete={onDelete}
          />
        ))}
        {list.cards.length === 0 && <p className="empty">Drop cards here</p>}
      </div>

      <AddCard onAdd={(text) => onAdd(list.id, text)} />
    </section>
  );
}

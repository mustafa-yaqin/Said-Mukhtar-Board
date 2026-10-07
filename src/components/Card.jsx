export default function Card({
  card,
  isDragging,
  onDragStart,
  onDragEnd,
  onDropOnCard,
  onDelete,
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", card.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId && draggedId !== card.id) onDropOnCard(draggedId, card.id);
  };

  return (
    <div
      className={"card" + (isDragging ? " dragging" : "")}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span className="card-text">{card.text}</span>
      <button
        type="button"
        className="card-delete"
        title="Delete card"
        onClick={() => onDelete(card.id)}
      >
        ×
      </button>
    </div>
  );
}

import { useState } from "react";

export default function AddCard({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form className="add-card" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Add a card..."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={!text.trim()}>
        +
      </button>
    </form>
  );
}

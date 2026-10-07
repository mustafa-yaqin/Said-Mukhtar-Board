import { useEffect, useState } from "react";

const STORAGE_KEY = "yaqin-kanban-board";

const INITIAL_LISTS = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "c1", text: "Wash Dishes" },
      { id: "c2", text: "Buy Groceries" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [{ id: "c3", text: "Learn to code" }],
  },
  { id: "done", title: "Done", cards: [] },
];

const makeId = () =>
  `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function loadLists() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
    /* ignore corrupted storage */
  }
  return INITIAL_LISTS;
}

export default function useBoard() {
  const [lists, setLists] = useState(loadLists);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch {
      /* storage unavailable */
    }
  }, [lists]);

  const addCard = (listId, text) => {
    const clean = text.trim();
    if (!clean) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, cards: [...list.cards, { id: makeId(), text: clean }] }
          : list,
      ),
    );
  };

  const deleteCard = (cardId) => {
    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card.id !== cardId),
      })),
    );
  };

  // Moves a card to a list. If beforeCardId is given, it is inserted
  // right before that card; otherwise it is appended to the end.
  const moveCard = (cardId, toListId, beforeCardId = null) => {
    setLists((prev) => {
      let moving = null;

      const stripped = prev.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => {
          if (card.id === cardId) {
            moving = card;
            return false;
          }
          return true;
        }),
      }));

      if (!moving) return prev;

      return stripped.map((list) => {
        if (list.id !== toListId) return list;
        const cards = [...list.cards];
        const index = beforeCardId
          ? cards.findIndex((card) => card.id === beforeCardId)
          : -1;
        if (index === -1) cards.push(moving);
        else cards.splice(index, 0, moving);
        return { ...list, cards };
      });
    });
  };

  const resetBoard = () => setLists(INITIAL_LISTS);

  return { lists, addCard, deleteCard, moveCard, resetBoard };
}

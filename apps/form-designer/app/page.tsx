"use client";

import { useState, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import FieldContainer from "./components/field/Container";
import MainContainer, { type Item } from "./components/main/Container";
import { Button } from "./components/mui";

import styles from "./page.module.css";

export default function Home() {
  const [cards, setCards] = useState<Item[]>([]);

  const onAdd = (item: Item) => {
    const newCards = update(cards, {
      $push: [{ ...item, id: crypto.randomUUID() }],
    });
    setCards(newCards);
  };

  const cardsStr = useMemo(() => {
    const param: any = {
      components: [],
    };
    cards.forEach((card: Item) => {
      const { id, ...other } = card;
      param.components.push({
        ...other,
      });
    });
    return JSON.stringify(param, null, 2);
  }, [cards]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.page}>
        <FieldContainer onAdd={onAdd} />
        <MainContainer cards={cards} setCards={setCards} />
        <main className={styles.json_box}>
          <header className={styles.title}>
            JSON Schema
            <Button variant="text">Copy Data</Button>
          </header>
          <pre className="container">{cardsStr}</pre>
        </main>
      </div>
    </DndProvider>
  );
}

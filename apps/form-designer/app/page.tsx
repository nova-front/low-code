"use client";

import { useState, useMemo, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import FieldContainer from "./components/field/Container";
import MainContainer from "./components/main/Container";
import { Button } from "./components/mui";

import { FormItemProps } from "./type";

import styles from "./page.module.css";

export default function Home() {
  const [cards, setCards] = useState<FormItemProps[]>([]);

  const onAdd = (item: FormItemProps) => {
    const newCards = update(cards, {
      $push: [{ ...item, id: crypto.randomUUID() }],
    });
    setCards(newCards);
  };

  const onDelete = useCallback(
    (index: number) => {
      const newCards = update(cards, {
        $splice: [[index, 1]],
      });
      setCards(newCards);
    },
    [cards]
  );

  const onUpdate = useCallback(
    (id: string, data: FormItemProps) => {
      const newCards = update(cards, {
        $apply: (arr: FormItemProps[]) => {
          return arr.map((item: FormItemProps) => {
            if (item.id === id) {
              return data;
            }
            return item;
          });
        },
      });
      setCards(newCards);
    },
    [cards]
  );

  const cardsStr = useMemo(() => {
    const param: any = {
      components: [],
    };
    cards.forEach((card: FormItemProps) => {
      const { id, name, ...other } = card;
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
        <MainContainer
          cards={cards}
          setCards={setCards}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
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

"use client";

import { useState, useMemo, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import useCopy from "@/hooks/useCopy";
import { Button } from "@/components";

import FieldContainer from "./field/Container";
import MainContainer from "./main/Container";

import { FormItemProps } from "@/components/form/type";

import styles from "./styles.module.css";

const FixedDndProvider = DndProvider as React.FC<{
  backend: any;
  children: React.ReactNode;
}>;

export default function Home() {
  const { copy } = useCopy();
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

  const getParamData = useCallback(() => {
    const param: any = {
      components: [],
    };
    cards.forEach((card: FormItemProps) => {
      const { id, name, ...other } = card;
      param.components.push({
        ...other,
      });
    });
    return param;
  }, [cards]);

  const dataStr = useMemo(() => {
    const param = getParamData();
    return JSON.stringify(param, null, 2);
  }, [getParamData]);

  const copyFn = useCallback(() => {
    const param = getParamData();
    const text = JSON.stringify(param);
    copy(text);
  }, [copy, getParamData]);

  return (
    <FixedDndProvider backend={HTML5Backend}>
      <div className={styles.page}>
        {/* 左 */}
        <FieldContainer onAdd={onAdd} />
        {/* 中 */}
        <MainContainer
          cards={cards}
          setCards={setCards}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
        {/* 右 */}
        <main className={styles.json_box}>
          <header className={styles.title}>
            JSON Schema
            <Button variant="text" onClick={copyFn}>
              Copy Data
            </Button>
          </header>
          <pre className="container">{dataStr}</pre>
        </main>
      </div>
    </FixedDndProvider>
  );
}

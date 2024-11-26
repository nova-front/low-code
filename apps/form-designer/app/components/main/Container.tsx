import update from "immutability-helper";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { Card } from "./Card";
import { Button } from "../../components/mui";

import type { FormItemProps } from "../../type";
import type { FC } from "react";
import globalStyle from "../../page.module.css";
import styles from "./styles.module.css";

const style = {
  width: "100%",
};

export interface ContainerProps {
  cards: FormItemProps[];
  setCards: any;
  onDelete: (index: number) => void;
  onUpdate: any;
}

const Container: FC<ContainerProps> = ({
  cards,
  setCards,
  onDelete,
  onUpdate,
}) => {
  {
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: FormItemProps[]) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex] as FormItemProps],
            ],
          })
        );
      },
      [setCards]
    );

    const renderCard = useCallback(
      (card: FormItemProps, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            data={card}
            type={card.type}
            moveCard={moveCard}
            onDelete={() => onDelete(index)}
            onUpdate={onUpdate}
          />
        );
      },
      [moveCard, onDelete, onUpdate]
    );

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.BOX,
      drop: () => ({ name: "MainContainer" }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

    const isActive = canDrop && isOver;
    let backgroundColor = "#fff";
    if (isActive) {
      backgroundColor = "darkgreen";
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    return (
      <main className={styles.mian_box}>
        <header className={globalStyle.title}>
          You can build a form<Button variant="text">Import Data</Button>
        </header>
        <section ref={drop} className="container" style={{ backgroundColor }}>
          {cards.length === 0 && <p className={styles.tip}>Drag here</p>}
          <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </section>
      </main>
    );
  }
};

export default Container;

import update from "immutability-helper";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { Card } from "./Card";
import { Button } from "../../components/mui";

import type { FC } from "react";
import globalStyle from "../../page.module.css";
import styles from "./styles.module.css";

const style = {
  width: "100%",
};

export interface Item {
  id: string;
  name: string;
  type: string;
}

export interface ContainerProps {
  cards: Item[];
  setCards: any;
}

const Container: FC<ContainerProps> = ({ cards, setCards }) => {
  {
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);

    const renderCard = useCallback(
      (card: { id: string; name: string; type: string }, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            name={card.name}
            type={card.type}
            moveCard={moveCard}
          />
        );
      },
      []
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

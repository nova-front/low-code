import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  TextField,
  TextArea,
  CheckBoxGroup,
} from "../../components/mui";
import { ItemTypes } from "../ItemTypes";

import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import styles from "./styles.module.css";

const style = {
  display: "flex",
  justifyContent: "space-between",
  border: "1px dashed #ddd",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  name: string;
  type: string | "texefield" | "button";
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  name,
  type,
  index,
  moveCard,
  onDelete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const renderCard = (type: string) => {
    let resultNode: React.ReactNode = "";
    switch (type) {
      case "textfield":
        resultNode = (
          <TextField label="TextField" variant="outlined" fullWidth />
        );
        break;
      case "textarea":
        resultNode = <TextArea label="TextArea" variant="outlined" fullWidth />;
        break;
      case "checkbox":
        resultNode = (
          <CheckBoxGroup
            defaultValue={["A"]}
            options={["A", "B"]}
            // onChange={(w) => console.log(w)}
          />
        );
        break;

      case "button":
        resultNode = (
          <Button variant="outlined" size="small">
            {name}
          </Button>
        );
        break;

      default:
        resultNode = `【${name}】正在开发...`;
        break;
    }
    return resultNode;
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={styles.card}
      data-handler-id={handlerId}
    >
      <div className={styles.card_left}>{renderCard(type)}</div>
      <div className={styles.card_right}>
        <div className={styles.icon_box}>
          <BorderColorIcon color="primary" />
        </div>
        <div className={styles.icon_box} onClick={onDelete}>
          <DeleteForeverIcon color="error" />
        </div>
      </div>
    </div>
  );
};

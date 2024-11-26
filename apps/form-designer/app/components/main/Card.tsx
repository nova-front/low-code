import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingDialog from "../setting";

import {
  Button,
  TextField,
  TextArea,
  CheckBoxGroup,
  RadioGroup,
  SwitchesGroup,
  Select,
  Autocomplete,
} from "../../components/mui";
import top100Films from "./top100Films";

import { ItemTypes } from "../ItemTypes";
import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { FieldType, FormItemProps } from "../../type";
import styles from "./styles.module.css";

export interface CardProps {
  id: any;
  index: number;
  type: FieldType;
  data: any;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void;
  onUpdate: any;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  index,
  type,
  data,
  moveCard,
  onDelete,
  onUpdate,
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

  const renderCard = (type: FieldType, data: FormItemProps) => {
    let resultNode: React.ReactNode = "";
    const { id, name, ...otherProps } = data;
    console.log("otherProps", otherProps);
    switch (type) {
      case "textfield":
        resultNode = <TextField fullWidth {...otherProps} />;
        break;
      case "textarea":
        resultNode = (
          <TextArea
            label="TextArea"
            variant="outlined"
            fullWidth
            helperText="please input..."
          />
        );
        break;
      case "checkbox":
        resultNode = (
          <CheckBoxGroup
            label="CheckBox Group"
            row
            required
            // error
            defaultValue={["A"]}
            // options={["A", "B", "C"]}
            // disabled
            options={[
              { value: "A", label: "AA" },
              { value: "B", label: "BB" },
              { value: "C", label: "CC", disabled: true },
            ]}
            // onChange={(w) => console.log(w)}
            helperText="please select..."
          />
        );
        break;
      case "radio":
        resultNode = (
          <RadioGroup
            label="RadioGroup"
            row
            required
            // error
            defaultValue={"A"}
            // options={["A", "B", "C"]}】
            // disabled
            options={[
              { value: "A", label: "AA" },
              { value: "B", label: "BB" },
              { value: "C", label: "CC", disabled: true },
            ]}
            onChange={(e, w) => console.log(e, w)}
            helperText="please click one"
          />
        );
        break;
      case "switch":
        resultNode = (
          <SwitchesGroup
            label="Assign responsibility"
            row
            required
            error
            options={[
              {
                name: "gilad",
                value: false,
                label: "gilad",
              },
              {
                name: "jason",
                value: false,
                label: "jason",
              },
              {
                name: "antoine",
                value: false,
                label: "antoine",
              },
            ]}
            onChange={(e, w) => console.log(e, w)}
            helperText="please select..."
          />
        );
        break;
      case "select":
        resultNode = (
          <Select
            fullWidth
            autoWidth
            label="Age"
            defaultValue={"12"}
            options={["None", "12", "13", "14"]}
            helperText="please select..."
          />
        );
        break;
      case "autocomplete":
        resultNode = (
          <Autocomplete disablePortal label="Movie" options={top100Films} />
        );
        break;
      case "button":
        resultNode = (
          <Button variant="outlined" size="small">
            {data.name}
          </Button>
        );
        break;

      default:
        resultNode = `【${data.name}】正在开发...`;
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
      <div className={styles.card_left}>{renderCard(type, data)}</div>
      <div className={styles.card_right}>
        <div className={styles.icon_box}>
          <SettingDialog initData={data} onUpdate={onUpdate} />
        </div>
        <div className={styles.icon_box} onClick={onDelete}>
          <DeleteForeverIcon color="error" />
        </div>
      </div>
    </div>
  );
};

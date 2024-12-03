import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "@/components/config";
import { TableCell, TableRow, IconButton, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  // border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  itemType: "string" | "object";
  row: any;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const TableRowCard: FC<CardProps> = ({
  id,
  itemType,
  row,
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
  return (
    <TableRow
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {itemType === "object" && (
        <TableCell component="th" scope="row">
          <TextField fullWidth size="small" value={row.label} />
        </TableCell>
      )}
      <TableCell>
        <TextField fullWidth size="small" value={row.value} />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => onDelete(index)}>
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

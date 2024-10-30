import React, { memo } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

import type { FC } from "react";
import type { DragSourceMonitor } from "react-dnd";

export interface BoxProps {
  name: string;
  children: React.ReactNode;
  onAdd: Function;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

const Box: FC<BoxProps> = memo(({ name, children, onAdd }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          onAdd(item.name);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, onAdd]
  );

  return (
    <div ref={drag} style={{ opacity, marginBottom: "8px" }}>
      {children}
    </div>
  );
});

export default Box;

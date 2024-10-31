import React, { memo } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

import type { FC } from "react";
import type { DragSourceMonitor } from "react-dnd";

export interface BoxProps {
  children: React.ReactNode;
  name: string;
  data: any;
  onAdd: Function;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

const Box: FC<BoxProps> = memo(({ name, data, children, onAdd }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { ...data },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          onAdd(item);
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

import { memo } from "react";
import { useDrag } from "react-dnd";
import { getInitData } from "@/utils/common";
import { ItemTypes } from "../config";

import type { FC } from "react";
import type { DragSourceMonitor } from "react-dnd";
import type { FormItemProps } from "@/components/form/type";

export interface BoxProps {
  children: React.ReactNode;
  data: FormItemProps;
  onAdd: Function;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

const Box: FC<BoxProps> = memo(({ data, children, onAdd }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { ...data },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          const initData = getInitData(data);
          onAdd(initData);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [onAdd]
  );

  return (
    <div ref={drag as any} style={{ opacity, marginBottom: "8px" }}>
      {children}
    </div>
  );
});

export default Box;

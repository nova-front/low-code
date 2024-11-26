import React, { memo, useCallback } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import type { FormItemProps } from "../../type";

import type { FC } from "react";
import type { DragSourceMonitor } from "react-dnd";

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
  // TODO: 待完善
  const getInitData = useCallback((data: any) => {
    const initData = {
      ...data,
      label: data.name,
      helperText: "this is a description",
      placeholder: "Please enter a value",
    };
    return initData;
  }, []);

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
    <div ref={drag} style={{ opacity, marginBottom: "8px" }}>
      {children}
    </div>
  );
});

export default Box;

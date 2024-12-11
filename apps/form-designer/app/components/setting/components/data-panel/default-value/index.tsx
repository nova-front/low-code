import { useCallback } from "react";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

import { FormItemProps } from "@/type";

interface DefaultValueProps {
  data: FormItemProps;
  defaultValue: any;
  onUpdate: any;
  multiple?: boolean;
  dataSource?: any[];
}
const DefaultValue = ({
  defaultValue,
  onUpdate,
  dataSource,
  data,
  multiple = false,
}: DefaultValueProps) => {
  const onChangeFn = useCallback(
    (e: any) => {
      let v = e.target.value;
      if (typeof v === "number") {
        v = String(v);
      }
      onUpdate("defaultValue", v);
    },
    [onUpdate]
  );

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <div>Default Value</div>
      {["checkbox", "radio", "select", "autocomplete"].includes(data.type) && (
        <Select
          multiple={data.type === "checkbox" || multiple}
          value={defaultValue}
          onChange={onChangeFn}
        >
          {dataSource?.map((option: any, i: number) => {
            if (typeof option === "string") {
              return (
                <MenuItem key={i} value={String(option)}>
                  {option}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem
                  key={i}
                  value={String(option.value)}
                  // disabled={option.disabled}
                >
                  {option.label}
                </MenuItem>
              );
            }
          })}
        </Select>
      )}
      {["textfield", "textarea"].includes(data.type) && (
        <TextField value={defaultValue} onChange={onChangeFn} />
      )}
    </FormControl>
  );
};

export default DefaultValue;

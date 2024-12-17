import { useCallback, useMemo } from "react";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

import Autocomplete from "@repo/mui/autocomplete";

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
  dataSource = [],
  data,
  multiple = false,
}: DefaultValueProps) => {
  console.log("defaultValue", defaultValue);
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

  const autoDefaultValue = useMemo(() => {
    const v =
      dataSource?.find((option: any) => option.value === defaultValue) ||
      defaultValue ||
      null;
    return v;
  }, [defaultValue]);

  const autoOnChangeFn = useCallback(
    (value: any) => {
      onUpdate("defaultValue", value?.value);
    },
    [onUpdate]
  );

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <div>Default Value</div>
      {["checkbox", "radio", "select", "switch"].includes(data.type) && (
        <Select
          multiple={["checkbox", "switch"].includes(data.type) || multiple}
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
      {["autocomplete"].includes(data.type) && (
        <Autocomplete
          options={dataSource}
          value={autoDefaultValue}
          onChange={autoOnChangeFn}
        />
      )}
      {["textfield", "textarea"].includes(data.type) && (
        <TextField value={defaultValue} onChange={onChangeFn} />
      )}
    </FormControl>
  );
};

export default DefaultValue;

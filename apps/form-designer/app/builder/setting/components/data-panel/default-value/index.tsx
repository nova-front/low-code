import { useCallback, useMemo } from "react";
import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Autocomplete } from "@/components/form/config";

import { FormItemProps } from "@/components/form/type";

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
    if (!multiple) {
      const v =
        dataSource?.find((option: any) => option.value === defaultValue) ||
        defaultValue ||
        null;
      return v;
    } else {
      const vs = defaultValue?.map((item: any) => {
        return dataSource?.find((option: any) => option.value === item) || item;
      });
      return vs;
    }
  }, [dataSource, defaultValue, multiple]);

  const autoOnChangeFn = useCallback(
    (value: any) => {
      if (!multiple) {
        onUpdate("defaultValue", value?.value);
      } else {
        const vs = value?.map((item: any) => item.value);
        onUpdate("defaultValue", vs);
      }
    },
    [multiple, onUpdate]
  );

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <Box sx={{ mb: 1 }}>Default Value</Box>
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
          multiple={multiple}
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

import { useCallback, useMemo } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from "@mui/material";

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
    // if (!multiple) {
    //   return dataSource?.find((item: any) => item === defaultValue);
    // }
    const arr = dataSource?.filter((item: any) => {
      if (typeof item === "string") {
        if (typeof defaultValue === "string") {
          return item === defaultValue;
        } else {
          return defaultValue?.includes(item);
        }
      } else {
        if (typeof defaultValue === "string") {
          return item.value === defaultValue;
        } else {
          return defaultValue?.includes(item.value);
        }
      }
    });
    return arr;
  }, [dataSource, defaultValue]);

  const autoOnChangeFn = useCallback(
    (e: any, value: any) => {
      if (value === null) {
        onUpdate("defaultValue", "");
        return;
      }
      if (typeof value === "string") {
        onUpdate("defaultValue", value);
      } else if (value instanceof Array) {
        const v = value?.map((item: any) => item.value);
        onUpdate("defaultValue", v);
      } else {
        onUpdate("defaultValue", value.value);
      }
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
          multiple={multiple}
          options={dataSource}
          value={autoDefaultValue}
          onChange={autoOnChangeFn}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
      {["textfield", "textarea"].includes(data.type) && (
        <TextField value={defaultValue} onChange={onChangeFn} />
      )}
    </FormControl>
  );
};

export default DefaultValue;

import { useEffect, useState, useCallback, useMemo } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { FormItemProps } from "@/components/form/type";
import { Switch } from "@/components";

interface OptionsItem {
  label: string;
  value: string;
}

const SwitchGroupBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const {
    label,
    options,
    defaultValue,
    required,
    error,
    helperText,
    disabled,
    direction,
  } = fieldData;
  const [value, setValue] = useState<any>(defaultValue);

  const onChangeFn = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      if (checked) {
        setValue([...value, name]);
      } else {
        setValue(value.filter((item: any) => item !== name));
      }
    },
    [value]
  );

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    } else {
      setValue([]);
    }
  }, [defaultValue]);

  const row = useMemo(() => {
    return direction !== "column";
  }, [direction]);

  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
      disabled={disabled}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row={row}>
        {options?.map((item: OptionsItem | string) => {
          if (typeof item === "string") {
            return (
              <FormControlLabel
                key={item}
                control={
                  <Switch
                    checked={value?.includes(item)}
                    onChange={onChangeFn}
                    name={item}
                  />
                }
                label={item}
              />
            );
          } else {
            return (
              <FormControlLabel
                key={item.value}
                control={
                  <Switch
                    checked={value?.includes(item.value)}
                    onChange={onChangeFn}
                    name={item.value}
                  />
                }
                label={item.label}
              />
            );
          }
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SwitchGroupBox;

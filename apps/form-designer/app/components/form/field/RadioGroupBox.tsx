import { useEffect, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Radio } from "@/components";
import { FormItemProps } from "@/components/form/type";

interface OptionProps {
  label: string;
  value: any;
  disabled?: boolean;
}

const RadioGroupBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const {
    name,
    label,
    defaultValue,
    options = [],
    disabled,
    required,
    error,
    helperText,
    direction,
  } = fieldData;

  const [value, setValue] = useState<any>("");

  const lastOptions = options
    ?.map((option: any) => {
      if (typeof option === "string") {
        if (option) {
          return option;
        }
        return false;
      } else {
        if (!option.label || !option.value) {
          return false;
        } else {
          return option;
        }
      }
    })
    .filter(Boolean);

  useEffect(() => {
    setValue(defaultValue);
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
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        row={row}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {lastOptions.map((option: string | number | OptionProps, i: number) => {
          if (typeof option === "string" || typeof option === "number") {
            return (
              <FormControlLabel
                key={i}
                value={option}
                control={<Radio disabled={disabled} />}
                label={option}
              />
            );
          } else {
            return (
              <FormControlLabel
                key={i}
                value={option.value}
                control={<Radio disabled={disabled || option.disabled} />}
                label={option.label}
                disabled={disabled || option.disabled}
              />
            );
          }
        })}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroupBox;

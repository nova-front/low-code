import { useState, useCallback, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "./checkbox";

interface OptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  defaultValue?: (string | number)[];
  disabled?: boolean;
  label?: React.ReactNode;
  options: string[] | number[] | OptionProps[];
  value?: (string | number | boolean)[];
  onChange?: (checkedValue: T[]) => void;
  row?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
}

const CheckboxGroup = ({
  defaultValue,
  value,
  label,
  options,
  disabled,
  onChange,
  row,
  required,
  error,
  helperText,
}: CheckboxGroupProps): JSX.Element => {
  const [checks, setChecks] = useState<(string | number | boolean)[]>(
    defaultValue || []
  );

  const onChangeFn = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean,
      index: number,
      currentValue: string | number
    ) => {
      if (!onChange) return;
      console.log(checked, index, checks, currentValue);
      let newValue: (string | number | boolean)[] = [];
      if (checked) {
        newValue = [
          ...checks.slice(0, index),
          currentValue,
          ...checks.slice(index),
        ].filter(Boolean);
      } else {
        newValue = checks.filter((_, i) => i !== index);
      }
      setChecks(newValue);
      onChange?.(newValue);
    },
    [checks, onChange]
  );

  useEffect(() => {
    if (value) {
      setChecks(value);
    }
  }, [value]);

  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: string | number | OptionProps, i: number) => {
          if (typeof option === "string" || typeof option === "number") {
            return (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    defaultChecked={checks?.includes(option)}
                    checked={value ? checks?.includes(option) : undefined}
                    disabled={disabled}
                    onChange={(e, checked) => onChangeFn(e, checked, i, option)}
                  />
                }
                label={option}
              />
            );
          } else {
            return (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    defaultChecked={checks?.includes(option.value)}
                    checked={value ? checks?.includes(option.value) : undefined}
                    disabled={disabled || option.disabled}
                    onChange={(e, checked) =>
                      onChangeFn(e, checked, i, option.value)
                    }
                  />
                }
                label={option.label}
              />
            );
          }
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxGroup;

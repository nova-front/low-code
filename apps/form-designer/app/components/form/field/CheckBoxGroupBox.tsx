import { useCallback, useEffect, useMemo, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Checkbox } from "@/components";

import { FormItemProps } from "@/components/form/type";

interface OptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

const CheckBoxGroupBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const {
    defaultValue,
    label,
    options = [],
    disabled,
    required,
    error,
    helperText,
    direction,
  } = fieldData;

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
      let newValue: (string | number | boolean)[] = [...checks];
      if (checked) {
        newValue.push(currentValue);
      } else {
        newValue = newValue.filter((_) => _ !== currentValue);
      }
      setChecks(newValue);
    },
    [checks]
  );

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
    setChecks(defaultValue);
  }, [defaultValue]);

  const row = useMemo(() => {
    return direction !== "column";
  }, [direction]);

  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row={row}>
        {lastOptions.map((option: string | number | OptionProps, i: number) => {
          if (typeof option === "string" || typeof option === "number") {
            return (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={checks?.includes(option)}
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
                    checked={checks?.includes(option.value)}
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

export default CheckBoxGroupBox;

import { useState, useCallback } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckboxBox from "./checkbox";

interface OptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  defaultValue?: (string | number)[];
  disabled?: boolean;
  name?: string;
  options: string[] | number[] | OptionProps[];
  value?: (string | number | boolean)[];
  onChange?: (checkedValue: T[]) => void;
}

const CheckboxGroup = ({
  defaultValue,
  value,
  options,
  disabled,
  onChange,
}: CheckboxGroupProps): JSX.Element => {
  const [checks, setChecks] = useState<(string | number | boolean)[]>(
    value || defaultValue || []
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

  return (
    <FormGroup>
      {options.map((option: string | number | OptionProps, i: number) => {
        if (typeof option === "string" || typeof option === "number") {
          return (
            <FormControlLabel
              key={i}
              control={
                <CheckboxBox
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
                <CheckboxBox
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
  );
};

export default CheckboxGroup;

import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectBasic, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

interface OptionProps {
  label: string;
  value: any;
  disabled?: boolean;
}

interface SelectProps {
  defaultValue?: any; // The default value. Use when the component is not controlled.
  value?: any;
  onChange?: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
  label?: string;
  options: string[] | OptionProps[];
  size?: "small" | "medium";
  fullWidth?: boolean;
  autoWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  multiple?: boolean;
}

const Select = ({
  defaultValue,
  value,
  onChange,
  label,
  options,
  size,
  fullWidth,
  autoWidth,
  disabled,
  required,
  error,
  helperText,
  inputProps,
  multiple,
}: SelectProps) => {
  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      size={size}
      fullWidth={fullWidth}
      {...{ autoWidth }}
      error={error}
      disabled={disabled}
      required={required}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <SelectBasic
        defaultValue={defaultValue}
        label={label}
        inputProps={inputProps}
        multiple={multiple}
        {...{ value, onChange }}
      >
        {options.map((option: string | OptionProps, i: number) => {
          if (typeof option === "string") {
            return (
              <MenuItem key={i} value={String(option)}>
                {option}
              </MenuItem>
            );
          } else {
            <MenuItem
              key={i}
              value={String(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>;
          }
        })}
      </SelectBasic>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;

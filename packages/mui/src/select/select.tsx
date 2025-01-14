import MenuItem from "@mui/material/MenuItem";
import SelectBasic, { SelectChangeEvent } from "@mui/material/Select";

interface OptionProps {
  label: string;
  value: any;
  disabled?: boolean;
}

interface SelectProps {
  defaultValue?: any; // The default value. Use when the component is not controlled.
  value?: any;
  onChange?: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
  label?: React.ReactNode;
  options: string[] | OptionProps[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  multiple?: boolean;
  fullWidth?: boolean;
}

const Select = ({
  defaultValue,
  value,
  onChange,
  label,
  options,
  inputProps,
  multiple,
  fullWidth,
}: SelectProps) => {
  return (
    <SelectBasic
      // defaultValue={defaultValue}
      fullWidth={fullWidth}
      label={label}
      inputProps={inputProps}
      multiple={multiple}
      {...{ defaultValue, value, onChange }}
    >
      {options.map((option: string | OptionProps, i: number) => {
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
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          );
        }
      })}
    </SelectBasic>
  );
};

export default Select;

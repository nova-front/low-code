import RadioGroupBox from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "./radio";

interface OptionProps {
  label: string;
  value: any;
  disabled?: boolean;
}

interface RadioGroupProps {
  name?: string;
  label?: React.ReactNode;
  row?: boolean;
  defaultValue?: any;
  value?: any;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  options: string[] | number[] | OptionProps[];
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
}

const RadioGroup = ({
  name,
  label,
  row,
  defaultValue,
  value,
  onChange,
  options,
  disabled,
  required,
  error,
  helperText,
}: RadioGroupProps): JSX.Element => {
  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
      disabled={disabled}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroupBox
        row={row}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {options.map((option: string | number | OptionProps, i: number) => {
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
      </RadioGroupBox>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroup;

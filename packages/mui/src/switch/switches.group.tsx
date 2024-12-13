import { useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "./switch";

interface OptionsItem {
  label: string;
  value: string;
}

interface SwitchesGroupProps {
  label?: React.ReactNode;
  options: string[] | OptionsItem[];
  value: any[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  row?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
}

const SwitchesGroup = ({
  label,
  options,
  row,
  required,
  error,
  helperText,
  value,
  onChange,
  disabled,
}: SwitchesGroupProps) => {
  const [state, setState] = useState<any[]>([]);

  useEffect(() => {
    if (value?.length > 0) {
      setState(value);
    } else {
      setState([]);
    }
  }, [value]);

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
                    checked={state?.includes(item)}
                    onChange={onChange}
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
                    checked={state?.includes(item.value)}
                    onChange={onChange}
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

export default SwitchesGroup;

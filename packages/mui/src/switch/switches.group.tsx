import { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "./switch";

interface ValueItem {
  label?: string;
  name: string;
  value: boolean;
}

interface SwitchesGroupProps {
  label?: React.ReactNode;
  options: ValueItem[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: ValueItem[]
  ) => void;
  row?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
}

const SwitchesGroup = ({
  label,
  options,
  row,
  required,
  error,
  helperText,
  onChange,
}: SwitchesGroupProps) => {
  const [state, setState] = useState<ValueItem[]>(options);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const name = event.target.name;
    const index = state.findIndex((item: ValueItem) => item.name === name);
    const newState: ValueItem[] = [...state];
    if (newState[index]) {
      newState[index].value = checked;
      setState(newState);
      onChange(event, newState);
    }
  };

  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row={row}>
        {state?.map((item: ValueItem) => {
          return (
            <FormControlLabel
              key={item.name}
              control={
                <Switch
                  checked={item.value}
                  onChange={handleChange}
                  name={item.name}
                />
              }
              label={item.label}
            />
          );
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SwitchesGroup;

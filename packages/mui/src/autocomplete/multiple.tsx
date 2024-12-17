import TextField from "@mui/material/TextField";
import AutocompleteBase from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface OptionType {
  inputValue?: string;
  label: string;
  value: string;
}

interface AutocompleteProps {
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  value: OptionType[];
  onChange: any;
  options: readonly OptionType[];
}

const AutocompleteMultiple = ({
  label,
  required,
  error,
  helperText,
  value,
  disabled,
  onChange,
  options,
}: AutocompleteProps) => {
  return (
    <FormControl
      fullWidth
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
      disabled={disabled}
    >
      <AutocompleteBase
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={(event, value) => {
          onChange(value);
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default AutocompleteMultiple;

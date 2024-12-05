import {
  FormControl,
  FormHelperText,
  Autocomplete as AutocompleteBase,
  TextField,
} from "@mui/material";

interface AutocompleteProps {
  label?: React.ReactNode;
  disablePortal?: boolean;
  options: readonly unknown[];
  freeSolo?: true;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
}

const Autocomplete = ({
  label,
  disablePortal,
  options,
  freeSolo,
  required,
  disabled,
  error,
  helperText,
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
        disablePortal={disablePortal}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={label} required={required} />
        )}
        freeSolo={freeSolo}
        disabled={disabled}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Autocomplete;

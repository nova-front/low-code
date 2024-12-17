import {
  FormControl,
  FormHelperText,
  Autocomplete as AutocompleteBase,
  TextField,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";

interface AutocompleteProps {
  label?: React.ReactNode;
  options: readonly unknown[];
  freeSolo?: true;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  value: any;
  onChange?: (
    event: React.SyntheticEvent,
    value: unknown | unknown[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown> | undefined
  ) => void;
  multiple?: boolean;
}

const Autocomplete = ({
  label,
  options,
  freeSolo,
  required,
  disabled,
  error,
  helperText,
  value = "",
  onChange,
  multiple,
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
        multiple={multiple}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={label} required={required} />
        )}
        freeSolo={freeSolo}
        disabled={disabled}
        value={value}
        onChange={onChange}
        getOptionLabel={(option) => option?.label || option}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Autocomplete;

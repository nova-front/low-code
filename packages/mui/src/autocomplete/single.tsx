import TextField from "@mui/material/TextField";
import AutocompleteBase, {
  createFilterOptions,
} from "@mui/material/Autocomplete";
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
  value: OptionType | null;
  onChange: any;
  options: readonly OptionType[];
}

const filter = createFilterOptions<OptionType>();

const Autocomplete = ({
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
        disabled={disabled}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            onChange({
              label: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            onChange({
              label: newValue.inputValue,
              value: newValue.inputValue,
            });
          } else {
            onChange(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.label
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              value: inputValue,
              label: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={options}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.label;
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.label}
            </li>
          );
        }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} required={required} />
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Autocomplete;

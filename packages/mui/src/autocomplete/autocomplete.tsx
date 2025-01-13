import TextField from "@mui/material/TextField";
import AutocompleteBase, {
  createFilterOptions,
} from "@mui/material/Autocomplete";

const filter = createFilterOptions<OptionType>();

interface OptionType {
  inputValue?: string;
  label: string;
  value: string;
}

interface AutocompleteProps {
  multiple?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  value: any;
  onChange: any;
  options: readonly OptionType[];
  [key: string]: any;
}

const Autocomplete = ({
  label,
  required,
  value = "",
  disabled,
  onChange,
  options,
  multiple,
}: AutocompleteProps) => {
  return (
    <AutocompleteBase
      multiple={multiple}
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
        <TextField
          {...params}
          label={label}
          required={required}
          disabled={disabled}
        />
      )}
    />
  );
};

export default Autocomplete;

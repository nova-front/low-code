import SingleBox from "./single";
import MultipleBox from "./multiple";

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

const Autocomplete = ({ multiple = false, ...other }: AutocompleteProps) => {
  if (multiple) {
    return <MultipleBox {...other} />;
  }

  return <SingleBox {...other} />;
};

export default Autocomplete;

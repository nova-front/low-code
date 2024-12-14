import { Autocomplete } from "../mui";
import { FormItemProps } from "@/type";

const AutocompleteBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { id, name, options = [], ...otherProps } = fieldData;

  return <Autocomplete disablePortal {...otherProps} options={options} />;
};

export default AutocompleteBox;

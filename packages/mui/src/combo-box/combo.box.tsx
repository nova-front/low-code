import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ComboBoxProps {
  label?: React.ReactNode;
  disablePortal?: boolean;
  options: readonly unknown[];
  freeSolo?: true;
}

const ComboBox = ({
  label,
  disablePortal,
  options,
  freeSolo,
}: ComboBoxProps) => {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
      freeSolo={freeSolo}
    />
  );
};

export default ComboBox;

import RadioBox from "@mui/material/Radio";

interface RadioProps {
  name?: string;
  checked?: boolean;
  value?: unknown;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  size?: "small" | "medium";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default";
  defaultChecked?: boolean;
  defaultValue?: string | number | readonly string[];
}

const Radio = ({
  name,
  checked,
  value,
  onChange,
  inputProps,
  size,
  color,
  defaultChecked,
  defaultValue,
}: RadioProps): JSX.Element => {
  return (
    <RadioBox
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
      inputProps={inputProps}
      size={size}
      color={color}
      defaultChecked={defaultChecked}
      defaultValue={defaultValue}
    />
  );
};

export default Radio;

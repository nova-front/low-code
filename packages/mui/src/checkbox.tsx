import CheckboxBox from "@mui/material/Checkbox";

interface CheckboxProps {
  defaultChecked?: boolean;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  size?: "small" | "medium" | "large";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default";
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Checkbox = ({
  defaultChecked,
  className,
  disabled,
  checked,
  onChange,
  size,
  color,
  icon,
  checkedIcon,
  inputProps,
}: CheckboxProps): JSX.Element => {
  return (
    <CheckboxBox
      defaultChecked={defaultChecked}
      className={className}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      size={size}
      color={color}
      icon={icon}
      checkedIcon={checkedIcon}
      inputProps={inputProps}
    />
  );
};

export default Checkbox;

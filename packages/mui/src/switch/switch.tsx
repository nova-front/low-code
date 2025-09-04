import SwitchBasic from '@mui/material/Switch';

interface SwitchProps {
  size?: 'small' | 'medium';
  defaultChecked?: boolean;
  disabled?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'default';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const Switch = ({
  size,
  defaultChecked,
  disabled,
  color,
  inputProps,
  name,
  checked,
  onChange,
}: SwitchProps): JSX.Element => {
  return (
    <SwitchBasic
      size={size}
      defaultChecked={defaultChecked}
      disabled={disabled}
      color={color}
      inputProps={inputProps}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Switch;

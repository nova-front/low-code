import TextFieldBox from "@mui/material/TextField";

interface TextFieldProps {
  className?: string;
  label?: React.ReactNode;
  variant?: "outlined" | "standard" | "filled";
  required?: boolean;
  defaultValue?: unknown;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  size?: "small" | "medium";
  fullWidth?: boolean;
  color?: "error" | "primary" | "secondary" | "info" | "success" | "warning";
  focused?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  multiline?: boolean;
  rows?: string | number;
  maxRows?: string | number;
  placeholder?: string;
  value?: unknown;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  [key: string]: unknown;
}

const TextField = ({
  className,
  label,
  variant,
  required,
  defaultValue,
  disabled,
  type,
  size,
  fullWidth,
  color,
  focused,
  error,
  helperText,
  multiline,
  rows,
  maxRows,
  placeholder,
  value,
  onChange,
}: TextFieldProps): JSX.Element => {
  return (
    <TextFieldBox
      className={className}
      label={label}
      variant={variant}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
      type={type}
      size={size}
      fullWidth={fullWidth}
      color={color}
      focused={focused}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextField;

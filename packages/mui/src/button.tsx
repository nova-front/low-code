"use client";

import { ReactNode } from "react";
import ButtonBasic from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  [key: string]: any;
}

const Button = ({
  children,
  className,
  variant = "contained",
  size = "medium",
  disabled = false,
  onClick = () => {},
  color,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <ThemeProvider theme={customTheme}>
      <ButtonBasic
        className={className}
        variant={variant}
        size={size}
        disabled={disabled}
        color={color}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ButtonBasic>
    </ThemeProvider>
  );
};

export default Button;

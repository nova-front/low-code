"use client";

import { ReactNode } from "react";
import ButtonBox from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const Button = ({
  children,
  className,
  variant = "contained",
  size = "medium",
  disabled = false,
  onClick = () => {},
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <ThemeProvider theme={customTheme}>
      <ButtonBox
        className={className}
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ButtonBox>
    </ThemeProvider>
  );
};

export default Button;

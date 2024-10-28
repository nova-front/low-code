"use client";

import { ReactNode } from "react";
import ButtonBox from "@mui/material/Button";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <div>
      <ButtonBox
        className={className}
        variant="contained"
        onClick={() => alert(`Hello from your ${appName} app!`)}
      >
        {children}
      </ButtonBox>
    </div>
  );
};

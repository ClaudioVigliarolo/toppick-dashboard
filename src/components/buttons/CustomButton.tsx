import { Button } from "@material-ui/core";
import { COLORS } from "../../constants/Colors";

import React from "react";

interface CustomButtonProps {
  color?: string;
  title: string;
  onClick: any;
  submit?: boolean;
  disabled?: boolean;
}

export default function CustomButton({
  color = COLORS.primaryOrange,
  title,
  onClick,
  submit,
  disabled = false,
}: CustomButtonProps) {
  return (
    <div>
      <Button
        variant="contained"
        disabled={disabled}
        style={{
          backgroundColor: color,
          color: "white",
        }}
        type={submit ? "submit" : "button"}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
}

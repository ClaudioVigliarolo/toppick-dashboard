import { Button as MaterialUIButton, makeStyles } from "@material-ui/core";
import { COLORS } from "@/constants/colors";

import React from "react";

interface ButtonProps {
  color?: string;
  title: string;
  onClick: any;
  submit?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
}));

export default function Button({
  color = COLORS.primaryOrange,
  title,
  onClick,
  submit,
  disabled = false,
}: ButtonProps) {
  const classes = useStyles();
  return (
    <div>
      <MaterialUIButton
        variant="contained"
        disabled={disabled}
        className={classes.button}
        style={{
          backgroundColor: color,
        }}
        type={submit ? "submit" : "button"}
        onClick={onClick}
      >
        {title}
      </MaterialUIButton>
    </div>
  );
}

import { Button as MaterialButton, makeStyles } from "@material-ui/core";
import { COLORS } from "@/styles/colors";

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
      <MaterialButton
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
      </MaterialButton>
    </div>
  );
}

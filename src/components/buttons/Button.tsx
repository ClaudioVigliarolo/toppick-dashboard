import { Button, makeStyles } from "@material-ui/core";
import { COLORS } from "../../constants/Colors";

import React from "react";

interface CustomButtonProps {
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

export default function CustomButton({
  color = COLORS.primaryOrange,
  title,
  onClick,
  submit,
  disabled = false,
}: CustomButtonProps) {
  const classes = useStyles();
  return (
    <div>
      <Button
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
      </Button>
    </div>
  );
}

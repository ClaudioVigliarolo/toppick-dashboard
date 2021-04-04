import { Button } from "@material-ui/core";
import { COLORS } from "../../constants/Colors";

import React from "react";

export default function CustomAlert({
  color = COLORS.primaryOrange,
  title,
  onClick,
  submit,
}: {
  color?: string;
  title: string;
  onClick: any;
  submit?: boolean;
}) {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: color,
        color: "white",
      }}
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

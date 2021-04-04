import { Alert, Color } from "@material-ui/lab";
import React from "react";

export default function CustomAlert({
  visible,
  type,
  text,
}: {
  visible: boolean;
  type: Color;
  text: string;
}) {
  return (
    <div
      style={{
        display: visible ? "flex" : "none",
        alignSelf: "center",
        position: "absolute",
        bottom: 50,
      }}
    >
      <Alert severity={type} variant="filled">
        {text}
      </Alert>
    </div>
  );
}

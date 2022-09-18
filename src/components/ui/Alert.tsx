import { makeStyles } from "@material-ui/core";
import { Alert as MaterialAlert, Color } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    alignSelf: "center",
    position: "fixed",
    bottom: 50,
    left: "55%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
  },
}));

export default function Alert({
  visible,
  severity,
  text,
}: {
  visible: boolean;
  severity: Color;
  text: string;
}) {
  const classes = useStyles();
  return (
    <>
      {visible && (
        <div className={classes.container}>
          <MaterialAlert severity={severity}>
            {text && text.substring(0, 100)}
          </MaterialAlert>
        </div>
      )}
    </>
  );
}

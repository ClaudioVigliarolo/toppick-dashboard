import { makeStyles } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    alignSelf: "center",
    position: "fixed",
    bottom: 50,
    left: "50%",
  },
}));

export default function CustomAlert({
  visible,
  type,
  text,
}: {
  visible: boolean;
  type: Color;
  text: string;
}) {
  const classes = useStyles();
  return (
    <>
      {visible && (
        <div className={classes.container}>
          <Alert severity={type} variant="filled">
            {text}
          </Alert>
        </div>
      )}
    </>
  );
}

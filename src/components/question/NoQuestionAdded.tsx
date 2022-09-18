import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
}));
export default function NoQuestionAdded() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      Click on the Add Button to start adding questions
    </div>
  );
}

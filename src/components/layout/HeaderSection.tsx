import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { COLORS } from "../../constants/Colors";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      textAlign: "left",
      color: "white",
      fontSize: 45,
      backgroundColor: COLORS.primaryBackground,
      fontWeight: "bold",
      paddingLeft: 60,
      textTransform: "capitalize",
      paddingTop: 10,
      marginBottom: 50,
      alignSelf: "flex-start",
    },
  })
);

export default function HeaderSection({ title }: { title: string }) {
  const classes = useStyles();
  return <div className={classes.container}>{title}</div>;
}

import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../constants/Colors";

const useStyles = makeStyles(() =>
  createStyles({
    headerSection: {
      margin: 50,
    },
    container: {
      margin: 30,
      width: 250,
      height: 100,
      borderRadius: 20,
      backgroundColor: "#fff",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },

    label: {
      color: COLORS.primaryOrange,
      fontSize: 26,
    },

    value: {
      color: COLORS.darkerOrange,
      fontSize: 24,
      fontWeight: "bold",
    },
  })
);

interface CardNumberProps {
  label: string;
  value: number;
}

export default function CardNumber({ label, value }: CardNumberProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={classes.label}
        style={{ fontSize: label.length > 10 ? 20 : 25 }}
      >
        {label}
      </div>
      <div className={classes.value}>{value}</div>
    </div>
  );
}

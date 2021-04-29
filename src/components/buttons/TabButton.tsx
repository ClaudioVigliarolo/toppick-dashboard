import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { COLORS } from "src/constants/Colors";

interface MyTab {
  child: React.ReactNode;
  label: string;
}

interface MyTabs {
  tabs?: MyTab[];
  labels: string[];
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: COLORS.white,
      backgroundColor: COLORS.darkerOrange,
      fontSize: 15,
      padding: 10,
      margin: 10,
      cursor: "pointer",
    },
  })
);

export default function TabButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const classes = useStyles();

  return (
    <div
      className={classes.button}
      onClick={onClick}
      style={{
        backgroundColor: selected ? COLORS.darkerOrange : "transparent",
      }}
    >
      {label}
    </div>
  );
}

import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { COLORS } from "src/constants/Colors";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: COLORS.white,
      backgroundColor: COLORS.darkerOrange,
      padding: 10,
      whiteSpace: "nowrap",
      marginRight: 10,
      cursor: "pointer",
    },
  })
);

interface TabButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: number;
}

export default function TabButton({
  label,
  onClick,
  selected,
  size = 16,
}: TabButtonProps) {
  const classes = useStyles();
  return (
    <div
      className={classes.button}
      onClick={onClick}
      style={{
        backgroundColor: selected ? COLORS.darkerOrange : "transparent",
        fontSize: size,
      }}
    >
      {label}
    </div>
  );
}

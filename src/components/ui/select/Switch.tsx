import React from "react";
import Switch from "@material-ui/core/Switch";
import { MaterialUiColor } from "@/interfaces/ui";
import { createStyles, makeStyles } from "@material-ui/core";

interface CustomSwitchProps {
  text?: string;
  value: boolean;
  handleChange: (val: any) => void;
  textColor?: string;
  switchColor?: MaterialUiColor;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  })
);

export default function CustomSwitch({
  text,
  value,
  handleChange,
  textColor = "#fff",
  switchColor = MaterialUiColor.Default,
}: CustomSwitchProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span style={{ fontSize: 20, color: textColor }}>{text}</span>
      <span>
        <Switch
          checked={value}
          onChange={handleChange}
          name="switch"
          color={switchColor}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </span>
    </div>
  );
}

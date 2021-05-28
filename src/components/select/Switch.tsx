import React from "react";
import Switch from "@material-ui/core/Switch";

interface CustomSwitchProps {
  text: string;
  value: boolean;
  handleChange: (val: any) => void;
  textColor?: string;
}
export default function CustomSwitch({
  text,
  value,
  handleChange,
  textColor = "#fff",
}: CustomSwitchProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <span style={{ fontSize: 20, color: textColor }}>{text}</span>
      <span>
        <Switch
          checked={value}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </span>
    </div>
  );
}

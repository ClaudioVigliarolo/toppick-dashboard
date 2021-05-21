import React from "react";
import Switch from "@material-ui/core/Switch";

interface CustomSwitchProps {
  text: string;
  value: boolean;
  handleChange: (val: any) => void;
}
export default function CustomSwitch({
  text,
  value,
  handleChange,
}: CustomSwitchProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <span style={{ color: "white", fontSize: 20 }}>{text}</span>
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

import React from "react";
import {
  Icon,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
} from "@material-ui/core";

interface CustomSelectProps {
  value: string;
  handleChange: any;
  defaultValue: string;
  values: string[];
  color?: string;
  header?: string;
  width?: number;
}
export default function CustomSelect({
  value,
  defaultValue,
  handleChange,
  values,
  color = "#fff",
  header,
  width = 200,
}: CustomSelectProps) {
  return (
    <>
      <InputLabel id="demo-mutiple-chip-label">{header}</InputLabel>
      <Select
        style={{
          textTransform: "capitalize",
          width,
          fontSize: 20,
          color: color,
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        defaultValue=""
      >
        <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
        {values.map((val: string, index: number) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

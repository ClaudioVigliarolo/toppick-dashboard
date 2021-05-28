import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { Value } from "src/interfaces/Interfaces";

interface CustomSelectProps {
  value: string;
  handleChange: (val: any) => void;
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
        onChange={handleChange}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        defaultValue={defaultValue}
      >
        {values.map((val: string, index: number) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

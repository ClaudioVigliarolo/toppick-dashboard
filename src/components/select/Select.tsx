import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

interface CustomSelectProps {
  value: string;
  handleChange: any;
  defaultValue: string;
  values: string[];
  color?: string;
  header?: string;
}
export default function CustomSelect(props: CustomSelectProps) {
  return (
    <>
      <InputLabel id="demo-mutiple-chip-label">{props.header}</InputLabel>
      <Select
        style={{
          textTransform: "capitalize",
          width: 200,
          fontSize: 20,
          color: props.color ? props.color : "#fff",
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={props.handleChange}
        defaultValue=""
      >
        <MenuItem value={props.defaultValue}>{props.defaultValue}</MenuItem>
        {props.values.map((val: string, index: number) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

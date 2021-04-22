import React from "react";
import { InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core";

interface TranslateSelectProps {
  value: string;
  defaultValue: string;
  values: string[];
  color?: string;
  header?: string;
  width?: number;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
}
export default function TranslateSelect({
  value,
  defaultValue,
  values,
  color = "#fff",
  header,
  width = 500,
  onDelete,
  onSelect,
}: TranslateSelectProps) {
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
        defaultValue=""
      >
        <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
        {values.map((val: string, index: number) => (
          <MenuItem
            key={index}
            value={val}
            onClick={() => {
              onSelect(index);
            }}
          >
            {val}
            <ListItemText
              onClick={(e) => {
                onDelete(index);
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
              style={{
                color: "red",
                fontSize: 10,
                textTransform: "uppercase",
                fontWeight: "bold",
                position: "absolute",
                right: 10,
                top: 0,
                bottom: 0,
              }}
            >
              Remove
            </ListItemText>
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

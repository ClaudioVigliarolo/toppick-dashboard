import React from "react";
import {
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

interface CustomSelectProps {
  value: string;
  handleChange: (event: React.ChangeEvent<any>) => void;
  defaultValue: string;
  values: string[];
  color?: string;
  header?: string;
  width?: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    select: {
      textTransform: "capitalize",
      fontSize: 20,
    },
  })
);

export default function CustomSelect({
  value,
  defaultValue,
  handleChange,
  values,
  color = "#fff",
  header,
  width = 200,
}: CustomSelectProps) {
  const classes = useStyles();
  return (
    <>
      <InputLabel id="demo-mutiple-chip-label">{header}</InputLabel>
      <Select
        className={classes.select}
        onChange={handleChange}
        style={{ width, color }}
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

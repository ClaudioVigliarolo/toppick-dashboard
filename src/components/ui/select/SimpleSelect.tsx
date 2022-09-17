import React from "react";
import {
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

interface CustomSelectProps {
  value: string | string[];
  handleChange: (event: React.ChangeEvent<any>) => void;
  defaultValue: string;
  values: string[];
  color?: string;
  header?: string;
  multiple?: boolean;
  className?: string;
  renderValue: ((value: unknown) => React.ReactNode) | undefined;
}

const useStyles = makeStyles(() =>
  createStyles({
    selectContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
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
  className,
  multiple,
  renderValue,
}: CustomSelectProps) {
  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.selectContainer}>
        <InputLabel>{header}</InputLabel>
        <Select
          className={classes.select}
          onChange={handleChange}
          style={{ color }}
          multiple={multiple}
          value={value}
          defaultValue={defaultValue}
          renderValue={renderValue}
        >
          {values.map((val: string, index: number) => (
            <MenuItem key={index} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

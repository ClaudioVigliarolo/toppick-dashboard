import React from "react";
import {
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Select as MaterialSelect,
} from "@material-ui/core";

interface SelectProps {
  value: string;
  handleChange: (event: React.ChangeEvent<any>) => void;
  defaultValue?: string;
  values: string[];
  color?: string;
  header?: string;
  multiple?: boolean;
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
  renderValue?: ((value: unknown) => React.ReactNode) | undefined;
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

export default function Select({
  value,
  defaultValue,
  handleChange,
  values,
  color = "#fff",
  header,
  containerClassName,
  multiple,
  containerStyles,
}: SelectProps) {
  const classes = useStyles();
  return (
    <div className={containerClassName} style={containerStyles}>
      <div className={classes.selectContainer}>
        <InputLabel>{header}</InputLabel>
        <MaterialSelect
          className={classes.select}
          onChange={handleChange}
          style={{ color }}
          multiple={multiple}
          value={value}
        >
          {defaultValue && (
            <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
          )}
          {values.map((value: string, index: number) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </MaterialSelect>
      </div>
    </div>
  );
}

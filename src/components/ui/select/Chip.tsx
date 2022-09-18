import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Input,
  Chip as MaterialChip,
} from "@material-ui/core";
import { COLORS } from "@/styles/colors";

interface ChipProps {
  handleChange: (index: number) => void;
  values: string[];
  error?: boolean;
  selectedValues: string[];
  header: string;
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
}

function isSelected(listOfSelectedValues: string[], currentValue: string) {
  return !!listOfSelectedValues.find((v) => v === currentValue);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      cursor: "pointer",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      alignItems: "center",
    },
    chip: {
      margin: 2,
      backgroundColor: "orange",
      color: "white",
      cursor: "pointer",
    },
  })
);

export default function Chip({
  selectedValues,
  values,
  handleChange,
  header,
  error = false,
  containerClassName,
  containerStyles,
}: ChipProps) {
  const classes = useStyles();
  return (
    <div className={containerClassName} style={containerStyles}>
      <div className={classes.selectContainer}>
        <FormControl style={{ maxHeight: 100 }}>
          <InputLabel>{header}</InputLabel>
          <Select
            error={error}
            multiple
            value={selectedValues}
            input={<Input />}
            renderValue={(selected: any) => (
              <div className={classes.chips}>
                {selected.map((value: string, index: number) => (
                  <MaterialChip
                    key={index}
                    label={value}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
          >
            {values.map((value, index: number) => (
              <MenuItem
                key={index}
                onClick={() => handleChange(index)}
                value={value}
                style={{
                  backgroundColor: isSelected(selectedValues, value)
                    ? COLORS.lighterOrange
                    : "transparent",
                }}
              >
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

import React from "react";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Input,
  Chip,
} from "@material-ui/core";
import { COLORS } from "@/constants/colors";
import { Value } from "@/interfaces/app";
import { isSelected } from "@/utils/utils";

interface CustomChipProps {
  handleChange: (index: number) => void;
  values: Value[];
  error?: boolean;
  width: number;
  selectedValues: Value[];
  header: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      alignItems: "center",
      alignSelf: "center",
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
    },
  })
);

export default function CustomChip({
  selectedValues,
  values,
  width,
  handleChange,
  header,
  error = false,
}: CustomChipProps) {
  const classes = useStyles();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{header}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          error={error}
          multiple
          style={{ width }}
          value={selectedValues}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected: any) => (
            <div className={classes.chips}>
              {selected.map((val: Value, index: number) => (
                <Chip key={index} label={val.title} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {values
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((val: Value, index: number) => (
              <MenuItem
                key={val.title}
                value={val.title}
                style={{
                  backgroundColor: isSelected(selectedValues, val)
                    ? COLORS.lighterOrange
                    : "transparent",
                }}
                onClick={() => handleChange(index)}
              >
                {val.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}

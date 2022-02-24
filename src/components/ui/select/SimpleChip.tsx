import React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Input,
  Chip,
} from "@material-ui/core";

interface CustomChipProps {
  handleChange: (val: any) => void;
  values: string[];
  error?: boolean;
  width: number;
  selectedValues: string[];
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
  error,
  handleChange,
  header,
  selectedValues,
  values,
  width,
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
          style={{ width: width }}
          value={selectedValues}
          onChange={handleChange}
          placeholder="cazzo amaro"
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected: any) => (
            <div className={classes.chips}>
              {selected.map((val: any) => (
                <Chip key={val} label={val} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {values.map((val: string) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

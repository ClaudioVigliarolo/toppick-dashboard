import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { RadioButton } from "src/interfaces/Interfaces";
import { createStyles, makeStyles } from "@material-ui/core";

interface RadioButtonsGroupProps {
  values: RadioButton[];
  header?: string;
  value: any;
  handleRadioChange(val: any): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    formLabel: {
      textAlign: "center",
    },
    formControlLabelContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  })
);

export default function RadioButtonsGroup({
  header,
  values,
  value,
  handleRadioChange,
}: RadioButtonsGroupProps) {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel className={classes.formLabel}>{header}</FormLabel>
      <RadioGroup
        aria-label={header}
        name={header}
        value={value}
        onChange={handleRadioChange}
      >
        <div className={classes.formControlLabelContainer}>
          {values.map((val, i) => (
            <FormControlLabel
              key={i}
              value={val.value}
              control={<Radio />}
              label={val.title}
            />
          ))}
        </div>
      </RadioGroup>
    </FormControl>
  );
}

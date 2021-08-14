import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { RadioButton } from "src/interfaces/Interfaces";

interface RadioButtonsGroupProps {
  values: RadioButton[];
  header?: string;
  value: any;
  handleRadioChange(val: any): void;
}

export default function RadioButtonsGroup({
  header,
  values,
  value,
  handleRadioChange,
}: RadioButtonsGroupProps) {
  return (
    <FormControl component="fieldset">
      <FormLabel style={{ textAlign: "center" }}>{header}</FormLabel>
      <RadioGroup
        aria-label={header}
        name={header}
        value={value}
        onChange={handleRadioChange}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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

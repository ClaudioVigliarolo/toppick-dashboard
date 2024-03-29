import React from "react";
import { TextField } from "@material-ui/core";
import Select from "@/components/ui/select/Select";
import { BooleanValues, QuestionType } from "@toppick/common/build/interfaces";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";

interface QuestionProps {
  title: string;
  active: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  handleActiveChange: (event: React.ChangeEvent<any>) => void;
  handlePickerActiveChange: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
  handleTypeChange: (event: React.ChangeEvent<any>) => void;
  type: QuestionType;
  pickerActive: string;
}

export default function Question({
  title,
  setTitle,
  onDelete,
  active,
  type,
  handleActiveChange,
  handleTypeChange,
  pickerActive,
  handlePickerActiveChange,
}: QuestionProps) {
  const classes = useDialogStyles();

  return (
    <div className={classes.tabContainer}>
      {onDelete && (
        <div className={classes.topRightIcon}>
          <DeleteIcon onClick={onDelete} />
        </div>
      )}
      <TextField
        placeholder="title"
        InputLabelProps={{ shrink: true }}
        label="Title"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />
      <Select
        handleChange={handleTypeChange}
        value={type}
        values={Object.values(QuestionType)}
        color="black"
        containerClassName={classes.fieldContainer}
        header="Type"
      />
      <Select
        handleChange={handleActiveChange}
        value={active}
        values={Object.values(BooleanValues)}
        color="black"
        containerClassName={classes.fieldContainer}
        header="Active"
      />
      <Select
        handleChange={handlePickerActiveChange}
        value={pickerActive}
        values={Object.values(BooleanValues)}
        color="black"
        containerClassName={classes.fieldContainer}
        header="Picker Active"
      />
    </div>
  );
}

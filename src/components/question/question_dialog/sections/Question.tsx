import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@/components/ui/select/SimpleSelect";
import { COLORS } from "@/constants/colors";
import { BooleanValues, QuestionType } from "@toppick/common/build/interfaces";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  fieldContainer: {
    marginTop: 20,
    width: "90%",
  },
  deleteIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
  },
  deleteIcon: {
    cursor: "pointer",
    color: COLORS.darkerOrange,
    fontSize: 25,
  },

  image: {
    height: 200,
    marginTop: 20,
  },
}));

interface QuestionProps {
  title: string;
  active: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  handleActiveChange: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
  handleTypeChange: (event: React.ChangeEvent<any>) => void;
  type: QuestionType;
}

export default function Question({
  title,
  setTitle,
  onDelete,
  active,
  type,
  handleActiveChange,
  handleTypeChange,
}: QuestionProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {onDelete && (
        <div className={classes.deleteIconContainer}>
          <DeleteIcon onClick={onDelete} className={classes.deleteIcon} />
        </div>
      )}
      <TextField
        placeholder="title"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Title"
        id="standard-helperText"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />
      <div className={classes.fieldContainer}>
        <Select
          handleChange={handleTypeChange}
          value={type}
          values={Object.values(QuestionType)}
          color="black"
          width="100%"
          header="Active"
          defaultValue={active}
        />
      </div>
      <div className={classes.fieldContainer}>
        <Select
          handleChange={handleActiveChange}
          value={active}
          values={Object.values(BooleanValues)}
          color="black"
          width="100%"
          header="Active"
          defaultValue={active}
        />
      </div>
    </div>
  );
}

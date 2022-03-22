import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionExampleCreated } from "@toppick/common";

interface ExamplesProps {
  examples: QuestionExampleCreated[];
  onAdd: () => void;
  onDelete: (index: number) => void;
  onChange: (event: React.ChangeEvent<any>, index: number) => void;
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: "90%",
    marginRight: 20,
  },

  exampleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    cursor: "pointer",
    color: "orangered",
  },

  addButtonContainer: {
    alignSelf: "center",
    width: "100%",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  addButton: {
    width: 200,
  },
}));

export default function Examples({
  examples,
  onAdd,
  onDelete,
  onChange,
}: ExamplesProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {examples.map((ex, i) => (
        <div className={classes.exampleContainer} key={i}>
          <TextField
            key={i}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label={"Example " + (i + 1)}
            id="standard-helperText"
            value={ex.title}
            className={classes.textField}
            onChange={(e) => onChange(e, i)}
          />
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => onDelete(i)}
          />
        </div>
      ))}
      <div className={classes.addButtonContainer}>
        <Button
          color="primary"
          size="small"
          onClick={onAdd}
          className={classes.addButton}
        >
          Add New Example
        </Button>
      </div>
    </div>
  );
}

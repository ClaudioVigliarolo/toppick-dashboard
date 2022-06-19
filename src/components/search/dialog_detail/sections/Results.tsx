import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { SearchResultCreated } from "@toppick/common";

interface ResultsProps {
  results: SearchResultCreated[];
  onAdd: () => void;
  onDelete: (index: number) => void;
  onChangeLink: (event: React.ChangeEvent<any>, index: number) => void;
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: 500,
  },
  textField: {
    width: "90%",
    marginRight: 20,
  },

  resultsContainer: {
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

export default function Results({
  results,
  onAdd,
  onDelete,
  onChangeLink,
}: ResultsProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {results.map((ex, i) => (
        <div className={classes.resultsContainer} key={i}>
          <TextField
            key={i}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label={"Result " + (i + 1)}
            id="standard-helperText"
            value={ex.link}
            className={classes.textField}
            onChange={(e) => onChangeLink(e, i)}
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
          Add New Result
        </Button>
      </div>
    </div>
  );
}

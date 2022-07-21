import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { COLORS } from "@/constants/colors";

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
}));

interface OverViewProps {
  title: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
}

export default function OverView({ title, onDelete, setTitle }: OverViewProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {onDelete && (
        <div className={classes.deleteIconContainer}>
          <DeleteIcon onClick={onDelete} className={classes.deleteIcon} />
        </div>
      )}
      <TextField
        placeholder="Title"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Title"
        id="standard-helperText"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />
    </div>
  );
}

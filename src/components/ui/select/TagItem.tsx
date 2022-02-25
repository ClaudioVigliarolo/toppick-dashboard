import React from "react";
import DeleteIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  deleteIcon: {
    cursor: "pointer",
    color: "red",
    marginLeft: 20,
    width: 15,
    height: 15,
  },
  container: {
    background: "orange",
    color: "white",
    borderRadius: 5,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    height: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    margin: 5,
  },
}));

export default function TagItem({ tag, onRemove }: { tag: string; onRemove }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{tag}</div>
      <div>
        <DeleteIcon onClick={onRemove} className={classes.deleteIcon} />
      </div>
    </div>
  );
}

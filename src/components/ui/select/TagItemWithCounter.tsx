import React from "react";
import DeleteIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  deleteIcon: {
    color: "red",
    width: 10,
    height: 10,
    marginTop: 5,
  },
  container: {
    cursor: "pointer",
    background: "orange",
    color: "white",
    borderRadius: 5,
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    height: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    margin: 5,
  },
  tag: {
    background: "orange",
    marginRight: 10,
  },
  counterContainer: {
    borderLeftColor: "white",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    paddingLeft: 5,
    margin: 5,
  },
  counter: {
    maxWidth: 20,
    backgroundColor: "transparent",
    borderWidth: 0,
    outline: "none",
    color: "white",
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    margin: 0,
  },
}));

interface TagItemProps {
  tag: string;
  counter: number;
  onChangeCounter: (counter) => void;
  onRemove: () => void;
}
export default function TagItemWithCounter({
  tag,
  counter,
  onChangeCounter,
  onRemove,
}: TagItemProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tag}>{tag}</div>
      <div className={classes.counterContainer}>
        <input
          className={classes.counter}
          value={counter}
          onChange={onChangeCounter}
          type="number"
        />
      </div>
      <div>
        <DeleteIcon onClick={onRemove} className={classes.deleteIcon} />
      </div>
    </div>
  );
}

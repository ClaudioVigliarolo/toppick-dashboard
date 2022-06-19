import React from "react";
import DeleteIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  deleteIcon: {
    color: "red",
    marginLeft: 5,
    width: 10,
    height: 10,
    marginTop: 5,
  },
  editIcon: {
    color: "white",
    marginLeft: 5,
    width: 12,
    height: 12,
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
}));

interface TagItemProps {
  tag: string;
  onRemove?: () => void;
  onSelect?: () => void;
  deletable?: boolean;
  editable?: boolean;
}
export default function TagItem({
  onRemove = () => {},
  tag,
  deletable,
  editable,
  onSelect = () => {},
}: TagItemProps) {
  const classes = useStyles();

  return (
    <div className={classes.container} onClick={onSelect}>
      <div>{tag}</div>
      <div>
        {deletable && (
          <DeleteIcon onClick={onRemove} className={classes.deleteIcon} />
        )}
        {editable && (
          <EditIcon onClick={onRemove} className={classes.editIcon} />
        )}
      </div>
    </div>
  );
}

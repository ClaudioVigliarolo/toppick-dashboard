import React from "react";
import { makeStyles } from "@material-ui/core";
import EditIcon from "../icon/EditIcon";
import DeleteIcon from "../icon/DeleteIcon";

const useStyles = makeStyles((theme) => ({
  container: {
    cursor: "pointer",
    background: "orange",
    color: "white",
    borderRadius: 5,
    height: 30,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
}));

interface TagItemProps {
  tag: string;
  onRemove?: () => void;
  deletable?: boolean;
}
export default function TagItem({
  onRemove = () => {},
  tag,
  deletable,
}: TagItemProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{tag}</div>
      <div style={{ marginLeft: 5, marginTop: 2 }}>
        {deletable && <DeleteIcon onClick={onRemove} size={15} />}
      </div>
    </div>
  );
}

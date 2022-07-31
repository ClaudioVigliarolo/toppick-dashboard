import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { COLORS } from "@/constants/colors";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    cursor: "pointer",
    color: COLORS.primaryOrange,
  },
  container: {
    backgroundColor: "white",
    marginBottom: 25,
    height: 100,
    borderRadius: 5,
  },
}));

interface QuestionCardProps {
  title: string;
  id: number;
  index: number;
  onEdit: () => void;
}
export default function QuestionCard({
  id,
  index,
  title,
  onEdit,
}: QuestionCardProps) {
  const classes = useStyles();
  return (
    <ListItem className={classes.container}>
      <ListItemIcon>
        <EditIcon className={classes.editIcon} onClick={onEdit} />
      </ListItemIcon>
      <ListItemText secondary={title} primary={index + 1} />
    </ListItem>
  );
}

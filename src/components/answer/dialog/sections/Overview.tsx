import React from "react";
import { TextField } from "@material-ui/core";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import { useAppStyles } from "@/styles/common";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";

interface OverViewProps {
  title: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
}

export default function OverView({ title, onDelete, setTitle }: OverViewProps) {
  const classes = { ...useDialogStyles() };

  return (
    <div className={classes.tabContainer}>
      {onDelete && (
        <div className={classes.topRightIcon}>
          <DeleteIcon onClick={onDelete} />
        </div>
      )}
      <TextField
        placeholder="Title"
        InputLabelProps={{ shrink: true }}
        label="Title"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />
    </div>
  );
}

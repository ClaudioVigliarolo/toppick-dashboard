import React from "react";
import { TextField } from "@material-ui/core";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import { useAppStyles } from "@/styles/common";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";

interface OverViewProps {
  link: string;
  setLink: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
}

export default function OverView({ link, onDelete, setLink }: OverViewProps) {
  const classes = { ...useDialogStyles() };

  return (
    <div className={classes.tabContainer}>
      {onDelete && (
        <div className={classes.topRightIcon}>
          <DeleteIcon onClick={onDelete} />
        </div>
      )}
      <TextField
        placeholder="Link"
        InputLabelProps={{ shrink: true }}
        label="Link"
        value={link}
        onChange={setLink}
        className={classes.fieldContainer}
      />
    </div>
  );
}

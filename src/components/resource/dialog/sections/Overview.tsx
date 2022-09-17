import React from "react";
import { TextField } from "@material-ui/core";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";

interface OverViewProps {
  url: string;
  setUrl: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
}

export default function Overview({ url, onDelete, setUrl }: OverViewProps) {
  const classes = useAppDialogStyles();

  return (
    <div className={classes.tabContainer}>
      {onDelete && (
        <div className={classes.topRightIcon}>
          <DeleteIcon onClick={onDelete} />
        </div>
      )}
      <TextField
        placeholder="Url"
        InputLabelProps={{ shrink: true }}
        label="Url"
        value={url}
        onChange={setUrl}
        className={classes.fieldContainer}
      />
    </div>
  );
}

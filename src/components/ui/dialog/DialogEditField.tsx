import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";
import EditIcon from "@/components/ui/icon/EditIcon";
import PreviewIcon from "../icon/PreviewIcon";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textFieldContainer: {
    width: "90%",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
  fieldContainer: {
    width: "100%",
  },
}));

interface DialogEditFieldProps {
  label: string;
  text: string;
  onEdit: () => void;
  showPreview?: boolean;
  onPreview?: () => void;
}

export default function DialogEditField({
  label,
  text,
  onEdit,
  showPreview,
  onPreview = () => {},
}: DialogEditFieldProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.textFieldContainer}>
        <TextField
          margin="dense"
          InputLabelProps={{ shrink: true }}
          label={label}
          value={text}
          className={classes.fieldContainer}
          style={{ maxHeight: 500 }}
          disabled={true}
        />
      </div>
      <div className={classes.iconsContainer}>
        <EditIcon onClick={onEdit} size={20} />
        {showPreview && (
          <div style={{ marginLeft: 5 }}>
            <PreviewIcon onClick={onPreview} size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

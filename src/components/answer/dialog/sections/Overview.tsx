import React from "react";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";
import { Editor } from "@/components/ui/Editor";

interface OverViewProps {
  title: string;
  setTitle: (text: string) => void;
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
      {/* <TextField
        placeholder="Title"
        InputLabelProps={{ shrink: true }}
        label="Title"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      /> */}
      <Editor placeholder="Type an answer" setText={setTitle} text={title} />
    </div>
  );
}

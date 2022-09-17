import React from "react";
import { TextField } from "@material-ui/core";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";

interface OverViewProps {
  title: string;
  image: string;
  description: string;
}

export default function Overview({ image, title, description }: OverViewProps) {
  const classes = useAppDialogStyles();

  return (
    <div className={classes.tabContainer}>
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Title"
        margin="dense"
        disabled={true}
        value={title}
        className={classes.fieldContainer}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Description"
        margin="dense"
        multiline
        disabled={true}
        value={description}
        className={classes.fieldContainer}
      />
      <img src={image} alt="img" className={classes.imageContainer} />
    </div>
  );
}

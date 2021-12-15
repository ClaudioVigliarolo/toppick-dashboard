import React from "react";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
    fontSize: 30,
  },
}));

interface OverviewProps {
  open: boolean;
  title: string;
  description: string;
  url: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  setUrl: (event: React.ChangeEvent<any>) => void;
  setDescription: (event: React.ChangeEvent<any>) => void;
  openPreview: () => void;
}
export default function ArticleOverview({
  open,
  title,
  description,
  url,
  setUrl,
  setTitle,
  openPreview,
  setDescription,
}: OverviewProps) {
  const classes = useStyles();

  return (
    <>
      {open && (
        <>
          <VisibilityOutlinedIcon
            className={classes.icon}
            onClick={openPreview}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Question"
            id="standard-helperText"
            value={title}
            onChange={setTitle}
            fullWidth
          />
          <TextField
            placeholder="Type or Paste the Description here..."
            multiline
            rows={10}
            rowsMax={10}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="title"
            id="standard-helperText"
            value={description}
            onChange={setDescription}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Link"
            placeholder="Paste the Link to the Article here"
            id="standard-helperText"
            value={url}
            onChange={setUrl}
            fullWidth
          />
        </>
      )}
    </>
  );
}

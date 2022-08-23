import React from "react";
import { DEFAULT_IMAGE_URL } from "@/constants/app";
import { makeStyles, TextField } from "@material-ui/core";

interface OverviewProps {
  title: string;
  slug: string;
  image: string;
  description: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  setSlug: (event: React.ChangeEvent<any>) => void;
  setImage: (event: React.ChangeEvent<any>) => void;
  setDescription: (event: React.ChangeEvent<any>) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField: {
    width: "90%",
  },
  image: {
    height: 200,
    marginTop: 20,
    marginBottom: 10,
  },
}));

export default function Overview({
  title,
  slug,
  image,
  setImage,
  description,
  setTitle,
  setSlug,
  setDescription,
}: OverviewProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        placeholder="Title"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Title"
        id="standard-helperText"
        value={title}
        onChange={setTitle}
        className={classes.textField}
      />

      <TextField
        placeholder="Slug"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Slug"
        id="standard-helperText"
        value={slug}
        onChange={setSlug}
        className={classes.textField}
      />

      <TextField
        placeholder="Type or paste description here..."
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Description"
        id="outlined-multiline-flexible"
        multiline
        minRows={5}
        value={description}
        onChange={setDescription}
        className={classes.textField}
      />

      <img
        src={image ? image : DEFAULT_IMAGE_URL}
        alt="img"
        className={classes.image}
      />
      <TextField
        placeholder="Paste the Image Url here"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Link"
        id="standard-helperText"
        value={image}
        onChange={setImage}
        className={classes.textField}
      />
    </div>
  );
}

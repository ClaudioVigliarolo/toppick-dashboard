import React from "react";
import { DEFAULT_IMAGE_URL } from "@/constants/app";
import { TextField } from "@material-ui/core";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";

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
  const classes = useAppDialogStyles();

  return (
    <div className={classes.tabContainer}>
      <TextField
        placeholder="Title"
        InputLabelProps={{ shrink: true }}
        label="Title"
        margin="dense"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />

      <TextField
        placeholder="Slug"
        InputLabelProps={{ shrink: true }}
        label="Slug"
        margin="dense"
        value={slug}
        onChange={setSlug}
        className={classes.fieldContainer}
      />

      <TextField
        placeholder="Type or paste description here..."
        InputLabelProps={{ shrink: true }}
        label="Description"
        margin="dense"
        multiline
        minRows={5}
        value={description}
        onChange={setDescription}
        className={classes.fieldContainer}
      />

      <img
        src={image ? image : DEFAULT_IMAGE_URL}
        alt="img"
        className={classes.imageContainer}
      />
      <TextField
        placeholder="Paste the Image Url here"
        InputLabelProps={{ shrink: true }}
        label="Link"
        margin="dense"
        value={image}
        onChange={setImage}
        className={classes.fieldContainer}
      />
    </div>
  );
}

import React from "react";
import { DEFAULT_IMAGE_URL } from "@/constants/app";
import Switch from "@/components/ui/select/Switch";
import { TextField } from "@material-ui/core";
import { MaterialUiColor } from "@/interfaces/ui";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";

interface OverviewProps {
  active: boolean;
  title: string;
  slug: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  image?: string;
  description?: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  setSlug: (event: React.ChangeEvent<any>) => void;
  setImage: (event: React.ChangeEvent<any>) => void;
  setDescription: (event: React.ChangeEvent<any>) => void;
  toggleActive: () => void;
}
export default function Overview({
  active,
  title,
  slug,
  titlePlaceholder,
  descriptionPlaceholder,
  image = "",
  setImage,
  description = "",
  toggleActive,
  setTitle,
  setSlug,
  setDescription,
}: OverviewProps) {
  const classes = useDialogStyles();

  return (
    <div className={classes.tabContainer}>
      <div className={classes.topRightIcon}>
        <Switch
          text=""
          switchColor={MaterialUiColor.Primary}
          handleChange={toggleActive}
          value={active}
        />
      </div>

      <TextField
        placeholder={titlePlaceholder}
        InputLabelProps={{ shrink: true }}
        label="Title"
        margin="dense"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />

      <TextField
        placeholder={titlePlaceholder}
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Slug"
        value={slug}
        onChange={setSlug}
        className={classes.fieldContainer}
      />

      <TextField
        placeholder={descriptionPlaceholder}
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Description"
        multiline
        minRows={3}
        value={description}
        onChange={setDescription}
        className={classes.fieldContainer}
      />

      <img
        src={image ? image : DEFAULT_IMAGE_URL}
        alt={title}
        style={{ height: 200, marginTop: 20 }}
      />
      <TextField
        placeholder="Paste the Image Url here"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Link"
        value={image}
        onChange={setImage}
        className={classes.fieldContainer}
      />
    </div>
  );
}

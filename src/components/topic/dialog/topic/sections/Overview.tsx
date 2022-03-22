import React from "react";
import { NO_IMAGE_URL } from "@/constants/app";
import Switch from "@/components/ui/select/Switch";
import { makeStyles, TextField } from "@material-ui/core";
import { MaterialUiColor } from "@/interfaces/app";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
    fontSize: 30,
  },
  textField: {
    marginTop: 20,
    width: "90%",
  },
  image: {
    height: 200,
    marginTop: 20,
  },
}));

interface OverviewProps {
  active: boolean;
  title: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  image?: string;
  description?: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  setImage: (event: React.ChangeEvent<any>) => void;
  setDescription: (event: React.ChangeEvent<any>) => void;
  toggleActive: () => void;
}
export default function Overview({
  active,
  title,
  titlePlaceholder,
  descriptionPlaceholder,
  image = "",
  setImage,
  description = "",
  toggleActive,
  setTitle,
  setDescription,
}: OverviewProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.switchContainer}>
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
        margin="dense"
        label="Title"
        id="standard-helperText"
        value={title}
        onChange={setTitle}
        className={classes.textField}
      />

      <TextField
        placeholder={descriptionPlaceholder}
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Description"
        id="outlined-multiline-flexible"
        multiline
        rows={3}
        value={description}
        onChange={setDescription}
        className={classes.textField}
      />

      <img
        src={image ? image : NO_IMAGE_URL}
        alt={title}
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

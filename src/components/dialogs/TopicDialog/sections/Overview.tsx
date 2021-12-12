import React from "react";
import { CONSTANTS, NO_IMAGE_URL } from "../../../../constants/constants";
import Switch from "../../../select/Switch";
import { TextField } from "@material-ui/core";
import { MaterialUiColor } from "../../../../interfaces/Interfaces";

interface OverviewProps {
  active: boolean;
  title: string;
  titlePlaceholder?: string;
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
  image,
  setImage,
  description,
  toggleActive,
  setTitle,
  setDescription,
}: OverviewProps) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
          color: "orange",
          fontSize: 30,
        }}
      >
        <Switch
          text=""
          color={MaterialUiColor.Primary}
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
        style={{ width: 500, alignSelf: "center", marginTop: 10 }}
      />

      <TextField
        placeholder={titlePlaceholder}
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Description"
        id="outlined-multiline-flexible"
        multiline
        rows={3}
        value={description}
        onChange={setDescription}
        style={{ width: 500, alignSelf: "center" }}
      />

      <img
        src={image ? image : NO_IMAGE_URL}
        alt="img"
        style={{ height: 200, alignSelf: "center", marginTop: 20 }}
      />
      <TextField
        placeholder="Paste the Image Url here"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Link"
        id="standard-helperText"
        value={image}
        onChange={setImage}
        style={{ width: 300, alignSelf: "center", marginTop: 10 }}
      />
    </>
  );
}

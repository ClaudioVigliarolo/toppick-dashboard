import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { COLORS } from "@/constants/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  fieldContainer: {
    marginTop: 20,
    width: "90%",
  },
  deleteIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
  },
  deleteIcon: {
    cursor: "pointer",
    color: COLORS.darkerOrange,
    fontSize: 25,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
}));

interface OverViewProps {
  title: string;
  image: string;
  description: string;
}

export default function Overview({ image, title, description }: OverViewProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Title"
        id="outlined-multiline-flexible"
        disabled={true}
        value={title}
        className={classes.fieldContainer}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Description"
        multiline
        id="outlined-multiline-flexible"
        disabled={true}
        value={description}
        className={classes.fieldContainer}
      />
      <img src={image} alt="img" className={classes.image} />
    </div>
  );
}

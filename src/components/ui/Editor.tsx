import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  placeholder: string;
  text: string;
  setText: (value: string) => void;
}

const useStyles = makeStyles((theme) => ({
  editor: {
    minHeight: 300,
    width: "100%",
  },
}));

export function Editor({ placeholder, text, setText }: EditorProps) {
  const classes = useStyles();

  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder}
      value={text}
      onChange={setText}
      className={classes.editor}
    />
  );
}
